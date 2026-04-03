const MBTI_RESULT_STORAGE_KEY = "reflective-atelier-philosophy-mbti-v1";

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
const philoMbti = {
  questionSection: document.getElementById("philoQuestionSection"),
  bottomGrid: document.getElementById("philoBottomGrid"),
  prompt: document.getElementById("philoMbtiPrompt"),
  progress: document.getElementById("philoMbtiProgress"),
  progressBar: document.getElementById("philoMbtiProgressBar"),
  optionGrid: document.getElementById("philoOptionGrid"),
  optionA: document.getElementById("philoOptionA"),
  optionB: document.getElementById("philoOptionB"),
  checklist: document.getElementById("philoChecklist"),
  dislikeChecklist: document.getElementById("philoDislikeChecklist"),
  detailTitle: document.getElementById("philoDetailTitle"),
  detailPanel: document.getElementById("philoDetailPanel"),
  restartButton: document.getElementById("philoRestartButton"),
  browsePanel: document.getElementById("philoBrowsePanel"),
  browsePrev: document.getElementById("philoBrowsePrev"),
  browseNext: document.getElementById("philoBrowseNext"),
  browseImage: document.getElementById("philoBrowseImage"),
  browseName: document.getElementById("philoBrowseName"),
  browseSchool: document.getElementById("philoBrowseSchool"),
  browseQuote: document.getElementById("philoBrowseQuote"),
  browseAngle: document.getElementById("philoBrowseAngle"),
  typeChart: document.getElementById("philoTypeChart"),
  typeInsight: document.getElementById("philoTypeInsight")
};

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
  list: document.getElementById("commentsList")
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
  closeButtons: Array.from(document.querySelectorAll("[data-close-reader-modal]"))
};

const metricsList = document.getElementById("metricsList");
const hexagonDataLarge = document.getElementById("hexagonDataLarge");
const hexagonDataOpposite = document.getElementById("hexagonDataOpposite");
const hexMapMine = document.getElementById("hexMapMine");
const hexMapOpposite = document.getElementById("hexMapOpposite");
const hexWeaknessList = document.getElementById("hexWeaknessList");
const hexWeaknessKorean = document.getElementById("hexWeaknessKorean");
const hexAdvice = document.getElementById("hexAdvice");
const hexConclusionTitle = document.getElementById("hexConclusionTitle");
const hexConclusionText = document.getElementById("hexConclusionText");
const hexOverallScoreValue = document.getElementById("hexOverallScoreValue");
const hexOverallScoreCopy = document.getElementById("hexOverallScoreCopy");
const revisitList = document.getElementById("revisitList");

const modal = {
  shell: document.getElementById("entryModal"),
  createForm: document.getElementById("entryCreateForm"),
  title: document.getElementById("modalTitleInput"),
  date: document.getElementById("modalDateInput"),
  privateToggle: document.getElementById("modalPrivateToggle"),
  privatePassword: document.getElementById("modalPrivatePasswordInput"),
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
const privateModal = {
  shell: document.getElementById("privateEntryModal"),
  form: document.getElementById("privateEntryUnlockForm"),
  password: document.getElementById("privateEntryPasswordInput"),
  status: document.getElementById("privateEntryStatus"),
  closeButtons: Array.from(document.querySelectorAll("[data-close-private-modal]"))
};

const philosophyTypeChip = document.getElementById("philosophyTypeChip");
const recentUpdateText = document.getElementById("recentUpdateText");
const anniversaryCard = document.getElementById("anniversaryCard");
const anniversaryTitle = document.getElementById("anniversaryTitle");
const anniversaryDate = document.getElementById("anniversaryDate");
const anniversaryExcerpt = document.getElementById("anniversaryExcerpt");
const anniversaryTags = document.getElementById("anniversaryTags");
const journalHeatmap = document.getElementById("journalHeatmap");
const heatmapMonths = document.getElementById("heatmapMonths");
const heatmapRangeText = document.getElementById("heatmapRangeText");
const visitCounterInline = document.getElementById("visit-counter-inline");
const overlayTabButtons = Array.from(document.querySelectorAll("[data-overlay-tab]"));
const overlayTabPanels = {
  philosophers: document.getElementById("overlayTabPanelPhilosophers"),
  cognitive: document.getElementById("overlayTabPanelCognitive")
};
const chatArchiveUi = {
  summary: document.getElementById("chatArchiveSummary"),
  methodology: document.getElementById("chatArchiveMethodology"),
  segments: document.getElementById("chatArchiveSegments")
};

const MY_COMMENT_NICKNAME_KEY = "reflective-atelier-my-comment-nickname";

let currentFilter = "전체";
let currentSearchQuery = "";
let currentEntryId = "";
let entries = [];
let editingEntryId = "";
let currentReaderEntryId = "";
let currentPage = 1;
const PAGE_SIZE = 4;
let pendingPostAuthAction = null;
let pendingPrivateEntryId = "";
const unlockedPrivateEntryIds = new Set();
let philosophyMbtiState = null;
let activePhilosophyConceptId = "";
const selectedPhilosophyDislikes = new Set();
let philosophyBrowseIndex = 0;
let commentSummaryByEntry = {};
let chatArchivePayload = null;
let chatArchiveAccess = { canAccess: false, configured: false };
let adminAccess = { canAccess: false, configured: false };

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

const PHILOSOPHY_MBTI_POOL = [
  {
    id: "epictetus",
    name: "에픽테토스",
    school: "스토아",
    angle: "통제 가능한 것에 집중해 소모를 줄인다.",
    quote: "사건이 아니라 해석이 우리를 흔든다.",
    image: "./assets/philosophers/epictetus.svg",
    concepts: [
      {
        id: "control-split",
        title: "통제 구분 훈련",
        summary: "내 영향권과 비영향권을 분리한다.",
        benefit: "불안의 범위를 좁혀 행동 가능한 다음 한 걸음을 빠르게 잡을 수 있습니다.",
        shadow: "지나치면 감정 표현을 억누르는 자기검열로 기울 수 있습니다.",
        recovery: "에픽테토스는 감정 자체를 부정하지 않고, 반응의 선택권을 늦게라도 회수하라고 권합니다.",
        alternative: "감정 억제가 심하면 사르트르처럼 감정의 의미를 먼저 인정하고 책임을 다시 고르는 접근이 보완이 됩니다."
      },
      {
        id: "daily-discipline",
        title: "일일 훈련 루틴",
        summary: "작은 반복으로 태도를 안정화한다.",
        benefit: "상황이 흔들려도 기준 리듬이 있어 회복 속도가 빨라집니다.",
        shadow: "루틴이 무너지면 자기비난이 크게 올라올 수 있습니다.",
        recovery: "스토아 전통은 완벽보다 복귀를 중시합니다. 실패한 날은 기록하고 다음 회차를 시작하면 됩니다.",
        alternative: "복귀가 어렵다면 듀이처럼 실험 단위를 더 작게 쪼개는 방법이 현실적입니다."
      }
    ],
    dislikes: [
      {
        id: "too-cold",
        label: "너무 차갑고 무감각해 보여요",
        response: "원전의 스토아는 감정 제거가 아니라 감정의 방향 조정에 가깝습니다.",
        alt: "사르트르: 감정을 먼저 인정하고, 그 다음 책임 있게 행동을 고른다."
      },
      {
        id: "self-blame",
        label: "결국 다 내 책임처럼 느껴져요",
        response: "에픽테토스는 결과 책임이 아니라 태도 책임을 말합니다. 외부 결과까지 내 탓으로 보진 않습니다.",
        alt: "한나 아렌트: 개인 책임과 구조적 조건을 분리해 본다."
      }
    ]
  },
  {
    id: "seneca",
    name: "세네카",
    school: "스토아",
    angle: "감정 폭주를 문장화해 제어한다.",
    quote: "우리는 실제보다 상상 속에서 더 자주 고통받는다.",
    image: "https://ui-avatars.com/api/?name=Seneca&background=e0e5cc&color=4f5441&size=128",
    concepts: [
      {
        id: "premeditatio",
        title: "사전 상상 훈련",
        summary: "최악의 경우를 미리 생각해 충격을 줄인다.",
        benefit: "예상치 못한 사건에서 회복 시간을 줄일 수 있습니다.",
        shadow: "불안을 과도하게 예행연습하면 오히려 긴장이 상시화될 수 있습니다.",
        recovery: "세네카는 상상 뒤에 현재의 감사 목록을 붙여 정서를 균형화했습니다.",
        alternative: "카뮈는 미래 통제보다 지금의 감각을 회복하는 방향을 제안합니다."
      }
    ],
    dislikes: [
      {
        id: "anxious",
        label: "걱정을 더 키우는 방식 같아요",
        response: "세네카식 훈련은 짧고 제한된 시간 안에서만 수행해야 역효과를 줄일 수 있습니다.",
        alt: "붓다: 호흡과 관찰 중심으로 사고 과열을 낮춘다."
      }
    ]
  },
  {
    id: "marcus",
    name: "마르쿠스 아우렐리우스",
    school: "스토아",
    angle: "내면 일기를 통해 판단을 정제한다.",
    quote: "내 영혼은 내가 허락하지 않으면 다치지 않는다.",
    image: "https://ui-avatars.com/api/?name=Marcus+Aurelius&background=e5e4ca&color=40412e&size=128",
    concepts: [
      {
        id: "self-journal",
        title: "내면 대화 기록",
        summary: "즉시 반응 대신 자기 점검을 끼워 넣는다.",
        benefit: "충동 반응을 줄이고 후회 비용을 낮춥니다.",
        shadow: "지나치면 반응이 늦어져 관계에서 거리감이 생길 수 있습니다.",
        recovery: "마르쿠스는 기록 후 바로 '오늘 할 일'을 행동 문장으로 마감했습니다.",
        alternative: "듀이는 실천 실험을 먼저 돌려 피드백으로 교정하는 방식을 권합니다."
      }
    ],
    dislikes: [
      {
        id: "slow",
        label: "너무 신중해서 답답해요",
        response: "기록-결정 사이 시간을 짧게 제한하면 느린 의사결정 문제를 줄일 수 있습니다.",
        alt: "니체: 완전한 확신 전에도 창조적으로 먼저 실행한다."
      }
    ]
  },
  {
    id: "socrates",
    name: "소크라테스",
    school: "고전 그리스",
    angle: "질문을 통해 전제를 드러낸다.",
    quote: "검토되지 않은 삶은 살 가치가 없다.",
    image: "https://ui-avatars.com/api/?name=Socrates&background=ece3b6&color=373313&size=128",
    concepts: [
      {
        id: "questioning",
        title: "전제 해부 질문",
        summary: "믿고 있는 생각의 근거를 점검한다.",
        benefit: "자동 사고의 오류를 줄여 의사결정 정확도를 높입니다.",
        shadow: "질문이 과해지면 실행 지연과 피로가 누적됩니다.",
        recovery: "소크라테스식 대화는 질문 뒤에 잠정 결론을 세우는 단계가 필요합니다.",
        alternative: "아리스토텔레스는 충분히 좋은 기준을 먼저 정하고 실행으로 검증합니다."
      }
    ],
    dislikes: [
      {
        id: "too-many-questions",
        label: "질문만 많고 결론이 늦어요",
        response: "질문 횟수를 제한하고 결론 타임박스를 두면 실천성이 올라갑니다.",
        alt: "아리스토텔레스: 중용 기준으로 빠르게 합리적 선택을 시도한다."
      }
    ]
  },
  {
    id: "plato",
    name: "플라톤",
    school: "이데아론",
    angle: "이상적 기준으로 현실을 교정한다.",
    quote: "선의 이데아를 본 자는 다시 동굴에 머물 수 없다.",
    image: "https://ui-avatars.com/api/?name=Plato&background=d2d7bf&color=3c4130&size=128",
    concepts: [
      {
        id: "ideal-standard",
        title: "이상 기준 설정",
        summary: "좋은 삶의 기준점을 먼저 세운다.",
        benefit: "방향성이 명확해져 흔들림 속에서도 기준을 잃지 않습니다.",
        shadow: "현실과 기준의 간극이 커질 때 자기비난이 커질 수 있습니다.",
        recovery: "플라톤 전통은 교육과 훈련을 통한 점진적 상승을 전제로 합니다.",
        alternative: "카뮈는 완전한 기준보다 불완전한 현재를 견디는 기술을 강조합니다."
      }
    ],
    dislikes: [
      {
        id: "ideal-pressure",
        label: "이상이 너무 높아 숨막혀요",
        response: "기준을 유지하되, 도달 속도는 개인 리듬으로 낮추는 해석이 필요합니다.",
        alt: "카뮈: 완성보다 지속, 정답보다 생존을 우선한다."
      }
    ]
  },
  {
    id: "aristotle",
    name: "아리스토텔레스",
    school: "덕 윤리",
    angle: "극단을 피하고 중용을 훈련한다.",
    quote: "탁월함은 한 번의 행위가 아니라 습관이다.",
    image: "https://ui-avatars.com/api/?name=Aristotle&background=e5e4ca&color=52533f&size=128",
    concepts: [
      {
        id: "virtue-habit",
        title: "덕의 습관화",
        summary: "좋은 선택을 반복해 성향으로 만든다.",
        benefit: "일관성 있는 선택이 쌓여 신뢰 가능한 자아감이 형성됩니다.",
        shadow: "지나치게 규범화되면 변화 대응이 둔해질 수 있습니다.",
        recovery: "상황 맥락에 따라 중용값을 조절하는 유연성이 핵심입니다.",
        alternative: "니체는 고정된 덕보다 새로운 가치 창조를 강조합니다."
      }
    ],
    dislikes: [
      {
        id: "too-normal",
        label: "너무 무난하고 평범해 보여요",
        response: "중용은 평균주의가 아니라 상황별 최적점을 찾는 고난도 판단입니다.",
        alt: "니체: 기존 기준을 넘어서는 자기 창조를 시도한다."
      }
    ]
  },
  {
    id: "kierkegaard",
    name: "키르케고르",
    school: "실존주의",
    angle: "불안을 회피하지 않고 결단으로 통과한다.",
    quote: "불안은 자유의 어지러움이다.",
    image: "https://ui-avatars.com/api/?name=Kierkegaard&background=ece3b6&color=53320b&size=128",
    concepts: [
      {
        id: "leap",
        title: "결단의 도약",
        summary: "완전한 증거가 없어도 책임 있게 선택한다.",
        benefit: "우유부단을 끊고 자기 서사를 앞으로 밀 수 있습니다.",
        shadow: "도약을 미화하면 충분한 검토를 놓칠 수 있습니다.",
        recovery: "키르케고르는 도약 뒤의 내적 성찰을 동일하게 중요시했습니다.",
        alternative: "듀이는 작은 실험으로 위험을 분산하는 선택을 제안합니다."
      }
    ],
    dislikes: [
      {
        id: "too-faith",
        label: "근거보다 믿음을 강요하는 느낌이에요",
        response: "실존적 도약은 맹신이 아니라 불확실성 하의 책임 결정으로 읽을 수 있습니다.",
        alt: "듀이: 경험적 검증을 거치는 점진적 결정."
      }
    ]
  },
  {
    id: "sartre",
    name: "장 폴 사르트르",
    school: "실존주의",
    angle: "자유와 책임을 동시에 떠안는다.",
    quote: "인간은 자유를 선고받았다.",
    image: "./assets/philosophers/sartre.svg",
    concepts: [
      {
        id: "freedom-responsibility",
        title: "자유-책임 정렬",
        summary: "선택하지 않음도 선택임을 인정한다.",
        benefit: "회피를 줄이고 주도감을 회복할 수 있습니다.",
        shadow: "책임 과잉 해석은 자책을 키울 수 있습니다.",
        recovery: "사르트르는 타인과 상황의 사실성을 함께 보며 선택을 갱신했습니다.",
        alternative: "아렌트는 개인 책임과 구조적 책임을 분리해 부담을 재배치합니다."
      }
    ],
    dislikes: [
      {
        id: "guilt-heavy",
        label: "책임 압박이 너무 커요",
        response: "책임의 범위를 '내가 바꿀 수 있는 다음 행동'으로 축소하면 부담이 줄어듭니다.",
        alt: "아렌트: 개인의 한계와 구조를 함께 읽는다."
      }
    ]
  },
  {
    id: "nietzsche",
    name: "프리드리히 니체",
    school: "가치 창조",
    angle: "주어진 기준보다 자기 기준을 만든다.",
    quote: "너 자신이 누구인지 되어라.",
    image: "./assets/philosophers/nietzsche.svg",
    concepts: [
      {
        id: "value-creation",
        title: "가치 재정의",
        summary: "남의 잣대 대신 내 기준을 설계한다.",
        benefit: "외부 평가에 흔들리는 정도가 줄고 주도성이 올라갑니다.",
        shadow: "자기기준이 타인 배려 결핍으로 왜곡될 수 있습니다.",
        recovery: "니체는 힘을 타자 파괴가 아닌 자기 형성의 에너지로 보았습니다.",
        alternative: "공자적 관점은 관계적 책임을 보완해 균형을 만듭니다."
      }
    ],
    dislikes: [
      {
        id: "too-harsh",
        label: "강자 논리처럼 느껴져요",
        response: "니체의 핵심은 약자 배제가 아니라 자기기만을 넘는 자기 형성입니다.",
        alt: "공자: 관계 윤리와 상호 배려를 우선한다."
      }
    ]
  },
  {
    id: "camus",
    name: "알베르 카뮈",
    school: "부조리",
    angle: "의미 부재 속에서도 삶을 지속한다.",
    quote: "설명되지 않아도 삶은 계속된다.",
    image: "./assets/philosophers/camus.svg",
    concepts: [
      {
        id: "absurd-endurance",
        title: "부조리 수용",
        summary: "완벽한 해답 없이도 오늘을 살아낸다.",
        benefit: "결론 강박을 줄여 현재 기능을 회복하는 데 유리합니다.",
        shadow: "수용이 체념으로 오해되면 추진력이 떨어질 수 있습니다.",
        recovery: "카뮈는 체념이 아니라 반항적 지속을 강조했습니다.",
        alternative: "니체는 지속을 넘어 적극적 자기 창조를 요구합니다."
      }
    ],
    dislikes: [
      {
        id: "too-passive",
        label: "버티기만 하고 바꾸진 않는 느낌이에요",
        response: "카뮈의 버팀은 체념이 아니라 조건 속 행동을 계속하는 반항적 태도입니다.",
        alt: "니체: 스스로 규칙을 다시 쓰며 행동 강도를 높인다."
      }
    ]
  },
  {
    id: "confucius",
    name: "공자",
    school: "유가",
    angle: "관계 속 역할과 예를 통해 질서를 세운다.",
    quote: "배우고 때때로 익히면 기쁘지 아니한가.",
    image: "https://ui-avatars.com/api/?name=Confucius&background=e5e4ca&color=40412e&size=128",
    concepts: [
      {
        id: "relational-ethics",
        title: "관계 윤리 정렬",
        summary: "나의 자유를 관계 책임과 함께 본다.",
        benefit: "관계 갈등에서 기준을 세우고 신뢰를 회복하기 쉽습니다.",
        shadow: "역할 윤리가 과하면 개별 욕구가 눌릴 수 있습니다.",
        recovery: "유가는 인(仁)을 중심에 두어 타인과 자기 모두를 살피게 합니다.",
        alternative: "니체는 역할보다 자기창조를 우선해 개인 욕구를 회복시킵니다."
      }
    ],
    dislikes: [
      {
        id: "hierarchy",
        label: "위계적이고 답답해요",
        response: "현대 해석에서는 위계를 고정권력이 아닌 상호 책임의 구조로 재해석합니다.",
        alt: "시몬 드 보부아르: 권력 비대칭을 비판적으로 교정한다."
      }
    ]
  },
  {
    id: "laozi",
    name: "노자",
    school: "도가",
    angle: "억지 개입을 줄이고 흐름에 맞춘다.",
    quote: "억지로 하려 하면 오히려 잃는다.",
    image: "https://ui-avatars.com/api/?name=Laozi&background=ece3b6&color=704b23&size=128",
    concepts: [
      {
        id: "wu-wei",
        title: "무위의 조절",
        summary: "과개입을 줄여 자연스러운 회복을 기다린다.",
        benefit: "통제 강박을 낮추고 에너지 누수를 줄입니다.",
        shadow: "실행 회피로 흐르면 문제가 고착될 수 있습니다.",
        recovery: "노자식 무위는 방치가 아니라 최소한의 정확한 개입을 뜻합니다.",
        alternative: "아렌트는 공적 행동이 필요한 순간엔 명확히 나서야 한다고 말합니다."
      }
    ],
    dislikes: [
      {
        id: "too-passive-2",
        label: "너무 소극적으로 느껴져요",
        response: "무위는 무행동이 아니라 과잉행동의 절제를 뜻합니다.",
        alt: "아렌트: 말하고 행동하는 공적 실천을 강조."
      }
    ]
  },
  {
    id: "buddha",
    name: "붓다",
    school: "불교",
    angle: "집착을 알아차리고 고통 반응을 완화한다.",
    quote: "고통은 있다. 그러나 끝낼 길도 있다.",
    image: "https://ui-avatars.com/api/?name=Buddha&background=f1e9c1&color=53320b&size=128",
    concepts: [
      {
        id: "non-attachment",
        title: "집착 완화 훈련",
        summary: "사건이 아닌 집착 패턴을 본다.",
        benefit: "감정 소용돌이에서 빠져나올 여지를 확보합니다.",
        shadow: "잘못 쓰면 관계적 열의를 잃는 무관심으로 오해됩니다.",
        recovery: "불교 전통은 자비를 함께 두어 거리두기와 연결을 균형화합니다.",
        alternative: "보부아르는 관계 속 윤리적 책임을 더 강하게 요청합니다."
      }
    ],
    dislikes: [
      {
        id: "detached",
        label: "너무 초연해서 인간미가 없어요",
        response: "본래 가르침은 냉담이 아니라 자비를 동반한 알아차림입니다.",
        alt: "보부아르: 타자와의 구체적 관계 책임을 더 강조."
      }
    ]
  },
  {
    id: "simone",
    name: "시몬 드 보부아르",
    school: "실존·페미니즘",
    angle: "자유를 구조 비판과 함께 본다.",
    quote: "여성은 태어나는 것이 아니라 만들어진다.",
    image: "https://ui-avatars.com/api/?name=Simone+de+Beauvoir&background=e0e5cc&color=3c4130&size=128",
    concepts: [
      {
        id: "situated-freedom",
        title: "상황화된 자유",
        summary: "개인 선택을 구조 조건과 함께 해석한다.",
        benefit: "자기탓 과잉을 줄이고 현실 전략을 세우기 쉽습니다.",
        shadow: "구조 설명이 과하면 개인 실행력이 약해질 수 있습니다.",
        recovery: "보부아르는 비판 뒤에 실천 윤리를 강조하며 주체적 선택을 요구합니다.",
        alternative: "에픽테토스는 당장 바꿀 수 있는 개인 태도부터 시작하게 돕습니다."
      }
    ],
    dislikes: [
      {
        id: "too-political",
        label: "너무 사회 구조 얘기 같아요",
        response: "핵심은 정치 논쟁이 아니라 내 선택이 놓인 조건을 정확히 읽는 데 있습니다.",
        alt: "에픽테토스: 개인 레벨에서 바로 실행 가능한 태도 조정."
      }
    ]
  },
  {
    id: "arendt",
    name: "한나 아렌트",
    school: "정치철학",
    angle: "생각 없음이 위험을 키운다는 점을 경계한다.",
    quote: "생각하지 않음은 악의 평범성을 만든다.",
    image: "https://ui-avatars.com/api/?name=Hannah+Arendt&background=d6d6bc&color=40412e&size=128",
    concepts: [
      {
        id: "public-judgment",
        title: "판단과 공적 책임",
        summary: "개인 선택이 공동체에 미치는 효과를 본다.",
        benefit: "윤리 판단의 폭이 넓어지고 장기 리스크를 줄입니다.",
        shadow: "책임 범위를 넓게 잡으면 피로가 커질 수 있습니다.",
        recovery: "아렌트는 '내가 답할 수 있는 범위'를 분명히 하는 판단 훈련을 강조합니다.",
        alternative: "노자는 과잉 책임감 대신 개입 강도를 줄이는 균형을 제시합니다."
      }
    ],
    dislikes: [
      {
        id: "too-heavy",
        label: "책임감이 과도하게 무거워요",
        response: "모든 문제를 떠안는 것이 아니라, 내가 응답 가능한 범위부터 분리해야 합니다.",
        alt: "노자: 개입 강도를 줄이고 에너지를 보존한다."
      }
    ]
  },
  {
    id: "dewey",
    name: "존 듀이",
    school: "프래그머티즘",
    angle: "정답 대신 실험과 피드백으로 개선한다.",
    quote: "우리는 생각하며 배우고, 해보며 더 잘 배운다.",
    image: "https://ui-avatars.com/api/?name=John+Dewey&background=e5e4ca&color=52533f&size=128",
    concepts: [
      {
        id: "experiment-loop",
        title: "실험-피드백 루프",
        summary: "작게 시도하고 결과로 수정한다.",
        benefit: "실패 비용을 낮추며 빠르게 학습할 수 있습니다.",
        shadow: "지속적 실험이 방향 상실로 느껴질 수 있습니다.",
        recovery: "듀이는 실험마다 평가 기준을 명시해 방향성을 유지했습니다.",
        alternative: "플라톤은 실험 전 고정 기준을 먼저 세우는 쪽을 선호합니다."
      }
    ],
    dislikes: [
      {
        id: "no-core",
        label: "핵심 신념이 약해 보여요",
        response: "듀이는 신념이 없어서가 아니라, 신념을 검증 가능한 형태로 다루려 했습니다.",
        alt: "플라톤: 먼저 변하지 않는 기준을 세운다."
      }
    ]
  },
  {
    id: "heidegger",
    name: "하이데거",
    school: "현상학·실존",
    angle: "죽음을 의식하며 자기 삶의 진정성을 본다.",
    quote: "죽음에 대한 자각은 삶의 고유성을 연다.",
    image: "https://ui-avatars.com/api/?name=Heidegger&background=ece3b6&color=53320b&size=128",
    concepts: [
      {
        id: "authenticity",
        title: "진정성 점검",
        summary: "남의 기대가 아닌 내 선택의 근거를 찾는다.",
        benefit: "타인 기준에서 벗어나 자기 기준을 회복합니다.",
        shadow: "실존 성찰이 과하면 고립감이 강해질 수 있습니다.",
        recovery: "성찰 후 일상 실천으로 되돌아오는 균형이 필요합니다.",
        alternative: "공자는 관계 속 실천으로 고립을 완화합니다."
      }
    ],
    dislikes: [
      {
        id: "too-heavy2",
        label: "너무 무겁고 어두워요",
        response: "핵심은 우울이 아니라 삶의 우선순위를 명확히 하는 데 있습니다.",
        alt: "공자: 관계와 실천을 통해 삶의 리듬을 회복."
      }
    ]
  },
  {
    id: "spinoza",
    name: "스피노자",
    school: "합리주의",
    angle: "감정을 인과적으로 이해해 자유를 확장한다.",
    quote: "이해는 정념을 정돈하는 시작점이다.",
    image: "https://ui-avatars.com/api/?name=Spinoza&background=e0e5cc&color=4f5441&size=128",
    concepts: [
      {
        id: "affect-understanding",
        title: "정서 인과 분석",
        summary: "감정을 선악보다 메커니즘으로 본다.",
        benefit: "감정에 압도되는 빈도를 줄이고 재현 패턴을 파악할 수 있습니다.",
        shadow: "지나치면 감정을 지나치게 이성화해 거리감이 생길 수 있습니다.",
        recovery: "스피노자는 이해가 곧 삶의 기쁨을 확장한다고 보았습니다.",
        alternative: "카뮈는 해석보다 감각적 삶의 밀도를 먼저 회복하자고 말합니다."
      }
    ],
    dislikes: [
      {
        id: "too-rational",
        label: "너무 머리로만 이해하는 느낌이에요",
        response: "스피노자의 이해는 감정 무시가 아니라 감정의 자유도를 높이는 도구입니다.",
        alt: "카뮈: 설명보다 살아내는 감각을 우선 회복."
      }
    ]
  }
];

// Source: Rollin & Lages (2025), EPJ Data Science, Table 2 (Wikipedia multilingual influence ranking)
const PUBLIC_INFLUENCE_RANK_BY_ID = {
  aristotle: 1,
  plato: 2,
  nietzsche: 15,
  socrates: 20,
  sartre: 26,
  spinoza: 36,
  confucius: 39,
  heidegger: 40,
  marcus: 43,
  seneca: 45,
  kierkegaard: 62,
  dewey: 70,
  arendt: 81,
  laozi: 98,
  simone: 112,
  epictetus: 185
};

const ENTRY_DATE_OVERRIDES = {};

const defaultEntries = [
  {
    id: "entry-2026-03-23-party-instead-interruptions",
    date: "2026-03-23",
    title: "파티 대신, 방해",
    excerpt: "축하라는 말은 버거웠지만, 닭발과 하이볼과 못생긴 꽃다발이 3초마다 들이치던 생각의 리듬을 잠깐 끊어냈다.",
    markdown: `원래 있던 가족 모임은 취소됐다.
또 내 잘못이다.

나는 오늘도 여전히 나였고, 그래서 ‘파티’라는 말을 쓰고 싶지 않았다.
축하의 형식을 갖춘다고 내가 달라지는 건 아니니까.
뭘 위한 파티지, 나는 그대로인데.

약을 빼먹으면 죽고 싶다는 생각이 거의 3초마다 들이친다.
파도라기보다 알람에 가깝다.
끊임없이, 성가시게, 정확하게.

그런데 이상하게도 그 생각은 가끔 아주 소소한 일들에 방해를 받는다.

내 안에서 너무 자주 반복되던 생각이 잠깐 리듬을 잃는다.
죽고 싶다는 마음은 늘 거창한 절망에서만 오는 줄 알았는데, 막상 그 반대편도 그렇지 않은 것 같다.
살고 싶다는 확신이 아니라, 그냥 지금 이 한 모금과 이 대화에 붙들리는 식으로도 사람은 잠시 멈춘다.

어쩌면 내가 정말 받은 건 꽃이 아니라 방해였는지도 모른다.
3초마다 들던 생각이, 오늘만큼은 자꾸 끊겼다.
닭발의 매운 맛에 한 번,
위스키 하이볼의 떫은 향에 한 번,
친구가 건넨 조금 못생긴 꽃다발에 또 한 번.

델피늄이랑 노란 장미였다.
“당신을 행복하게 해줄게요.”
“우정.”
꽃말은 너무 성실해서 오히려 어색했다.

포장은 솔직히 별로였다.
만원이면 될 것 같은 꽃다발인데 이만원이었다.
모양도 매끈하지 않았고, 손끝엔 종이의 거친 감촉이 남았다.
그런데도 그 조잡한 다발이, 잠깐, 정말 잠깐, 3초마다 들어오던 생각을 가로막았다.

축하라는 말은 부담스럽지만, 같이 밥을 먹고 술을 마시고 꽃을 건네받는 일은 견딜 수 있다.
어쩌면 나는 축하받고 싶은 게 아니라 방해받고 싶은 건지도 모른다.
죽고 싶다는 생각의 흐름을 누군가 아주 소박한 방식으로 끊어주는 것.
살아야 한다고 설득하는 대신, 그냥 같이 닭발을 먹고 하이볼을 마시고, 별로 예쁘지도 않은 꽃다발 하나를 건네는 것.
나는 그런 식의 다정함이 좋다.
너무 크지 않아서, 그래서 오히려 진짜 같아서.

완전히 사라지진 않는다.
다만 그 생각과 생각 사이에 틈이 생긴다.
나는 요즘 그 틈에서 숨을 쉰다.

결국 나는 여전히 나였다.
갑자기 좋아진 것도 아니고, 삶이 갑자기 아름다워진 것도 아니다.
그런데도 분명히 있었던 것은, 3초마다 들던 생각이 몇 번이나 방해받았다는 사실이다.
그리고 어쩌면 사람은 그렇게 살아남는지도 모른다.
아주 작은 방해들 덕분에.
끝까지 밀려오지 못한 절망들 덕분에.

그 정도면 아직은 충분하지 않아도,
적어도 완전히 아무것도 아닌 건 아니다.`,
    body: [
      "원래 있던 가족 모임은 취소됐다. 또 내 잘못이다.",
      "나는 오늘도 여전히 나였고, 그래서 ‘파티’라는 말을 쓰고 싶지 않았다. 축하의 형식을 갖춘다고 내가 달라지는 건 아니니까.",
      "약을 빼먹으면 죽고 싶다는 생각이 거의 3초마다 들이친다. 파도라기보다 알람에 가깝다.",
      "그런데 이상하게도 그 생각은 가끔 아주 소소한 일들에 방해를 받는다. 닭발의 매운 맛, 위스키 하이볼의 떫은 향, 친구가 건넨 조금 못생긴 꽃다발.",
      "델피늄이랑 노란 장미였다. 꽃말은 성실해서 오히려 어색했다.",
      "포장은 별로였고 가격도 예상보다 비쌌지만, 그 조잡한 다발이 잠깐 3초마다 들어오던 생각을 가로막았다.",
      "완전히 사라지진 않는다. 다만 그 생각과 생각 사이에 틈이 생긴다. 나는 요즘 그 틈에서 숨을 쉰다.",
      "아주 작은 방해들 덕분에, 끝까지 밀려오지 못한 절망들 덕분에, 오늘은 완전히 아무것도 아닌 날은 아니었다."
    ],
    tags: ["우정", "회복", "생존", "일상", "방해"],
    philosophyKey: "camus",
    philosophyTitle: "카뮈와 작은 방해로 버티는 하루",
    philosophyText:
      "카뮈의 시선으로 보면 이 기록은 거대한 희망이 아니라, 부조리한 반복을 사소한 감각으로 끊어내는 생의 기술에 가깝습니다. 해결보다 중단, 결론보다 순간의 밀도에 기대어 하루를 통과하려는 태도가 또렷하게 읽힙니다.",
    psychologyTitle: "반복적 위험 사고가 미시적 경험에 의해 완충되는 상태",
    psychologyText:
      "반복적으로 밀려오는 사고는 논리적 설득만으로 멈추기 어렵고, 감각·관계·리듬 같은 작은 현실 자극이 일시적 완충 지점을 만들 수 있습니다. 이 기록은 바로 그 완충의 작동 순간을 구체적으로 포착하고 있습니다.",
    psychologyState: "반복 사고 사이에 짧은 완충 틈이 생기는 상태",
    metrics: [63, 46, 34, 37, 58, 71],
    riskLevel: "high",
    updatedAt: "2026-03-23T21:10:00+09:00",
    revisitPrompts: [
      { label: "3일 후의 나", text: "오늘 나를 잠깐 멈추게 만든 방해들이 다시 작동하는지, 새로 생긴 방해는 무엇인지 적어보자." },
      { label: "한 달 후의 나", text: "버티는 방식이 조금이라도 넓어졌는지, 혼자 버티지 않기 위해 어떤 연결을 추가했는지 돌아보자." }
    ]
  },
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
    date: "2026-03-24",
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
    updatedAt: "2026-03-24T20:30:00+09:00",
    revisitPrompts: [
      { label: "입원 전후의 나", text: "혼자 결정하지 않아도 되는 공간이 실제로 어떤 안정을 주었는지, 혹은 어떤 불안을 남겼는지 적어보자." },
      { label: "3개월 후의 나", text: "그때 찾고 싶었던 안전장치가 지금은 어떤 형태로 내 곁에 남아 있는지 돌아보자." }
    ]
  },
  {
    id: "entry-2026-03-26",
    date: "2026-03-22",
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
    updatedAt: "2026-03-22T18:45:00+09:00",
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

function isEntryPrivate(entry) {
  return Boolean(entry?.isPrivate);
}

function canAccessEntry(entry) {
  if (!isEntryPrivate(entry)) return true;
  return unlockedPrivateEntryIds.has(entry.id);
}

function normalizeStoredEntry(entry) {
  if (!entry || typeof entry !== "object") return null;
  const safeEntry = { ...entry };
  delete safeEntry.privatePassword;
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

  const textPool = markdown || body.join("\n");
  const tags = Array.isArray(entry.tags)
    ? entry.tags.map((tag) => stripBrokenChars(tag)).filter(Boolean).slice(0, 5)
    : inferTagsFromBody(textPool);
  const safeTags = tags.length ? tags : inferTagsFromBody(textPool);
  const plain = plainTextFromMarkdown(textPool);
  const excerpt =
    typeof entry.excerpt === "string" && stripBrokenChars(entry.excerpt)
      ? stripBrokenChars(entry.excerpt)
      : (plain || body.join(" ")).slice(0, 110);
  const idDateMatch = id.match(/entry-(\d{4}-\d{2}-\d{2})/);
  const idDate = idDateMatch?.[1] || "";
  const dateFromEntry = normalizeDateNotFuture(entry.date);
  const dateFromUpdatedAt = normalizeDateNotFuture(entry.updatedAt);
  const safeIdDate = idDate;
  const forcedDate = ENTRY_DATE_OVERRIDES[id] || "";
  const date =
    normalizeDateNotFuture(forcedDate) ||
    dateFromEntry ||
    normalizeDateNotFuture(safeIdDate) ||
    dateFromUpdatedAt ||
    todayYmdSeoul();
  const philosophyKey =
    typeof entry.philosophyKey === "string" && philosopherCatalog[entry.philosophyKey]
      ? entry.philosophyKey
      : "camus";
  const philosopher = philosopherCatalog[philosophyKey];
  const riskLevel = ["low", "watch", "high", "critical"].includes(entry.riskLevel) ? entry.riskLevel : "watch";
  const metrics = Array.isArray(entry.metrics) && entry.metrics.length === 6 ? entry.metrics.map((value) => Number(value) || 0) : [66, 52, 44, 40, 55, 52];

  return {
    ...safeEntry,
    id,
    title,
    date,
    markdown: markdown || body.join("\n\n"),
    body,
    tags: safeTags,
    excerpt,
    philosophyKey,
    philosophyTitle:
      typeof entry.philosophyTitle === "string" && entry.philosophyTitle.trim()
        ? entry.philosophyTitle
        : `${philosopher.name}의 언어로 다시 읽는 오늘의 기록`,
    philosophyText:
      typeof entry.philosophyText === "string" && entry.philosophyText.trim()
        ? entry.philosophyText
        : philosopher.description,
    psychologyTitle:
      typeof entry.psychologyTitle === "string" && entry.psychologyTitle.trim()
        ? entry.psychologyTitle
        : "지금의 상태를 기록으로 붙잡는 구간",
    psychologyText:
      typeof entry.psychologyText === "string" && entry.psychologyText.trim()
        ? entry.psychologyText
        : "정답을 강요하지 않고 현재 감정의 패턴을 관찰하는 기록은 회복의 시작점이 될 수 있습니다.",
    psychologyState:
      typeof entry.psychologyState === "string" && entry.psychologyState.trim()
        ? entry.psychologyState
        : "관찰과 회복이 함께 필요한 상태",
    metrics,
    riskLevel,
    isPrivate: Boolean(entry.isPrivate),
    isLocked: Boolean(entry.isLocked && entry.isPrivate),
    updatedAt: normalizeUpdatedAt(entry.updatedAt, date),
    revisitPrompts:
      Array.isArray(entry.revisitPrompts) && entry.revisitPrompts.length
        ? entry.revisitPrompts
        : [
            { label: "7일 후의 나", text: "이 감정의 밀도와 방향이 어떻게 달라졌는지 짧게 적어보자." },
            { label: "1년 후의 나", text: "오늘의 기록이 어떤 변화의 출발점이었는지 돌아보자." }
          ]
  };
}

function normalizeEntryList(list) {
  if (!Array.isArray(list)) return [];
  return list.map(normalizeStoredEntry).filter(Boolean);
}

function mergeEntriesByPriority(...lists) {
  const byId = new Map();
  lists.forEach((list) => {
    normalizeEntryList(list).forEach((entry) => {
      byId.set(entry.id, entry);
    });
  });
  return Array.from(byId.values()).sort(compareEntriesDesc);
}

function loadEntries() {
  return defaultEntries;
}

function saveEntries() {
  return;
}

async function fetchServerEntries() {
  try {
    const response = await fetch("/api/entries");
    if (!response.ok) return null;
    const payload = await response.json();
    if (!payload?.ok || !Array.isArray(payload.entries)) return null;
    return normalizeEntryList(payload.entries);
  } catch {
    return null;
  }
}

async function syncEntriesToServer() {
  try {
    const response = await fetch("/api/entries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entries })
    });
    if (!response.ok) return false;
    const payload = await response.json();
    return Boolean(payload?.ok);
  } catch {
    return false;
  }
}

async function refreshEntriesFromServer() {
  const serverEntries = await fetchServerEntries();
  if (!serverEntries) return false;
  entries = mergeEntriesByPriority(defaultEntries, serverEntries);
  currentEntryId = entries.find((entry) => entry.id === currentEntryId)?.id || entries[0]?.id || "";
  rerenderAll();
  void fetchCommentCounts();
  return true;
}

async function fetchChatArchivePayload() {
  if (!chatArchiveAccess.canAccess) return null;
  try {
    const response = await fetch("/api/chat-archive");
    if (!response.ok) return null;
    const payload = await response.json();
    return payload?.archive || null;
  } catch {
    return null;
  }
}

async function fetchChatArchiveAccess() {
  try {
    const response = await fetch("/api/chat-archive/access");
    if (!response.ok) return { canAccess: false, configured: false };
    const payload = await response.json();
    return {
      canAccess: Boolean(payload?.canAccess),
      configured: Boolean(payload?.configured)
    };
  } catch {
    return { canAccess: false, configured: false };
  }
}

async function fetchAdminAccess() {
  try {
    const response = await fetch("/api/admin/access");
    if (!response.ok) return { canAccess: false, configured: false };
    const payload = await response.json();
    return {
      canAccess: Boolean(payload?.canAccess),
      configured: Boolean(payload?.configured)
    };
  } catch {
    return { canAccess: false, configured: false };
  }
}

function applyChatArchiveVisibility() {
  const chatArchiveRouteLink = routeLinks.find((link) => link.getAttribute("href") === "#chat-archive");
  if (!chatArchiveRouteLink) return;
  chatArchiveRouteLink.classList.toggle("is-locked", chatArchiveAccess.configured && !chatArchiveAccess.canAccess);
}

function riskToneClass(riskLevel) {
  return ["low", "watch", "high", "critical"].includes(riskLevel) ? riskLevel : "watch";
}

function renderArchiveDetailCard(title, items) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!list.length) return "";
  return `
    <article class="chat-detail-card">
      <p class="eyebrow">${escapeHtml(title)}</p>
      <ul class="chat-detail-list">
        ${list.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </article>
  `;
}

function renderChatArchive() {
  if (!chatArchiveUi.summary || !chatArchiveUi.methodology || !chatArchiveUi.segments) return;
  if (!chatArchivePayload) {
    const accessCopy = chatArchiveAccess.configured
      ? "이 페이지는 잠겨 있습니다. 비밀번호를 입력하면 이 브라우저에서만 열립니다."
      : "서버에 비밀번호 보호 설정이 아직 연결되지 않아 Chat Archive를 열 수 없습니다.";
    chatArchiveUi.summary.innerHTML = `
      <p class="eyebrow">Private Archive</p>
      <h3>잠긴 기록 페이지</h3>
      <p class="note-copy">${escapeHtml(accessCopy)}</p>
    `;
    chatArchiveUi.methodology.innerHTML = `
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Locked View</p>
          <h3>비공개 아카이브</h3>
        </div>
        <span class="date-pill">${chatArchiveAccess.configured ? "password" : "setup needed"}</span>
      </div>
      <p class="note-copy">페이지 자체는 남겨 두되, 실제 대화 데이터는 서버에서 직접 잠가 둡니다. 정적 JSON이나 프론트 소스만으로는 원문을 받을 수 없도록 처리되어 있습니다.</p>
    `;
    chatArchiveUi.segments.innerHTML = `
      <article class="paper-card chat-segment-card chat-archive-locked-card">
        <div class="chat-archive-dim"></div>
        <div class="chat-archive-lock-body">
          <p class="eyebrow">Locked Archive</p>
          <h3>업로드 대화 감정 아카이브</h3>
          <p class="note-copy">권한이 없는 요청에서는 세그먼트 데이터를 서버가 내려주지 않습니다. 이 브라우저에서만 열 수 있도록 비밀번호로 잠겨 있습니다.</p>
          ${
            chatArchiveAccess.configured
              ? `
                <form id="chatArchiveUnlockForm" class="chat-archive-unlock-form">
                  <label class="field">
                    <span>비밀번호</span>
                    <input id="chatArchivePasswordInput" type="password" autocomplete="current-password" placeholder="비밀번호 입력" />
                  </label>
                  <div class="comment-actions">
                    <button type="submit" class="ghost-button strong">열기</button>
                    <p id="chatArchiveUnlockStatus" class="helper-copy"></p>
                  </div>
                </form>
              `
              : `<p class="helper-copy">서버 비밀번호 설정이 아직 비어 있습니다.</p>`
          }
        </div>
      </article>
    `;
    const unlockForm = document.getElementById("chatArchiveUnlockForm");
    if (unlockForm) {
      unlockForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const passwordInput = document.getElementById("chatArchivePasswordInput");
        const status = document.getElementById("chatArchiveUnlockStatus");
        if (!passwordInput || !status) return;
        status.textContent = "확인 중…";
        try {
          const response = await fetch("/api/chat-archive/unlock", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: passwordInput.value })
          });
          const payload = await response.json().catch(() => ({}));
          if (!response.ok || !payload?.ok) {
            status.textContent = "비밀번호가 맞지 않습니다.";
            return;
          }
          chatArchiveAccess = { canAccess: true, configured: true };
          applyChatArchiveVisibility();
          chatArchivePayload = await fetchChatArchivePayload();
          renderChatArchive();
        } catch {
          status.textContent = "잠금 해제 중 오류가 발생했습니다.";
        }
      });
    }
    return;
  }

  const stats = chatArchivePayload.summaryStats || {};
  const speakerInference = chatArchivePayload.speakerInference || {};
  const cycleSummary = chatArchivePayload.cycleSummary || {};
  const segments = Array.isArray(chatArchivePayload.segments) ? chatArchivePayload.segments : [];
  const userSignals = Array.isArray(speakerInference.userSignals) ? speakerInference.userSignals : [];
  const assistantSignals = Array.isArray(speakerInference.assistantSignals) ? speakerInference.assistantSignals : [];
  const cycleSteps = Array.isArray(cycleSummary.steps) ? cycleSummary.steps : [];

  chatArchiveUi.summary.innerHTML = `
    <p class="eyebrow">Archive Snapshot</p>
    <h3>${escapeHtml(chatArchivePayload.title || "업로드 대화 감정 아카이브")}</h3>
    <p class="note-copy">${escapeHtml(chatArchivePayload.note || "")}</p>
    <article class="chat-archive-observer-callout">
      <p class="eyebrow">Observer Lens</p>
      <p>${escapeHtml(chatArchivePayload.observerLens || "")}</p>
    </article>
    <div class="chat-archive-stat-grid">
      <article class="chat-archive-stat-card">
        <strong>${Number(stats.segmentCount || segments.length || 0)}</strong>
        <span>격화 구간</span>
      </article>
      <article class="chat-archive-stat-card">
        <strong>${Number(stats.criticalSegments || 0)}</strong>
        <span>critical</span>
      </article>
      <article class="chat-archive-stat-card">
        <strong>${escapeHtml(chatArchivePayload.lastKnownConversationDate || "미상")}</strong>
        <span>마지막 확인일</span>
      </article>
    </div>
    <div class="chat-archive-meta-list">
      <div>
        <span>원본 파일</span>
        <strong>${escapeHtml(chatArchivePayload.sourceFile || "미상")}</strong>
      </div>
      <div>
        <span>화자 추정 신뢰도</span>
        <strong>${escapeHtml(speakerInference.confidence || "unknown")}</strong>
      </div>
      <div>
        <span>분류 방식</span>
        <strong>${escapeHtml(chatArchivePayload.coverageMode || "manual")}</strong>
      </div>
    </div>
    <div class="comment-actions">
      <button id="chatArchiveLockButton" class="ghost-button" type="button">잠금</button>
      <p class="helper-copy">이 브라우저에서는 잠금 해제된 상태입니다.</p>
    </div>
    <article class="chat-archive-loop-card">
      <p class="eyebrow">${escapeHtml(cycleSummary.title || "반복 루프")}</p>
      <p class="note-copy">${escapeHtml(cycleSummary.description || "")}</p>
      <ol class="chat-cycle-list">
        ${cycleSteps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ol>
    </article>
  `;
  const lockButton = document.getElementById("chatArchiveLockButton");
  if (lockButton) {
    lockButton.addEventListener("click", async () => {
      try {
        await fetch("/api/chat-archive/lock", { method: "POST" });
      } catch {
        // Ignore lock errors.
      }
      chatArchiveAccess = { canAccess: false, configured: chatArchiveAccess.configured };
      chatArchivePayload = null;
      applyChatArchiveVisibility();
      renderChatArchive();
    });
  }

  chatArchiveUi.methodology.innerHTML = `
    <div class="panel-heading">
      <div>
        <p class="eyebrow">Speaker Inference</p>
        <h3>화자 구분 근거</h3>
      </div>
      <span class="date-pill">timestamps 없음</span>
    </div>
    <p class="note-copy">파일에 화자명과 시간이 없어, 아래 신호를 기준으로 사용자/ChatGPT 발화를 추정했다. 저강도 분석 구간은 과감히 압축하고, 감정 진폭이 급격히 커지는 창만 남겼다.</p>
    <div class="chat-method-grid">
      <article class="chat-method-card">
        <p class="eyebrow">추정: 사용자</p>
        <ul class="chat-method-list">
          ${userSignals.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>
      <article class="chat-method-card">
        <p class="eyebrow">추정: ChatGPT</p>
        <ul class="chat-method-list">
          ${assistantSignals.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>
    </div>
  `;

  chatArchiveUi.segments.innerHTML = segments
    .map((segment) => {
      const intensity = Math.max(1, Math.min(5, Number(segment.intensity || 1)));
      const quotes = Array.isArray(segment.quotes) ? segment.quotes.slice(0, 3) : [];
      const bodySignals = Array.isArray(segment.bodySignals) ? segment.bodySignals : [];
      const detailCards = [
        renderArchiveDetailCard("당시 머릿속 규칙", segment.cognitivePatterns),
        renderArchiveDetailCard("버틴 방식", segment.copingAttempts),
        renderArchiveDetailCard("다시 무너뜨린 요인", segment.reescalationTriggers),
        renderArchiveDetailCard("실제로 필요했던 것", segment.actualNeeds)
      ]
        .filter(Boolean)
        .join("");
      return `
        <article class="paper-card chat-segment-card risk-${riskToneClass(segment.riskLevel)}">
          <div class="chat-segment-head">
            <div>
              <p class="eyebrow">Segment ${Number(segment.order || 0)}</p>
              <h3>${escapeHtml(segment.title || "이름 없는 구간")}</h3>
            </div>
            <div class="chat-segment-badges">
              <span class="date-pill">${escapeHtml(segment.lineRange || "line range 없음")}</span>
              <span class="risk-chip">${escapeHtml(segment.riskLevel || "watch")}</span>
            </div>
          </div>
          <div class="chat-segment-subhead">
            <div class="chat-segment-phase-row">
              <span class="meta-quiet">${escapeHtml(segment.phase || "")}</span>
              ${segment.cycleStage ? `<span class="chat-cycle-chip">${escapeHtml(segment.cycleStage)}</span>` : ""}
            </div>
            <div class="chat-intensity" aria-label="감정 강도 ${intensity}/5">
              ${Array.from({ length: 5 }, (_, index) => `<span class="chat-intensity-dot${index < intensity ? " is-active" : ""}"></span>`).join("")}
            </div>
          </div>
          <p class="note-copy">${escapeHtml(segment.turningPoint || "")}</p>
          <article class="chat-segment-observer">
            <p class="eyebrow">관찰자 시점</p>
            <p>${escapeHtml(segment.observerNote || "")}</p>
            ${segment.internalRule ? `<p class="chat-internal-rule"><strong>당시 내 안의 규칙</strong>${escapeHtml(segment.internalRule)}</p>` : ""}
            ${
              bodySignals.length
                ? `<div class="chat-signal-row">${bodySignals.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`
                : ""
            }
          </article>
          <div class="tag-row">
            ${(Array.isArray(segment.dominantEmotions) ? segment.dominantEmotions : []).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>
          <div class="chat-segment-columns">
            <article class="chat-segment-panel">
              <p class="eyebrow">추정: 나</p>
              <p>${escapeHtml(segment.userStateSummary || "")}</p>
            </article>
            <article class="chat-segment-panel">
              <p class="eyebrow">추정: ChatGPT</p>
              <p>${escapeHtml(segment.assistantRoleSummary || "")}</p>
            </article>
          </div>
          <div class="chat-segment-footer">
            <div class="tag-row">
              ${(Array.isArray(segment.dominantThemes) ? segment.dominantThemes : []).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
            </div>
            ${detailCards ? `<div class="chat-detail-grid">${detailCards}</div>` : ""}
            <div class="chat-quote-list">
              ${quotes
                .map(
                  (quote) => `
                    <blockquote class="chat-quote-card">
                      <p>${escapeHtml(quote.text || "")}</p>
                      <footer>${escapeHtml(quote.speaker || "추정 화자")}</footer>
                    </blockquote>
                  `
                )
                .join("")}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function isAdminUnlocked() {
  return Boolean(adminAccess.canAccess);
}

function setRoute(route) {
  const pageKeys = new Set(pages.map((page) => page.dataset.page));
  const fallback = "journal";
  const candidate = !route || route === "entry" ? fallback : route;
  const normalized = pageKeys.has(candidate) ? candidate : fallback;
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
  const aUpdated = a.updatedAt || "";
  const bUpdated = b.updatedAt || "";
  if (aUpdated !== bUpdated) return aUpdated < bUpdated ? 1 : -1;
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;
  return a.id < b.id ? 1 : -1;
}

const philosophyMbtiById = Object.fromEntries(PHILOSOPHY_MBTI_POOL.map((item) => [item.id, item]));
const PHILOSOPHY_MBTI_MAX_QUESTIONS = 20;
const PHILOSOPHY_MBTI_MIN_CONCEPTS = 4;
const PHILOSOPHY_MBTI_MIN_DISLIKES = 4;
const PHILOSOPHY_MBTI_QUESTIONS = [
  { id: "q1", prompt: "문제가 생겼을 때 먼저 하는 행동은?", optionA: { title: "원인과 구조를 해석한다", subtitle: "논리로 구조를 먼저 본다", next: "q2", weights: { spinoza: 2, aristotle: 1, epictetus: 1 } }, optionB: { title: "지금 감정과 욕구를 확인한다", subtitle: "몸과 정서를 먼저 읽는다", next: "q3", weights: { camus: 1, buddha: 2, simone: 1 } } },
  { id: "q2", prompt: "불확실한 미래가 올 때 더 가까운 태도는?", optionA: { title: "통제 가능한 것만 잡는다", subtitle: "범위를 줄인다", next: "q4", weights: { epictetus: 2, seneca: 1, marcus: 1 } }, optionB: { title: "불확실성 자체를 견디며 실험한다", subtitle: "작게 시도한다", next: "q5", weights: { dewey: 2, nietzsche: 1, sartre: 1 } } },
  { id: "q3", prompt: "관계 갈등이 생기면 어디를 먼저 보나요?", optionA: { title: "내 책임과 선택", subtitle: "내가 바꿀 수 있는 것", next: "q5", weights: { sartre: 2, kierkegaard: 1, marcus: 1 } }, optionB: { title: "관계 구조와 맥락", subtitle: "권력·역할·환경", next: "q6", weights: { simone: 2, arendt: 1, confucius: 1 } } },
  { id: "q4", prompt: "감정이 크게 흔들릴 때 선호하는 방식은?", optionA: { title: "호흡과 거리두기", subtitle: "반응 시간을 확보한다", next: "q7", weights: { buddha: 2, epictetus: 1, laozi: 1 } }, optionB: { title: "정면 돌파로 의미를 만든다", subtitle: "행동으로 해소한다", next: "q8", weights: { nietzsche: 2, camus: 1, sartre: 1 } } },
  { id: "q5", prompt: "삶의 기준은 무엇에 더 가까운가요?", optionA: { title: "보편적 기준과 규범", subtitle: "좋은 삶의 기준점", next: "q8", weights: { plato: 2, aristotle: 1, confucius: 1 } }, optionB: { title: "상황 속에서 갱신되는 기준", subtitle: "경험으로 수정", next: "q9", weights: { dewey: 2, camus: 1, simone: 1 } } },
  { id: "q6", prompt: "사회와 개인의 관계를 볼 때?", optionA: { title: "개인 선택을 우선 본다", subtitle: "주체적 결단", next: "q9", weights: { sartre: 2, nietzsche: 1, epictetus: 1 } }, optionB: { title: "구조와 제도 분석이 먼저다", subtitle: "맥락을 본다", next: "q10", weights: { arendt: 2, simone: 1, confucius: 1 } } },
  { id: "q7", prompt: "고통을 다룰 때 더 끌리는 문장은?", optionA: { title: "집착을 놓으면 고통이 약해진다", subtitle: "관찰과 이완", next: "q11", weights: { buddha: 2, laozi: 1, spinoza: 1 } }, optionB: { title: "부조리해도 끝까지 살아낸다", subtitle: "반항적 지속", next: "q12", weights: { camus: 2, nietzsche: 1, kierkegaard: 1 } } },
  { id: "q8", prompt: "성장 방식으로 더 맞는 것은?", optionA: { title: "습관과 훈련의 누적", subtitle: "반복으로 형성", next: "q12", weights: { aristotle: 2, marcus: 1, seneca: 1 } }, optionB: { title: "결정적 전환과 도약", subtitle: "질적 변화", next: "q13", weights: { kierkegaard: 2, nietzsche: 1, sartre: 1 } } },
  { id: "q9", prompt: "나를 이해하는 방법은?", optionA: { title: "질문으로 전제를 벗긴다", subtitle: "문답과 검증", next: "q13", weights: { socrates: 2, spinoza: 1, plato: 1 } }, optionB: { title: "행동 실험으로 확인한다", subtitle: "해보며 배운다", next: "q14", weights: { dewey: 2, camus: 1, arendt: 1 } } },
  { id: "q10", prompt: "윤리 판단이 필요할 때?", optionA: { title: "공동체 영향까지 계산", subtitle: "공적 책임", next: "q14", weights: { arendt: 2, confucius: 1, plato: 1 } }, optionB: { title: "내 삶의 진정성 우선", subtitle: "고유성 점검", next: "q15", weights: { heidegger: 2, sartre: 1, kierkegaard: 1 } } },
  { id: "q11", prompt: "복잡한 감정이 올 때", optionA: { title: "메커니즘을 분석한다", subtitle: "왜 이런지 파악", next: "q15", weights: { spinoza: 2, epictetus: 1, socrates: 1 } }, optionB: { title: "잠시 멈추고 흘려보낸다", subtitle: "과열을 낮춘다", next: "q16", weights: { buddha: 2, laozi: 1, marcus: 1 } } },
  { id: "q12", prompt: "의미 없는 반복을 느낄 때", optionA: { title: "그래도 오늘을 지속한다", subtitle: "버팀의 리듬", next: "q16", weights: { camus: 2, marcus: 1, epictetus: 1 } }, optionB: { title: "규칙을 다시 쓰고 새로 만든다", subtitle: "창조의 방향", next: "q17", weights: { nietzsche: 2, dewey: 1, sartre: 1 } } },
  { id: "q13", prompt: "타인의 시선이 부담될 때", optionA: { title: "질문으로 시선의 근거를 해체", subtitle: "논리적 분해", next: "q17", weights: { socrates: 2, spinoza: 1, arendt: 1 } }, optionB: { title: "내 선택의 책임을 수용", subtitle: "주체적 결정", next: "q18", weights: { sartre: 2, kierkegaard: 1, heidegger: 1 } } },
  { id: "q14", prompt: "현실 문제 해결 전략으로 맞는 것", optionA: { title: "작은 실험 후 수정", subtitle: "피드백 루프", next: "q18", weights: { dewey: 2, arendt: 1, aristotle: 1 } }, optionB: { title: "원칙을 먼저 세우고 집행", subtitle: "기준 선행", next: "q19", weights: { plato: 2, confucius: 1, epictetus: 1 } } },
  { id: "q15", prompt: "불안이 깊어질수록 나는", optionA: { title: "죽음·유한성을 의식해 우선순위 정리", subtitle: "진정성 점검", next: "q19", weights: { heidegger: 2, camus: 1, marcus: 1 } }, optionB: { title: "관계적 의무와 역할을 재정렬", subtitle: "관계 윤리", next: "q20", weights: { confucius: 2, simone: 1, arendt: 1 } } },
  { id: "q16", prompt: "회복 방식은 어떤 쪽인가요?", optionA: { title: "내면 정돈", subtitle: "고요·거리두기", next: "q20", weights: { buddha: 2, laozi: 1, epictetus: 1 } }, optionB: { title: "행동 정돈", subtitle: "루틴·실천", next: "q18", weights: { marcus: 2, aristotle: 1, dewey: 1 } } },
  { id: "q17", prompt: "나는 나를 어떤 방식으로 바꾸는가?", optionA: { title: "기준을 넘어서 재창조", subtitle: "새 가치 만들기", next: "q20", weights: { nietzsche: 2, sartre: 1, camus: 1 } }, optionB: { title: "원칙과 훈련으로 재정비", subtitle: "절제와 정렬", next: "q19", weights: { epictetus: 2, seneca: 1, marcus: 1 } } },
  { id: "q18", prompt: "마지막으로 더 가까운 신념은?", optionA: { title: "유연함이 지혜다", subtitle: "상황 적응", next: "q20", weights: { laozi: 2, dewey: 1, buddha: 1 } }, optionB: { title: "책임이 자유를 만든다", subtitle: "결정의 무게", next: "q20", weights: { arendt: 1, sartre: 2, simone: 1 } } },
  { id: "q19", prompt: "나를 지탱하는 핵심 문장은?", optionA: { title: "원칙을 지켜야 내가 선다", subtitle: "규범과 훈련", next: "q20", weights: { plato: 1, aristotle: 2, confucius: 1 } }, optionB: { title: "해석을 바꾸면 삶이 바뀐다", subtitle: "인지 재구성", next: "q20", weights: { spinoza: 2, epictetus: 1, marcus: 1 } } },
  { id: "q20", prompt: "끝으로, 당신에게 더 맞는 결론은?", optionA: { title: "삶은 이해와 훈련의 연속", subtitle: "정렬된 지속", next: null, weights: { marcus: 2, epictetus: 1, aristotle: 1 } }, optionB: { title: "삶은 불확실 속 선택의 예술", subtitle: "창조적 책임", next: null, weights: { camus: 1, sartre: 2, nietzsche: 1 } } }
];
const philosophyQuestionById = Object.fromEntries(PHILOSOPHY_MBTI_QUESTIONS.map((q) => [q.id, q]));

function philosopherPortraitStyle(name = "") {
  const key = String(name).toLowerCase();
  const base = {
    wood1: "#ead8c2",
    wood2: "#d9b892",
    wood3: "#c89a6a",
    hair: "#4c3a2f",
    outfit: "#5f6b86",
    beard: false,
    hairType: "cap",
    accessory: "none"
  };
  if (key.includes("카뮈")) return { ...base, hair: "#4f3a33", outfit: "#53647f", hairType: "cap", accessory: "none" };
  if (key.includes("니체")) return { ...base, hair: "#5a4037", outfit: "#6a587d", beard: true, hairType: "spike", accessory: "mustache" };
  if (key.includes("사르트르")) return { ...base, hair: "#47312d", outfit: "#4e5f78", hairType: "side", accessory: "glasses" };
  if (key.includes("보부아르")) return { ...base, hair: "#2f2a29", outfit: "#775e8a", hairType: "bob", accessory: "earring" };
  if (key.includes("붓다")) return { ...base, wood1: "#e9d1b4", wood2: "#dbb18b", hair: "#2f2f2f", outfit: "#9a6f56", hairType: "bun", accessory: "none" };
  if (key.includes("노자")) return { ...base, wood1: "#ead0b2", wood2: "#d4ac84", hair: "#6a6a6a", outfit: "#6b7a69", beard: true, hairType: "long", accessory: "none" };
  if (key.includes("공자")) return { ...base, hair: "#4a443f", outfit: "#6a5e7e", beard: true, hairType: "topknot", accessory: "none" };
  if (key.includes("아렌트")) return { ...base, hair: "#3b3433", outfit: "#5f6a84", hairType: "bob", accessory: "earring" };
  if (key.includes("듀이")) return { ...base, hair: "#6a5f54", outfit: "#4e6e80", hairType: "parted", accessory: "none" };
  if (key.includes("하이데거")) return { ...base, hair: "#4e4037", outfit: "#616577", hairType: "parted", accessory: "none" };
  if (key.includes("스피노자")) return { ...base, hair: "#2c2a2a", outfit: "#55667f", hairType: "curly", accessory: "none" };
  if (key.includes("소크라테스")) return { ...base, hair: "#5a4a42", outfit: "#5a677b", beard: true, hairType: "bald", accessory: "none" };
  if (key.includes("플라톤")) return { ...base, hair: "#5c4a3f", outfit: "#6a6882", beard: true, hairType: "wavy", accessory: "none" };
  if (key.includes("아리스토텔레스")) return { ...base, hair: "#59483e", outfit: "#5a6f7d", beard: true, hairType: "side", accessory: "none" };
  if (key.includes("세네카")) return { ...base, hair: "#6a5749", outfit: "#6f6280", beard: true, hairType: "bald", accessory: "none" };
  if (key.includes("에픽테토스")) return { ...base, hair: "#52453c", outfit: "#5c687b", beard: true, hairType: "bald", accessory: "none" };
  return base;
}

function buildHumanAvatarDataUri(name = "Philosopher") {
  const trimmed = String(name || "Philosopher").trim();
  const s = philosopherPortraitStyle(trimmed);
  const hairShapes = {
    cap: `<polygon points="108,146 180,92 252,146 252,168 108,168" fill="${s.hair}" />`,
    spike: `<polygon points="96,156 126,114 156,140 180,102 204,140 234,114 264,156 264,172 96,172" fill="${s.hair}" />`,
    side: `<polygon points="100,150 176,98 258,146 258,174 100,174" fill="${s.hair}" /><polygon points="214,118 256,146 256,194 214,176" fill="#000" fill-opacity=".12"/>`,
    bob: `<polygon points="96,152 180,98 264,152 248,238 112,238" fill="${s.hair}" />`,
    bun: `<polygon points="180,72 200,92 180,112 160,92" fill="${s.hair}" /><polygon points="102,154 180,102 258,154 258,178 102,178" fill="${s.hair}" />`,
    long: `<polygon points="98,152 180,98 262,152 248,260 112,260" fill="${s.hair}" />`,
    topknot: `<polygon points="180,66 194,82 180,98 166,82" fill="${s.hair}" /><polygon points="104,154 180,102 256,154 256,184 104,184" fill="${s.hair}" />`,
    parted: `<polygon points="98,152 180,98 262,152 262,176 98,176" fill="${s.hair}"/><line x1="180" y1="102" x2="180" y2="168" stroke="#fff" stroke-opacity=".24" stroke-width="4"/>`,
    curly: `<polygon points="98,152 180,98 262,152 262,176 98,176" fill="${s.hair}"/><circle cx="124" cy="128" r="10" fill="${s.hair}"/><circle cx="236" cy="128" r="10" fill="${s.hair}"/>`,
    wavy: `<polygon points="98,152 180,98 262,152 262,176 98,176" fill="${s.hair}"/><path d="M116 146c18-10 36-16 64-16s46 6 64 16" stroke="#fff" stroke-opacity=".2" stroke-width="5" fill="none"/>`,
    bald: `<polygon points="118,158 180,122 242,158 242,172 118,172" fill="${s.hair}" fill-opacity=".35"/>`
  };
  const accessoryShapes = {
    none: "",
    glasses: `<rect x="134" y="184" width="30" height="22" rx="4" fill="none" stroke="#33485c" stroke-width="3"/><rect x="196" y="184" width="30" height="22" rx="4" fill="none" stroke="#33485c" stroke-width="3"/><line x1="164" y1="195" x2="196" y2="195" stroke="#33485c" stroke-width="3"/>`,
    earring: `<circle cx="124" cy="214" r="4" fill="${s.wood3}" /><circle cx="236" cy="214" r="4" fill="${s.wood3}" />`,
    mustache: `<path d="M150 226c8 10 16 10 24 0M186 226c8 10 16 10 24 0" stroke="${s.hair}" stroke-width="4" stroke-linecap="round" fill="none"/>`
  };
  const beard = s.beard
    ? `<polygon points="140,238 180,276 220,238 208,264 180,286 152,264" fill="${s.hair}" fill-opacity=".9"/>`
    : "";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="420" viewBox="0 0 360 420" role="img" aria-label="${escapeHtml(trimmed)}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f5eee6" />
          <stop offset="100%" stop-color="#ecdcc8" />
        </linearGradient>
      </defs>
      <rect width="360" height="420" fill="url(#g)" />
      <rect x="32" y="34" width="296" height="352" rx="40" fill="#fffdfb" fill-opacity="0.74" />
      <ellipse cx="180" cy="350" rx="94" ry="18" fill="#2f4858" fill-opacity=".08" />
      <polygon points="96,372 180,286 264,372" fill="${s.outfit}" />
      <polygon points="124,372 180,316 236,372" fill="${s.wood3}" fill-opacity=".42" />
      <polygon points="180,122 242,156 242,236 180,270 118,236 118,156" fill="${s.wood1}" />
      <polygon points="180,140 226,164 226,224 180,250 134,224 134,164" fill="${s.wood2}" fill-opacity=".48" />
      ${hairShapes[s.hairType] || hairShapes.short}
      ${accessoryShapes[s.accessory] || ""}
      <circle cx="156" cy="196" r="5" fill="#2f4858" />
      <circle cx="204" cy="196" r="5" fill="#2f4858" />
      <polygon points="180,198 188,214 172,214" fill="#9c7f65"/>
      <path d="M160 228c8 8 14 10 20 10s12-2 20-10" stroke="#815a4a" stroke-width="4" stroke-linecap="round" fill="none"/>
      ${beard}
      <text x="180" y="404" text-anchor="middle" font-size="22" font-family="Noto Sans KR, Manrope, sans-serif" font-weight="800" fill="#2f4858">${escapeHtml(trimmed)}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function setPhilosopherImage(imgEl, src, name) {
  if (!imgEl) return;
  imgEl.src = buildHumanAvatarDataUri(name);
}

function supplementalConceptsFor(philosopher) {
  return [
    {
      id: "value-reframe",
      title: "가치 재정의",
      summary: "지금의 기준을 다시 정리해 방향을 선명하게 한다.",
      benefit: `${philosopher.name}의 관점에서 중요한 가치의 우선순위를 다시 잡아, 흔들릴 때 판단 기준을 빠르게 회복합니다.`,
      shadow: "기준을 급격히 바꾸면 기존 관계나 루틴과 충돌할 수 있습니다.",
      recovery: "기준을 전면 교체하지 말고, 1~2주 단위로 작은 행동 규칙부터 바꿔 정착률을 높입니다.",
      alternative: "듀이식 접근으로 작은 실험 단위를 만들어 부작용을 검증하며 이동할 수 있습니다."
    },
    {
      id: "relational-balance",
      title: "관계 균형 재배치",
      summary: "자기 기준과 타인 배려의 비율을 조정한다.",
      benefit: "갈등 상황에서도 자책 또는 타인탓으로 치우치지 않고 균형점을 찾기 쉬워집니다.",
      shadow: "지나친 균형 추구는 결정 지연을 만들 수 있습니다.",
      recovery: "우선순위 1개만 먼저 확정하고, 관계 조율은 그다음 순서로 분리해 진행합니다.",
      alternative: "아렌트처럼 책임 범위를 명확히 구획하면 피로를 줄일 수 있습니다."
    },
    {
      id: "recovery-rhythm",
      title: "회복 리듬 설계",
      summary: "생각 정리와 실행 복귀의 리듬을 만든다.",
      benefit: "철학적 성찰이 실제 생활 개선으로 연결될 확률이 올라갑니다.",
      shadow: "리듬이 깨졌을 때 다시 무기력해질 수 있습니다.",
      recovery: "실패한 날을 예외 처리하지 말고 다음 슬롯에 즉시 복귀해 연속성을 회복합니다.",
      alternative: "마르쿠스식 짧은 기록 + 즉시 행동 1개 작성 방식이 복귀를 돕습니다."
    }
  ];
}

function supplementalDislikesFor(philosopher) {
  return [
    {
      id: "too-abstract",
      label: "너무 추상적이라 현실에 적용이 어려워요",
      response: `${philosopher.name}의 개념은 문장보다 행동 단위로 번역할 때 효과가 커집니다. 오늘 1개 행동으로 줄이면 적용성이 올라갑니다.`,
      alt: "듀이: 원칙 대신 작은 실험으로 바로 적용해 본다."
    },
    {
      id: "too-heavy",
      label: "너무 무겁고 부담이 커져요",
      response: "철학을 정답으로 쓰면 압박이 커집니다. 임시 가설로 두고 일상 기능 회복을 먼저 잡는 편이 안전합니다.",
      alt: "노자: 개입 강도를 낮추고 회복 에너지를 먼저 확보한다."
    },
    {
      id: "too-slow",
      label: "생각이 길어져 실행이 늦어져요",
      response: "해석 시간과 실행 시간을 분리하면 지연이 줄어듭니다. 10분 해석 후 20분 행동 슬롯처럼 고정하세요.",
      alt: "아리스토텔레스: 충분히 좋은 기준으로 먼저 실행하고 수정한다."
    },
    {
      id: "does-not-fit-me",
      label: "나랑 결이 안 맞는 느낌이에요",
      response: "결과는 고정 진단이 아니라 현재 선택 경향의 스냅샷입니다. 불편한 지점 체크 후 보정 해석을 참고해 재시작하면 정확도가 올라갑니다.",
      alt: "사르트르: 현재의 선택을 다시 고르면 결과도 바뀔 수 있다."
    }
  ];
}

function getDisplayConcepts(philosopher) {
  const base = Array.isArray(philosopher?.concepts) ? [...philosopher.concepts] : [];
  const seen = new Set(base.map((item) => item.id));
  supplementalConceptsFor(philosopher).forEach((item) => {
    if (base.length >= 5) return;
    if (seen.has(item.id)) return;
    base.push(item);
    seen.add(item.id);
  });
  return base.slice(0, Math.max(PHILOSOPHY_MBTI_MIN_CONCEPTS, Math.min(5, base.length)));
}

function getDisplayDislikes(philosopher) {
  const base = Array.isArray(philosopher?.dislikes) ? [...philosopher.dislikes] : [];
  const seen = new Set(base.map((item) => item.id));
  supplementalDislikesFor(philosopher).forEach((item) => {
    if (base.length >= 5) return;
    if (seen.has(item.id)) return;
    base.push(item);
    seen.add(item.id);
  });
  return base.slice(0, Math.max(PHILOSOPHY_MBTI_MIN_DISLIKES, Math.min(5, base.length)));
}

function createPhilosophyMbtiState() {
  const scores = Object.fromEntries(PHILOSOPHY_MBTI_POOL.map((item) => [item.id, 0]));
  return {
    currentQuestionId: "q1",
    answers: [],
    scores,
    result: null,
    done: false,
    visited: new Set(["q1"])
  };
}

function buildCompletedPhilosophyMbtiState(resultId) {
  const winner = philosophyMbtiById[resultId];
  if (!winner) return null;
  const state = createPhilosophyMbtiState();
  state.done = true;
  state.result = winner;
  state.currentQuestionId = null;
  state.answers = Array.from({ length: PHILOSOPHY_MBTI_MAX_QUESTIONS }, (_, index) => ({
    questionId: `saved-${index + 1}`,
    picked: "A"
  }));
  return state;
}

function loadSavedPhilosophyMbtiState() {
  try {
    const raw = localStorage.getItem(MBTI_RESULT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.done || typeof parsed.resultId !== "string") return null;
    return buildCompletedPhilosophyMbtiState(parsed.resultId);
  } catch {
    return null;
  }
}

function savePhilosophyMbtiResult(resultId) {
  if (!resultId) return;
  localStorage.setItem(
    MBTI_RESULT_STORAGE_KEY,
    JSON.stringify({
      done: true,
      resultId,
      savedAt: new Date().toISOString()
    })
  );
}

function clearSavedPhilosophyMbtiResult() {
  localStorage.removeItem(MBTI_RESULT_STORAGE_KEY);
}

function currentPhilosophyQuestion() {
  if (!philosophyMbtiState || philosophyMbtiState.done) return null;
  return philosophyQuestionById[philosophyMbtiState.currentQuestionId] || null;
}

function renderPhilosophyOptionCard(target, option, label) {
  if (!target) return;
  if (!option) {
    target.innerHTML = `<strong class="mbti-name">질문이 종료되었습니다</strong>`;
    target.disabled = true;
    return;
  }
  target.disabled = false;
  target.innerHTML = `
    <span class="mbti-option-label">${escapeHtml(label || "Option")}</span>
    <strong class="mbti-name">${escapeHtml(option.title)}</strong>
    <p class="mbti-angle">${escapeHtml(option.subtitle)}</p>
  `;
}

function finalizePhilosophyMbti() {
  const scoreEntries = Object.entries(philosophyMbtiState.scores || {});
  if (!scoreEntries.length) return;
  scoreEntries.sort((a, b) => b[1] - a[1]);
  const [winnerId] = scoreEntries[0];
  philosophyMbtiState.result = philosophyMbtiById[winnerId] || PHILOSOPHY_MBTI_POOL[0];
  philosophyMbtiState.done = true;
  savePhilosophyMbtiResult(winnerId);
  const concepts = getDisplayConcepts(philosophyMbtiState.result);
  activePhilosophyConceptId = concepts[0]?.id || "";
  selectedPhilosophyDislikes.clear();
}

function renderPhilosophyDetail() {
  if (!philoMbti.detailPanel || !philoMbti.detailTitle) return;
  const winner = philosophyMbtiState?.result;
  if (!winner) {
    philoMbti.detailTitle.textContent = "왼쪽에서 항목을 고르면 해석이 열립니다";
    philoMbti.detailPanel.innerHTML = `<p class="helper-copy">테스트를 완료하면 맞춤 해석이 이 영역에 표시됩니다.</p>`;
    return;
  }

  const concepts = getDisplayConcepts(winner);
  const dislikes = getDisplayDislikes(winner);
  const concept = concepts.find((item) => item.id === activePhilosophyConceptId) || concepts[0];
  if (!concept) {
    philoMbti.detailPanel.innerHTML = `<p class="helper-copy">표시할 해석 항목이 없습니다.</p>`;
    return;
  }

  philoMbti.detailTitle.textContent = concept.title;
  const dislikeBlocks = dislikes
    .filter((item) => selectedPhilosophyDislikes.has(item.id))
    .map(
      (item) => `
        <article class="mbti-detail-block">
          <h4>마음에 안 든 지점: ${escapeHtml(item.label)}</h4>
          <p>${escapeHtml(item.response)}</p>
          <p>${escapeHtml(item.alt)}</p>
        </article>
      `
    )
    .join("");

  philoMbti.detailPanel.innerHTML = `
    <article class="mbti-detail-block">
      <h4>이 관점이 주는 도움</h4>
      <p>${escapeHtml(concept.benefit)}</p>
    </article>
    <article class="mbti-detail-block">
      <h4>부담이 될 때</h4>
      <p>${escapeHtml(concept.shadow)}</p>
    </article>
    <article class="mbti-detail-block">
      <h4>철학자식 극복 방식</h4>
      <p>${escapeHtml(concept.recovery)}</p>
      <p>${escapeHtml(concept.alternative)}</p>
    </article>
    ${dislikeBlocks || '<article class="mbti-detail-block"><h4>보정 힌트</h4><p>결과가 마음에 안 드는 지점을 체크하면, 그 부분만 따로 보정한 안내를 보여줍니다.</p></article>'}
  `;
}

function renderPhilosophyResult() {
  const winner = philosophyMbtiState?.result;
  if (!winner) {
    if (philoMbti.checklist) philoMbti.checklist.innerHTML = `<p class="helper-copy">결과가 정해지면 체크리스트가 열립니다.</p>`;
    if (philoMbti.dislikeChecklist) philoMbti.dislikeChecklist.innerHTML = "";
    if (philoMbti.typeChart) philoMbti.typeChart.innerHTML = "";
    if (philoMbti.typeInsight) philoMbti.typeInsight.textContent = "";
    if (philoMbti.browsePanel) philoMbti.browsePanel.classList.add("is-hidden");
    renderPhilosophyDetail();
    return;
  }

  philosophyBrowseIndex = Math.max(0, PHILOSOPHY_MBTI_POOL.findIndex((item) => item.id === winner.id));
  const concepts = getDisplayConcepts(winner);
  const dislikes = getDisplayDislikes(winner);

  if (!activePhilosophyConceptId || !concepts.some((item) => item.id === activePhilosophyConceptId)) {
    activePhilosophyConceptId = concepts[0]?.id || "";
  }

  if (philoMbti.checklist) {
    philoMbti.checklist.innerHTML = concepts
      .map(
        (item) => `
          <button class="mbti-check-item${item.id === activePhilosophyConceptId ? " is-active" : ""}" type="button" data-mbti-concept="${item.id}">
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(item.summary)}</span>
          </button>
        `
      )
      .join("");
  }

  if (philoMbti.dislikeChecklist) {
    philoMbti.dislikeChecklist.innerHTML = dislikes
      .map(
        (item) => `
          <label class="mbti-dislike-item">
            <input type="checkbox" data-mbti-dislike="${item.id}" ${selectedPhilosophyDislikes.has(item.id) ? "checked" : ""} />
            <span>${escapeHtml(item.label)}</span>
          </label>
        `
      )
      .join("");
  }

  renderPhilosophyDetail();
  renderPhilosophyBrowsePanel();
  renderPhilosophyTypeChart();
}

function renderPhilosophyMbti() {
  if (!philosophyMbtiState) {
    philosophyMbtiState = loadSavedPhilosophyMbtiState() || createPhilosophyMbtiState();
  }
  if (!philoMbti.prompt || !philoMbti.progress) return;

  const question = currentPhilosophyQuestion();
  const step = philosophyMbtiState.answers.length + 1;
  const completed = philosophyMbtiState.answers.length;
  philoMbti.progress.textContent = philosophyMbtiState.done
    ? `완료 · ${PHILOSOPHY_MBTI_MAX_QUESTIONS} 문항`
    : `Question ${Math.min(step, PHILOSOPHY_MBTI_MAX_QUESTIONS)} / ${PHILOSOPHY_MBTI_MAX_QUESTIONS}`;
  if (philoMbti.progressBar) {
    philoMbti.progressBar.style.width = `${(completed / PHILOSOPHY_MBTI_MAX_QUESTIONS) * 100}%`;
  }
  philoMbti.prompt.textContent = question?.prompt || "질문을 불러오는 중입니다.";

  renderPhilosophyOptionCard(philoMbti.optionA, question?.optionA, "Option A");
  renderPhilosophyOptionCard(philoMbti.optionB, question?.optionB, "Option B");

  if (philoMbti.questionSection) philoMbti.questionSection.classList.toggle("is-hidden", philosophyMbtiState.done);
  if (philoMbti.optionGrid) philoMbti.optionGrid.classList.toggle("is-hidden", philosophyMbtiState.done);
  if (philoMbti.browsePanel) philoMbti.browsePanel.classList.toggle("is-hidden", !philosophyMbtiState.done);
  if (philoMbti.bottomGrid) philoMbti.bottomGrid.classList.toggle("is-hidden", !philosophyMbtiState.done);
  renderPhilosophyResult();
}

function choosePhilosophyMbti(optionIndex) {
  if (!philosophyMbtiState || philosophyMbtiState.done) return;
  const question = currentPhilosophyQuestion();
  if (!question) {
    finalizePhilosophyMbti();
    renderPhilosophyMbti();
    return;
  }
  const selected = optionIndex === 0 ? question.optionA : question.optionB;
  if (!selected) return;
  Object.entries(selected.weights || {}).forEach(([id, weight]) => {
    philosophyMbtiState.scores[id] = (philosophyMbtiState.scores[id] || 0) + Number(weight || 0);
  });
  philosophyMbtiState.answers.push({ questionId: question.id, picked: optionIndex === 0 ? "A" : "B" });

  const reachedMax = philosophyMbtiState.answers.length >= PHILOSOPHY_MBTI_MAX_QUESTIONS;
  let nextId = selected.next;
  if (!nextId || reachedMax) {
    finalizePhilosophyMbti();
  } else {
    if (philosophyMbtiState.visited.has(nextId) && philosophyMbtiState.answers.length >= 12) {
      finalizePhilosophyMbti();
    } else {
      philosophyMbtiState.currentQuestionId = nextId;
      philosophyMbtiState.visited.add(nextId);
    }
  }

  renderPhilosophyMbti();
}

function renderPhilosophyBrowsePanel() {
  if (!philoMbti.browsePanel || !philoMbti.browseImage) return;
  const list = PHILOSOPHY_MBTI_POOL;
  if (!list.length) return;
  const safeIndex = ((philosophyBrowseIndex % list.length) + list.length) % list.length;
  philosophyBrowseIndex = safeIndex;
  const current = list[safeIndex];
  setPhilosopherImage(philoMbti.browseImage, current.image, current.name);
  philoMbti.browseName.textContent = current.name;
  philoMbti.browseSchool.textContent = current.school;
  philoMbti.browseQuote.textContent = current.quote;
  philoMbti.browseAngle.textContent = current.angle;
}

function renderPhilosophyTypeChart() {
  if (!philoMbti.typeChart) return;
  const winner = philosophyMbtiState?.result;
  const knownRanks = Object.values(PUBLIC_INFLUENCE_RANK_BY_ID).filter((value) => Number.isFinite(value));
  const maxKnownRank = Math.max(...knownRanks, 1);
  const ranked = PHILOSOPHY_MBTI_POOL.map((item) => {
    const rank = Number(PUBLIC_INFLUENCE_RANK_BY_ID[item.id]);
    const isKnown = Number.isFinite(rank) && rank > 0;
    const normalized = isKnown ? (maxKnownRank - rank + 1) / maxKnownRank : 0.12;
    // Keep the bars visually comparable while preserving ordering.
    const compressed = isKnown ? 0.4 + Math.pow(normalized, 0.58) * 0.6 : 0.42;
    return {
      id: item.id,
      name: item.name,
      rank: isKnown ? rank : null,
      sortRank: isKnown ? rank : 9999,
      width: Math.round(Math.max(12, Math.min(100, compressed * 100)))
    };
  }).sort((a, b) => a.sortRank - b.sortRank || a.name.localeCompare(b.name, "ko"));

  if (!ranked.length) {
    philoMbti.typeChart.innerHTML = "";
    return;
  }

  philoMbti.typeChart.innerHTML = ranked
    .map((item, index) => {
      return `
        <div class="mbti-type-row${index === 0 ? " is-top" : ""}${winner?.id === item.id ? " is-selected" : ""}">
          <span class="mbti-type-label">${escapeHtml(item.name)}</span>
          <span class="mbti-type-track">
            <span class="mbti-type-fill" style="--bar-width: ${item.width}%;"></span>
          </span>
        </div>
      `;
    })
    .join("");

  if (!philoMbti.typeInsight || !winner) return;
  const winnerItem = ranked.find((item) => item.id === winner.id);
  if (!winnerItem) {
    philoMbti.typeInsight.textContent = "공개 영향도 기준 정보를 찾지 못했습니다.";
    return;
  }
  if (!winnerItem.rank) {
    philoMbti.typeInsight.textContent = `${winner.name}은(는) 현재 참고한 공개 연구 표본에 직접 포함되지 않아, 비교상 희소권으로 표시됩니다.`;
    return;
  }

  const band = winnerItem.rank <= 45 ? "다수권" : winnerItem.rank <= 95 ? "중간권" : "희소권";
  const topType = ranked[0]?.name || "";
  philoMbti.typeInsight.textContent = `${winner.name}은(는) 공개 영향도 기준 ${band}입니다. 최상위는 ${topType}입니다.`;
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
  const hashSeed = (text) => {
    let seed = 0;
    for (let index = 0; index < text.length; index += 1) {
      seed = (seed + text.charCodeAt(index) * (index + 3)) % 9973;
    }
    return seed;
  };

  const quoteIntentScore = (quote, signals) => {
    const text = String(quote || "").toLowerCase();
    let score = 0;
    if (signals.overload && /(판단|통제|원하라|사건)/.test(text)) score += 3;
    if (signals.choice && /(선택|자유|행동|의미)/.test(text)) score += 3;
    if (signals.hopeless && /(현재|관대함|견딜|진실|여름)/.test(text)) score += 3;
    if (signals.time && /(현재|여름|계속|진실)/.test(text)) score += 2;
    if (signals.connection && /(관대함|현재|의미)/.test(text)) score += 2;
    if (/(현재|자유|의미|통제|행동|진실|견딜)/.test(text)) score += 1;
    return score;
  };

  const fallbackSeedBase = `${new Date().toISOString().slice(0, 10)}-${philosopher.name}`;
  const seedBase = entry
    ? `${entry.id || ""}-${entry.date || ""}-${entry.title || ""}-${entry.tags?.join("|") || ""}-${entry.riskLevel || ""}`
    : fallbackSeedBase;
  const seed = hashSeed(seedBase);

  if (!entry) {
    return quotes[seed % quotes.length];
  }

  const textPool = `${entry.title || ""} ${entry.excerpt || ""} ${entry.body?.join(" ") || ""} ${(entry.tags || []).join(" ")}`;
  const signals = detectSignals(textPool, entry.tags || []);
  const recentSamePhilosopher = entries
    .filter((item) => item.id !== entry.id && item.philosophyKey === entry.philosophyKey)
    .sort(compareEntriesDesc)
    .slice(0, 2);
  const recentQuoteIndexes = new Set(
    recentSamePhilosopher.map((item) => {
      const recentSeed = hashSeed(`${item.id || ""}-${item.date || ""}-${item.title || ""}-${(item.tags || []).join("|") || ""}-${item.riskLevel || ""}`);
      return recentSeed % quotes.length;
    })
  );

  const ranked = quotes
    .map((quote, index) => ({
      index,
      quote,
      score: quoteIntentScore(quote, signals),
      offset: Math.abs(index - (seed % quotes.length))
    }))
    .sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score;
      return a.offset - b.offset;
    });

  const selected = ranked.find((item) => !recentQuoteIndexes.has(item.index)) || ranked[0];
  return selected?.quote || quotes[seed % quotes.length];
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

function formatMonthTag(date) {
  return `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatYmd(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatCommentStamp(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${month}.${day} ${hour}:${minute}`;
}

function heatmapRangeForYearSpan() {
  const today = new Date();
  const year = today.getFullYear();
  const visibleStart = new Date(year, 0, 1);
  const visibleEnd = new Date(year + 1, 9, 31);
  const gridStart = startOfWeek(visibleStart);
  const gridEnd = addDays(startOfWeek(addDays(visibleEnd, 6)), 6);
  return { visibleStart, visibleEnd, gridStart, gridEnd };
}

function philosopherToneLabel(key) {
  const map = {
    camus: "카뮈",
    nietzsche: "니체",
    epictetus: "에픽테토스",
    sartre: "사르트르"
  };
  return map[key] || "철학";
}

function philosopherKeyByName(name) {
  const target = String(name || "").trim();
  return Object.entries(philosopherCatalog).find(([, value]) => value.name === target)?.[0] || "";
}

function opposingCritique(entry) {
  const map = {
    camus: {
      critic: "니체",
      text: "의미를 오래 붙잡고 버티는 게, 그만큼 진지했다는 뜻이구나. 근데 오늘은 작은 선택 하나라도 네 쪽으로 움직여 보는 게 더 좋아."
    },
    nietzsche: {
      critic: "에픽테토스",
      text: "스스로를 바꾸려는 힘은 참 좋다. 근데 네가 못 바꾸는 것까지 붙잡으면 더 지치니까, 먼저 네가 바로 다룰 수 있는 것부터 정리하는 게 좋아."
    },
    epictetus: {
      critic: "사르트르",
      text: "침착하게 버티는 게 네 장점인 건 맞아. 근데 너무 안전한 쪽만 고르면 중요한 결정이 늦어지니까, 오늘은 네 선택 하나를 분명히 남기는 게 좋아."
    },
    sartre: {
      critic: "카뮈",
      text: "자유와 책임을 크게 느끼는 건 그만큼 성실하다는 뜻이야. 근데 완벽한 답 찾느라 오늘을 미루면 더 힘들어지니까, 지금 가능한 하루 루틴부터 붙이는 게 좋아."
    }
  };
  return map[entry.philosophyKey] || { critic: "다른 철학자", text: "이 정도로 적어낸 건 이미 잘한 거야. 근데 내일 바로 해볼 수 있는 행동 하나를 붙이면 훨씬 단단해져." };
}

function latestMarkerInfo() {
  const globalSorted = [...entries].sort(compareEntriesDesc);
  const latestDate = globalSorted[0]?.date || "";
  if (!latestDate) {
    return { latestDate: "", latestDayIds: new Set(), latestTopTwoIds: new Set() };
  }
  const latestDayEntries = globalSorted.filter((entry) => entry.date === latestDate);
  return {
    latestDate,
    latestDayIds: new Set(latestDayEntries.map((entry) => entry.id)),
    latestTopTwoIds: new Set(latestDayEntries.slice(0, 2).map((entry) => entry.id))
  };
}

function anniversaryEntriesForOneYearAgo() {
  const today = new Date();
  const monthDay = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const targetYear = String(today.getFullYear() - 1);
  return entries
    .filter((entry) => entry.date.startsWith(`${targetYear}-${monthDay}`))
    .sort(compareEntriesDesc);
}

function toneClassByPhilosophyKeys(keys) {
  if (keys.length >= 2) return "tone-mixed";
  const one = keys[0];
  return one ? `tone-${one}` : "";
}

function renderAnniversaryCard() {
  const entriesForDay = anniversaryEntriesForOneYearAgo();
  const entry = entriesForDay[0] || null;
  const keys = Array.from(new Set(entriesForDay.map((item) => item.philosophyKey)));
  anniversaryCard.classList.remove("tone-camus", "tone-nietzsche", "tone-epictetus", "tone-sartre", "tone-mixed");
  if (keys.length) {
    anniversaryCard.classList.add(toneClassByPhilosophyKeys(keys));
  }
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
  const names = keys.map((item) => philosopherCatalog[item]?.name || item);
  renderTags(anniversaryTags, [...names, ...entry.tags]);
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

function renderJournalHeatmap() {
  if (!journalHeatmap || !heatmapMonths) return;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = ymd(today);
  const range = heatmapRangeForYearSpan();
  const start = range.gridStart;
  const end = range.gridEnd;
  const totalDays = Math.floor((end.getTime() - start.getTime()) / 86400000) + 1;
  const totalWeeks = Math.ceil(totalDays / 7);

  const counts = entries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = { count: 0, philosopherKeys: new Set() };
    }
    acc[entry.date].count += 1;
    acc[entry.date].philosopherKeys.add(entry.philosophyKey);
    return acc;
  }, {});

  const cells = [];
  const monthMarkers = [];
  let cursor = new Date(start);

  for (let week = 0; week < totalWeeks; week += 1) {
    const weekStart = addDays(start, week * 7);
    const monthStartInWeek = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)).find(
      (date) => date.getDate() === 1 && ymd(date) >= formatYmd(range.visibleStart) && ymd(date) <= formatYmd(range.visibleEnd)
    );
    monthMarkers.push(`<span>${monthStartInWeek ? formatMonthTag(monthStartInWeek) : ""}</span>`);

    for (let day = 0; day < 7; day += 1) {
      const cellDate = new Date(cursor);
      const key = ymd(cellDate);
      const isOutside = key < formatYmd(range.visibleStart) || key > formatYmd(range.visibleEnd);
      const isFuture = key > todayKey;
      const stat = !isOutside && !isFuture ? counts[key] || null : null;
      const count = stat ? stat.count : 0;
      const keys = stat ? Array.from(stat.philosopherKeys) : [];
      const isMultiPhilosopher = keys.length >= 2;
      const singleKey = keys[0] || "";
      const nameLabel = keys.map((item) => philosopherCatalog[item]?.name || item).join(", ");
      const title = isOutside
        ? `${key} · 범위 외 날짜`
        : isFuture
        ? `${key} · 아직 오지 않은 날짜`
        : `${key} · ${count ? `${count}개 기록` : "기록 없음"}${nameLabel ? ` · ${nameLabel}` : ""}`;
      cells.push(
        `<span class="heatmap-cell${singleKey && !isMultiPhilosopher ? ` philo-${singleKey}` : ""}${isMultiPhilosopher ? " philo-mixed is-multi" : ""}${key === todayKey ? " today" : ""}${isFuture ? " is-future" : ""}${isOutside ? " is-outside" : ""}" title="${title}" aria-label="${title}"></span>`
      );
      cursor = addDays(cursor, 1);
    }
  }

  heatmapMonths.style.setProperty("--heatmap-weeks", String(totalWeeks));
  journalHeatmap.style.setProperty("--heatmap-weeks", String(totalWeeks));
  if (heatmapRangeText) {
    heatmapRangeText.textContent = `${formatYmd(range.visibleStart)} ~ ${formatYmd(range.visibleEnd)}`;
  }
  heatmapMonths.innerHTML = monthMarkers.join("");
  journalHeatmap.innerHTML = cells.join("");
}

function renderJournalFilters() {
  journalFilters.innerHTML = allTags()
    .map(
      (tag) => {
        const key = philosopherKeyByName(tag);
        return `<button class="filter-chip${key ? ` tone-${key}` : " tone-all"}${tag === currentFilter ? " is-active" : ""}" type="button" data-filter="${escapeHtml(
          tag
        )}">${escapeHtml(tag)}</button>`;
      }
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
  const latestInfo = latestMarkerInfo();

  journalList.innerHTML = pageItems
    .map((entry) => {
      const isCurrent = entry.id === currentEntryId;
      const isLatest = latestInfo.latestTopTwoIds.has(entry.id);
      const isLatestDay = latestInfo.latestDayIds.has(entry.id);
      const philosopher = philosopherCatalog[entry.philosophyKey];
      const summary = commentSummaryByEntry[entry.id] || {};
      const commentCount = Number(summary.count || 0);
      const latestComment = summary.latest || null;
      const commentBody = latestComment?.body ? String(latestComment.body).slice(0, 48) : "아직 댓글 없음";
      const commentPreview = `🙂 | ${latestComment?.nickname || "-"} | ${commentBody}${latestComment?.body && String(latestComment.body).length > 48 ? "..." : ""} | ${formatCommentStamp(latestComment?.createdAt)}`;
      const critique = opposingCritique(entry);
      const adminActions = `
        <div class="journal-admin-actions is-visible">
          <button class="ghost-button" data-admin-action="edit-entry" data-entry-id="${entry.id}">수정</button>
          <button class="ghost-button" data-admin-action="delete-entry" data-entry-id="${entry.id}">삭제</button>
        </div>
      `;
      return `
        <article class="journey-card tone-${entry.philosophyKey}${isCurrent ? " is-current" : ""}${isLatest ? " is-recent-entry" : ""}${isLatestDay ? " is-latest-day" : ""}" data-entry-id="${entry.id}">
          <div class="journey-card-meta">
            <div class="journey-meta-left">
              <span>${entry.date}</span>
              <span class="journey-comment-chip"><span aria-hidden="true">💬</span> ${commentCount}</span>
              <span class="philosopher-meta-chip tone-${entry.philosophyKey}">${escapeHtml(philosopherToneLabel(entry.philosophyKey))}</span>
            </div>
            <div class="journey-meta-right">
              ${isLatest ? '<span class="latest-two-chip">LATEST</span>' : isLatestDay ? '<span class="latest-day-chip">당일 기록</span>' : ""}
              ${isEntryPrivate(entry) ? '<span class="journal-lock-chip">LOCK 비공개</span>' : ""}
            </div>
          </div>
          <div class="journey-card-stack">
            <h3>${escapeHtml(entry.title)}</h3>
            <p class="journey-card-excerpt">${escapeHtml(entry.excerpt)}</p>
            <div class="opposing-roast">
              <strong>${escapeHtml(critique.critic)}의 반대 시선</strong>
              <p>${escapeHtml(critique.text)}</p>
            </div>
            <p class="journey-comment-preview">${escapeHtml(commentPreview)}</p>
          </div>
          <div class="journey-card-foot">
            <div class="tag-row">${entry.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
            <div class="journey-foot-right">
              <span class="state-badge-inline">${escapeHtml(entry.psychologyState)}${isEntryPrivate(entry) ? " · 잠금 필요" : ""}</span>
              ${adminActions}
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  const latest = list[0];
  const latestBatchCount = latestInfo.latestDate ? Number(latestInfo.latestDayIds.size || 0) : 0;
  recentUpdateText.textContent = latest
    ? `최근 업데이트 · ${latestInfo.latestDate || latest.date} · 당일 ${latestBatchCount}개 기록 (최신 2개 강조)`
    : "최근 업데이트 없음";
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

function renderLockedEntryPreview(entry) {
  const philosopher = philosopherCatalog[entry.philosophyKey];
  currentEntryId = entry.id;
  entryElements.title.textContent = `${entry.title} (비공개)`;
  entryElements.date.textContent = entry.date;
  entryElements.tag.textContent = "Private Journal Entry";
  entryElements.themeChip.textContent = entry.tags[0] || "기록";
  entryElements.philosophyChip.textContent = philosopher.name;
  entryElements.body.innerHTML = `
    <section class="entry-locked-view">
      <p><strong>비공개 글입니다.</strong> 목록에서는 제목과 첫줄만 보이고, 본문은 비밀번호 입력 후 열 수 있습니다.</p>
      <p class="helper-copy">${escapeHtml(entry.excerpt)}</p>
    </section>
  `;
  entryElements.philosophyTitle.textContent = "비공개 설정 안내";
  entryElements.philosophyText.textContent = "글 내용은 보호 중입니다. 작성 시 설정한 비밀번호를 입력하면 본문/댓글을 확인할 수 있습니다.";
  entryElements.philosophyQuote.textContent = "";
  entryElements.philosophyAdvice.textContent = "";
  renderTags(entryElements.philosophyTags, ["비공개", philosopher.name]);
  entryElements.psychologyTitle.textContent = "잠금 상태";
  entryElements.psychologyText.textContent = "현재 본문은 숨김 처리되어 있습니다.";
  entryElements.psychologyState.textContent = "비밀번호 필요";
  renderTags(entryElements.psychologyTags, ["잠금", "비밀번호"]);
  renderSpotlight(entry);
  renderMetrics(entry.metrics, entry);
  updateMap(entry);
  renderRevisitPrompts(entry);
  commentsUi.list.innerHTML = `<p class="helper-copy">비공개 글은 잠금 해제 후 댓글을 볼 수 있습니다.</p>`;
}

function renderEntry(entry) {
  if (!entry) return;
  if (!canAccessEntry(entry)) {
    renderLockedEntryPreview(entry);
    return;
  }
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
  if (!canAccessEntry(entry)) return;
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
  if (philosophyTypeChip) {
    philosophyTypeChip.textContent = philosopher.name;
  }
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
  const normalized = values.map((value, index) => {
    const metric = metricDefinitions[index];
    return metric.polarity === "lower" ? 100 - value : value;
  });
  const totalScore = Math.round(normalized.reduce((sum, value) => sum + value, 0) / Math.max(1, normalized.length));

  const summaryItem = document.createElement("div");
  summaryItem.className = "metric-item metric-summary-item";
  summaryItem.innerHTML = `
    <div class="metric-topline">
      <span class="metric-name">종합 총점</span>
      <strong>${totalScore}</strong>
    </div>
    <p class="metric-description">현재 지표를 통합한 총점입니다. 낮은 항목을 먼저 보완하면 전체 균형이 가장 빠르게 올라갑니다.</p>
    <div class="metric-bar"><span style="width:${totalScore}%"></span></div>
  `;
  metricsList.appendChild(summaryItem);

  values.forEach((value, index) => {
    const metric = metricDefinitions[index];
    const item = document.createElement("div");
    item.className = `metric-item metric-item-${index % 3}`;
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

  if (hexOverallScoreValue) {
    hexOverallScoreValue.textContent = String(totalScore);
  }
  if (hexOverallScoreCopy) {
    hexOverallScoreCopy.textContent = totalScore < 50
      ? "지금은 안전과 회복 리듬부터 붙이면 총점이 가장 빨리 올라옵니다."
      : totalScore < 70
      ? "관찰과 개입이 함께 필요한 구간입니다. 약한 축 1~2개를 우선 보완하세요."
      : "균형이 안정화되는 흐름입니다. 지금의 루틴을 유지하며 미세 조정만 하면 됩니다.";
  }

  const oppositeMap = {
    camus: "nietzsche",
    nietzsche: "epictetus",
    epictetus: "sartre",
    sartre: "camus"
  };
  const philosophyProfiles = {
    camus: [72, 59, 56, 54, 58, 47],
    nietzsche: [66, 52, 63, 45, 72, 59],
    epictetus: [69, 76, 64, 48, 66, 36],
    sartre: [63, 49, 43, 62, 55, 66]
  };
  const myKey = entry?.philosophyKey || "camus";
  hexagonDataLarge.setAttribute("points", metricPoints(values, 220, 220, 124));
  hexagonDataLarge.classList.remove("tone-camus", "tone-nietzsche", "tone-epictetus", "tone-sartre");
  hexagonDataLarge.classList.add(`tone-${myKey}`);
  const oppositeKey = oppositeMap[myKey] || "nietzsche";
  const oppositeProfile = philosophyProfiles[oppositeKey] || philosophyProfiles.nietzsche;
  const oppositeValues = values.map((value, index) => {
    const mixed = Math.round(value * 0.35 + oppositeProfile[index] * 0.65);
    return Math.max(18, Math.min(94, mixed));
  });
  if (hexagonDataOpposite) {
    hexagonDataOpposite.setAttribute("points", metricPoints(oppositeValues, 220, 220, 124));
    hexagonDataOpposite.classList.remove("tone-camus", "tone-nietzsche", "tone-epictetus", "tone-sartre");
    hexagonDataOpposite.classList.add(`tone-${oppositeKey}`);
  }
  if (hexMapMine) {
    const mineName = philosopherCatalog[myKey]?.name || "나의 철학자";
    hexMapMine.textContent = `내 지도 · ${mineName}`;
  }
  if (hexMapOpposite) {
    const oppositeName = philosopherCatalog[oppositeKey]?.name || "반대 철학자";
    hexMapOpposite.textContent = `반대 지도 · ${oppositeName}`;
  }

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
    hexConclusionTitle.textContent = "종합 결론 · 즉시 회복 루틴과 외부 연결이 필요합니다";
    hexConclusionText.textContent =
      "철학 관점과 인지심리 지표를 함께 보면, 현재는 해석보다 안전과 회복 리듬을 먼저 붙이는 구간입니다. 가까운 사람·전문가·긴급 도움선 중 하나를 오늘 안에 연결하세요.";
    return;
  }
  if (riskLevel === "watch" || weakestHealth < 50) {
    hexConclusionTitle.textContent = "종합 결론 · 관찰 중심 + 저강도 개입이 필요한 구간입니다";
    hexConclusionText.textContent =
      "지금은 크게 밀어붙이기보다 수면·식사·연결 같은 기본 리듬을 먼저 맞추는 편이 좋습니다. 일주일 단위로 변화를 짧게 기록해 추세를 확인하세요.";
    return;
  }
  hexConclusionTitle.textContent = "종합 결론 · 현재 리듬 유지와 미세 조정이 적절합니다";
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
    modal.date.value = todayYmdSeoul();
  }
  if (modal.privateToggle && !editingEntryId) {
    modal.privateToggle.checked = false;
  }
  if (modal.privatePassword && !editingEntryId) {
    modal.privatePassword.value = "";
  }
  syncPrivatePasswordFieldState();
  modal.shell.classList.remove("is-hidden");
  modal.shell.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.shell.classList.add("is-hidden");
  modal.shell.setAttribute("aria-hidden", "true");
  editingEntryId = "";
  modal.createForm.dataset.mode = "create";
  if (modal.privatePassword) modal.privatePassword.value = "";
  if (modal.privateToggle) modal.privateToggle.checked = false;
  syncPrivatePasswordFieldState();
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

function syncPrivatePasswordFieldState() {
  if (!modal.privatePassword || !modal.privateToggle) return;
  const enabled = modal.privateToggle.checked;
  modal.privatePassword.disabled = !enabled;
  if (!enabled) {
    modal.privatePassword.value = "";
  }
}

function openPrivateModal(entry) {
  if (!entry) return;
  pendingPrivateEntryId = entry.id;
  privateModal.status.textContent = "";
  if (privateModal.form) privateModal.form.reset();
  privateModal.shell.classList.remove("is-hidden");
  privateModal.shell.setAttribute("aria-hidden", "false");
  if (privateModal.password) privateModal.password.focus();
}

function closePrivateModal() {
  privateModal.shell.classList.add("is-hidden");
  privateModal.shell.setAttribute("aria-hidden", "true");
  pendingPrivateEntryId = "";
}

function promptPrivateAccess(entry) {
  if (!entry) return false;
  if (canAccessEntry(entry)) return true;
  openPrivateModal(entry);
  return false;
}

function openReaderModal(entry) {
  if (!entry) return;
  if (!promptPrivateAccess(entry)) return;
  currentReaderEntryId = entry.id;
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
  currentReaderEntryId = "";
}

async function fetchComments() {
  return fetchCommentsInto(commentsUi);
}

async function fetchCommentCounts() {
  const response = await fetch("/api/comments?summary=1");
  const payload = await response.json();
  if (!payload?.ok || !payload.summary || typeof payload.summary !== "object") return;
  commentSummaryByEntry = payload.summary;
  renderJournalList();
}

function entryForComments(targetUi) {
  if (targetUi === readerModal && currentReaderEntryId) {
    return entries.find((item) => item.id === currentReaderEntryId) || currentEntry();
  }
  return currentEntry();
}

function commentInitials(name = "") {
  return String(name || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase() || "•";
}

function renderCommentItem(comment) {
  return `
    <article class="comment-item" data-comment-id="${comment.id}">
      <div class="comment-avatar" aria-hidden="true">${escapeHtml(commentInitials(comment.nickname))}</div>
      <div class="comment-main">
        <div class="comment-bubble">
          <div class="comment-meta">
            <strong class="comment-author">${escapeHtml(comment.nickname)}</strong>
            <span class="comment-date">${new Date(comment.createdAt).toLocaleString("ko-KR")}</span>
          </div>
          <p class="comment-body">${escapeHtml(comment.body)}</p>
        </div>
        <div class="comment-delete-row">
          <button class="ghost-button" data-action="delete-comment" data-comment-id="${comment.id}">삭제</button>
        </div>
        <div class="comment-delete-inline is-hidden">
          <label class="field comment-delete-password">
            <span>삭제 비밀번호</span>
            <input
              type="password"
              maxlength="64"
              placeholder="본인 비밀번호 또는 관리자 키"
              data-role="delete-password"
            />
          </label>
          <div class="comment-delete-inline-actions">
            <button class="ghost-button strong" data-action="confirm-delete-comment" data-comment-id="${comment.id}">삭제 확인</button>
            <button class="ghost-button" data-action="cancel-delete-comment">취소</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

async function fetchCommentsInto(targetUi) {
  const entry = entryForComments(targetUi);
  if (!entry) {
    targetUi.list ? (targetUi.list.innerHTML = "") : (targetUi.commentsList.innerHTML = "");
    return;
  }

  const response = await fetch(`/api/comments?entry=${encodeURIComponent(entry.id)}`);
  const payload = await response.json();
  const listEl = targetUi.list || targetUi.commentsList;

  if (!payload.ok) {
    listEl.innerHTML = `<p class="helper-copy">${payload.error === "private entry locked" ? "비공개 글은 잠금 해제 후 댓글을 볼 수 있습니다." : "댓글을 불러오지 못했습니다."}</p>`;
    applyCommentAnalysis(currentEntry(), []);
    return;
  }

  const previousCount = Number(commentSummaryByEntry[entry.id]?.count || 0);
  const latestCount = Array.isArray(payload.comments) ? payload.comments.length : 0;
  const latest = latestCount ? payload.comments[latestCount - 1] : null;
  commentSummaryByEntry[entry.id] = {
    count: latestCount,
    latest: latest
      ? {
          nickname: latest.nickname || "",
          body: latest.body || "",
          createdAt: latest.createdAt || ""
        }
      : null
  };
  if (latestCount !== previousCount) {
    renderJournalList();
  }

  if (!payload.comments.length) {
    listEl.innerHTML = `<p class="helper-copy">아직 댓글이 없습니다. 첫 반응을 남겨보세요.</p>`;
    applyCommentAnalysis(entry, []);
    return;
  }

  listEl.innerHTML = payload.comments.map((comment) => renderCommentItem(comment)).join("");
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
  const entry = entryForComments(targetUi);
  const statusEl = targetUi.status || targetUi.commentStatus;
  if (!entry?.id) {
    statusEl.textContent = "댓글을 연결할 기록을 찾지 못했습니다. 페이지를 새로고침해 주세요.";
    return;
  }
  const formEl = event.currentTarget;
  const formData = formEl ? new FormData(formEl) : null;
  const nicknameField = targetUi.nickname || targetUi.commentNickname;
  const passwordField = targetUi.password || targetUi.commentPassword;
  const bodyField = targetUi.body || targetUi.commentBody;
  const payload = {
    entryKey: entry.id,
    nickname: String(formData?.get("nickname") || nicknameField?.value || "").trim(),
    password: String(formData?.get("password") || passwordField?.value || "").trim(),
    body: String(formData?.get("body") || bodyField?.value || "").trim()
  };
  if (!payload.nickname || !payload.password || !payload.body) {
    statusEl.textContent = "닉네임, 비밀번호, 댓글 본문을 모두 입력해 주세요.";
    return;
  }
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

  if (formEl && typeof formEl.reset === "function") {
    formEl.reset();
  } else {
    if (nicknameField) nicknameField.value = "";
    if (passwordField) passwordField.value = "";
    if (bodyField) bodyField.value = "";
  }

  const listEl = targetUi.list || targetUi.commentsList;
  if (listEl && result.comment) {
    const isEmptyState = /아직 댓글이 없습니다/.test(listEl.textContent || "");
    if (isEmptyState) {
      listEl.innerHTML = "";
    }
    listEl.insertAdjacentHTML("beforeend", renderCommentItem(result.comment));
  }

  statusEl.textContent = "댓글이 등록됐습니다.";
  fetchCommentsInto(targetUi).catch(() => {
    statusEl.textContent = "등록은 완료됐지만 목록 새로고침 중 오류가 발생했습니다.";
  });
}

async function deleteComment(commentId, password) {
  return deleteCommentFromUi(commentId, password, commentsUi);
}

async function deleteCommentFromUi(commentId, password, targetUi) {
  const statusEl = targetUi.status || targetUi.commentStatus;
  statusEl.textContent = "삭제 중...";
  const response = await fetch("/api/comments", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      commentId,
      password
    })
  });

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
  renderPhilosophyMbti();
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
  if (modal.privateToggle) {
    modal.privateToggle.checked = isEntryPrivate(entry);
  }
  if (modal.privatePassword) {
    modal.privatePassword.value = "";
    modal.privatePassword.placeholder = isEntryPrivate(entry) ? "변경 시에만 입력" : "비공개일 때만 입력";
  }
  syncPrivatePasswordFieldState();
  modal.body.value = entry.body.join("\n\n");
  if (entry.markdown) {
    modal.body.value = entry.markdown;
  }
  modal.status.textContent = "현재 기록을 수정하는 중입니다.";
  openModal();
}

async function deleteCurrentEntry() {
  if (!isAdminUnlocked()) {
    pendingPostAuthAction = () => {
      void deleteCurrentEntry();
    };
    openAuthModal("삭제하려면 관리자 로그인이 필요합니다.");
    return;
  }

  const entry = currentEntry();
  if (!entry) return;
  const confirmed = window.confirm(`"${entry.title}" 기록을 삭제할까요?`);
  if (!confirmed) return;

  entries = entries.filter((item) => item.id !== entry.id);
  saveEntries();
  const synced = await syncEntriesToServer();
  if (!synced) {
    window.alert("서버 저장에 실패했습니다. 관리자 인증 상태를 다시 확인해 주세요.");
    return;
  }
  await refreshEntriesFromServer();
  currentEntryId = visibleEntries()[0]?.id || entries[0]?.id || "";
  window.location.hash = "journal";
}

function handleHashRoute() {
  const route = window.location.hash.replace("#", "") || "journal";
  setRoute(route);
}

async function bootstrapEntries() {
  entries = mergeEntriesByPriority(defaultEntries, loadEntries());
  currentEntryId = entries[0]?.id || "";
  rerenderAll();
  void fetchCommentCounts();

  const serverEntries = await fetchServerEntries();
  if (!serverEntries) return;

  entries = mergeEntriesByPriority(defaultEntries, serverEntries);
  currentEntryId = entries.find((entry) => entry.id === currentEntryId)?.id || entries[0]?.id || "";
  rerenderAll();
  void fetchCommentCounts();
}

handleHashRoute();
void bootstrapEntries();
void fetchAdminAccess().then((access) => {
  adminAccess = access;
});
void fetchChatArchiveAccess().then(async (access) => {
  chatArchiveAccess = access;
  applyChatArchiveVisibility();
  handleHashRoute();
  chatArchivePayload = await fetchChatArchivePayload();
  renderChatArchive();
});
void trackVisitAndRenderCounter();

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
      if (modal.privatePassword) modal.privatePassword.placeholder = "비공개일 때만 입력";
      openModal();
      return;
    }
    pendingPostAuthAction = () => {
      editingEntryId = "";
      modal.createForm.reset();
      if (modal.privatePassword) modal.privatePassword.placeholder = "비공개일 때만 입력";
      openModal();
    };
    openAuthModal("새 글을 쓰려면 관리자 로그인이 필요합니다.");
  });
});

modal.closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

if (modal.privateToggle) {
  modal.privateToggle.addEventListener("change", () => {
    syncPrivatePasswordFieldState();
    if (modal.privateToggle.checked && modal.privatePassword) {
      modal.privatePassword.focus();
    }
  });
}

authModal.closeButtons.forEach((button) => {
  button.addEventListener("click", closeAuthModal);
});

privateModal.closeButtons.forEach((button) => {
  button.addEventListener("click", closePrivateModal);
});

readerModal.closeButtons.forEach((button) => {
  button.addEventListener("click", closeReaderModal);
});

authModal.form.addEventListener("submit", (event) => {
  event.preventDefault();
  void (async () => {
    const id = authModal.id.value.trim();
    const password = authModal.password.value.trim();
    authModal.status.textContent = "확인 중...";
    try {
      const response = await fetch("/api/admin/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload?.ok) {
        authModal.status.textContent = "관리자 정보가 맞지 않습니다.";
        return;
      }
      adminAccess = { canAccess: true, configured: true };
      authModal.status.textContent = "로그인 완료. 이 브라우저에서 유지됩니다.";
      closeAuthModal();
      if (typeof pendingPostAuthAction === "function") {
        const action = pendingPostAuthAction;
        pendingPostAuthAction = null;
        action();
      }
    } catch {
      authModal.status.textContent = "관리자 인증 중 오류가 발생했습니다.";
    }
  })();
});

if (privateModal.form) {
  privateModal.form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const target = entries.find((entry) => entry.id === pendingPrivateEntryId);
    if (!target || !isEntryPrivate(target)) {
      privateModal.status.textContent = "비공개 기록을 찾지 못했습니다.";
      return;
    }

    const entered = String(privateModal.password?.value || "").trim();
    if (!entered) {
      privateModal.status.textContent = "비밀번호를 입력해 주세요.";
      return;
    }

    privateModal.status.textContent = "확인 중...";
    try {
      const response = await fetch("/api/entries/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryId: target.id, password: entered })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload?.ok || !payload.entry) {
        privateModal.status.textContent = "비밀번호가 일치하지 않습니다.";
        return;
      }
      const normalized = normalizeStoredEntry(payload.entry);
      if (normalized) {
        entries = entries.map((entry) => (entry.id === normalized.id ? normalized : entry));
      }
      unlockedPrivateEntryIds.add(target.id);
      closePrivateModal();
      const refreshedTarget = entries.find((entry) => entry.id === target.id) || target;
      renderEntry(refreshedTarget);
      openReaderModal(refreshedTarget);
    } catch {
      privateModal.status.textContent = "잠금 해제 중 오류가 발생했습니다.";
      return;
    }
  });
}

modal.createForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!isAdminUnlocked()) {
    modal.status.textContent = "먼저 관리자 확인이 필요합니다.";
    return;
  }

  const titleInput = modal.title.value.trim();
  const date = modal.date.value || todayYmdSeoul();
  const body = modal.body.value.trim();
  const tags = inferTagsFromBody(body);
  const title = titleInput || autoTitleFromBody(body);
  const wantsPrivate = Boolean(modal.privateToggle?.checked);
  const privatePassword = String(modal.privatePassword?.value || "").trim();

  if (!body) {
    modal.status.textContent = "본문을 입력해 주세요.";
    return;
  }
  if (!titleInput) {
    modal.title.value = title;
  }

  const newEntry = createGeneratedEntry({ title, date, body, tags });
  const editingEntry = editingEntryId ? entries.find((entry) => entry.id === editingEntryId) : null;
  if (wantsPrivate) {
    if (!privatePassword && !(editingEntry && isEntryPrivate(editingEntry))) {
      modal.status.textContent = "비공개 글은 비밀번호를 입력해야 저장됩니다.";
      return;
    }
    newEntry.isPrivate = true;
    newEntry.isLocked = false;
    if (privatePassword) {
      newEntry.privatePassword = privatePassword;
    }
  } else {
    newEntry.isPrivate = false;
    newEntry.isLocked = false;
  }

  if (editingEntryId) {
    const index = entries.findIndex((entry) => entry.id === editingEntryId);
    if (index !== -1) {
      newEntry.id = editingEntryId;
      entries[index] = newEntry;
      currentEntryId = editingEntryId;
      if (!newEntry.isPrivate) {
        unlockedPrivateEntryIds.delete(newEntry.id);
      }
    }
  } else {
    entries.unshift(newEntry);
    currentEntryId = newEntry.id;
  }
  saveEntries();
  const synced = await syncEntriesToServer();
  if (!synced) {
    modal.status.textContent = "서버 저장에 실패했습니다. 관리자 인증 상태를 다시 확인해 주세요.";
    return;
  }
  await refreshEntriesFromServer();
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
    const isActive = button.dataset.overlayTab === target;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  Object.entries(overlayTabPanels).forEach(([key, panel]) => {
    if (!panel) return;
    const isActive = key === target;
    panel.classList.toggle("is-active", isActive);
    panel.setAttribute("aria-hidden", isActive ? "false" : "true");
  });
}

overlayTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setOverlayTab(button.dataset.overlayTab);
  });
});
setOverlayTab("philosophers");

if (philoMbti.optionA) {
  philoMbti.optionA.addEventListener("click", () => choosePhilosophyMbti(0));
}

if (philoMbti.optionB) {
  philoMbti.optionB.addEventListener("click", () => choosePhilosophyMbti(1));
}

if (philoMbti.checklist) {
  philoMbti.checklist.addEventListener("click", (event) => {
    const button = event.target.closest("[data-mbti-concept]");
    if (!button) return;
    activePhilosophyConceptId = button.dataset.mbtiConcept;
    renderPhilosophyResult();
  });
}

if (philoMbti.dislikeChecklist) {
  philoMbti.dislikeChecklist.addEventListener("change", (event) => {
    const input = event.target.closest("[data-mbti-dislike]");
    if (!input) return;
    if (input.checked) {
      selectedPhilosophyDislikes.add(input.dataset.mbtiDislike);
    } else {
      selectedPhilosophyDislikes.delete(input.dataset.mbtiDislike);
    }
    renderPhilosophyDetail();
  });
}

if (philoMbti.restartButton) {
  philoMbti.restartButton.addEventListener("click", () => {
    philosophyMbtiState = createPhilosophyMbtiState();
    clearSavedPhilosophyMbtiResult();
    activePhilosophyConceptId = "";
    selectedPhilosophyDislikes.clear();
    if (philoMbti.browsePanel) philoMbti.browsePanel.classList.add("is-hidden");
    renderPhilosophyMbti();
  });
}

if (philoMbti.browsePrev) {
  philoMbti.browsePrev.addEventListener("click", () => {
    philosophyBrowseIndex -= 1;
    renderPhilosophyBrowsePanel();
  });
}

if (philoMbti.browseNext) {
  philoMbti.browseNext.addEventListener("click", () => {
    philosophyBrowseIndex += 1;
    renderPhilosophyBrowsePanel();
  });
}

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
  const deleteButton = event.target.closest('[data-action="delete-comment"]');
  if (deleteButton) {
    const item = deleteButton.closest(".comment-item");
    const inline = item?.querySelector(".comment-delete-inline");
    if (inline) {
      inline.classList.remove("is-hidden");
      const passwordInput = inline.querySelector('[data-role="delete-password"]');
      if (passwordInput) {
        passwordInput.focus();
      }
    }
    return;
  }

  const cancelButton = event.target.closest('[data-action="cancel-delete-comment"]');
  if (cancelButton) {
    const inline = cancelButton.closest(".comment-delete-inline");
    if (inline) {
      inline.classList.add("is-hidden");
      const passwordInput = inline.querySelector('[data-role="delete-password"]');
      if (passwordInput) {
        passwordInput.value = "";
      }
    }
    return;
  }

  const confirmButton = event.target.closest('[data-action="confirm-delete-comment"]');
  if (!confirmButton) return;

  const inline = confirmButton.closest(".comment-delete-inline");
  const passwordInput = inline?.querySelector('[data-role="delete-password"]');
  const entered = String(passwordInput?.value || "").trim();
  if (!entered) {
    commentsUi.status.textContent = "삭제 비밀번호를 입력해 주세요.";
    return;
  }
  deleteComment(confirmButton.dataset.commentId, entered).catch(() => {
    commentsUi.status.textContent = "댓글 삭제 중 오류가 발생했습니다.";
  });
});

readerModal.commentForm.addEventListener("submit", (event) => {
  createCommentFromUi(event, readerModal).catch(() => {
    readerModal.commentStatus.textContent = "댓글 등록 중 오류가 발생했습니다.";
  });
});

readerModal.commentsList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest('[data-action="delete-comment"]');
  if (deleteButton) {
    const item = deleteButton.closest(".comment-item");
    const inline = item?.querySelector(".comment-delete-inline");
    if (inline) {
      inline.classList.remove("is-hidden");
      const passwordInput = inline.querySelector('[data-role="delete-password"]');
      if (passwordInput) {
        passwordInput.focus();
      }
    }
    return;
  }

  const cancelButton = event.target.closest('[data-action="cancel-delete-comment"]');
  if (cancelButton) {
    const inline = cancelButton.closest(".comment-delete-inline");
    if (inline) {
      inline.classList.add("is-hidden");
      const passwordInput = inline.querySelector('[data-role="delete-password"]');
      if (passwordInput) {
        passwordInput.value = "";
      }
    }
    return;
  }

  const confirmButton = event.target.closest('[data-action="confirm-delete-comment"]');
  if (!confirmButton) return;

  const inline = confirmButton.closest(".comment-delete-inline");
  const passwordInput = inline?.querySelector('[data-role="delete-password"]');
  const entered = String(passwordInput?.value || "").trim();
  if (!entered) {
    readerModal.commentStatus.textContent = "삭제 비밀번호를 입력해 주세요.";
    return;
  }
  deleteCommentFromUi(confirmButton.dataset.commentId, entered, readerModal).catch(() => {
    readerModal.commentStatus.textContent = "댓글 삭제 중 오류가 발생했습니다.";
  });
});

function renderVisitCounter(counter) {
  if (!visitCounterInline || !counter) return;
  const compact = window.matchMedia("(max-width: 430px)").matches;
  visitCounterInline.textContent = compact
    ? `TODAY | ${Number(counter.today || 0)}\nTOTAL | ${Number(counter.total || 0)}`
    : `TODAY | ${Number(counter.today || 0)} | TOTAL | ${Number(counter.total || 0)}`;
}

async function trackVisitAndRenderCounter() {
  try {
    const hit = await fetch("/api/analytics/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}"
    });
    if (hit.ok) {
      renderVisitCounter(await hit.json());
      return;
    }
  } catch (_error) {
    // Ignore hit errors.
  }

  try {
    const response = await fetch("/api/analytics/counter");
    if (!response.ok) return;
    renderVisitCounter(await response.json());
  } catch (_error) {
    // Ignore read errors.
  }
}
