const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const http = require("http");

const ROOT = __dirname;
const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 4318);
const DATA_FILE = path.join(ROOT, "comments-data.json");
const ADMIN_DELETE_KEY = process.env.ADMIN_DELETE_KEY || "admin-delete-key";

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

function ensureDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ comments: [] }, null, 2));
  }
}

function readStore() {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function writeStore(store) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
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
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

function sanitizeBody(value, maxLength) {
  return String(value || "")
    .trim()
    .replace(/\r\n/g, "\n")
    .slice(0, maxLength);
}

function listComments(entryKey) {
  const store = readStore();
  return store.comments
    .filter((comment) => comment.entryKey === entryKey)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map(({ passwordHash, ...safeComment }) => safeComment);
}

async function handleComments(request, response, url) {
  if (request.method === "GET") {
    const entryKey = sanitizeText(url.searchParams.get("entry"), 120);
    if (!entryKey) {
      sendJson(response, 400, { ok: false, error: "entry is required" });
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

      const store = readStore();
      const comment = {
        id: crypto.randomUUID(),
        entryKey,
        nickname,
        body,
        passwordHash: hashSecret(password),
        createdAt: new Date().toISOString()
      };

      store.comments.push(comment);
      writeStore(store);
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
      const adminKey = sanitizeText(payload.adminKey, 128);

      if (!commentId) {
        sendJson(response, 400, { ok: false, error: "commentId is required" });
        return;
      }

      const store = readStore();
      const index = store.comments.findIndex((comment) => comment.id === commentId);

      if (index === -1) {
        sendJson(response, 404, { ok: false, error: "comment not found" });
        return;
      }

      const target = store.comments[index];
      const passwordMatches = password && hashSecret(password) === target.passwordHash;
      const adminMatches = adminKey && adminKey === ADMIN_DELETE_KEY;

      if (!passwordMatches && !adminMatches) {
        sendJson(response, 403, { ok: false, error: "invalid password or admin key" });
        return;
      }

      store.comments.splice(index, 1);
      writeStore(store);
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

  if (url.pathname === "/api/comments") {
    await handleComments(request, response, url);
    return;
  }

  const urlPath = url.pathname === "/" ? "/index.html" : url.pathname;
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
  ensureDataFile();
  console.log(`Memento Mori Archive listening on http://${HOST}:${PORT}`);
});
