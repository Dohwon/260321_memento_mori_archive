const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const http = require("http");

const ROOT = __dirname;
const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 4318);
const DATA_DIR = process.env.RAILWAY_VOLUME_MOUNT_PATH || process.env.DATA_DIR || path.join(ROOT, "data");
const LEGACY_COMMENTS_FILE = path.join(ROOT, "comments-data.json");
const COMMENTS_FILE = path.join(DATA_DIR, "comments-data.json");
const ENTRIES_FILE = path.join(DATA_DIR, "entries-data.json");
const VISIT_COUNTER_FILE = path.join(DATA_DIR, "visit-counter.json");
const MBTI_STATS_FILE = path.join(DATA_DIR, "mbti-stats.json");
const CHAT_ARCHIVE_FILE = path.join(DATA_DIR, "chat-archive-segments.json");
const CHAT_ARCHIVE_FALLBACK_FILE = path.join(ROOT, "data", "chat-archive-segments.json");
let inMemoryVisitCounterStore = { total: 0, byDay: {} };
let inMemoryMbtiStatsStore = { total: 0, counts: {} };
const ADMIN_DELETE_KEY = String(process.env.ADMIN_DELETE_KEY || "").trim();
const ADMIN_LOGIN_ID = String(process.env.ADMIN_LOGIN_ID || "admin").trim() || "admin";
const ADMIN_LOGIN_PASSWORD_HASH = String(process.env.ADMIN_LOGIN_PASSWORD_HASH || "").trim();
const ADMIN_SESSION_SECRET = String(process.env.ADMIN_SESSION_SECRET || "").trim();
const ADMIN_COOKIE_NAME = "admin_auth";
const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 14;
const CHAT_ARCHIVE_PASSWORD_HASH = String(process.env.CHAT_ARCHIVE_PASSWORD_HASH || "").trim();
const CHAT_ARCHIVE_SESSION_SECRET = String(process.env.CHAT_ARCHIVE_SESSION_SECRET || "").trim();
const CHAT_ARCHIVE_COOKIE_NAME = "chat_archive_auth";
const CHAT_ARCHIVE_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const PRIVATE_ENTRY_ACCESS_COOKIE_NAME = "private_entry_access";
const PRIVATE_ENTRY_ACCESS_COOKIE_MAX_AGE = 60 * 60 * 12;
const ENTRY_DATE_OVERRIDES = {};

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8"
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function hashSecret(secret) {
  return crypto.createHash("sha256").update(secret).digest("hex");
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function ensureCommentsFile() {
  ensureDataDir();
  if (!fs.existsSync(COMMENTS_FILE)) {
    if (fs.existsSync(LEGACY_COMMENTS_FILE)) {
      fs.copyFileSync(LEGACY_COMMENTS_FILE, COMMENTS_FILE);
      return;
    }
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify({ comments: [] }, null, 2));
  }
}

function readCommentStore() {
  ensureCommentsFile();
  return JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf8"));
}

function writeCommentStore(store) {
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(store, null, 2));
}

function ensureEntriesFile() {
  ensureDataDir();
  if (!fs.existsSync(ENTRIES_FILE)) {
    fs.writeFileSync(ENTRIES_FILE, JSON.stringify({ entries: [] }, null, 2));
  }
}

function toYmdDate(value) {
  if (typeof value !== "string") return "";
  const raw = value.trim();
  if (!raw) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const isoMatch = raw.match(/^(\d{4}-\d{2}-\d{2})T/);
  if (isoMatch) return isoMatch[1];
  const dotted = raw.match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})$/);
  if (dotted) {
    const [, y, m, d] = dotted;
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
}

function todayYmdSeoul() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function normalizeDateNotFuture(value) {
  const base = toYmdDate(value);
  if (!base) return "";
  const today = todayYmdSeoul();
  let [year, month, day] = base.split("-").map((part) => Number(part));
  let normalized = base;
  let guard = 0;
  while (normalized > today && guard < 10) {
    year -= 1;
    normalized = `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    guard += 1;
  }
  return normalized;
}

function stripBrokenChars(value) {
  return String(value || "")
    .replace(/\uFFFD+/g, "")
    .replace(/오늘의\s*록/g, "오늘의 기록")
    .replace(/다시\s*록/g, "다시 기록")
    .replace(/찾는\s*관/g, "찾는 습관")
    .trim();
}

function normalizeIp(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const first = raw.split(",")[0].trim();
  const withoutPort = first.startsWith("[") ? first.replace(/^\[([^\]]+)\](?::\d+)?$/, "$1") : first.replace(/^(\d+\.\d+\.\d+\.\d+):\d+$/, "$1");
  if (withoutPort === "::1") return "127.0.0.1";
  if (withoutPort.startsWith("::ffff:")) return withoutPort.slice(7);
  return withoutPort;
}

function parseCookies(request) {
  const raw = String(request.headers.cookie || "");
  return raw.split(";").reduce((acc, pair) => {
    const index = pair.indexOf("=");
    if (index === -1) return acc;
    const key = pair.slice(0, index).trim();
    const value = pair.slice(index + 1).trim();
    if (!key) return acc;
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
}

function signValue(value, secret) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function buildSignedToken(payload, secret) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${signValue(encoded, secret)}`;
}

function readSignedToken(token, secret) {
  const raw = String(token || "");
  const [payload, signature] = raw.split(".");
  if (!payload || !signature || !secret) return null;
  const expected = signValue(payload, secret);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length) return null;
  if (!crypto.timingSafeEqual(actualBuffer, expectedBuffer)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (Number(parsed?.exp || 0) <= Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

function hasAdminAuthConfig() {
  return Boolean(ADMIN_LOGIN_PASSWORD_HASH && ADMIN_SESSION_SECRET);
}

function hasChatArchiveAuthConfig() {
  return Boolean(CHAT_ARCHIVE_PASSWORD_HASH && CHAT_ARCHIVE_SESSION_SECRET);
}

function buildChatArchiveSessionToken() {
  return buildSignedToken(
    {
      scope: "chat-archive",
      exp: Date.now() + CHAT_ARCHIVE_COOKIE_MAX_AGE * 1000
    },
    CHAT_ARCHIVE_SESSION_SECRET
  );
}

function validateChatArchiveSessionToken(token) {
  if (!hasChatArchiveAuthConfig()) return false;
  const parsed = readSignedToken(token, CHAT_ARCHIVE_SESSION_SECRET);
  return parsed?.scope === "chat-archive";
}

function buildAdminSessionToken() {
  return buildSignedToken(
    {
      scope: "admin",
      exp: Date.now() + ADMIN_COOKIE_MAX_AGE * 1000
    },
    ADMIN_SESSION_SECRET
  );
}

function hasAdminSession(request) {
  if (!hasAdminAuthConfig()) return false;
  const cookies = parseCookies(request);
  const parsed = readSignedToken(cookies[ADMIN_COOKIE_NAME], ADMIN_SESSION_SECRET);
  return parsed?.scope === "admin";
}

function buildPrivateEntryAccessToken(entryIds) {
  return buildSignedToken(
    {
      scope: "private-entry",
      ids: Array.from(new Set((Array.isArray(entryIds) ? entryIds : []).filter(Boolean))).slice(0, 100),
      exp: Date.now() + PRIVATE_ENTRY_ACCESS_COOKIE_MAX_AGE * 1000
    },
    CHAT_ARCHIVE_SESSION_SECRET || ADMIN_SESSION_SECRET
  );
}

function readPrivateEntryAccessIds(request) {
  const secret = CHAT_ARCHIVE_SESSION_SECRET || ADMIN_SESSION_SECRET;
  if (!secret) return [];
  const cookies = parseCookies(request);
  const parsed = readSignedToken(cookies[PRIVATE_ENTRY_ACCESS_COOKIE_NAME], secret);
  return Array.isArray(parsed?.ids) ? parsed.ids.map((item) => String(item || "").trim()).filter(Boolean) : [];
}

function writeCookie(response, name, value, maxAgeSeconds) {
  const cookie = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${Math.max(0, Number(maxAgeSeconds) || 0)}`
  ].join("; ");
  response.setHeader("Set-Cookie", cookie);
}

function appendCookie(response, name, value, maxAgeSeconds) {
  const current = response.getHeader("Set-Cookie");
  const list = Array.isArray(current) ? current.slice() : current ? [current] : [];
  const cookie = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${Math.max(0, Number(maxAgeSeconds) || 0)}`
  ].join("; ");
  list.push(cookie);
  response.setHeader("Set-Cookie", list);
}

function chatArchiveAccessState(request) {
  const configured = hasChatArchiveAuthConfig();
  if (!configured) {
    return { canAccess: false, configured: false };
  }
  const cookies = parseCookies(request);
  return {
    canAccess: validateChatArchiveSessionToken(cookies[CHAT_ARCHIVE_COOKIE_NAME]),
    configured: true
  };
}

function readChatArchiveStore() {
  if (fs.existsSync(CHAT_ARCHIVE_FILE)) {
    return JSON.parse(fs.readFileSync(CHAT_ARCHIVE_FILE, "utf8"));
  }
  if (!fs.existsSync(CHAT_ARCHIVE_FALLBACK_FILE)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(CHAT_ARCHIVE_FALLBACK_FILE, "utf8"));
}

function normalizeUpdatedAt(value, fallbackDate) {
  const fallback = `${fallbackDate}T12:00:00+09:00`;
  if (typeof value !== "string" || !value.trim()) return fallback;
  const time = Date.parse(value);
  if (Number.isNaN(time)) return fallback;
  const datePart = toYmdDate(value);
  if (!datePart) return fallback;
  if (normalizeDateNotFuture(datePart) !== datePart) return fallback;
  return value;
}

function normalizeEntryForStore(entry, existingEntry) {
  if (!entry || typeof entry !== "object") return null;
  const safeEntry = { ...entry };
  delete safeEntry.privatePassword;
  delete safeEntry.isLocked;
  const id = typeof entry.id === "string" && entry.id.trim() ? entry.id.trim() : "";
  const title = stripBrokenChars(entry.title);
  if (!id || !title) return null;

  const markdown =
    typeof entry.markdown === "string"
      ? stripBrokenChars(entry.markdown)
      : Array.isArray(entry.body)
      ? entry.body.map((line) => stripBrokenChars(line)).filter(Boolean).join("\n\n")
      : "";
  const body = Array.isArray(entry.body)
    ? entry.body.map((line) => stripBrokenChars(line)).filter(Boolean)
    : markdown
    ? markdown
        .split(/\n+/)
        .map((line) => stripBrokenChars(line))
        .filter(Boolean)
    : [];
  if (!body.length && !markdown) return null;

  const tags = Array.isArray(entry.tags)
    ? entry.tags.map((tag) => stripBrokenChars(tag)).filter(Boolean).slice(0, 5)
    : [];
  const metrics = Array.isArray(entry.metrics) ? entry.metrics.slice(0, 6).map((value) => Number(value) || 0) : [];
  const revisitPrompts = Array.isArray(entry.revisitPrompts)
    ? entry.revisitPrompts
        .map((item) => ({
          label: String(item?.label || "").trim(),
          text: String(item?.text || "").trim()
        }))
        .filter((item) => item.label && item.text)
        .slice(0, 4)
    : [];

  const dateFromEntry = normalizeDateNotFuture(entry.date);
  const idDateMatch = id.match(/entry-(\d{4}-\d{2}-\d{2})/);
  const idDate = idDateMatch?.[1] || "";
  const dateFromUpdatedAt = normalizeDateNotFuture(entry.updatedAt);
  const forcedDate = ENTRY_DATE_OVERRIDES[id] || "";
  const date =
    normalizeDateNotFuture(forcedDate) ||
    dateFromEntry ||
    normalizeDateNotFuture(idDate) ||
    dateFromUpdatedAt ||
    todayYmdSeoul();
  const updatedAt = normalizeUpdatedAt(entry.updatedAt, date);

  let privatePasswordHash = "";
  if (Boolean(entry.isPrivate)) {
    if (typeof entry.privatePassword === "string" && entry.privatePassword.trim()) {
      privatePasswordHash = hashSecret(entry.privatePassword);
    } else if (typeof existingEntry?.privatePasswordHash === "string" && existingEntry.privatePasswordHash.trim()) {
      privatePasswordHash = existingEntry.privatePasswordHash.trim();
    } else if (typeof entry.privatePasswordHash === "string" && entry.privatePasswordHash.trim()) {
      privatePasswordHash = entry.privatePasswordHash.trim();
    }
  }

  return {
    ...safeEntry,
    id,
    title,
    date,
    excerpt: stripBrokenChars(entry.excerpt).slice(0, 220),
    markdown: markdown || body.join("\n\n"),
    body,
    tags,
    philosophyKey: typeof entry.philosophyKey === "string" ? entry.philosophyKey : "camus",
    philosophyTitle: typeof entry.philosophyTitle === "string" ? entry.philosophyTitle : "",
    philosophyText: typeof entry.philosophyText === "string" ? entry.philosophyText : "",
    philosophyQuote: typeof entry.philosophyQuote === "string" ? entry.philosophyQuote : "",
    philosophyAdvice: typeof entry.philosophyAdvice === "string" ? entry.philosophyAdvice : "",
    psychologyTitle: typeof entry.psychologyTitle === "string" ? entry.psychologyTitle : "",
    psychologyText: typeof entry.psychologyText === "string" ? entry.psychologyText : "",
    psychologyState: typeof entry.psychologyState === "string" ? entry.psychologyState : "",
    metrics,
    riskLevel: ["low", "watch", "high", "critical"].includes(entry.riskLevel) ? entry.riskLevel : "watch",
    isPrivate: Boolean(entry.isPrivate && privatePasswordHash),
    privatePasswordHash,
    updatedAt,
    revisitPrompts
  };
}

function readEntryStore() {
  ensureEntriesFile();
  const raw = JSON.parse(fs.readFileSync(ENTRIES_FILE, "utf8"));
  const parsedList = Array.isArray(raw?.entries) ? raw.entries : [];
  const entries = parsedList.map((entry) => normalizeEntryForStore(entry)).filter(Boolean);
  const before = JSON.stringify(parsedList);
  const after = JSON.stringify(entries);
  if (before !== after) {
    fs.writeFileSync(ENTRIES_FILE, JSON.stringify({ entries }, null, 2));
  }
  return { entries };
}

function writeEntryStore(store) {
  ensureEntriesFile();
  const currentStore = readEntryStore();
  const existingById = new Map(currentStore.entries.map((entry) => [entry.id, entry]));
  const normalizedEntries = Array.isArray(store?.entries)
    ? store.entries
        .map((entry) => normalizeEntryForStore(entry, existingById.get(String(entry?.id || "").trim())))
        .filter(Boolean)
    : [];
  fs.writeFileSync(ENTRIES_FILE, JSON.stringify({ entries: normalizedEntries }, null, 2));
}

function canAccessPrivateEntry(request, entry) {
  if (!entry?.isPrivate) return true;
  if (hasAdminSession(request)) return true;
  return readPrivateEntryAccessIds(request).includes(entry.id);
}

function sanitizeEntryForAccess(entry, canAccess) {
  if (!entry || typeof entry !== "object") return null;
  const safeEntry = { ...entry };
  delete safeEntry.privatePasswordHash;
  delete safeEntry.privatePassword;
  if (!entry.isPrivate) {
    return { ...safeEntry, isLocked: false };
  }
  if (canAccess) {
    return { ...safeEntry, isLocked: false };
  }
  return {
    ...safeEntry,
    excerpt: "비공개 기록입니다. 비밀번호 입력 후 확인할 수 있습니다.",
    markdown: "",
    body: [],
    philosophyText: "비공개 설정으로 인해 본문은 잠겨 있습니다.",
    psychologyText: "비밀번호 확인 후 이 기록의 원문과 댓글을 볼 수 있습니다.",
    isLocked: true
  };
}

function sanitizeEntryForClient(entry, request) {
  return sanitizeEntryForAccess(entry, canAccessPrivateEntry(request, entry));
}

function getEntryById(entryId) {
  if (!entryId) return null;
  return readEntryStore().entries.find((entry) => entry.id === entryId) || null;
}

function ensureEntryReadable(request, entryId) {
  const entry = getEntryById(entryId);
  if (!entry) {
    return { ok: false, statusCode: 404, error: "entry not found" };
  }
  if (entry.isPrivate && !canAccessPrivateEntry(request, entry)) {
    return { ok: false, statusCode: 403, error: "private entry locked", entry };
  }
  return { ok: true, entry };
}

function ensureVisitCounterFile() {
  const folder = path.dirname(VISIT_COUNTER_FILE);
  try {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    if (!fs.existsSync(VISIT_COUNTER_FILE)) {
      fs.writeFileSync(VISIT_COUNTER_FILE, JSON.stringify({ total: 0, byDay: {} }, null, 2));
    }
    return true;
  } catch {
    return false;
  }
}

function readVisitCounterStore() {
  if (!ensureVisitCounterFile()) {
    return inMemoryVisitCounterStore;
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(VISIT_COUNTER_FILE, "utf8"));
    const normalized = {
      total: Number.isFinite(parsed?.total) ? Math.max(0, Number(parsed.total)) : 0,
      byDay: parsed?.byDay && typeof parsed.byDay === "object" ? parsed.byDay : {}
    };
    inMemoryVisitCounterStore = normalized;
    return normalized;
  } catch {
    return inMemoryVisitCounterStore;
  }
}

function writeVisitCounterStore(store) {
  inMemoryVisitCounterStore = {
    total: Number.isFinite(store?.total) ? Math.max(0, Number(store.total)) : 0,
    byDay: store?.byDay && typeof store.byDay === "object" ? store.byDay : {}
  };
  try {
    if (ensureVisitCounterFile()) {
      fs.writeFileSync(VISIT_COUNTER_FILE, JSON.stringify(inMemoryVisitCounterStore, null, 2));
    }
  } catch {
    // Keep in-memory fallback when file writes are unavailable.
  }
}

function ensureMbtiStatsFile() {
  const folder = path.dirname(MBTI_STATS_FILE);
  try {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    if (!fs.existsSync(MBTI_STATS_FILE)) {
      fs.writeFileSync(MBTI_STATS_FILE, JSON.stringify({ total: 0, counts: {} }, null, 2));
    }
    return true;
  } catch {
    return false;
  }
}

function normalizeMbtiStatsStore(raw) {
  const sourceCounts = raw?.counts && typeof raw.counts === "object" ? raw.counts : {};
  const counts = {};
  Object.entries(sourceCounts).forEach(([typeId, value]) => {
    const key = String(typeId || "").trim();
    if (!key) return;
    const count = Math.max(0, Number(value) || 0);
    counts[key] = count;
  });
  const total = Math.max(0, Number(raw?.total) || 0);
  return { total, counts };
}

function readMbtiStatsStore() {
  if (!ensureMbtiStatsFile()) {
    return inMemoryMbtiStatsStore;
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(MBTI_STATS_FILE, "utf8"));
    const normalized = normalizeMbtiStatsStore(parsed);
    inMemoryMbtiStatsStore = normalized;
    return normalized;
  } catch {
    return inMemoryMbtiStatsStore;
  }
}

function writeMbtiStatsStore(store) {
  inMemoryMbtiStatsStore = normalizeMbtiStatsStore(store);
  try {
    if (ensureMbtiStatsFile()) {
      fs.writeFileSync(MBTI_STATS_FILE, JSON.stringify(inMemoryMbtiStatsStore, null, 2));
    }
  } catch {
    // Keep in-memory fallback when file writes are unavailable.
  }
}

function hitMbtiStats(resultId) {
  const typeId = sanitizeText(resultId, 80);
  if (!typeId) {
    return readMbtiStatsStore();
  }
  const store = readMbtiStatsStore();
  store.total = Number(store.total || 0) + 1;
  store.counts[typeId] = Number(store.counts[typeId] || 0) + 1;
  writeMbtiStatsStore(store);
  return store;
}

function todayKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function readVisitCounter() {
  const store = readVisitCounterStore();
  const key = todayKey();
  return {
    today: Number(store.byDay[key] || 0),
    total: Number(store.total || 0),
    date: key
  };
}

function hitVisitCounter() {
  const store = readVisitCounterStore();
  const key = todayKey();
  store.total = Number(store.total || 0) + 1;
  store.byDay[key] = Number(store.byDay[key] || 0) + 1;
  writeVisitCounterStore(store);
  return {
    today: Number(store.byDay[key] || 0),
    total: Number(store.total || 0),
    date: key
  };
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("payload too large"));
      }
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

function sanitizeText(value, maxLength) {
  return stripBrokenChars(value)
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

function sanitizeBody(value, maxLength) {
  return stripBrokenChars(value)
    .trim()
    .replace(/\r\n/g, "\n")
    .slice(0, maxLength);
}

function listComments(entryKey) {
  const store = readCommentStore();
  return store.comments
    .filter((comment) => comment.entryKey === entryKey)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map(({ passwordHash, ...safeComment }) => safeComment);
}

async function handleComments(request, response, url) {
  if (request.method === "GET") {
    const wantsSummary = ["1", "true", "yes"].includes(String(url.searchParams.get("summary") || "").toLowerCase());
    if (wantsSummary) {
      const store = readCommentStore();
      const summary = {};
      store.comments.forEach((comment) => {
        const key = sanitizeText(comment.entryKey, 120);
        if (!key) return;
        const access = ensureEntryReadable(request, key);
        if (!access.ok) return;
        const current = summary[key] || { count: 0, latest: null };
        const nextCount = Number(current.count || 0) + 1;
        const latest = !current.latest || String(comment.createdAt) >= String(current.latest.createdAt)
          ? {
              nickname: sanitizeText(comment.nickname, 32),
              body: sanitizeBody(comment.body, 800),
              createdAt: String(comment.createdAt || "")
            }
          : current.latest;
        summary[key] = { count: nextCount, latest };
      });
      sendJson(response, 200, { ok: true, summary });
      return;
    }

    const entryKey = sanitizeText(url.searchParams.get("entry"), 120);
    if (!entryKey) {
      sendJson(response, 400, { ok: false, error: "entry is required" });
      return;
    }

    const access = ensureEntryReadable(request, entryKey);
    if (!access.ok) {
      sendJson(response, access.statusCode, { ok: false, error: access.error });
      return;
    }

    sendJson(response, 200, { ok: true, comments: listComments(entryKey) });
    return;
  }

  if (request.method === "POST") {
    try {
      const payload = await readBody(request);
      const entryKey = sanitizeText(payload.entryKey, 120);
      const nickname = sanitizeText(payload.nickname, 32);
      const password = sanitizeText(payload.password, 64);
      const body = sanitizeBody(payload.body, 800);

      if (!entryKey || !nickname || !password || !body) {
        sendJson(response, 400, { ok: false, error: "entryKey, nickname, password, body are required" });
        return;
      }

      const access = ensureEntryReadable(request, entryKey);
      if (!access.ok) {
        sendJson(response, access.statusCode, { ok: false, error: access.error });
        return;
      }

      const store = readCommentStore();
      // Persist comments in volume-backed storage.
      const comment = {
        id: crypto.randomUUID(),
        entryKey,
        nickname,
        body,
        passwordHash: hashSecret(password),
        createdAt: new Date().toISOString()
      };

      store.comments.push(comment);
      writeCommentStore(store);
      sendJson(response, 201, {
        ok: true,
        comment: {
          id: comment.id,
          entryKey: comment.entryKey,
          nickname: comment.nickname,
          body: comment.body,
          createdAt: comment.createdAt
        }
      });
      return;
    } catch (error) {
      sendJson(response, 400, { ok: false, error: "invalid request body" });
      return;
    }
  }

  if (request.method === "DELETE") {
    try {
      const payload = await readBody(request);
      const commentId = sanitizeText(payload.commentId, 120);
      const password = sanitizeText(payload.password, 64);

      if (!commentId) {
        sendJson(response, 400, { ok: false, error: "commentId is required" });
        return;
      }

      const store = readCommentStore();
      const index = store.comments.findIndex((comment) => comment.id === commentId);

      if (index === -1) {
        sendJson(response, 404, { ok: false, error: "comment not found" });
        return;
      }

      const target = store.comments[index];
      const passwordMatches = password && hashSecret(password) === target.passwordHash;
      const adminMatches = hasAdminSession(request) || (ADMIN_DELETE_KEY && password === ADMIN_DELETE_KEY);

      if (!passwordMatches && !adminMatches) {
        sendJson(response, 403, { ok: false, error: "invalid password" });
        return;
      }

      store.comments.splice(index, 1);
      writeCommentStore(store);
      sendJson(response, 200, { ok: true });
      return;
    } catch (error) {
      sendJson(response, 400, { ok: false, error: "invalid request body" });
      return;
    }
  }

  sendJson(response, 405, { ok: false, error: "method not allowed" });
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (url.pathname === "/api/health") {
    sendJson(response, 200, { ok: true, service: "memento-mori-archive" });
    return;
  }

  if (url.pathname === "/api/analytics/counter" && request.method === "GET") {
    sendJson(response, 200, { ok: true, ...readVisitCounter() });
    return;
  }

  if (url.pathname === "/api/analytics/visit" && request.method === "POST") {
    sendJson(response, 200, { ok: true, ...hitVisitCounter() });
    return;
  }

  if (url.pathname === "/api/mbti/stats" && request.method === "GET") {
    const store = readMbtiStatsStore();
    sendJson(response, 200, { ok: true, total: Number(store.total || 0), counts: store.counts || {} });
    return;
  }

  if (url.pathname === "/api/mbti/hit" && request.method === "POST") {
    try {
      const payload = await readBody(request);
      const resultId = sanitizeText(payload?.resultId, 80);
      if (!resultId) {
        sendJson(response, 400, { ok: false, error: "resultId is required" });
        return;
      }
      const store = hitMbtiStats(resultId);
      sendJson(response, 200, { ok: true, total: Number(store.total || 0), counts: store.counts || {} });
      return;
    } catch {
      sendJson(response, 400, { ok: false, error: "invalid request body" });
      return;
    }
  }

  if (url.pathname === "/api/admin/access" && request.method === "GET") {
    sendJson(response, 200, { ok: true, canAccess: hasAdminSession(request), configured: hasAdminAuthConfig() });
    return;
  }

  if (url.pathname === "/api/admin/unlock" && request.method === "POST") {
    if (!hasAdminAuthConfig()) {
      sendJson(response, 503, { ok: false, error: "admin auth not configured", configured: false });
      return;
    }
    try {
      const payload = await readBody(request);
      const id = sanitizeText(payload?.id, 64);
      const password = typeof payload?.password === "string" ? payload.password : "";
      const passwordHash = hashSecret(password);
      const actualBuffer = Buffer.from(passwordHash);
      const expectedBuffer = Buffer.from(ADMIN_LOGIN_PASSWORD_HASH);
      const idMatches = !id || id === ADMIN_LOGIN_ID;
      const passwordMatches =
        actualBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(actualBuffer, expectedBuffer);
      if (!idMatches || !passwordMatches) {
        sendJson(response, 401, { ok: false, error: "invalid credentials", configured: true });
        return;
      }
      writeCookie(response, ADMIN_COOKIE_NAME, buildAdminSessionToken(), ADMIN_COOKIE_MAX_AGE);
      sendJson(response, 200, { ok: true, canAccess: true, configured: true });
      return;
    } catch {
      sendJson(response, 400, { ok: false, error: "invalid request body", configured: hasAdminAuthConfig() });
      return;
    }
  }

  if (url.pathname === "/api/admin/lock" && request.method === "POST") {
    writeCookie(response, ADMIN_COOKIE_NAME, "", 0);
    sendJson(response, 200, { ok: true, canAccess: false, configured: hasAdminAuthConfig() });
    return;
  }

  if (url.pathname === "/api/chat-archive/access" && request.method === "GET") {
    const access = chatArchiveAccessState(request);
    sendJson(response, 200, { ok: true, ...access });
    return;
  }

  if (url.pathname === "/api/chat-archive/unlock" && request.method === "POST") {
    if (!hasChatArchiveAuthConfig()) {
      sendJson(response, 503, { ok: false, error: "chat archive auth not configured", configured: false });
      return;
    }
    try {
      const payload = await readBody(request);
      const password = typeof payload?.password === "string" ? payload.password : "";
      const passwordHash = hashSecret(password);
      const actualBuffer = Buffer.from(passwordHash);
      const expectedBuffer = Buffer.from(CHAT_ARCHIVE_PASSWORD_HASH);
      const matches =
        actualBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(actualBuffer, expectedBuffer);
      if (!matches) {
        sendJson(response, 401, { ok: false, error: "invalid password", configured: true });
        return;
      }
      writeCookie(response, CHAT_ARCHIVE_COOKIE_NAME, buildChatArchiveSessionToken(), CHAT_ARCHIVE_COOKIE_MAX_AGE);
      sendJson(response, 200, { ok: true, canAccess: true, configured: true });
      return;
    } catch {
      sendJson(response, 400, { ok: false, error: "invalid request body", configured: hasChatArchiveAuthConfig() });
      return;
    }
  }

  if (url.pathname === "/api/chat-archive/lock" && request.method === "POST") {
    writeCookie(response, CHAT_ARCHIVE_COOKIE_NAME, "", 0);
    sendJson(response, 200, { ok: true, canAccess: false, configured: hasChatArchiveAuthConfig() });
    return;
  }

  if (url.pathname === "/api/chat-archive" && request.method === "GET") {
    const access = chatArchiveAccessState(request);
    if (!access.canAccess) {
      sendJson(response, 403, { ok: false, error: "forbidden", ...access });
      return;
    }
    const archive = readChatArchiveStore();
    if (!archive) {
      sendJson(response, 404, { ok: false, error: "not found" });
      return;
    }
    sendJson(response, 200, { ok: true, archive });
    return;
  }

  if (url.pathname === "/api/comments") {
    await handleComments(request, response, url);
    return;
  }

  if (url.pathname === "/api/entries" && request.method === "GET") {
    sendJson(response, 200, {
      ok: true,
      entries: readEntryStore()
        .entries.map((entry) => sanitizeEntryForClient(entry, request))
        .filter(Boolean)
    });
    return;
  }

  if (url.pathname === "/api/entries" && request.method === "PUT") {
    if (!hasAdminSession(request)) {
      sendJson(response, 403, { ok: false, error: "admin auth required" });
      return;
    }
    try {
      const payload = await readBody(request);
      if (!Array.isArray(payload?.entries)) {
        sendJson(response, 400, { ok: false, error: "entries array is required" });
        return;
      }
      writeEntryStore({ entries: payload.entries });
      sendJson(response, 200, { ok: true, count: readEntryStore().entries.length });
      return;
    } catch {
      sendJson(response, 400, { ok: false, error: "invalid request body" });
      return;
    }
  }

  if (url.pathname === "/api/entries/unlock" && request.method === "POST") {
    try {
      const payload = await readBody(request);
      const entryId = sanitizeText(payload?.entryId, 120);
      const password = typeof payload?.password === "string" ? payload.password : "";
      const entry = getEntryById(entryId);
      if (!entry) {
        sendJson(response, 404, { ok: false, error: "entry not found" });
        return;
      }
      if (!entry.isPrivate) {
        sendJson(response, 200, { ok: true, entry: sanitizeEntryForClient(entry, request) });
        return;
      }
      const passwordHash = hashSecret(password);
      const actualBuffer = Buffer.from(passwordHash);
      const expectedBuffer = Buffer.from(String(entry.privatePasswordHash || ""));
      const matches =
        actualBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(actualBuffer, expectedBuffer);
      if (!matches) {
        sendJson(response, 401, { ok: false, error: "invalid password" });
        return;
      }
      const nextIds = [...readPrivateEntryAccessIds(request), entry.id];
      appendCookie(
        response,
        PRIVATE_ENTRY_ACCESS_COOKIE_NAME,
        buildPrivateEntryAccessToken(nextIds),
        PRIVATE_ENTRY_ACCESS_COOKIE_MAX_AGE
      );
      sendJson(response, 200, { ok: true, entry: sanitizeEntryForAccess(entry, true) });
      return;
    } catch {
      sendJson(response, 400, { ok: false, error: "invalid request body" });
      return;
    }
  }

  const urlPath = url.pathname === "/" ? "/index.html" : url.pathname;
  if (urlPath.startsWith("/data/")) {
    sendJson(response, 404, { ok: false, error: "not found" });
    return;
  }
  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    sendJson(response, 403, { ok: false, error: "forbidden" });
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      sendJson(response, error.code === "ENOENT" ? 404 : 500, {
        ok: false,
        error: error.code === "ENOENT" ? "not found" : "server error"
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(content);
  });
});

server.listen(PORT, HOST, () => {
  ensureCommentsFile();
  ensureEntriesFile();
  ensureVisitCounterFile();
  ensureMbtiStatsFile();
  console.log(`Memento Mori Archive listening on http://${HOST}:${PORT}`);
});
