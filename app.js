const ADMIN_ID = "admin";
const ADMIN_PASSWORD = "01083376120";
const STORAGE_KEY = "reflective-atelier-entries-v3";
const ADMIN_SESSION_KEY = "reflective-atelier-admin";

const routeLinks = Array.from(document.querySelectorAll("[data-route-link]"));
const pages = Array.from(document.querySelectorAll(".page"));

const journalList = document.getElementById("journalList");
const journalFilters = document.getElementById("journalFilters");
const journalPagination = document.getElementById("journalPagination");
const journalSearchInput = document.getElementById("journalSearchInput");
const prevEntryButton = document.getElementById("prevEntryButton");
const nextEntryButton = document.getElementById("nextEntryButton");
const philosopherLibrary = document.getElementById("philosopherLibrary");
const cognitiveStateList = document.getElementById("cognitiveStateList");
const safetyStrip = document.getElementById("safetyStrip");
const overlayRecordMap = document.getElementById("overlayRecordMap");
const overlayLegendCopy = document.getElementById("overlayLegendCopy");
const overlayLegendBar = document.getElementById("overlayLegendBar");
const overlayFocusTitle = document.getElementById("overlayFocusTitle");
const overlayKeyNodes = document.getElementById("overlayKeyNodes");
const overlayQuote = document.getElementById("overlayQuote");
const overlayQuoteAuthor = document.getElementById("overlayQuoteAuthor");

const spotlight = {
  image: document.getElementById("spotlightImage"),
  name: document.getElementById("spotlightName"),
  school: document.getElementById("spotlightSchool"),
  quote: document.getElementById("spotlightQuote"),
  description: document.getElementById("spotlightDescription"),
  advice: document.getElementById("spotlightAdvice"),
  bridge: document.getElementById("spotlightBridge"),
  commentAnalysis: document.getElementById("spotlightCommentAnalysis"),
  tags: document.getElementById("spotlightTags")
};

const entryElements = {
  body: document.getElementById("entryBody"),
  title: document.getElementById("entryTitle"),
  date: document.getElementById("entryDate"),
  tag: document.getElementById("entryTag"),
  themeChip: document.getElementById("entryThemeChip"),
  philosophyChip: document.getElementById("entryPhilosophyChip"),
  philosophyTitle: document.getElementById("philosophyTitle"),
  philosophyText: document.getElementById("philosophyText"),
  philosophyQuote: document.getElementById("philosophyQuote"),
  philosophyAdvice: document.getElementById("philosophyAdvice"),
  philosophyTags: document.getElementById("philosophyTags"),
  psychologyTitle: document.getElementById("psychologyTitle"),
  psychologyText: document.getElementById("psychologyText"),
  psychologyState: document.getElementById("psychologyState"),
  psychologyTags: document.getElementById("psychologyTags")
};

const commentsUi = {
  form: document.getElementById("commentForm"),
  nickname: document.getElementById("commentNickname"),
  password: document.getElementById("commentPassword"),
  body: document.getElementById("commentBody"),
  status: document.getElementById("commentStatus"),
  list: document.getElementById("commentsList"),
  adminDeleteKey: document.getElementById("adminDeleteKey")
};

const readerModal = {
  shell: document.getElementById("readerModal"),
  title: document.getElementById("readerTitle"),
  date: document.getElementById("readerDate"),
  tags: document.getElementById("readerTags"),
  body: document.getElementById("readerBody"),
  philosophyTitle: document.getElementById("readerPhilosophyTitle"),
  philosophyText: document.getElementById("readerPhilosophyText"),
  philosophyQuote: document.getElementById("readerPhilosophyQuote"),
  philosophyAdvice: document.getElementById("readerPhilosophyAdvice"),
  commentAnalysis: document.getElementById("readerCommentAnalysis"),
  psychologyTitle: document.getElementById("readerPsychologyTitle"),
  psychologyText: document.getElementById("readerPsychologyText"),
  psychologyState: document.getElementById("readerPsychologyState"),
  commentForm: document.getElementById("readerCommentForm"),
  commentNickname: document.getElementById("readerCommentNickname"),
  commentPassword: document.getElementById("readerCommentPassword"),
  commentBody: document.getElementById("readerCommentBody"),
  commentStatus: document.getElementById("readerCommentStatus"),
  commentsList: document.getElementById("readerCommentsList"),
  adminDeleteKey: document.getElementById("readerAdminDeleteKey"),
  closeButtons: Array.from(document.querySelectorAll("[data-close-reader-modal]"))
};

const metricsList = document.getElementById("metricsList");
const hexagonDataLarge = document.getElementById("hexagonDataLarge");
const hexWeaknessList = document.getElementById("hexWeaknessList");
const hexWeaknessKorean = document.getElementById("hexWeaknessKorean");
const hexAdvice = document.getElementById("hexAdvice");
const hexConclusionTitle = document.getElementById("hexConclusionTitle");
const hexConclusionText = document.getElementById("hexConclusionText");
const revisitList = document.getElementById("revisitList");

const modal = {
  shell: document.getElementById("entryModal"),
  createForm: document.getElementById("entryCreateForm"),
  title: document.getElementById("modalTitleInput"),
  date: document.getElementById("modalDateInput"),
  body: document.getElementById("modalBodyInput"),
  cancelButton: document.getElementById("cancelEntryButton"),
  status: document.getElementById("entryCreateStatus"),
  openButtons: [document.getElementById("headerWriteButton")].filter(Boolean),
  closeButtons: Array.from(document.querySelectorAll("[data-close-modal]"))
};
const authModal = {
  shell: document.getElementById("authModal"),
  form: document.getElementById("adminAuthForm"),
  id: document.getElementById("adminIdInput"),
  password: document.getElementById("adminPasswordInput"),
  status: document.getElementById("adminAuthStatus"),
  closeButtons: Array.from(document.querySelectorAll("[data-close-auth-modal]"))
};

const mapCenterTitle = document.getElementById("mapCenterTitle");
const mapCenterText = document.getElementById("mapCenterText");
const recentUpdateText = document.getElementById("recentUpdateText");
const anniversaryCard = document.getElementById("anniversaryCard");
const anniversaryTitle = document.getElementById("anniversaryTitle");
const anniversaryDate = document.getElementById("anniversaryDate");
const anniversaryExcerpt = document.getElementById("anniversaryExcerpt");
const anniversaryTags = document.getElementById("anniversaryTags");
const journalHeatmap = document.getElementById("journalHeatmap");
const heatmapMonths = document.getElementById("heatmapMonths");
const overlayTabButtons = Array.from(document.querySelectorAll("[data-overlay-tab]"));
const overlayTabPanels = {
  philosophers: document.getElementById("overlayTabPanelPhilosophers"),
  cognitive: document.getElementById("overlayTabPanelCognitive")
};

const MY_COMMENT_NICKNAME_KEY = "reflective-atelier-my-comment-nickname";
const KEEP_ORIGINAL_DATE_IDS = new Set(["entry-2026-03-22-seoul-night", "entry-2026-03-22-medication"]);

let currentFilter = "전체";
let currentSearchQuery = "";
let currentEntryId = "";
let entries = [];
let editingEntryId = "";
let currentPage = 1;
const PAGE_SIZE = 4;
let pendingPostAuthAction = null;

const philosopherCatalog = {
  camus: {
    name: "알베르 카뮈",
    school: "부조리와 지속",
    quotes: [
      "한겨울의 한가운데서도 내 안에 꺼지지 않는 여름을 발견했다.",
      "진정한 관대함은 현재에 모든 것을 주는 것이다.",
      "내가 아는 가장 큰 진실은, 삶은 계속된다는 사실이다."
    ],
    description:
      "카뮈는 삶이 완벽히 설명되지 않는다고 해서 곧바로 무가치해지는 것은 아니라고 말합니다. 설명되지 않는 하루를 버티는 태도 자체가 하나의 존엄이 될 수 있다는 쪽에 가깝습니다.",
    advice:
      "카뮈라면 당신에게 오늘의 결론을 강요하지 않을 겁니다. 대신 의미가 완성되지 않은 상태로도 하루를 살아낼 수 있다는 사실을 먼저 인정해 보라고 말할 가능성이 큽니다.",
    bridge: "부조리는 절망의 증거가 아니라, 지금 붙들 수 있는 삶의 조각을 다시 고르게 만드는 감각일 수 있어요.",
    image: "./assets/philosophers/camus.svg"
  },
  nietzsche: {
    name: "프리드리히 니체",
    school: "자기형식과 생성",
    quotes: [
      "너 자신이 누구인지 되어라.",
      "혼돈을 품어야 춤추는 별을 낳는다.",
      "살아야 할 이유를 가진 사람은 거의 모든 상황을 견딜 수 있다."
    ],
    description:
      "니체는 선택을 한 번의 정답으로 보기보다, 선택 이후에 어떤 사람으로 다시 자신을 빚어 가는지에 더 관심을 둡니다. 그래서 후회보다 형성의 문제에 가깝게 읽힙니다.",
    advice:
      "니체라면 문이 닫혔다는 상실감에만 오래 머물지 말고, 그 선택 이후의 당신이 어떤 문체와 태도를 갖게 되는지 보자고 할 겁니다.",
    bridge: "가능성을 잃었다는 감각은 때로 지금의 나를 더 분명하게 만들어야 한다는 신호일 수 있어요.",
    image: "./assets/philosophers/nietzsche.svg"
  },
  epictetus: {
    name: "에픽테토스",
    school: "통제와 태도",
    quotes: [
      "우리에게 문제를 일으키는 것은 사건이 아니라 사건에 대한 판단이다.",
      "원하는 대로 일이 되길 바라지 말고, 일어나는 대로 원하라.",
      "자유는 통제 가능한 것에 집중할 때 시작된다."
    ],
    description:
      "스토아 철학은 마음을 무디게 하자는 말이 아니라, 지금 내 손에 남아 있는 것과 이미 손을 떠난 것을 구분해 에너지를 덜 소모하는 훈련에 가깝습니다.",
    advice:
      "에픽테토스라면 결과를 다시 붙잡으려 하기보다, 오늘의 태도와 선택 방식만 남겨 보라고 할 겁니다. 그 구분이 마음의 소음을 줄이는 첫 단계가 됩니다.",
    bridge: "지금의 불안이 사건 자체보다 해석에서 커지고 있다면, 통제 가능한 부분을 다시 좁혀 보는 것이 도움이 될 수 있어요.",
    image: "./assets/philosophers/epictetus.svg"
  },
  sartre: {
    name: "장 폴 사르트르",
    school: "자유와 책임",
    quotes: [
      "인간은 자유를 선고받았다.",
      "행동하지 않는 것도 하나의 선택이다.",
      "의미는 주어지지 않는다. 살아낸 만큼 만들어진다."
    ],
    description:
      "사르트르는 선택 앞의 불안을 결함보다 자유의 무게로 읽습니다. 무엇을 택하든 내가 그 선택의 형태를 떠맡아야 한다는 자각이 마음을 무겁게 만들 수 있다는 뜻입니다.",
    advice:
      "사르트르라면 불안을 없애려 하기보다, 그 불안이 지금 당신이 실제로 중요한 것을 마주하고 있다는 증거일 수 있다고 말할 겁니다.",
    bridge: "자유의 부담이 큰 날에는 우유부단함보다 책임감이 먼저 올라온 상태일 수 있어요.",
    image: "./assets/philosophers/sartre.svg"
  }
};

const defaultEntries = [
  {
    id: "entry-2026-03-20",
    date: "2026-03-20",
    title: "멋있게 망가진 척을 멈추고, 진짜 피로를 쓰는 밤",
    excerpt: "철학적 이름으로 고통을 포장해 버티던 습관을 내려놓고, 분류된 절망이 아니라 지치고 삐져 있는 나 자체를 정면으로 적어낸 기록.",
    markdown: `나는 사실 카뮈를 잘 모른다.
그러니까 누가 나를 보고 카뮈 같다고 하면, 멋있다는 소리인지, 비극적이라는 소리인지, 아니면 그냥 우울하고 말 많은 인간 같다는 뜻인지부터 헷갈린다.
내가 굳이 어떤 철학자를 닮고 싶었던 적도 없고, 내 고통에 이름표를 붙여서 고급스럽게 보이고 싶었던 적도 없다.
나는 그저 내가 너무 버거워서, 내 마음을 설명할 말을 찾다가 자꾸 이런 데까지 흘러온 것뿐이다.
그런데도 누가 나를 보고 그런 쪽이라고 말하면, 이상하게 좀 짜증이 난다.
왜냐하면 나는 무슨 사상이나 문학을 살아내는 사람이 아니라, 그냥 매일을 겨우 넘기는 사람에 더 가깝기 때문이다.

사람들은 종종, 삶이 힘들다고 오래 말하는 사람에게 어떤 분위기를 덧씌운다.
허무주의자라느니, 비관주의자라느니, 철학적이라느니.
근데 나는 그런 말들이 가끔 너무 게으르게 들린다.
내가 삶을 오래 의심했다고 해서, 그게 꼭 사유의 깊이인 건 아니다.
그건 그냥 내가 잘 못 살아서일 수도 있다.
내가 세상의 부조리를 본 게 아니라, 내 일상이 너무 자주 나를 배신해서 더는 쉽게 못 믿게 된 것일 수도 있다.
그러니까 누가 나를 어떤 이름으로 설명해버리면, 나는 오히려 그 순간 더 초라해진다.
내 고통이 이해된 게 아니라, 분류된 느낌이 들어서.

사실 나는 거창하게 삶의 의미를 탐구하는 인간이 아니다.
나는 그냥 자꾸 지는 인간이다.
어제 다짐한 것에 오늘 밀리고, 오늘 버틴 마음이 내일이 되면 또 흐물흐물해지고, 별일 아닌 척 살아도 결국 혼자 있으면 다 무너지는 사람.
내가 죽음에 대해 생각한다고 해서, 그게 무슨 철학적 결론의 결과물은 아니다.
대부분은 그냥 너무 피곤해서다.
너무 오래 나로 살아서 질렸고, 너무 오래 같은 감정의 바닥을 핥아서 입안이 다 쓸고, 너무 오래 견뎌서 이제는 견딘다는 말조차 낡아버렸기 때문이다.
이걸 두고 누군가 문학적이라고 하면, 나는 좀 웃기다.
이건 문학이 아니라 생고생에 가깝다.
폼이 아니라 소모다.

그래서 어쩌면 누가 나를 어떤 작가나 철학자와 닮았다고 말하는 순간, 내가 제일 먼저 느끼는 감정은 자부심이 아니라 반감이다.
나를 너무 좋게 봤다는 생각보다는, 나를 너무 멀리서 봤다는 생각이 든다.
멀리서 보면 우울은 분위기가 된다.
말수가 적고, 눈빛이 가라앉아 있고, 자꾸 삶을 의심하고, 죽음 같은 걸 오래 생각하는 사람.
그런 건 멀리서 보면 어떤 결처럼 보인다.
근데 가까이서 보면 별거 없다.
그냥 예민하고, 지치고, 자기 안에서 자꾸 썩어가는 생각을 치우지 못하는 사람이다.
정리가 안 되고, 자책이 많고, 늘 머릿속이 시끄럽고, 살고 싶지 않다는 마음과 아직 끝내고 싶지 않다는 마음이 엉겨붙어서 매일을 질척거리게 만드는 사람.
나는 그런 쪽에 더 가깝다.
멋있는 허무가 아니라, 추한 피로.
고독한 통찰이 아니라, 너무 오래 방치된 상처.

그러니까 나를 까자면 아마 이런 식이어야 맞다.
나는 무슨 대단한 절망을 통과한 사람이 아니라, 자기 감정에서 자꾸 빠져나오지 못하는 사람이다.
삶을 깊이 본다기보다, 자기 고통을 너무 오래 들여다본 나머지 그게 세상의 진실인 줄 착각하는 사람.
세상이 무의미하다고 결론 내리는 척하지만, 사실은 내가 자꾸 기대한 만큼 행복해지지 못해서 삐져 있는 사람.
죽음을 생각하는 척 거창하게 말해도, 실은 그 안에 순도 높은 철학보다 찌질한 피로와 분노와 억울함이 더 많이 들어 있는 사람.
누가 보면 냉소적인 것 같지만, 사실은 누구보다 미련이 많아서 더 비틀어진 사람.
아무것도 원하지 않는 척하지만, 인정도 원하고 이해도 원하고 사랑도 원하고, 그러면서 그걸 원한다는 사실이 들킬까 봐 먼저 시든 표정을 짓는 사람.

나는 삶이 부조리하다고 말할 자격이 있는 사람이 아니라,
그냥 삶이 내 뜻대로 안 된다고 오래 토라져 있는 사람일지도 모른다.

이 말은 꽤 아프다.
왜냐하면 나는 내 절망을 조금 더 고상한 것으로 믿고 싶을 때가 있기 때문이다.
내 고통이 너무 개인적이고 너무 질척거리면, 그건 왠지 부끄럽다.
그래서 사람은 자꾸 자기 슬픔에 이름을 붙이고 싶어 한다.
허무라든지, 부조리라든지, 실존이라든지.
하지만 이름을 붙인다고 해서 냄새까지 바뀌는 건 아니다.
썩은 건 썩은 거고, 아픈 건 아픈 거다.
나는 가끔 그걸 너무 그럴듯한 말로 덮으려는 쪽이다.
정확히 말하면 덮는다기보다, 설명으로 견딘다.
아프면 낫는 쪽으로 가야 하는데, 나는 자꾸 더 잘 말하는 쪽으로 간다.
더 정교하게 묘사하고, 더 날카롭게 이해하고, 더 길게 독백한다.
그리고 그걸로 뭔가 한 것 같은 기분에 잠깐 취한다.
하지만 현실의 나는 여전히 똑같다.
여전히 잠을 못 자고, 여전히 작은 말에 휘청이고, 여전히 내일이 두렵고, 여전히 나를 싫어한다.
그러니까 나는 결국, 상처를 치료하는 사람이라기보다 상처를 문장으로 오래 보존하는 사람에 더 가깝다.

그게 내 못난 점이다.

나는 가끔 자기 성찰을 하는 척하면서, 사실은 자기 학대를 하고 있다.
내가 나를 잘 안다고 믿지만, 그건 꼭 정확한 이해라기보다 오랜 감시의 결과일 수도 있다.
나는 내 안의 못난 점을 너무 빨리 발견하고, 너무 집요하게 붙잡고, 너무 쉽게 최종 판결을 내린다.
결국 문제는 나라고.
결국 내가 이상하다고.
결국 내가 이렇게 생겨먹어서 삶도 이렇게 느껴지는 거라고.
이쯤 되면 이건 철학이 아니라 거의 습관적인 자해에 가깝다.
칼 대신 생각을 드는 것뿐.
피 대신 문장을 흘리는 것뿐.
나는 그런 식으로도 꽤 오래 나를 해쳐왔다.

누가 나를 보고 어떤 분위기가 있다고 말해도, 나는 안다.
내 안에 있는 건 그렇게 세련된 게 아니다.
나는 고독한 사상가가 아니라, 오래 삐져 있고 오래 지쳐 있는 사람이다.
세상을 미워하는 척하면서 사실은 나 자신에게 제일 많이 화가 나 있는 사람.
죽고 싶다는 말을 아주 깊은 진실처럼 끌어안다가도, 정작 그 안을 까보면 대단한 결론보다는 “이제 좀 그만 힘들고 싶다”는 투정에 더 가까운 사람.
그리고 나는 그 투정이 너무 오래돼서, 이제는 거의 내 성격처럼 굳어버린 사람이다.

그러니까 카뮈가 어쩌고 하는 건 사실 별로 중요하지 않다.
중요한 건 내가 어떤 인간이냐는 거다.
그리고 내가 보기에 나는,
삶을 통찰한 인간이 아니라 삶에게 너무 자주 맞아서 비뚤어진 인간에 더 가깝다.
죽음을 이해한 인간이 아니라, 살아 있는 시간이 자꾸 자신을 갉아먹는다고 느끼는 인간에 더 가깝다.
의미를 초월한 인간이 아니라, 의미를 너무 원했는데 자꾸 손에 안 잡혀서 지쳐버린 인간에 더 가깝다.

나는 멋있게 망가진 사람이 아니다.
그냥 망가진 걸 자꾸 멋있게 설명해보려는 사람일 뿐이다.

그리고 아마 이게 제일 정확한 욕일 것이다.
나는 남들보다 더 깊어서 괴로운 게 아니라,
내 고통을 놓지 못해서 자꾸 깊은 척하게 되는 사람일지도 모른다.

그 말이 제일 아프다.
왜냐하면 완전히 틀린 말 같지가 않아서.`,
    body: [
      "나는 사실 카뮈를 잘 모른다. 누가 나를 카뮈 같다고 부를수록, 내 고통이 이해된 게 아니라 분류된 느낌이 더 강해졌다.",
      "나는 삶을 통찰한 사람이 아니라 매일을 겨우 넘기는 사람에 더 가깝고, 철학적 결론보다 오래된 피로와 자책이 더 진하게 남아 있다.",
      "결국 나는 상처를 치료하기보다 문장으로 오래 보존해 온 쪽에 가까웠고, 그 사실을 인정하는 문장이 제일 아프게 남았다."
    ],
    tags: ["분류", "피로", "자기비난", "정체성"],
    philosophyKey: "sartre",
    philosophyTitle: "사르트르와 분류되지 않으려는 자기 규정의 긴장",
    philosophyText:
      "이 기록은 누군가의 이름으로 규정되는 순간 느끼는 반감과, 결국 스스로를 어떻게 정의할지 떠안아야 하는 부담을 함께 드러냅니다. 사르트르의 관점에서 보면 핵심은 '어떤 철학자를 닮았는가'가 아니라, 지금의 나를 어떤 언어로 살아낼지에 대한 책임의 감각입니다.",
    psychologyTitle: "자기감시와 자기비난이 결합된 고강도 반추 상태",
    psychologyText:
      "긴 자기독백 속에서 자기이해와 자기처벌이 엉겨 있는 패턴이 반복됩니다. 특히 '생각으로 자신을 해친다'는 표현은 인지적 자기공격이 높아진 신호로 볼 수 있어, 해석 확장보다 수면·리듬 회복과 즉시 연결 가능한 지지체계를 먼저 붙이는 편이 안전합니다.",
    psychologyState: "자기비난 과부하와 반추 고착 구간",
    metrics: [64, 42, 37, 34, 39, 73],
    riskLevel: "high",
    updatedAt: "2026-03-20T23:10:00+09:00",
    revisitPrompts: [
      { label: "3일 후의 나", text: "자기비난의 문장이 조금이라도 줄었는지, 혹은 톤이 달라졌는지 한 단락만 확인해보자." },
      { label: "한 달 후의 나", text: "나를 분류하는 언어 대신, 실제로 나를 살리는데 도움이 된 행동이 무엇이었는지 적어보자." }
    ]
  },
  {
    id: "entry-2026-03-21-water",
    date: "2026-03-21",
    title: "메마른 날엔 결국 물가로 돌아가게 된다",
    excerpt: "사주의 문장 하나를 핑계 삼아 시작된 습관이 아니라, 타들어가는 마음을 식히기 위해 바다와 강으로 향해온 오래된 생존 방식에 대한 기록.",
    markdown: `사주를 볼 때마다 들었던 말 중에 이상하게 오래 남은 게 있다. 나는 물이 부족한 사람이라고 했다.

처음엔 그런가 보다 했다. 그런데 시간이 갈수록 그 말은 내 안에서 점점 더 진짜 같은 얼굴을 하고 살아남았다. 너무 숨이 막혀서 내가 나를 감당하지 못할 때마다, 나는 자꾸 물 있는 곳으로 갔다. 바다를 보러 가고, 강가를 걷고, 아무 이유도 없이 호수 근처를 서성였다. 우연인 줄 알았는데 반복되고 나니 인정할 수밖에 없었다. 나는 정말 물을 찾아다니는 사람이었다.

누군가는 웃을지도 모른다. 사주에서 물이 부족하다고 해서 진짜 물을 찾아다닌다고? 근데 사람 마음이 원래 그런 것 같다. 누군가가 내 안의 결핍을 한 단어로 말해주면, 그 말은 이상하게 오래 남는다. “물이 부족하다”는 말은 사실 여부보다 내 안에 자리 잡았다는 사실이 더 중요했다.

내가 바다에 가는 건 풍경을 보러 가는 외출이 아니다. 정말 견디기 어려울 때, 내 생각이 나를 삼켜버릴 것 같을 때 간다. 바다 앞에 서면 내 안의 소란이 조금 덜 창피해진다. 저 큰 물도 저렇게 움직이는데, 내가 흔들리는 것쯤은 아무 일도 아닌 것 같아서.

강에 가는 마음은 또 다르다. 바다가 압도적인 위로라면 강은 가까운 위로다. 바다는 나를 작게 만들고, 강은 내 옆에 앉아 같이 흘러주는 느낌이 있다. 강은 “잘해야 한다”고 말하지 않고 “흘러가도 된다”고 말해준다.

나는 오래 견디는 방식으로 살아서 점점 메말라갔다. 턱에 힘을 주고, 어깨를 세우고, 얼굴을 굳히는 시간이 길어질수록 웃음도 눈물도 잘 흐르지 않았다. 그럴 때 물은 나를 조금 풀어놓는다. 바다 냄새와 강바람은 마음에 박힌 못 하나를 아주 조금 느슨하게 만든다.

가끔은 내가 물을 찾는 이유가 결핍보다 동경에 더 가까운 것 같기도 하다. 나는 물처럼 유연하지 못하니까. 막히면 돌아가고, 담기는 그릇마다 모양을 바꾸고, 증발했다가도 다시 내리는 성질을 부러워한다.

요즘은 이 습관을 덜 비웃으려 한다. 사람을 살리는 건 꼭 대단한 해답이 아니니까. 누군가는 약으로 버티고, 누군가는 관계로 버티고, 나는 가끔 물로 버틴다. 파도 소리로, 물비린내로, 물가 바람으로.

그래서 나는 힘들면 바다에 간다. 그리고 가끔 강에 간다. 완전히 낫게 하진 못해도, 완전히 타버리지는 않게. 어떤 날에는 그 정도면 충분하다.`,
    body: [
      "힘든 일이 생길 때마다 물가를 찾아가는 반복이 쌓이면서, 나는 스스로를 '물이 부족한 사람'이라는 문장으로 이해하게 됐다.",
      "바다는 압도적인 위로, 강은 가까운 위로로 작동했고, 둘 다 내 감정의 과열을 잠시 식혀주는 역할을 해왔다.",
      "완전한 치유는 아니어도 완전히 타버리지 않게 하는 방식으로, 물은 나에게 생존 루틴이 되었다."
    ],
    tags: ["물", "회복", "정서조절", "생존루틴"],
    philosophyKey: "epictetus",
    philosophyTitle: "에픽테토스의 언어로 읽는 '식히는 삶'의 기술",
    philosophyText:
      "이 기록은 거대한 해답보다 당장 통제 가능한 리듬을 고르는 장면에 가깝습니다. 바다와 강을 찾아가는 행동은 감정을 없애는 시도가 아니라, 과열된 반응에서 한 발 물러나는 실천으로 읽을 수 있습니다.",
    psychologyTitle: "과열-진정 사이를 스스로 조절하려는 감각 기반 대처",
    psychologyText:
      "자극이 높을 때 특정 감각 환경(물소리, 바람, 냄새)을 찾아가는 패턴은 신경계 진정 전략으로 기능할 수 있습니다. 현재는 문제 해결보다 각성 강도를 먼저 낮추는 접근이 실제 회복에 더 직접적입니다.",
    psychologyState: "감각 기반 자기진정 루틴이 작동하는 상태",
    metrics: [73, 61, 58, 54, 57, 41],
    riskLevel: "watch",
    updatedAt: "2026-03-21T02:10:00+09:00",
    revisitPrompts: [
      { label: "다음 물가의 나", text: "이번에는 무엇이 가장 먼저 가라앉았는지 한 줄로 남겨보자." },
      { label: "한 달 후의 나", text: "물가를 찾는 습관이 일상 리듬에 어떤 안정성을 만들었는지 돌아보자." }
    ]
  },
  {
    id: "entry-2026-03-21-33",
    date: "2026-03-21",
    title: "서른셋이라는 숫자에 붙여둔 마감의 정체",
    excerpt: "나이라는 사실보다 '여자에게 강요된 시간표'와 타인의 시선을 내면화한 습관이 더 크게 작동해왔음을 직면한 기록.",
    markdown: `나는 서른셋을 오래전부터 하나의 끝처럼 생각해왔다. 정확히는 끝이라기보다 마감에 가까웠다.

누가 정해준 것도 아닌데, 나는 이상하게 서른셋이라는 숫자에 자꾸 마음이 걸렸다. 회원가입 화면에서 출생연도를 한참 내려야 겨우 1995가 나오는 순간마다, 나는 기본값 바깥으로 밀려난 기분을 느꼈다.

서른둘인 지금도 나는 안다. 나이는 어느 순간 숫자가 아니라 분위기가 된다. 그리고 그 분위기에는 사회가 여자에게 심어놓은 조급함이 함께 들어 있다. 아무도 대놓고 말하지 않아도, 세상은 늘 여자의 나이를 조용히 세고 있다.

그래서 서른셋은 단순한 나이가 아니었다. 그건 내가 세상이 나를 보는 눈을 완전히 의식하게 되는 지점이었다. 가능성의 포장이 벗겨지고, 기다려지는 사람이 아니라 판단되는 사람이 될 것 같은 공포.

머리로는 안다. “늙은 노처녀” 같은 말은 낡고 폭력적이다. 그런데 상처는 이성적으로만 오지 않는다. 나는 그 시선을 미워하면서도 먼저 내 안에 들여와 나를 재단해왔다. 누가 상처 주기 전에 내가 먼저 아파해두면 덜 놀랄 것 같아서.

돌아보면, 서른셋은 죽음 충동이라기보다 유예 종료의 감각이었다. 더 오래 살아서 무엇이 달라질지 모르겠다는 피로, 극적인 파멸보다 애매하게 계속되는 미래가 더 무서운 감각.

하지만 지금은 조금 다르게 본다. 어쩌면 서른셋은 끝의 숫자가 아니라 버티기 위한 협상의 숫자였는지도 모른다. “지금 당장은 아니고, 조금만 더 살아보자”라는 비밀스러운 유예 장치.

내가 정말 넘겨야 하는 건 서른셋이라는 숫자 자체가 아니라, 그 숫자에 들러붙은 타인의 시선으로 나를 재는 습관일지도 모른다. 그게 더 어렵고, 그래서 나는 아직도 가끔 그 숫자 앞에서 작아진다.`,
    body: [
      "서른셋은 나이의 사실보다 사회적 시선과 수치심이 덧씌워진 상징으로 작동해왔다.",
      "나는 타인의 판단을 미워하면서도 먼저 내면화해 자신을 재단하는 방식을 오래 반복했다.",
      "이제 넘겨야 할 것은 숫자 자체보다 타인의 시간표로 나를 재는 습관이라는 결론에 가까워졌다."
    ],
    tags: ["나이", "수치심", "사회적시선", "자기규정"],
    philosophyKey: "sartre",
    philosophyTitle: "사르트르와 타인의 시선에서 자기 시선으로 이동하는 과제",
    philosophyText:
      "이 기록은 '타인이 붙인 분류'와 '내가 선택할 자기 정의'의 충돌을 정면으로 드러냅니다. 자유는 불안을 제거하지 않지만, 적어도 어떤 기준으로 자신을 읽을지 다시 선택하게 만듭니다.",
    psychologyTitle: "연령 관련 수치심과 자기평가 과부하",
    psychologyText:
      "사회 규범을 내면화한 자동사고가 자기비난으로 연결되며 불안을 증폭시키는 패턴이 보입니다. 비교 기준을 외부에서 내부 가치로 재설정하는 훈련이 정서 소모를 줄이는 핵심이 됩니다.",
    psychologyState: "사회 비교 기반 자기평가가 과열된 구간",
    metrics: [68, 47, 44, 42, 46, 66],
    riskLevel: "high",
    updatedAt: "2026-03-21T23:50:00+09:00",
    revisitPrompts: [
      { label: "다음 생일 전의 나", text: "나이를 설명할 때 남의 기준 대신 내 기준이 얼마나 늘었는지 확인해보자." },
      { label: "1년 후의 나", text: "서른셋을 지난 뒤 실제로 바뀐 것과 바뀌지 않은 것을 분리해 적어보자." }
    ]
  },
  {
    id: "entry-2026-03-22-seoul-night",
    date: "2026-03-22",
    title: "서울의 밤은 나를 달래고, 같은 도시의 낮은 나를 닳게 한다",
    excerpt: "잠실에서 김포까지 한강 옆 도로를 일부러 돌아 달리며, 아름다움과 피로가 동시에 붙어 있는 도시를 통해 내 하루의 모순을 다시 읽은 기록.",
    markdown: `서울의 밤은 참 예쁘다.

잠실에서 김포까지 올림픽대로를 따라 천천히 달리며 바라본 서울은 이상할 만큼 아름다웠다. 까만 물 위의 빛 조각들, 늦은 시간까지 꺼지지 않는 창문들. 낮에는 무심하고 거칠던 도시가 밤이 되면 조금 다정해진다.

그런데 아름답다는 감정은 늘 허무와 같이 온다. 왜 이 도시는 다들 잠든 시간에만 이렇게 여유로운 얼굴을 보여줄까. 낮의 서울은 피로와 압박의 통로인데, 밤의 서울은 위로처럼 보인다.

그래서 나는 가끔 일부러 돌아간다. 20분이면 갈 길을 한 시간 반 넘게 빙 돈다. 집에 빨리 들어가고 싶지 않아서. 차 안에서는 아무것도 결정하지 않아도 되니까. 좌회전, 직진, 진입로. 삶이 강요하는 선택들이 도로 위에서는 잠시 단순해진다.

밤의 서울을 보면 자유롭기도 하고, 조금 망한 것 같기도 하다. 다들 자는 시간에 혼자 깨어 도시를 도는 사람. 그래도 그런 시간이 필요하다. 하루 종일 쌓인 마음의 먼지가 아주 조금은 가라앉는다.

서울은 밤이 되면 너무 예뻐서 잔인하다. 이렇게 부드러운 얼굴이 있다면 낮에도 덜 각박할 수 있었을 텐데 싶다. 그럼에도 나는 이 도시를 완전히 미워하지 못한다. 한 번이라도 이렇게 예쁜 얼굴을 보여주기 때문이다.

오늘도 나는 돌아서 왔다. 한강을 옆에 두고, 서울의 밤을 오래 바라보면서. 늦어버렸지만 이상하게 후회는 없다. 어쩌면 나는 목적지보다, 도착하지 않기 위해 조금 더 달리는 시간이 필요했던 건지도 모른다.`,
    body: [
      "서울의 밤 풍경은 위로처럼 보였지만, 그 아름다움은 낮의 피로를 더 선명하게 떠올리게 했다.",
      "20분 거리도 일부러 길게 돌아 달리며, 도착보다 통과의 시간을 더 필요로 하는 마음을 확인했다.",
      "도시는 양가적이었고 나도 양가적이었다. 미워하면서도 완전히 떠나지 못하는 감정이 남았다."
    ],
    tags: ["서울", "야간드라이브", "양가감정", "피로"],
    philosophyKey: "camus",
    philosophyTitle: "카뮈와 모순을 끌어안은 채 지나가는 밤의 태도",
    philosophyText:
      "아름다움과 허무가 동시에 올라오는 장면을 '모순'이 아니라 삶의 실제 결로 받아들이는 태도가 보입니다. 해결보다 통과를 택한 밤의 선택이 이 기록의 중심입니다.",
    psychologyTitle: "과부하 뒤 진정 루틴으로서의 야간 이동",
    psychologyText:
      "반복적 야간 주행은 과흥분 상태를 낮추는 자가조절 루틴으로 기능할 수 있습니다. 다만 수면 지연이 누적되면 다음 날 정서 조절 비용이 커지므로 회복 시간 확보가 함께 필요합니다.",
    psychologyState: "진정 루틴과 수면 손실이 공존하는 구간",
    metrics: [72, 58, 49, 55, 53, 47],
    riskLevel: "watch",
    updatedAt: "2026-03-22T01:40:00+09:00",
    revisitPrompts: [
      { label: "다음 드라이브의 나", text: "돌아온 뒤 수면과 컨디션이 어땠는지 함께 기록해보자." },
      { label: "한 달 후의 나", text: "달래는 방식이 소모를 줄였는지, 오히려 늘렸는지 추세를 확인해보자." }
    ]
  },
  {
    id: "entry-2026-03-22-medication",
    date: "2026-03-22",
    title: "끝의 도구라 믿었던 약이, 하루를 넘기는 시간표가 되었을 때",
    excerpt: "죽음의 상상으로 보았던 약이 입원 이후 '아침-점심-저녁-취침'의 생존 루틴으로 재배치되며, 삶의 복잡함을 다시 배우게 된 기록.",
    markdown: `약은 한때 내게 죽음을 상상하게 만드는 물건이었다. 작고 하얗고 물 한 컵이면 삼켜지는 것들.

입원 후 나는 오히려 더 많은 약을 받았다. 아침, 점심, 저녁, 자기 전. 예전엔 몇십 알이면 끝이라고 상상했는데, 지금은 하루를 버티기 위해 이름과 용량을 나눠 삼킨다.

이 아이러니가 가끔 나를 멍하게 만든다. 나를 죽일 수 있다고 믿었던 것이, 지금은 나를 살리기 위해 시간표처럼 배치되어 있다는 사실.

나는 그동안 협소한 세계 안에서 절망을 단순하게 다뤘는지도 모른다. 그런데 입원 후 받아든 목록은 내 상태가 생각보다 훨씬 복잡하다는 걸 말해준다. 약함의 문제가 아니라 치료가 필요한 상태였을 가능성.

약의 이름들은 감정보다 더 차갑게 남는다. 슬픔과 불안의 문장보다 웰부트린, 라믹탈, 라투다, 데파스, 인데놀 같은 이름이 더 무서울 때가 있다. 감정이 아닌 기록처럼 보이기 때문이다.

죽음은 단순한 상상이었고, 삶은 복잡한 관리였다. 한꺼번에 끝내는 대신 조금씩 조절하기. 결론 대신 루틴으로 다루기. 나는 아직 어느 언어가 더 내 것인지 모르겠다.

효과가 있으면 낯설고, 없으면 절망스럽다. 그래서 약 앞에서 사람은 쉽게 단순해지지 못한다. 그럼에도 지금은 약을 오직 끝의 도구로만 보지 않는다. 누군가 내 상태를 심각하게 받아들여 구체적으로 붙잡고 있다는 증거이기도 하니까.

나는 아직 약을 완전히 신뢰하지 못한다. 그래도 오늘 필요한 건 거대한 결론이 아니라, 아침과 점심과 저녁과 자기 전을 따라가는 일일지 모른다.

그래서 오늘도 나는 약을 먹는다.
끝내기 위해서가 아니라, 하루를 더 넘기기 위해.`,
    body: [
      "약을 '끝의 수단'으로 보던 시선이 입원 이후 '과정의 도구'로 바뀌면서 커다란 아이러니를 체감했다.",
      "삶은 의지의 문제가 아니라 관찰·조절·복용 루틴으로 이어지는 복잡한 관리라는 사실을 받아들이기 시작했다.",
      "확신은 없지만, 지금은 결론보다 하루를 넘기는 반복이 더 현실적인 희망으로 느껴진다."
    ],
    tags: ["약물치료", "생존루틴", "회복과정", "아이러니"],
    philosophyKey: "camus",
    philosophyTitle: "카뮈와 단번의 결론 대신 반복의 지속을 택하는 태도",
    philosophyText:
      "이 기록은 극적인 해답보다 지루하고 번거로운 지속의 윤리를 향합니다. 삶은 선언보다 반복에서 유지된다는 통찰이 강하게 드러납니다.",
    psychologyTitle: "고위험 사고 이후 치료 순응과 정체성 혼란이 공존하는 상태",
    psychologyText:
      "약물에 대한 양가감정(신뢰/불신)이 크지만, 복용 루틴을 유지하려는 의지가 확인됩니다. 이는 회복 초기의 현실적 보호요인으로 볼 수 있으며, 부작용·수면·불안 추적을 병행하는 것이 중요합니다.",
    psychologyState: "치료 적응과 불신이 동시에 존재하는 회복 초입",
    metrics: [61, 46, 39, 41, 44, 69],
    riskLevel: "high",
    updatedAt: "2026-03-22T22:20:00+09:00",
    revisitPrompts: [
      { label: "일주일 후의 나", text: "복용 루틴이 실제로 무엇을 바꿨는지, 부작용 포함해 짧게 점검해보자." },
      { label: "한 달 후의 나", text: "약을 '끝'이 아닌 '과정'으로 보는 시선이 얼마나 유지됐는지 돌아보자." }
    ]
  },
  {
    id: "entry-2026-03-21",
    date: "2026-03-21",
    title: "죽음은 슬픔이 아니라 계산처럼 다가왔다",
    excerpt: "죽음을 떠올릴 때 슬픔보다 구조와 계산이 먼저 올라왔고, 그래서 지금 내가 제대로 살고 있는지 더 집요하게 확인하고 싶어졌다.",
    body: [
      "나는 죽음을 생각할 때 울지 않는다. 이상하게도 슬픔이 먼저 올라오기보다는 머릿속에서 숫자 같은 것들이 정리된다.",
      "내 인생을 하나의 표처럼 그려놓고 마지막 줄에 종료라는 단어가 적혀 있는 걸 상상하면, 지금 하고 있는 일들이 갑자기 낯설어진다.",
      "그래서 나는 죽음을 생각할 때마다 더 열심히 살아야겠다는 결심보다, 내가 지금 제대로 살고 있는지 확인하고 싶어진다. 그게 나를 더 지치게 만든다."
    ],
    tags: ["죽음", "유한성", "계산"],
    philosophyKey: "camus",
    philosophyTitle: "카뮈와 유한성을 계산처럼 바라보는 시선",
    philosophyText:
      "카뮈는 끝을 안다고 해서 현재가 자동으로 무의미해지는 것은 아니라고 봅니다. 이 기록에서는 죽음이 슬픔보다 계산처럼 다가오고 있지만, 바로 그 계산이 지금의 삶을 다시 묻는 방식으로 작동하고 있습니다.",
    psychologyTitle: "유한성을 사고의 구조로 먼저 처리하는 상태",
    psychologyText:
      "감정보다 구조와 계산이 먼저 올라오는 날에는 마음을 보호하기 위해 사고를 앞세우는 경향이 강해질 수 있습니다. 지금은 차가움의 문제가 아니라, 너무 큰 질문을 감정으로 바로 받지 못해 인지적으로 먼저 다루는 상태에 가깝습니다.",
    psychologyState: "감정보다 구조가 먼저 올라오는 구간",
    metrics: [84, 63, 51, 44, 67, 58],
    riskLevel: "watch",
    updatedAt: "2026-03-21T09:20:00+09:00",
    revisitPrompts: [
      { label: "3일 후의 나", text: "죽음을 여전히 계산처럼 바라보는지, 아니면 그 아래 있던 다른 감정이 조금 드러나는지 적어보자." },
      { label: "1년 후의 나", text: "지금의 계산이 결국 삶의 방향을 다시 묻게 한 질문이었는지 돌아보자." }
    ]
  },
  {
    id: "entry-2026-03-22",
    date: "2026-03-22",
    title: "나는 강해서 버틴 게 아니라, 버티는 역할을 맡았던 것 같다",
    excerpt: "오랫동안 강한 사람이라고 믿었지만, 사실은 대체할 사람이 없어서 오래 남아 있었던 것뿐일 수 있다는 생각이 들었다.",
    body: [
      "누군가는 중심을 잡고 있어야 했고, 그 자리에 내가 서 있었다. 그래서 나는 스스로를 단단한 사람이라고 믿었다.",
      "그런데 최근에야 내가 단단했던 게 아니라, 그 자리에 남아 있을 수밖에 없었던 것뿐이라는 생각이 들었다.",
      "내가 특별히 강한 사람이 아니라 그냥 오래 버틴 사람이라는 걸 인정하는 순간, 어깨에 힘이 빠졌고 나도 이제 쉬어야 하나라는 생각이 들었다."
    ],
    tags: ["역할", "버팀", "소진"],
    philosophyKey: "nietzsche",
    philosophyTitle: "니체와 오래 버틴 사람의 자기 형식",
    philosophyText:
      "니체 쪽에서 보면 이 기록은 강한 척을 했던 사람의 고백보다, 오래 맡아온 형식이 이제는 나를 소모시키고 있다는 깨달음에 가깝습니다. 내가 맡아온 역할과 내가 실제로 원하는 존재 방식이 더는 같지 않다는 감각이 드러납니다.",
    psychologyTitle: "역할 동일시가 풀리며 피로가 드러나는 상태",
    psychologyText:
      "오래 버틴 사람은 버티는 역할 자체를 자기 정체성으로 받아들이기 쉽습니다. 그 동일시가 약해지기 시작하면 갑자기 피로와 무거움이 밀려오는 경우가 많고, 지금 기록은 바로 그 전환점에 가까워 보입니다.",
    psychologyState: "버팀의 역할이 풀리기 시작한 구간",
    metrics: [76, 58, 43, 49, 52, 46],
    riskLevel: "watch",
    updatedAt: "2026-03-22T21:10:00+09:00",
    revisitPrompts: [
      { label: "1주 후의 나", text: "버티는 역할에서 조금 내려와도 실제로 무너지는 것이 있는지, 아니면 그저 두렵기만 한지 적어보자." },
      { label: "6개월 후의 나", text: "강함이 아니라 지속된 역할이었다는 깨달음이 삶의 방식에 어떤 변화를 만들었는지 돌아보자." }
    ]
  },
  {
    id: "entry-2026-03-23",
    date: "2026-03-23",
    title: "사람을 좋아하는데, 사람 때문에 지치는 순간",
    excerpt: "사람들 사이에 있는 장면을 좋아하지만, 한 사람에게 너무 많은 자리를 기대할 때 마음이 쉽게 흔들린다는 걸 다시 보게 됐다.",
    body: [
      "나는 사람이 싫은 사람이 아니다. 오히려 사람들이 웃는 소리나 서로 스쳐 지나가는 풍경 안에 내가 포함되어 있다는 감각을 좋아한다.",
      "그런데 한 사람에게 친구, 연인, 가족, 동료 같은 여러 자리를 한꺼번에 기대하게 될 때 그 사람이 조금만 멀어져도 내가 설 자리가 한 번에 사라진 것처럼 느껴진다.",
      "내가 욕심이 많은 건지, 아니면 그냥 안정이 부족했던 건지 아직도 답은 명확하지 않다."
    ],
    tags: ["관계", "기대", "안정"],
    philosophyKey: "sartre",
    philosophyTitle: "사르트르와 타인 앞에서의 자리",
    philosophyText:
      "사르트르의 언어로 읽으면 이 기록은 타인이 나를 어떻게 채워주길 바라는지, 그리고 그 기대가 내 존재감과 얼마나 가까이 붙어 있는지를 드러냅니다. 관계는 따뜻하지만 동시에 불안을 비추는 거울이 되기도 합니다.",
    psychologyTitle: "관계 기대가 안전감과 직접 연결되는 상태",
    psychologyText:
      "한 사람에게 너무 많은 역할을 기대하게 되면 관계의 작은 거리 변화도 크게 위협적으로 느껴질 수 있습니다. 이는 욕심의 문제라기보다 안정감의 공급원을 너무 좁게 두고 있는 상태와 더 가깝습니다.",
    psychologyState: "안정감이 한 사람에게 과도하게 실린 구간",
    metrics: [71, 55, 48, 42, 57, 52],
    riskLevel: "watch",
    updatedAt: "2026-03-23T23:40:00+09:00",
    revisitPrompts: [
      { label: "다음 관계 앞의 나", text: "한 사람에게 여러 자리를 동시에 기대하고 있는지, 아니면 관계의 결을 나눠서 보고 있는지 적어보자." },
      { label: "1년 후의 나", text: "그때의 서운함이 결국 관계의 구조를 다시 배우게 했는지 돌아보자." }
    ]
  },
  {
    id: "entry-2026-03-24",
    date: "2026-03-24",
    title: "결심이라는 단어가 생각보다 무겁다는 걸 알게 된 날",
    excerpt: "충동이라기보다 여러 날 반복된 생각 끝에 마지막 선택을 계속 확인했고, 살아남은 뒤에도 기쁨과 부담을 구분하기 어려웠다.",
    body: [
      "내가 경험한 건 충동과는 조금 달랐다. 하루 이틀이 아니라 여러 날 동안 같은 생각을 반복했고, 남겨야 할 것들과 정리해야 할 것들을 계속 떠올렸다.",
      "그 과정이 길어질수록 마음이 단단해지는 게 아니라 더 복잡해졌다. 이 선택이 정말 마지막 선택인지 계속 확인하게 됐다.",
      "그리고 결국 나는 살아남았다. 하지만 살아 있다는 게 기쁜 일인지 부담스러운 일인지 구분이 잘 되지 않았다."
    ],
    tags: ["결심", "생존", "혼란"],
    philosophyKey: "camus",
    philosophyTitle: "카뮈와 살아남은 뒤의 낯섦",
    philosophyText:
      "카뮈의 언어로 보면 여기서 중요한 건 마지막을 통과하지 못했다는 사실보다, 살아남은 뒤에도 삶이 곧장 환희로 복구되지 않는다는 낯섦입니다. 생존이 자동으로 의미를 회복시켜 주지 않는 시간대가 분명히 존재합니다.",
    psychologyTitle: "자살 사고와 반복 확인 이후의 정서 둔마",
    psychologyText:
      "같은 생각을 여러 날 반복하고 마지막 선택인지 계속 확인하는 과정은 고위험 신호로 읽힐 수 있습니다. 이후 살아남고도 감정이 비어 있거나 현실감이 흐린 상태는 큰 스트레스 이후 흔히 동반되는 둔마 반응일 수 있습니다.",
    psychologyState: "고위험 사고 이후의 둔마 구간",
    metrics: [62, 38, 24, 31, 33, 79],
    riskLevel: "critical",
    updatedAt: "2026-03-24T22:10:00+09:00",
    revisitPrompts: [
      { label: "24시간 후의 나", text: "지금의 무감각이 조금 달라졌는지, 아니면 여전히 현실감이 흐린지 짧게라도 기록해보자." },
      { label: "입원이나 진료 이후의 나", text: "이 기록 이후 도움을 받은 장면이 있었다면, 그 도움은 무엇을 가장 먼저 바꿨는지 남겨보자." }
    ]
  },
  {
    id: "entry-2026-03-25",
    date: "2026-03-25",
    title: "입원이라는 단어를 현실적으로 생각해 본 날",
    excerpt: "살고 싶어서라기보다 스스로를 완전히 믿지 못해, 잠깐이라도 혼자 결정하지 않아도 되는 공간을 안전장치처럼 떠올렸다.",
    body: [
      "나는 살고 싶어서 입원을 고민하는 게 아니다. 그냥 내가 나를 완전히 믿지 못하겠다.",
      "어떤 순간에 어떤 선택을 할지 예측이 잘 되지 않아서, 잠깐이라도 내가 혼자 결정을 내리지 않아도 되는 공간이 필요하다는 생각이 들었다.",
      "그 선택이 용기인지 포기인지 아직은 잘 모르겠다. 다만 혼자 버티는 방식이 점점 어려워지고 있다는 사실은 분명하다."
    ],
    tags: ["입원", "안전", "보호"],
    philosophyKey: "epictetus",
    philosophyTitle: "에픽테토스와 통제를 잠시 내려놓는 선택",
    philosophyText:
      "스토아의 관점에서도 모든 걸 혼자 통제해야만 존엄한 것은 아닙니다. 지금 이 기록은 의지를 포기하는 말이라기보다, 혼자 결정하지 않도록 외부 구조를 빌리는 선택을 현실적으로 바라보는 장면에 가깝습니다.",
    psychologyTitle: "자기 통제 신뢰가 급격히 떨어진 상태",
    psychologyText:
      "스스로를 완전히 믿지 못하고, 혼자 결정을 내리는 것이 위험하게 느껴질 때는 보호 환경을 찾는 판단이 매우 현실적인 안전 전략이 됩니다. 이 기록은 도움 요청이 이미 구체적 행동 단계로 이동하고 있다는 신호에 가깝습니다.",
    psychologyState: "보호 환경이 필요한 고위험 구간",
    metrics: [58, 34, 22, 36, 31, 83],
    riskLevel: "critical",
    updatedAt: "2026-03-25T20:30:00+09:00",
    revisitPrompts: [
      { label: "입원 전후의 나", text: "혼자 결정하지 않아도 되는 공간이 실제로 어떤 안정을 주었는지, 혹은 어떤 불안을 남겼는지 적어보자." },
      { label: "3개월 후의 나", text: "그때 찾고 싶었던 안전장치가 지금은 어떤 형태로 내 곁에 남아 있는지 돌아보자." }
    ]
  },
  {
    id: "entry-2026-03-26",
    date: "2026-03-26",
    title: "지금의 상태",
    excerpt: "머리는 맑지 않고 생각은 느리게 움직이며, 몸의 회복보다 마음의 회복이 더 늦게 따라오고 있다는 감각이 선명했다.",
    body: [
      "머리가 맑지 않다. 생각이 느리게 움직이고 말을 하다가 중간에 멈추는 일이 잦아졌다. 기억이 끊기는 순간도 있다.",
      "몸이 회복되는 속도보다 마음이 따라오는 속도가 더 느린 것 같다. 눈물이 나는 이유를 정확히 설명할 수는 없지만 몸 안에서 뭔가가 계속 흔들리고 있는 느낌이 든다.",
      "일을 해야 한다는 생각은 여전히 있는데 지금의 내가 그 일을 제대로 할 수 있을지 확신이 서지 않는다. 그래서 더 불안하다."
    ],
    tags: ["회복", "혼미", "불안"],
    philosophyKey: "camus",
    philosophyTitle: "카뮈와 회복이 늦게 따라오는 시간",
    philosophyText:
      "카뮈의 문장으로 읽으면 이 기록은 영웅적 회복이 아니라, 여전히 흔들리는 상태로 하루를 견디는 시간에 더 가깝습니다. 세상이 계속 돌아간다는 사실이 안심과 서운함을 함께 만든다는 점도 지금의 양가감을 잘 드러냅니다.",
    psychologyTitle: "인지 속도 저하와 정서적 흔들림이 함께 오는 상태",
    psychologyText:
      "생각이 느려지고 기억이 끊기며 감정의 이유를 설명하기 어려운 상태는 큰 스트레스 이후 흔히 동반될 수 있습니다. 지금은 능력 부족을 판정하는 시기가 아니라, 회복 속도가 늦어졌다는 사실 자체를 상태 정보로 읽는 것이 더 중요합니다.",
    psychologyState: "회복이 느리게 따라오는 구간",
    metrics: [57, 41, 29, 39, 27, 72],
    riskLevel: "high",
    updatedAt: "2026-03-26T18:45:00+09:00",
    revisitPrompts: [
      { label: "일주일 후의 나", text: "생각의 속도와 몸의 감각이 지금보다 조금이라도 달라졌는지, 가장 작게 변한 부분을 적어보자." },
      { label: "다시 일을 시작하기 전의 나", text: "불안이 줄었는지보다, 지금의 내가 감당 가능한 리듬이 무엇인지 먼저 써보자." }
    ]
  },
  {
    id: "entry-2026-03-27",
    date: "2026-03-27",
    title: "물 위를 건너는 시간에는 대답이 늦게 온다",
    excerpt: "센과 치히로의 기차 장면처럼, 이미 돌아가긴 어렵고 아직 도착도 말할 수 없는 시간 속에서 조용히 앞으로 가는 마음을 붙잡아 보았다.",
    markdown: `센과 치히로의 행방불명에서 센이 가오나시와 함께 기차를 타고 가던 장면이 있다. 나는 이상하게 그 장면이 자꾸 생각난다.

무슨 큰 사건이 벌어지는 순간도 아닌데, 오히려 그래서 더 오래 남는다. 말이 많지 않고, 설명도 많지 않고, 바깥은 물에 잠겨 있고, 기차는 조용히 앞으로 간다. 그 장면의 감정이 요즘 내 마음이랑 닮아 있다.

내가 정확히 무엇 때문에 흔들리는지 다 말로 설명할 수는 없다. 그런데 분명한 건 있다. 이미 이전의 자리로 돌아가기는 어렵고, 그렇다고 도착한 곳이 어딘지도 아직 모르는 상태라는 것. 그 장면의 기차는 딱 그런 시간을 통과하는 것처럼 보인다. 급하게 결론을 내리지도 않고, 그렇다고 멈추지도 않는다. 그냥 조용히, 어딘가를 향해 간다. 나도 요즘 그런 식으로 움직이는 것 같다. 확신이 있어서 가는 게 아니라, 가야 하니까 가는 느낌.

나는 가끔 감정이 너무 크면 차라리 선명해질 줄 알았다. 슬프면 슬픈 거고, 화나면 화나는 거고, 무너지면 무너지는 거라고. 그런데 실제 마음은 그렇지 않다. 오히려 정말 깊은 감정은 조용해진다. 말수가 줄고, 표정이 옅어지고, 생각은 많은데 입 밖으로 잘 안 나온다. 센이 기차 안에서 보여주던 얼굴도 나한테는 그런 표정으로 보였다. 견디고 있는데, 버티고 있는데, 그렇다고 자신이 단단하다고 믿는 얼굴은 아닌 것. 그냥 지금의 자기 몫을 가만히 통과하는 얼굴.

그 장면이 좋은 이유는 위로를 억지로 만들지 않기 때문인지도 모르겠다. 괜찮아질 거라고 크게 말하지도 않고, 다 잘될 거라고 쉽게 약속하지도 않는다. 대신 조용한 풍경과 느린 속도로, 이런 시간도 있다는 걸 보여준다. 삶에는 뛰어가야 하는 순간만 있는 게 아니라, 물 위를 천천히 건너야 하는 순간도 있다는 걸. 그리고 그 시간은 대개 외롭고, 조금 낯설고, 이상할 만큼 고요하다.

아마 내가 그 장면을 떠올리는 건, 내 마음도 지금 그런 기차 안 어딘가에 있기 때문일 거다. 누군가와 같이 앉아는 있지만 완전히 기대지는 못하고, 분명 앞으로 가고는 있는데 아직 도착을 말할 수는 없는 상태. 그래도 이상하게 절망만은 아닌 상태. 아직 잘 모르겠지만, 계속 가보겠다는 마음이 아주 작게 남아 있는 상태. 나는 요즘의 내 감정을 설명할 때 슬픔이나 불안 같은 단어보다, 그 기차 장면을 먼저 꺼내고 싶다. 그게 더 정확하다. 내 마음은 지금, 크게 울지도 못하고 쉽게 웃지도 못한 채, 물 위를 조용히 지나가는 기차 한 칸 같다.`,
    body: [
      "센과 치히로의 행방불명에서 센이 가오나시와 함께 기차를 타고 가던 장면이 있다. 나는 이상하게 그 장면이 자꾸 생각난다.",
      "무슨 큰 사건이 벌어지는 순간도 아닌데, 오히려 그래서 더 오래 남는다. 말이 많지 않고, 설명도 많지 않고, 바깥은 물에 잠겨 있고, 기차는 조용히 앞으로 간다. 그 장면의 감정이 요즘 내 마음이랑 닮아 있다.",
      "내가 정확히 무엇 때문에 흔들리는지 다 말로 설명할 수는 없다. 그런데 분명한 건 있다. 이미 이전의 자리로 돌아가기는 어렵고, 그렇다고 도착한 곳이 어딘지도 아직 모르는 상태라는 것. 그 장면의 기차는 딱 그런 시간을 통과하는 것처럼 보인다.",
      "나는 요즘의 내 감정을 설명할 때 슬픔이나 불안 같은 단어보다, 그 기차 장면을 먼저 꺼내고 싶다. 그게 더 정확하다. 내 마음은 지금, 크게 울지도 못하고 쉽게 웃지도 못한 채, 물 위를 조용히 지나가는 기차 한 칸 같다."
    ],
    tags: ["이행", "고요", "유예"],
    philosophyKey: "camus",
    philosophyTitle: "카뮈와 결론을 서두르지 않는 통과의 시간",
    philosophyText:
      "카뮈의 언어로 보면 이 기록은 희망이나 절망 가운데 하나를 고르는 장면이 아니라, 아직 이름 붙지 않은 시간을 그대로 지나가는 태도에 더 가깝습니다. 도착하지 못한 상태를 실패로 보지 않고, 물 위를 건너는 감각 자체를 하나의 삶으로 받아들이려는 움직임이 읽힙니다.",
    psychologyTitle: "감정이 너무 깊어 조용해지는 구간",
    psychologyText:
      "감정이 클수록 오히려 더 조용해지고 말수가 줄어드는 경우가 있습니다. 이는 무감각이라기보다, 마음이 한 번에 처리하기 어려운 감정을 낮은 톤으로 붙들고 있는 상태에 가깝고, 지금 기록은 바로 그 고요한 과부하를 섬세하게 묘사하고 있습니다.",
    psychologyState: "깊은 감정이 저음으로 가라앉은 상태",
    metrics: [79, 61, 57, 48, 54, 44],
    riskLevel: "watch",
    updatedAt: "2026-03-27T22:10:00+09:00",
    revisitPrompts: [
      { label: "다음 정거장의 나", text: "여전히 같은 기차 칸에 있는지, 아니면 조금 다른 풍경이 보이기 시작했는지 적어보자." },
      { label: "1년 후의 나", text: "그때의 고요가 단지 버팀이었는지, 아니면 삶의 속도를 다시 배우는 시간이었다는 걸 알게 됐는지 돌아보자." }
    ]
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeUrl(url) {
  const value = String(url || "").trim();
  if (/^https?:\/\//i.test(value)) return value;
  return "";
}

function renderInlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g, (_match, alt, url) => {
      const safe = safeUrl(url);
      if (!safe) return "";
      return `<figure class="article-image"><img src="${safe}" alt="${escapeHtml(alt)}" loading="lazy" /><figcaption>${escapeHtml(alt || "")}</figcaption></figure>`;
    })
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_match, label, url) => {
      const safe = safeUrl(url);
      if (!safe) return escapeHtml(label);
      return `<a href="${safe}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function renderMarkdownArticle(markdown) {
  const lines = String(markdown || "")
    .split("\n")
    .map((line) => line.replace(/\r/g, ""));

  const chunks = [];
  let paragraph = [];
  let listItems = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    chunks.push(`<p>${renderInlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    chunks.push(`<ul>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</ul>`);
    listItems = [];
  };

  lines.forEach((raw) => {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      flushList();
      return;
    }
    if (/^#{1,3}\s/.test(line)) {
      flushParagraph();
      flushList();
      const level = Math.min(4, line.match(/^#+/)[0].length + 1);
      chunks.push(`<h${level}>${renderInlineMarkdown(line.replace(/^#{1,3}\s*/, ""))}</h${level}>`);
      return;
    }
    if (/^>\s?/.test(line)) {
      flushParagraph();
      flushList();
      chunks.push(`<blockquote>${renderInlineMarkdown(line.replace(/^>\s?/, ""))}</blockquote>`);
      return;
    }
    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      listItems.push(line.replace(/^[-*]\s+/, ""));
      return;
    }
    if (/^!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)$/.test(line)) {
      flushParagraph();
      flushList();
      chunks.push(renderInlineMarkdown(line));
      return;
    }
    paragraph.push(line);
  });

  flushParagraph();
  flushList();
  return chunks.join("");
}

function plainTextFromMarkdown(markdown) {
  return String(markdown || "")
    .replace(/!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g, "$1")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, "$1")
    .replace(/[#>*-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultEntries;
    const parsed = JSON.parse(raw);
    const isValid =
      Array.isArray(parsed) &&
      parsed.length &&
      parsed.every(
        (entry) =>
          typeof entry.id === "string" &&
          typeof entry.title === "string" &&
          Array.isArray(entry.body) &&
          Array.isArray(entry.tags) &&
          typeof entry.philosophyKey === "string"
      );
    if (!isValid) return defaultEntries;
    const merged = [...parsed];
    const existingIds = new Set(parsed.map((entry) => entry.id));
    defaultEntries.forEach((entry) => {
      if (!existingIds.has(entry.id)) {
        merged.push(entry);
      }
    });
    return merged;
  } catch {
    return defaultEntries;
  }
}

function normalizeEntryDatesForUserRequest(list) {
  return list.map((entry) => {
    if (KEEP_ORIGINAL_DATE_IDS.has(entry.id)) return entry;
    const next = { ...entry, date: "2026-03-21" };
    if (typeof next.updatedAt === "string" && next.updatedAt.includes("T")) {
      const timePart = next.updatedAt.split("T")[1];
      next.updatedAt = `2026-03-21T${timePart}`;
    }
    return next;
  });
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function isAdminUnlocked() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

function setRoute(route) {
  const normalized = !route || route === "entry" ? "journal" : route;
  pages.forEach((page) => {
    page.classList.toggle("is-active", page.dataset.page === normalized);
  });
  routeLinks.forEach((link) => {
    const target = link.getAttribute("href").replace("#", "");
    link.classList.toggle("is-active", target === normalized);
  });
}

function allTags() {
  return ["전체", ...Object.values(philosopherCatalog).map((item) => item.name)];
}

function normalizedSearch(value) {
  return String(value || "").trim().toLowerCase();
}

function compareEntriesDesc(a, b) {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;
  const aUpdated = a.updatedAt || "";
  const bUpdated = b.updatedAt || "";
  if (aUpdated !== bUpdated) return aUpdated < bUpdated ? 1 : -1;
  return a.id < b.id ? 1 : -1;
}

function matchesSearch(entry, query) {
  if (!query) return true;
  const philosopher = philosopherCatalog[entry.philosophyKey];
  const haystack = [
    entry.title,
    entry.excerpt,
    entry.body.join(" "),
    entry.tags.join(" "),
    entry.psychologyState,
    entry.psychologyTitle,
    entry.psychologyText,
    entry.philosophyTitle,
    entry.philosophyText,
    philosopher?.name || "",
    philosopher?.school || ""
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function pickPhilosopherQuote(entry, philosopher) {
  const quotes = philosopher?.quotes || [];
  if (!quotes.length) return "";
  const seedBase = entry
    ? `${entry.date}-${entry.title}-${entry.tags?.join("|") || ""}-${entry.riskLevel || ""}`
    : `${new Date().toISOString().slice(0, 10)}-${philosopher.name}`;
  let seed = 0;
  for (let index = 0; index < seedBase.length; index += 1) {
    seed = (seed + seedBase.charCodeAt(index) * (index + 3)) % 9973;
  }
  return quotes[seed % quotes.length];
}

function inferTagsFromBody(bodyText = "") {
  const pool = bodyText.toLowerCase();
  const map = [
    { key: /(죽음|유한|끝|사라짐|장례)/, tag: "유한성" },
    { key: /(불안|초조|압박|긴장)/, tag: "불안" },
    { key: /(피로|지치|소진|번아웃)/, tag: "피로" },
    { key: /(자책|자기비난|못난|문제는 나)/, tag: "자기비난" },
    { key: /(관계|사람|연결|거리감|고립)/, tag: "관계" },
    { key: /(선택|갈림길|결정|후회)/, tag: "선택" },
    { key: /(회복|버티|견디|복귀)/, tag: "회복" },
    { key: /(고요|침묵|조용|정적)/, tag: "고요" },
    { key: /(의미|허무|부조리|실존)/, tag: "실존" }
  ];
  const tags = map.filter((item) => item.key.test(pool)).map((item) => item.tag);
  if (!tags.length) tags.push("기록");
  return Array.from(new Set(tags)).slice(0, 5);
}

function autoTitleFromBody(bodyText = "") {
  const lines = String(bodyText)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const first = lines[0] || "";
  const normalized = first.replace(/^#+\s*/, "");
  if (normalized.length >= 8 && normalized.length <= 42) {
    return normalized;
  }
  const plain = plainTextFromMarkdown(bodyText);
  if (!plain) return "말하지 못한 마음을 붙잡는 기록";
  if (/(기차|물 위|센과 치히로)/.test(plain)) return "물 위를 지나듯, 느린 마음의 통과 기록";
  if (/(자책|자기비난|못난)/.test(plain)) return "자기비난의 문장을 멈춰 세우는 밤의 기록";
  if (/(불안|압박|초조)/.test(plain)) return "불안의 속도를 낮추기 위해 남긴 오늘의 기록";
  if (/(죽음|유한|끝)/.test(plain)) return "끝을 떠올릴수록 오늘을 붙들게 되는 기록";
  return `${plain.slice(0, 22)}... 에서 시작된 기록`;
}

function visibleEntries() {
  const list = [...entries].sort(compareEntriesDesc);
  const filtered = currentFilter === "전체"
    ? list
    : list.filter((entry) => philosopherCatalog[entry.philosophyKey]?.name === currentFilter);
  const query = normalizedSearch(currentSearchQuery);
  return filtered.filter((entry) => matchesSearch(entry, query));
}

function currentEntry() {
  const list = visibleEntries();
  return list.find((entry) => entry.id === currentEntryId) || list[0] || null;
}

function renderTags(container, tags) {
  container.innerHTML = "";
  tags.forEach((tag) => {
    const el = document.createElement("span");
    el.textContent = tag;
    container.appendChild(el);
  });
}

function findAnniversaryEntry() {
  const today = new Date();
  const monthDay = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const targetYear = String(today.getFullYear() - 1);
  return entries
    .find((entry) => entry.date.startsWith(`${targetYear}-${monthDay}`));
}

function renderAnniversaryCard() {
  const entry = findAnniversaryEntry();
  if (!entry) {
    anniversaryCard.classList.add("is-empty");
    anniversaryTitle.textContent = "아직 1년 전 오늘의 글이 없습니다";
    anniversaryDate.textContent = "기록 대기중";
    anniversaryExcerpt.textContent =
      "같은 날짜의 기록이 쌓이기 시작하면, 여기에서 1년 전 오늘의 글을 하루에 하나씩 조용히 다시 꺼내 보여줍니다.";
    anniversaryTags.innerHTML = "";
    return;
  }
  anniversaryCard.classList.remove("is-empty");
  anniversaryTitle.textContent = entry.title;
  anniversaryDate.textContent = entry.date;
  anniversaryExcerpt.textContent = entry.excerpt;
  renderTags(anniversaryTags, [philosopherCatalog[entry.philosophyKey]?.name || "철학", ...entry.tags]);
}

function startOfWeek(date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  return copy;
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function ymd(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function monthLabel(date) {
  return `${date.getMonth() + 1}월`;
}

function renderJournalHeatmap() {
  if (!journalHeatmap || !heatmapMonths) return;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(today);
  const start = startOfWeek(addDays(end, -364));

  const counts = entries.reduce((acc, entry) => {
    acc[entry.date] = (acc[entry.date] || 0) + 1;
    return acc;
  }, {});

  const cells = [];
  const monthMarkers = [];
  let cursor = new Date(start);

  for (let week = 0; week < 53; week += 1) {
    const weekStart = addDays(start, week * 7);
    const monthStartInWeek = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)).find((date) => date.getDate() === 1);
    monthMarkers.push(`<span>${monthStartInWeek ? monthLabel(monthStartInWeek) : ""}</span>`);

    for (let day = 0; day < 7; day += 1) {
      const cellDate = new Date(cursor);
      const key = ymd(cellDate);
      const count = counts[key] || 0;
      const level = count >= 4 ? 4 : count >= 3 ? 3 : count >= 2 ? 2 : count >= 1 ? 1 : 0;
      const title = `${key} · ${count ? `${count}개 기록` : "기록 없음"}`;
      cells.push(
        `<span class="heatmap-cell${level ? ` level-${level}` : ""}${key === ymd(today) ? " today" : ""}" title="${title}" aria-label="${title}"></span>`
      );
      cursor = addDays(cursor, 1);
    }
  }

  heatmapMonths.innerHTML = monthMarkers.join("");
  journalHeatmap.innerHTML = cells.join("");
}

function renderJournalFilters() {
  journalFilters.innerHTML = allTags()
    .map(
      (tag) =>
        `<button class="filter-chip${tag === currentFilter ? " is-active" : ""}" type="button" data-filter="${escapeHtml(
          tag
        )}">${escapeHtml(tag)}</button>`
    )
    .join("");
}

function renderJournalList() {
  const list = visibleEntries();
  if (!list.length) {
    journalList.innerHTML = `
      <article class="empty-state">
        ${
          currentSearchQuery
            ? `"<strong>${escapeHtml(currentSearchQuery)}</strong>"와 연결되는 기록이 아직 없습니다. 제목, 본문, 태그, 철학자 이름으로 다시 찾아보세요.`
            : "아직 이 철학자와 연결된 기록이 없습니다. 다른 철학자를 선택하거나, 관리자 로그인 후 새 글을 남겨 이 사상과 연결해볼 수 있어요."
        }
      </article>
    `;
    recentUpdateText.textContent = "최근 업데이트 없음";
    journalPagination.innerHTML = "";
    prevEntryButton.disabled = true;
    nextEntryButton.disabled = true;
    return;
  }
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  currentPage = Math.min(currentPage, totalPages);
  const pageItems = list.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  journalList.innerHTML = pageItems
    .map((entry) => {
      const isCurrent = entry.id === currentEntryId;
      const philosopher = philosopherCatalog[entry.philosophyKey];
      const adminActions = isAdminUnlocked()
        ? `
          <div class="journal-admin-actions is-visible">
            <button class="ghost-button" data-admin-action="edit-entry" data-entry-id="${entry.id}">수정</button>
            <button class="ghost-button" data-admin-action="delete-entry" data-entry-id="${entry.id}">삭제</button>
          </div>
        `
        : `<div class="journal-admin-actions"></div>`;
      return `
        <article class="journey-card tone-${entry.philosophyKey}${isCurrent ? " is-current" : ""}" data-entry-id="${entry.id}">
          <div class="journey-card-meta">
            <span>${entry.date}</span>
            ${entry.updatedAt === list[0]?.updatedAt ? '<span class="mini-update"><span class="recent-dot"></span>최근</span>' : ""}
          </div>
          <div class="journey-card-stack">
            <h3>${escapeHtml(entry.title)}</h3>
            <p class="journey-card-excerpt">${escapeHtml(entry.excerpt)}</p>
            <p class="journey-subcopy">${escapeHtml(philosopher.name)} · ${escapeHtml(entry.psychologyState)}</p>
          </div>
          <div class="journey-card-foot">
            <div class="tag-row">${entry.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
            ${adminActions}
          </div>
        </article>
      `;
    })
    .join("");

  const latest = list[0];
  recentUpdateText.textContent = latest ? `최근 업데이트 · ${latest.date} · ${latest.title}` : "최근 업데이트 없음";
  journalPagination.innerHTML = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return `<button class="page-chip${page === currentPage ? " is-active" : ""}" type="button" data-page="${page}">${page}</button>`;
  }).join("");
  const currentIndex = list.findIndex((entry) => entry.id === currentEntryId);
  prevEntryButton.disabled = currentIndex <= 0;
  nextEntryButton.disabled = currentIndex === -1 || currentIndex >= list.length - 1;
}

function renderSpotlight(entry) {
  if (!entry) {
    const philosopher = currentFilter !== "전체"
      ? Object.values(philosopherCatalog).find((item) => item.name === currentFilter)
      : philosopherCatalog.camus;
    spotlight.image.src = philosopher.image;
    spotlight.image.alt = philosopher.name;
    spotlight.name.textContent = philosopher.name;
    spotlight.school.textContent = philosopher.school;
    spotlight.quote.textContent = pickPhilosopherQuote(null, philosopher);
    spotlight.description.textContent = "아직 이 철학자와 연결된 기록은 없지만, 나중에 같은 결의 기록이 쌓이면 이 영역에서 이어 읽을 수 있어요.";
    spotlight.advice.textContent = "지금은 이 철학자의 문장과 시선을 먼저 붙잡아 두고, 다음 기록에서 어떤 접점이 생기는지 천천히 살펴보세요.";
    spotlight.bridge.textContent = philosopher.bridge;
    spotlight.commentAnalysis.textContent = "아직 내가 남긴 댓글이 없어, 현재는 본문만으로 철학적 결을 읽고 있습니다.";
    renderTags(spotlight.tags, [philosopher.name, philosopher.school]);
    return;
  }
  const philosopher = philosopherCatalog[entry.philosophyKey];
  spotlight.image.src = philosopher.image;
  spotlight.image.alt = philosopher.name;
  spotlight.name.textContent = philosopher.name;
  spotlight.school.textContent = philosopher.school;
  spotlight.quote.textContent = pickPhilosopherQuote(entry, philosopher);
  spotlight.description.textContent = philosopher.description;
  spotlight.advice.textContent = philosopher.advice;
  spotlight.bridge.textContent = philosopher.bridge;
  renderTags(spotlight.tags, [philosopher.name, ...entry.tags]);
}

function renderEntry(entry) {
  if (!entry) return;
  const philosopher = philosopherCatalog[entry.philosophyKey];
  currentEntryId = entry.id;
  entryElements.title.textContent = entry.title;
  entryElements.date.textContent = entry.date;
  entryElements.tag.textContent = "Journal Entry";
  entryElements.themeChip.textContent = entry.tags[0] || "기록";
  entryElements.philosophyChip.textContent = philosopher.name;
  entryElements.body.innerHTML = renderMarkdownArticle(entry.markdown || entry.body.join("\n\n"));
  entryElements.philosophyTitle.textContent = entry.philosophyTitle;
  entryElements.philosophyText.textContent = entry.philosophyText;
  entryElements.philosophyQuote.textContent = pickPhilosopherQuote(entry, philosopher);
  entryElements.philosophyAdvice.textContent = philosopher.advice;
  renderTags(entryElements.philosophyTags, [...entry.tags, philosopher.name]);
  entryElements.psychologyTitle.textContent = entry.psychologyTitle;
  entryElements.psychologyText.textContent = entry.psychologyText;
  entryElements.psychologyState.textContent = entry.psychologyState;
  renderTags(entryElements.psychologyTags, entry.tags);
  renderSpotlight(entry);
  renderMetrics(entry.metrics, entry);
  updateMap(entry);
  renderRevisitPrompts(entry);
  fetchComments().catch(() => {
    commentsUi.list.innerHTML = `<p class="helper-copy">댓글을 불러오지 못했습니다.</p>`;
  });
}

function renderReaderModal(entry) {
  if (!entry) return;
  const philosopher = philosopherCatalog[entry.philosophyKey];
  readerModal.title.textContent = entry.title;
  readerModal.date.textContent = entry.date;
  renderTags(readerModal.tags, [philosopher.name, ...entry.tags]);
  readerModal.body.innerHTML = renderMarkdownArticle(entry.markdown || entry.body.join("\n\n"));
  readerModal.philosophyTitle.textContent = entry.philosophyTitle;
  readerModal.philosophyText.textContent = entry.philosophyText;
  readerModal.philosophyQuote.textContent = pickPhilosopherQuote(entry, philosopher);
  readerModal.philosophyAdvice.textContent = philosopher.advice;
  readerModal.commentAnalysis.textContent = "아직 내가 남긴 댓글이 없어, 현재는 본문만으로 철학적 결을 읽고 있습니다.";
  readerModal.psychologyTitle.textContent = entry.psychologyTitle;
  readerModal.psychologyText.textContent = entry.psychologyText;
  readerModal.psychologyState.textContent = entry.psychologyState;
}

function analyzeOwnComments(entry, comments) {
  const myNickname = localStorage.getItem(MY_COMMENT_NICKNAME_KEY);
  if (!myNickname) {
    return "아직 내가 남긴 댓글이 없어, 현재는 본문만으로 철학적 결을 읽고 있습니다.";
  }
  const ownComments = comments.filter((comment) => comment.nickname === myNickname);
  if (!ownComments.length) {
    return "이 기록에는 아직 내가 남긴 댓글이 없어, 본문을 중심으로만 철학자의 시선을 붙이고 있습니다.";
  }

  const philosopher = philosopherCatalog[entry.philosophyKey];
  const text = ownComments.map((comment) => comment.body).join(" ").toLowerCase();

  if (philosopher.name === "알베르 카뮈") {
    if (/(버티|살아|계속|지속)/.test(text)) {
      return "내 댓글까지 보면 카뮈의 부조리 인식이 더 선명합니다. 결론을 내리기보다 계속 살아내는 쪽으로 말을 붙이고 있어서, 의미보다 지속의 감각이 더 중심에 와 있습니다.";
    }
    return "내 댓글까지 읽으면 카뮈 쪽 해석은 더 조용해집니다. 설명되지 않는 감정을 억지로 정리하기보다, 이해되지 않은 채 남겨두는 태도가 반복되고 있습니다.";
  }
  if (philosopher.name === "프리드리히 니체") {
    return "내 댓글에서는 상실보다 이후의 나를 어떻게 다시 만들지에 시선이 갑니다. 니체식으로 보면 후회의 기록이 아니라, 나를 다시 빚는 과정이 이미 시작된 상태에 더 가깝습니다.";
  }
  if (philosopher.name === "에픽테토스") {
    return "내 댓글까지 보면 통제 가능한 것과 아닌 것을 나누려는 시도가 보입니다. 아직 흔들리더라도, 해석의 범위를 줄이려는 방향은 분명히 남아 있습니다.";
  }
  return "내 댓글을 함께 읽으면 자유의 무게를 더 또렷하게 떠안고 있습니다. 불안을 없애려 하기보다, 중요한 것을 놓치고 싶지 않아 오래 붙들고 있는 상태로 보입니다.";
}

function renderRevisitPrompts(entry) {
  const prompts = entry.revisitPrompts || [];
  revisitList.innerHTML = prompts
    .map(
      (item) => `
        <article class="revisit-item">
          <strong>${escapeHtml(item.label)}</strong>
          <p class="note-copy">${escapeHtml(item.text)}</p>
        </article>
      `
    )
    .join("");
}

function renderPhilosopherLibrary() {
  philosopherLibrary.innerHTML = Object.values(philosopherCatalog)
    .map(
      (philosopher) => `
        <article class="philosopher-card">
          <img class="philosopher-card-image" src="${philosopher.image}" alt="${escapeHtml(philosopher.name)}" />
          <h4>${escapeHtml(philosopher.name)}</h4>
          <p class="philosopher-card-school">${escapeHtml(philosopher.school)}</p>
          <p class="philosopher-card-copy">${escapeHtml(philosopher.bridge)}</p>
        </article>
      `
    )
    .join("");
}

function renderCognitiveLibrary() {
  cognitiveStateList.innerHTML = entries
    .slice()
    .sort(compareEntriesDesc)
    .map(
      (entry) => `
        <article class="cognitive-card">
          <div class="cognitive-card-top">
            <strong>${escapeHtml(entry.psychologyState)}</strong>
            <span>${escapeHtml(entry.date)}</span>
          </div>
          <p>${escapeHtml(entry.psychologyText)}</p>
        </article>
      `
    )
    .join("");

  const hasRisk = entries.some((entry) => entry.riskLevel === "high" || entry.riskLevel === "critical");
  safetyStrip.classList.toggle("is-hidden", !hasRisk);
}

function updateMap(entry) {
  const philosopher = philosopherCatalog[entry.philosophyKey];
  mapCenterTitle.textContent = `${philosopher.name} 쪽으로 기운 현재 중심`;
  mapCenterText.textContent = `${entry.tags.slice(0, 2).join(" · ")}에 오래 머무는 중`;
  if (overlayFocusTitle) {
    overlayFocusTitle.textContent = philosopher.name;
  }
  if (overlayKeyNodes) {
    renderTags(overlayKeyNodes, entry.tags.slice(0, 4));
  }
  if (overlayQuote) {
    overlayQuote.textContent = pickPhilosopherQuote(entry, philosopher);
  }
  if (overlayQuoteAuthor) {
    overlayQuoteAuthor.textContent = `${philosopher.name} · ${philosopher.school}`;
  }
  renderOverlayRecordMap(entry);
}

function overlayPointForEntry(entry) {
  const positions = {
    camus: { left: 35, top: 40 },
    nietzsche: { left: 67, top: 22 },
    epictetus: { left: 28, top: 26 },
    sartre: { left: 72, top: 30 }
  };
  const base = positions[entry.philosophyKey] || positions.camus;
  const tagShift = Math.min((entry.tags?.length || 0) * 2, 8);
  const riskShift = { low: -2, watch: 1, high: 4, critical: 6 }[entry.riskLevel] || 0;
  return {
    left: Math.max(12, Math.min(84, base.left + tagShift)),
    top: Math.max(12, Math.min(74, base.top + riskShift))
  };
}

function renderOverlayRecordMap(current) {
  const list = [...entries].sort(compareEntriesDesc);
  overlayRecordMap.innerHTML = list
    .map((entry) => {
      const point = overlayPointForEntry(entry);
      const isCurrent = current && entry.id === current.id;
      const philosopher = philosopherCatalog[entry.philosophyKey];
      return `
        <article
          class="record-node-dot tone-${entry.philosophyKey}${isCurrent ? " is-current" : ""}"
          style="left:${point.left}%; top:${point.top}%"
          data-entry-id="${entry.id}"
        >
          <span class="record-node-point" aria-hidden="true"></span>
          <div class="record-node-tooltip">
            <strong>${escapeHtml(entry.title)}</strong>
            <span>${escapeHtml(philosopher.name)} · ${escapeHtml(entry.date)}</span>
            <p>${escapeHtml(entry.excerpt)}</p>
          </div>
        </article>
      `;
    })
    .join("");

  const philosopher = philosopherCatalog[current?.philosophyKey || "camus"];
  overlayLegendCopy.textContent = current
    ? `지금은 ${philosopher.name}의 결을 중심으로, ${current.tags.slice(0, 2).join(" · ")} 기록이 축 위에 가장 또렷하게 남아 있습니다.`
    : "아직 중심 기록이 없어 축만 먼저 놓여 있습니다.";
  overlayLegendBar.style.width = `${Math.min(88, Math.max(28, list.length * 12))}%`;
}

function metricPoints(values, centerX, centerY, radius) {
  return values
    .map((value, index) => {
      const angle = (-90 + index * 60) * (Math.PI / 180);
      const scaled = (radius * value) / 100;
      const x = centerX + Math.cos(angle) * scaled;
      const y = centerY + Math.sin(angle) * scaled;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

const metricDefinitions = [
  {
    label: "Self-Understanding",
    korean: "자기이해",
    polarity: "higher",
    describe(value) {
      if (value >= 75) return "지금의 감정과 생각을 비교적 정확하게 알아차리는 편입니다.";
      if (value >= 55) return "스스로를 읽는 감각은 남아 있지만, 마음의 이름을 붙이는 데 시간이 걸립니다.";
      return "무슨 감정인지 알기보다 먼저 버티고 있는 상태에 가까워 보입니다.";
    },
    advice: "오늘 하루에서 가장 크게 남는 감정 하나만 적어도 자기이해를 회복하는 데 도움이 됩니다."
  },
  {
    label: "Emotional Regulation",
    korean: "정서조절",
    polarity: "higher",
    describe(value) {
      if (value >= 75) return "감정이 올라와도 완전히 휩쓸리기보다 간격을 둘 여지가 있습니다.";
      if (value >= 55) return "감정의 파도는 크지만, 늦게라도 다시 돌아오는 복귀력이 있습니다.";
      return "감정이 올라올 때 속도 조절보다 압도감이 먼저 오는 시기로 보입니다.";
    },
    advice: "감정을 바로 정리하려 하기보다, 올라오는 시간을 10분만 버틴 뒤 반응을 미루는 연습이 좋습니다."
  },
  {
    label: "Stress Resilience",
    korean: "스트레스 복원력",
    polarity: "higher",
    describe(value) {
      if (value >= 75) return "자극이 있어도 일상을 다시 추슬러 세우는 힘이 남아 있습니다.";
      if (value >= 55) return "지치기는 하지만 무너진 뒤 다시 회복하는 속도는 유지되고 있습니다.";
      return "한 번 흔들리면 평소 리듬으로 돌아오는 데 시간이 오래 걸리는 상태입니다.";
    },
    advice: "해야 할 일을 늘리기보다 자극원을 하나 줄이는 쪽이 복원력 회복에는 더 직접적입니다."
  },
  {
    label: "Social Connection",
    korean: "사회적 연결감",
    polarity: "higher",
    describe(value) {
      if (value >= 75) return "사람과 이어져 있다는 감각이 현재 버팀목으로 작동하고 있습니다.";
      if (value >= 55) return "연결은 남아 있지만 기대와 거리감이 동시에 흔들리는 구간입니다.";
      return "혼자 견디는 비중이 커져서 작은 거리감도 크게 느껴질 수 있습니다.";
    },
    advice: "깊은 대화가 아니어도 괜찮으니, 오늘은 한 사람과 짧게라도 연결을 확인해 두는 게 좋습니다."
  },
  {
    label: "Executive Function",
    korean: "실행 기능",
    polarity: "higher",
    describe(value) {
      if (value >= 75) return "계획을 행동으로 옮기는 힘이 비교적 안정적으로 유지됩니다.";
      if (value >= 55) return "시작은 더디지만 구조를 잡아두면 움직일 수 있는 상태입니다.";
      return "결정과 시작 모두 큰 에너지를 요구해 작은 일도 과하게 무겁게 느껴질 수 있습니다.";
    },
    advice: "목표보다 첫 동작을 줄이세요. 20분 할 일 대신 3분 안에 끝나는 첫 행동부터 두는 편이 낫습니다."
  },
  {
    label: "Existential Anxiety",
    korean: "실존 불안",
    polarity: "lower",
    describe(value) {
      if (value >= 75) return "삶의 방향과 끝에 대한 질문이 일상을 압도할 정도로 크게 올라와 있습니다.";
      if (value >= 55) return "실존적 질문이 반복되지만 아직 일상과 완전히 분리되지는 않았습니다.";
      return "끝과 의미에 대한 질문이 있어도 지금을 삼킬 정도로 커지지는 않은 상태입니다.";
    },
    advice: "실존 불안이 높을 때는 답을 찾기보다, 오늘 실제로 만질 수 있는 생활 감각 하나를 회복하는 쪽이 안전합니다."
  }
];

const metricDefinitionsByLabel = Object.fromEntries(metricDefinitions.map((item) => [item.label, item]));

function renderMetrics(values, entry = null) {
  metricsList.innerHTML = "";
  values.forEach((value, index) => {
    const metric = metricDefinitions[index];
    const item = document.createElement("div");
    item.className = "metric-item";
    item.innerHTML = `
      <div class="metric-topline">
        <span class="metric-name">${metric.korean}</span>
        <strong>${(value / 10).toFixed(1)}</strong>
      </div>
      <p class="metric-description">${metric.describe(value)}</p>
      <div class="metric-bar"><span style="width:${value}%"></span></div>
    `;
    metricsList.appendChild(item);
  });

  hexagonDataLarge.setAttribute("points", metricPoints(values, 220, 220, 124));

  const weakest = values
    .map((value, index) => {
      const metric = metricDefinitions[index];
      const healthScore = metric.polarity === "lower" ? 100 - value : value;
      return { value, healthScore, label: metric.label, korean: metric.korean, definition: metric };
    })
    .sort((a, b) => a.healthScore - b.healthScore)
    .slice(0, 2);

  hexWeaknessList.innerHTML = weakest
    .map(
      (item) => `
        <div class="hex-copy-item">
          <strong>${item.korean}</strong>
          <span>${(item.value / 10).toFixed(1)}</span>
        </div>
      `
    )
    .join("");
  hexWeaknessKorean.innerHTML = weakest
    .map(
      (item) => `<div class="hex-korean-item"><strong>${item.korean}</strong> ${item.definition.describe(item.value)} ${item.definition.advice}</div>`
    )
    .join("");

  const lowest = weakest[0];
  hexAdvice.textContent = lowest
    ? `${lowest.definition.korean} 쪽을 먼저 가볍게 돌보는 편이 좋겠습니다. ${lowest.definition.advice}`
    : "수치는 지금 더 천천히 돌봐야 할 영역을 가볍게 보여주는 참고선으로만 읽어 주세요.";

  if (!hexConclusionTitle || !hexConclusionText) return;

  const weakestHealth = lowest ? lowest.healthScore : 60;
  const riskLevel = entry?.riskLevel || "low";
  if (riskLevel === "critical" || riskLevel === "high" || weakestHealth < 35) {
    hexConclusionTitle.textContent = "지금은 혼자 버티기보다 도움 연결이 우선입니다";
    hexConclusionText.textContent =
      "철학 관점과 인지심리 지표를 함께 보면, 현재는 해석보다 안전과 회복 리듬을 먼저 붙이는 구간입니다. 가까운 사람·전문가·긴급 도움선 중 하나를 오늘 안에 연결하세요.";
    return;
  }
  if (riskLevel === "watch" || weakestHealth < 50) {
    hexConclusionTitle.textContent = "가벼운 개입이 필요한 관찰 구간입니다";
    hexConclusionText.textContent =
      "지금은 크게 밀어붙이기보다 수면·식사·연결 같은 기본 리듬을 먼저 맞추는 편이 좋습니다. 일주일 단위로 변화를 짧게 기록해 추세를 확인하세요.";
    return;
  }
  hexConclusionTitle.textContent = "지금은 관찰 중심으로 충분합니다";
  hexConclusionText.textContent =
    "철학과 인지심리 관점을 합치면, 현재는 즉각 개입보다 현재 리듬을 유지하는 쪽이 더 적절합니다. 무리 없이 기록을 이어가며 변화만 체크하면 됩니다.";
}

function detectSignals(text, tags) {
  const pool = `${text} ${tags.join(" ")}`.toLowerCase();
  return {
    choice: /(선택|갈림길|가능성|후회|문)/.test(pool),
    time: /(시간|유한|끝|사라|마감)/.test(pool),
    connection: /(연결|사람|관계|고립)/.test(pool),
    overload: /(불안|압박|스트레스|지치|무겁)/.test(pool),
    hopeless: /(무기력|끝내고|사라지고 싶|죽고 싶|자해)/.test(pool)
  };
}

function createGeneratedEntry({ title, date, body, tags }) {
  const markdown = body.trim();
  const paragraphs = markdown
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  const plainBody = plainTextFromMarkdown(markdown);
  const joined = plainBody || paragraphs.join(" ");
  const signals = detectSignals(joined, tags);

  let philosophyKey = "camus";
  if (signals.choice) philosophyKey = "sartre";
  if (signals.time) philosophyKey = "camus";
  if (signals.overload) philosophyKey = "epictetus";
  if (signals.choice && /(형식|나 자신|다시)/.test(joined)) philosophyKey = "nietzsche";

  const philosopher = philosopherCatalog[philosophyKey];

  let psychologyTitle = "생각이 오래 머무는 날의 인지적 패턴";
  let psychologyText =
    "같은 장면을 여러 번 되짚는 날에는 결론보다 감정의 잔향이 오래 남아 있을 가능성이 큽니다. 이럴 때는 정답 찾기보다 마음이 붙드는 장면을 구체적으로 적어 두는 것이 먼저입니다.";
  let psychologyState = "사고가 오래 머무는 상태";
  let riskLevel = "low";
  let metrics = [74, 66, 64, 58, 62, 36];

  if (signals.overload) {
    psychologyTitle = "스트레스 자극이 넓게 번지는 상태";
    psychologyText =
      "압박이 큰 날에는 실제 문제보다 해석의 폭이 더 빠르게 커질 수 있습니다. 지금은 모든 것을 정리하려 하기보다 자극을 줄이고, 당장 처리할 한 가지 기준만 남기는 것이 더 도움이 됩니다.";
    psychologyState = "스트레스 반응이 넓어진 상태";
    metrics = [69, 54, 46, 52, 57, 45];
    riskLevel = "watch";
  }

  if (signals.connection) {
    psychologyTitle = "관계와 안전감이 같이 흔들리는 상태";
    psychologyText =
      "고립감이 커지면 같은 생각도 훨씬 더 위협적으로 느껴질 수 있습니다. 이럴 때는 문제 해석을 확장하기보다, 연결이 완전히 끊기지 않았다는 증거를 먼저 확보하는 편이 안전합니다.";
    psychologyState = "외부 연결이 필요한 상태";
    metrics = [66, 52, 41, 36, 51, 58];
    riskLevel = "high";
  }

  if (signals.hopeless) {
    psychologyTitle = "무기력과 위험 신호를 함께 보는 상태";
    psychologyText =
      "자기 손상이나 사라지고 싶다는 표현이 스치기 시작하면 해석보다 연결이 먼저입니다. 이런 문장은 혼자 감당해야 할 개인적 약점이 아니라, 즉시 외부 지원이 필요한 신호로 보는 편이 안전합니다.";
    psychologyState = "즉시 연결이 필요한 상태";
    metrics = [58, 43, 28, 24, 39, 78];
    riskLevel = "critical";
  }

  const philosophyTitle = `${philosopher.name}의 언어로 다시 읽는 오늘의 기록`;
  const philosophyText = `${philosopher.description} 이 기록에서는 특히 ${tags.slice(0, 2).join("와 ")}의 문제가 ${philosopher.school}의 언어로 읽힙니다. 완전히 정리되지 않은 마음도 하나의 사고 과정으로 남겨둘 수 있다는 점을 전제로 읽는 편이 더 잘 맞습니다.`;

  return {
    id: `entry-${Date.now()}`,
    date,
    title,
    excerpt: (plainBody || paragraphs.slice(0, 2).join(" ")).slice(0, 110),
    markdown,
    body: paragraphs,
    tags,
    philosophyKey,
    philosophyTitle,
    philosophyText,
    psychologyTitle,
    psychologyText,
    psychologyState,
    metrics,
    riskLevel,
    updatedAt: new Date().toISOString()
    ,
    revisitPrompts: [
      { label: "7일 후의 나", text: "이 감정이 아직 같은 밀도로 남아 있는지, 아니면 다른 언어로 바뀌었는지 적어보자." },
      { label: "1년 후의 나", text: "오늘의 기록이 결국 어떤 선택과 어떤 태도를 남겼는지 다시 읽으며 덧붙여보자." }
    ]
  };
}

function openModal() {
  modal.status.textContent = "";
  if (!modal.date.value) {
    modal.date.value = new Date().toISOString().slice(0, 10);
  }
  modal.shell.classList.remove("is-hidden");
  modal.shell.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.shell.classList.add("is-hidden");
  modal.shell.setAttribute("aria-hidden", "true");
  editingEntryId = "";
  modal.createForm.dataset.mode = "create";
}

function openAuthModal(statusText = "") {
  authModal.status.textContent = statusText;
  authModal.shell.classList.remove("is-hidden");
  authModal.shell.setAttribute("aria-hidden", "false");
}

function closeAuthModal() {
  authModal.shell.classList.add("is-hidden");
  authModal.shell.setAttribute("aria-hidden", "true");
}

function openReaderModal(entry) {
  if (!entry) return;
  renderReaderModal(entry);
  readerModal.body.scrollTop = 0;
  readerModal.shell.classList.remove("is-hidden");
  readerModal.shell.setAttribute("aria-hidden", "false");
  fetchCommentsInto(readerModal).catch(() => {
    readerModal.commentsList.innerHTML = `<p class="helper-copy">댓글을 불러오지 못했습니다.</p>`;
  });
}

function closeReaderModal() {
  readerModal.shell.classList.add("is-hidden");
  readerModal.shell.setAttribute("aria-hidden", "true");
}

async function fetchComments() {
  return fetchCommentsInto(commentsUi);
}

async function fetchCommentsInto(targetUi) {
  const entry = currentEntry();
  if (!entry) {
    targetUi.list ? (targetUi.list.innerHTML = "") : (targetUi.commentsList.innerHTML = "");
    return;
  }

  const response = await fetch(`/api/comments?entry=${encodeURIComponent(entry.id)}`);
  const payload = await response.json();
  const listEl = targetUi.list || targetUi.commentsList;

  if (!payload.ok) {
    listEl.innerHTML = `<p class="helper-copy">댓글을 불러오지 못했습니다.</p>`;
    applyCommentAnalysis(currentEntry(), []);
    return;
  }

  if (!payload.comments.length) {
    listEl.innerHTML = `<p class="helper-copy">아직 댓글이 없습니다. 첫 반응을 남겨보세요.</p>`;
    applyCommentAnalysis(entry, []);
    return;
  }

  listEl.innerHTML = payload.comments
    .map(
      (comment) => `
        <article class="comment-item" data-comment-id="${comment.id}">
          <div class="comment-meta">
            <strong class="comment-author">${escapeHtml(comment.nickname)}</strong>
            <span class="comment-date">${new Date(comment.createdAt).toLocaleString("ko-KR")}</span>
          </div>
          <p class="comment-body">${escapeHtml(comment.body)}</p>
          <div class="comment-delete-row">
            <input class="comment-delete-password" type="password" maxlength="64" placeholder="댓글 비밀번호" />
            <button class="ghost-button" data-action="delete-comment" data-comment-id="${comment.id}">삭제</button>
          </div>
        </article>
      `
    )
    .join("");
  applyCommentAnalysis(entry, payload.comments);
}

function applyCommentAnalysis(entry, comments) {
  if (!entry) return;
  const analysis = analyzeOwnComments(entry, comments);
  spotlight.commentAnalysis.textContent = analysis;
  readerModal.commentAnalysis.textContent = analysis;
}

async function createComment(event) {
  return createCommentFromUi(event, commentsUi);
}

async function createCommentFromUi(event, targetUi) {
  event.preventDefault();
  const entry = currentEntry();
  const payload = {
    entryKey: entry.id,
    nickname: (targetUi.nickname || targetUi.commentNickname).value,
    password: (targetUi.password || targetUi.commentPassword).value,
    body: (targetUi.body || targetUi.commentBody).value
  };
  const statusEl = targetUi.status || targetUi.commentStatus;
  localStorage.setItem(MY_COMMENT_NICKNAME_KEY, payload.nickname);

  statusEl.textContent = "등록 중...";

  const response = await fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const result = await response.json();
  if (!result.ok) {
    statusEl.textContent = result.error || "댓글 등록에 실패했습니다.";
    return;
  }

  (targetUi.body || targetUi.commentBody).value = "";
  statusEl.textContent = "댓글이 등록됐습니다.";
  await fetchCommentsInto(targetUi);
}

async function deleteComment(commentId, password) {
  return deleteCommentFromUi(commentId, password, commentsUi);
}

async function deleteCommentFromUi(commentId, password, targetUi) {
  const response = await fetch("/api/comments", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      commentId,
      password,
      adminKey: (targetUi.adminDeleteKey || commentsUi.adminDeleteKey).value
    })
  });
  const statusEl = targetUi.status || targetUi.commentStatus;

  const result = await response.json();
  if (!result.ok) {
    statusEl.textContent = result.error || "삭제에 실패했습니다.";
    return;
  }

  statusEl.textContent = "댓글이 삭제됐습니다.";
  await fetchCommentsInto(targetUi);
}

function rerenderAll() {
  renderAnniversaryCard();
  renderJournalHeatmap();
  renderJournalFilters();
  renderJournalList();
  renderPhilosopherLibrary();
  renderCognitiveLibrary();
  const entry = currentEntry();
  renderSpotlight(entry);
  if (entry) renderEntry(entry);
}

function openEditForCurrentEntry() {
  if (!isAdminUnlocked()) {
    pendingPostAuthAction = () => openEditForCurrentEntry();
    openAuthModal("수정하려면 관리자 로그인이 필요합니다.");
    return;
  }

  const entry = currentEntry();
  if (!entry) return;
  editingEntryId = entry.id;
  modal.createForm.dataset.mode = "edit";
  modal.title.value = entry.title;
  modal.date.value = entry.date;
  modal.body.value = entry.body.join("\n\n");
  if (entry.markdown) {
    modal.body.value = entry.markdown;
  }
  modal.status.textContent = "현재 기록을 수정하는 중입니다.";
  openModal();
}

function deleteCurrentEntry() {
  if (!isAdminUnlocked()) {
    pendingPostAuthAction = () => deleteCurrentEntry();
    openAuthModal("삭제하려면 관리자 로그인이 필요합니다.");
    return;
  }

  const entry = currentEntry();
  if (!entry) return;
  const confirmed = window.confirm(`"${entry.title}" 기록을 삭제할까요?`);
  if (!confirmed) return;

  entries = entries.filter((item) => item.id !== entry.id);
  saveEntries();
  currentEntryId = visibleEntries()[0]?.id || entries[0]?.id || "";
  rerenderAll();
  window.location.hash = "journal";
}

function handleHashRoute() {
  const route = window.location.hash.replace("#", "") || "journal";
  setRoute(route);
}

entries = normalizeEntryDatesForUserRequest(loadEntries());
currentEntryId = entries[0]?.id || "";
rerenderAll();
handleHashRoute();

window.addEventListener("hashchange", handleHashRoute);

journalFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  currentFilter = button.dataset.filter;
  currentPage = 1;
  const firstVisible = visibleEntries()[0] || null;
  currentEntryId = firstVisible ? firstVisible.id : "";
  rerenderAll();
});

journalSearchInput.addEventListener("input", (event) => {
  currentSearchQuery = event.target.value;
  currentPage = 1;
  const firstVisible = visibleEntries()[0] || null;
  currentEntryId = firstVisible ? firstVisible.id : "";
  rerenderAll();
});

journalPagination.addEventListener("click", (event) => {
  const button = event.target.closest("[data-page]");
  if (!button) return;
  currentPage = Number(button.dataset.page);
  renderJournalList();
});

function handleEntryCardClick(event) {
  const adminButton = event.target.closest("[data-admin-action]");
  if (adminButton) {
    const entry = entries.find((item) => item.id === adminButton.dataset.entryId);
    if (!entry) return;
    currentEntryId = entry.id;
    if (adminButton.dataset.adminAction === "edit-entry") {
      openEditForCurrentEntry();
      return;
    }
    if (adminButton.dataset.adminAction === "delete-entry") {
      deleteCurrentEntry();
      return;
    }
  }
  const card = event.target.closest("[data-entry-id]");
  if (!card) return;
  const target = entries.find((entry) => entry.id === card.dataset.entryId);
  if (!target) return;
  currentEntryId = target.id;
  renderJournalList();
  renderEntry(target);
  openReaderModal(target);
}

journalList.addEventListener("click", handleEntryCardClick);

modal.openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isAdminUnlocked()) {
      editingEntryId = "";
      modal.createForm.reset();
      openModal();
      return;
    }
    pendingPostAuthAction = () => {
      editingEntryId = "";
      modal.createForm.reset();
      openModal();
    };
    openAuthModal("새 글을 쓰려면 관리자 로그인이 필요합니다.");
  });
});

modal.closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

authModal.closeButtons.forEach((button) => {
  button.addEventListener("click", closeAuthModal);
});

readerModal.closeButtons.forEach((button) => {
  button.addEventListener("click", closeReaderModal);
});

authModal.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = authModal.id.value.trim();
  const password = authModal.password.value.trim();
  if ((id === "" || id === ADMIN_ID) && password === ADMIN_PASSWORD) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    authModal.status.textContent = "로그인 완료. 세션이 유지됩니다.";
    closeAuthModal();
    if (typeof pendingPostAuthAction === "function") {
      const action = pendingPostAuthAction;
      pendingPostAuthAction = null;
      action();
    }
    return;
  }
  authModal.status.textContent = "관리자 정보가 맞지 않습니다.";
});

modal.createForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isAdminUnlocked()) {
    modal.status.textContent = "먼저 관리자 확인이 필요합니다.";
    return;
  }

  const titleInput = modal.title.value.trim();
  const date = modal.date.value || new Date().toISOString().slice(0, 10);
  const body = modal.body.value.trim();
  const tags = inferTagsFromBody(body);
  const title = titleInput || autoTitleFromBody(body);

  if (!body) {
    modal.status.textContent = "본문을 입력해 주세요.";
    return;
  }
  if (!titleInput) {
    modal.title.value = title;
  }

  const newEntry = createGeneratedEntry({ title, date, body, tags });
  if (editingEntryId) {
    const index = entries.findIndex((entry) => entry.id === editingEntryId);
    if (index !== -1) {
      newEntry.id = editingEntryId;
      entries[index] = newEntry;
      currentEntryId = editingEntryId;
    }
  } else {
    entries.unshift(newEntry);
    currentEntryId = newEntry.id;
  }
  saveEntries();
  rerenderAll();
  modal.createForm.reset();
  modal.status.textContent = editingEntryId ? "기록이 수정됐습니다." : "새 기록이 저장됐습니다.";
  closeModal();
  window.location.hash = "journal";
});

if (modal.cancelButton) {
  modal.cancelButton.addEventListener("click", () => {
    closeModal();
  });
}

function setOverlayTab(tabKey) {
  const target = tabKey === "cognitive" ? "cognitive" : "philosophers";
  overlayTabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.overlayTab === target);
  });
  Object.entries(overlayTabPanels).forEach(([key, panel]) => {
    if (!panel) return;
    panel.classList.toggle("is-active", key === target);
  });
}

overlayTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setOverlayTab(button.dataset.overlayTab);
  });
});

function moveCurrentEntry(direction) {
  const list = visibleEntries();
  if (!list.length) return;
  const currentIndex = list.findIndex((entry) => entry.id === currentEntryId);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const nextIndex = safeIndex + direction;
  if (nextIndex < 0 || nextIndex >= list.length) return;
  currentEntryId = list[nextIndex].id;
  renderJournalList();
  renderEntry(list[nextIndex]);
  if (!readerModal.shell.classList.contains("is-hidden")) {
    openReaderModal(list[nextIndex]);
  }
}

prevEntryButton.addEventListener("click", () => moveCurrentEntry(-1));
nextEntryButton.addEventListener("click", () => moveCurrentEntry(1));

commentsUi.form.addEventListener("submit", (event) => {
  createComment(event).catch(() => {
    commentsUi.status.textContent = "댓글 등록 중 오류가 발생했습니다.";
  });
});

commentsUi.list.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="delete-comment"]');
  if (!button) return;
  const container = button.closest(".comment-item");
  const passwordInput = container.querySelector(".comment-delete-password");
  deleteComment(button.dataset.commentId, passwordInput.value).catch(() => {
    commentsUi.status.textContent = "댓글 삭제 중 오류가 발생했습니다.";
  });
});

readerModal.commentForm.addEventListener("submit", (event) => {
  createCommentFromUi(event, readerModal).catch(() => {
    readerModal.commentStatus.textContent = "댓글 등록 중 오류가 발생했습니다.";
  });
});

readerModal.commentsList.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="delete-comment"]');
  if (!button) return;
  const container = button.closest(".comment-item");
  const passwordInput = container.querySelector(".comment-delete-password");
  deleteCommentFromUi(button.dataset.commentId, passwordInput.value, readerModal).catch(() => {
    readerModal.commentStatus.textContent = "댓글 삭제 중 오류가 발생했습니다.";
  });
});
