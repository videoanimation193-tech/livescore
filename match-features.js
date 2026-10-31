const quizQuestions = [
  {
    question: "Which country won the first men's FIFA World Cup in 1930?",
    options: ["Brazil", "Uruguay", "Italy", "Argentina"],
    answer: 1,
    explanation: "Uruguay hosted and won the inaugural tournament.",
  },
  {
    question: "How many players from one team are normally on the pitch at kickoff?",
    options: ["9", "10", "11", "12"],
    answer: 2,
    explanation: "A standard team fields eleven players, including the goalkeeper.",
  },
  {
    question: "Which competition is contested by national teams in South America?",
    options: ["Copa América", "Copa del Rey", "DFB-Pokal", "Community Shield"],
    answer: 0,
    explanation: "Copa América is the major senior national-team tournament in South America.",
  },
  {
    question: "What is the duration of normal time in a senior football match, before stoppage time?",
    options: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"],
    answer: 1,
    explanation: "Normal time consists of two 45-minute halves.",
  },
  {
    question: "Which card sends a player off?",
    options: ["Blue", "Green", "Yellow", "Red"],
    answer: 3,
    explanation: "A red card means the player is sent off.",
  },
  {
    question: "What does a hat-trick mean?",
    options: ["Three goals by one player in a match", "Three corners in a row", "Three clean sheets", "Three substitutions"],
    answer: 0,
    explanation: "A hat-trick is three goals scored by one player in a match.",
  },
  {
    question: "Which role is allowed to handle the ball inside their own penalty area?",
    options: ["Centre-back", "Goalkeeper", "Captain", "Any defender"],
    answer: 1,
    explanation: "The goalkeeper may handle the ball inside their own penalty area, subject to the Laws of the Game.",
  },
  {
    question: "How far is the penalty mark from the goal line?",
    options: ["9 metres", "10 metres", "11 metres", "12 metres"],
    answer: 2,
    explanation: "The penalty mark is 11 metres (12 yards) from the midpoint between the goalposts.",
  },
  {
    question: "What is awarded when the whole ball crosses the touchline?",
    options: ["Goal kick", "Throw-in", "Corner kick", "Penalty"],
    answer: 1,
    explanation: "A throw-in restarts play when the ball wholly crosses a touchline.",
  },
  {
    question: "How many points does a team usually earn for a league win?",
    options: ["1", "2", "3", "4"],
    answer: 2,
    explanation: "Most football leagues award three points for a win.",
  },
];

const rivalries = [
  {
    id: "el-clasico",
    name: "El Clásico",
    country: "Spain",
    home: "Real Madrid",
    away: "Barcelona",
    context: "A defining rivalry in Spanish football, played between two of the country's most followed clubs.",
  },
  {
    id: "north-west-derby",
    name: "North West Derby",
    country: "England",
    home: "Manchester United",
    away: "Liverpool",
    context: "A historic English rivalry between two clubs with long domestic and European histories.",
  },
  {
    id: "milan-derby",
    name: "Derby della Madonnina",
    country: "Italy",
    home: "Inter",
    away: "AC Milan",
    context: "The two Milan clubs share the San Siro and meet in one of Italy's best-known city derbies.",
  },
  {
    id: "north-london",
    name: "North London Derby",
    country: "England",
    home: "Arsenal",
    away: "Tottenham",
    context: "A local London derby between neighbours whose supporters make match days especially intense.",
  },
  {
    id: "old-firm",
    name: "Old Firm",
    country: "Scotland",
    home: "Celtic",
    away: "Rangers",
    context: "Glasgow's long-running city rivalry, central to Scottish football culture.",
  },
  {
    id: "superclasico",
    name: "Superclásico",
    country: "Argentina",
    home: "Boca Juniors",
    away: "River Plate",
    context: "Buenos Aires' major club rivalry, followed across Argentina and throughout world football.",
  },
];

const kitPresets = {
  Arsenal: { primary: "#d71920", secondary: "#ffffff", detail: "#173d7a" },
  Barcelona: { primary: "#a50044", secondary: "#004d98", detail: "#edbb00" },
  "Bayern Munich": { primary: "#dc052d", secondary: "#ffffff", detail: "#1c1c1c" },
  "Inter Milan": { primary: "#0068a8", secondary: "#111820", detail: "#ffffff" },
  Liverpool: { primary: "#c8102e", secondary: "#f6eb61", detail: "#ffffff" },
  "Manchester City": { primary: "#6cabdd", secondary: "#ffffff", detail: "#1c2c5b" },
  "Real Madrid": { primary: "#ffffff", secondary: "#f2f2f2", detail: "#7b4ab3" },
};

const dailyKey = "matchday-daily-challenge-v1";
const kitKey = "matchday-kit-design-v1";
let quizRun = null;
let dailyAnswered = false;
let dailyCorrect = false;
let kitSettings = loadKitSettings();

function node(tag, className = "", text) {
  const result = document.createElement(tag);
  if (className) result.className = className;
  if (text !== undefined) result.textContent = text;
  return result;
}

function dateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDailyQuestion(date = new Date()) {
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
  return { question: quizQuestions[day % quizQuestions.length], index: day % quizQuestions.length };
}

function loadDailyRecord() {
  try {
    const saved = JSON.parse(localStorage.getItem(dailyKey) || "{}");
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};
    return saved;
  } catch (error) {
    console.warn("Could not load daily challenge progress:", error);
    return {};
  }
}

function dayBefore(date) {
  const previous = new Date(`${date}T00:00:00`);
  previous.setDate(previous.getDate() - 1);
  return dateKey(previous);
}

function saveDailyAnswer(correct) {
  const today = dateKey();
  const record = loadDailyRecord();
  if (record.date === today) return false;
  const yesterday = dayBefore(today);
  const streak = correct
    ? record.date === yesterday
      ? (Number(record.streak) || 0) + 1
      : 1
    : 0;
  const next = {
    date: today,
    answered: true,
    correct,
    streak,
    best: Math.max(Number(record.best) || 0, streak),
    total: (Number(record.total) || 0) + 1,
    correctTotal: (Number(record.correctTotal) || 0) + (correct ? 1 : 0),
  };
  try {
    localStorage.setItem(dailyKey, JSON.stringify(next));
  } catch (error) {
    console.warn("Could not save daily challenge progress:", error);
  }
  return next;
}

function loadKitSettings() {
  const fallback = { club: "Arsenal", primary: "#d71920", secondary: "#ffffff", detail: "#173d7a", pattern: "sash" };
  try {
    const stored = JSON.parse(localStorage.getItem(kitKey) || "null");
    if (!stored || typeof stored !== "object") return fallback;
    return {
      ...fallback,
      ...stored,
      club: Object.hasOwn(kitPresets, stored.club) ? stored.club : fallback.club,
      pattern: ["solid", "stripes", "hoops", "sash"].includes(stored.pattern) ? stored.pattern : fallback.pattern,
      primary: isColor(stored.primary) ? stored.primary : fallback.primary,
      secondary: isColor(stored.secondary) ? stored.secondary : fallback.secondary,
      detail: isColor(stored.detail) ? stored.detail : fallback.detail,
    };
  } catch (error) {
    console.warn("Could not load saved kit design:", error);
    return fallback;
  }
}

function isColor(value) {
  return typeof value === "string" && /^#[\da-f]{6}$/i.test(value);
}

function saveKitSettings() {
  try {
    localStorage.setItem(kitKey, JSON.stringify(kitSettings));
  } catch (error) {
    console.warn("Could not save kit design:", error);
  }
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function kitSvg(settings = kitSettings) {
  const primary = isColor(settings.primary) ? settings.primary : "#d71920";
  const secondary = isColor(settings.secondary) ? settings.secondary : "#ffffff";
  const detail = isColor(settings.detail) ? settings.detail : "#173d7a";
  const patterns = {
    solid: "",
    stripes: `<path d="M94 111h28v151H94zM158 111h28v151h-28z" fill="${secondary}"/>`,
    hoops: `<path d="M78 151h124v21H78zM78 196h124v21H78z" fill="${secondary}"/>`,
    sash: `<path d="M91 111h27l79 143-24 13-84-144z" fill="${secondary}"/>`,
  };
  const pattern = patterns[settings.pattern] || patterns.solid;
  const collar = `<path d="M106 91l22 24h24l22-24 31 16-17 36-9-5v120c0 10-8 18-18 18H89c-10 0-18-8-18-18V138l-9 5-17-36 31-16 21 9z" fill="${primary}" stroke="#28352c" stroke-width="3" stroke-linejoin="round"/>`;
  const sleeves = `<path d="M76 99L45 112l17 36 27-12zM184 99l31 13-17 36-27-12z" fill="${primary}" stroke="#28352c" stroke-width="3" stroke-linejoin="round"/>`;
  const body = `<path d="M101 99l27 16h24l27-16 18 12-10 27v111c0 9-7 16-16 16H91c-9 0-16-7-16-16V138l-10-27 18-12 18 8z" fill="${primary}" stroke="#28352c" stroke-width="3" stroke-linejoin="round"/>`;
  const neck = `<path d="M105 94l23 20h18l23-20-15-9h-34z" fill="${secondary}" stroke="#28352c" stroke-width="2" stroke-linejoin="round"/>`;
  const cuffs = `<path d="M57 134l17-8 5 11-17 8zM186 137l5-11 17 8-5 11z" fill="${detail}"/>`;
  const crest = `<circle cx="158" cy="147" r="8" fill="${secondary}" stroke="${detail}" stroke-width="3"/><path d="M154 148h8m-4-4v8" stroke="${detail}" stroke-width="2"/>`;
  const label = escapeXml(settings.club);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 310" role="img" aria-label="${label} custom football shirt"><defs><linearGradient id="shirt-shade" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".12"/><stop offset=".18" stop-color="#fff" stop-opacity=".16"/><stop offset=".52" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".13"/></linearGradient><clipPath id="body-clip"><path d="M101 99l27 16h24l27-16 18 12-10 27v111c0 9-7 16-16 16H91c-9 0-16-7-16-16V138l-10-27 18-12 18 8z"/></clipPath></defs><ellipse cx="125" cy="276" rx="72" ry="11" fill="#26372c" opacity=".11"/>${sleeves}${body}<g clip-path="url(#body-clip)">${pattern}<path d="M70 115h110v148H70z" fill="url(#shirt-shade)"/></g>${cuffs}${collar}${neck}${crest}<text x="125" y="291" fill="#536158" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="700">${label}</text><text x="125" y="306" fill="#8a938c" text-anchor="middle" font-family="Arial,sans-serif" font-size="9">CUSTOM KIT DESIGN · CONCEPT</text></svg>`;
  return svg;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = node("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function renderDailyQuiz(container) {
  const record = loadDailyRecord();
  const { question } = getDailyQuestion();
  dailyAnswered = record.date === dateKey() && record.answered === true;
  dailyCorrect = dailyAnswered && record.correct === true;

  const card = node("section", "tool-card");
  const heading = node("div", "tool-card-header");
  heading.append(
    node("span", "tool-card-title", "Today's challenge"),
    node("span", "sample-tag", `${record.streak || 0} DAY STREAK`),
  );
  const body = node("div", "tool-card-body");
  const progress = node("div", "quiz-progress");
  progress.append(
    node("span", "", new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(new Date())),
    node("span", "", `${record.correctTotal || 0} correct · ${record.total || 0} played`),
  );
  const title = node("h2", "quiz-question", question.question);
  const options = node("div", "quiz-options");
  const result = node("p", "quiz-result");

  question.options.forEach((option, index) => {
    const button = node("button", "quiz-option", option);
    button.type = "button";
    button.disabled = dailyAnswered;
    if (dailyAnswered && index === question.answer) button.classList.add("correct");
    button.addEventListener("click", () => {
      const saved = saveDailyAnswer(index === question.answer);
      if (!saved) {
        result.textContent = "Today's challenge has already been completed.";
        return;
      }
      dailyAnswered = true;
      dailyCorrect = index === question.answer;
      options.querySelectorAll("button").forEach((choice, optionIndex) => {
        choice.disabled = true;
        if (optionIndex === question.answer) choice.classList.add("correct");
        else if (optionIndex === index) choice.classList.add("incorrect");
      });
      result.textContent = `${dailyCorrect ? "Correct!" : "Not quite."} ${question.explanation} ${dailyCorrect ? `Streak: ${saved.streak} day${saved.streak === 1 ? "" : "s"}.` : "Come back tomorrow for another challenge."}`;
      const streakTag = heading.querySelector(".sample-tag");
      streakTag.textContent = `${saved.streak} DAY STREAK`;
      progress.lastElementChild.textContent = `${saved.correctTotal} correct · ${saved.total} played`;
    });
    options.append(button);
  });

  if (dailyAnswered) {
    result.textContent = `${dailyCorrect ? "You solved today's challenge." : "Today's challenge is complete."} ${question.explanation}`;
  }
  body.append(progress, title, options, result);
  card.append(heading, body);
  container.append(card);
}

function getQuizPool() {
  const seed = Math.floor(Date.now() / 86_400_000);
  return [...quizQuestions]
    .map((question, index) => ({ question, key: (index * 7 + seed * 3) % 17 }))
    .sort((a, b) => a.key - b.key)
    .slice(0, 5)
    .map(({ question }) => question);
}

function renderQuickQuiz(container) {
  const card = node("section", "tool-card");
  const heading = node("div", "tool-card-header");
  heading.append(node("span", "", "Quick quiz"), node("span", "sample-tag", "5 QUESTIONS"));
  const body = node("div", "tool-card-body");
  const progress = node("div", "quiz-progress");
  const questionText = node("h2", "quiz-question");
  const options = node("div", "quiz-options");
  const result = node("p", "quiz-result");
  const restart = node("button", "tool-button", "Play another round");
  restart.type = "button";
  restart.hidden = true;
  const pool = getQuizPool();
  let index = 0;
  let score = 0;

  function showQuestion() {
    options.replaceChildren();
    result.textContent = "";
    restart.hidden = true;
    if (index >= pool.length) {
      progress.textContent = "Round complete";
      questionText.textContent = `You scored ${score} out of ${pool.length}.`;
      result.textContent = score === pool.length
        ? "Perfect round—great football knowledge."
        : "Review the explanations, then try another round.";
      restart.hidden = false;
      return;
    }
    const question = pool[index];
    progress.replaceChildren(
      node("span", "", `Question ${index + 1} of ${pool.length}`),
      node("span", "", `Score ${score}`),
    );
    questionText.textContent = question.question;
    question.options.forEach((option, optionIndex) => {
      const button = node("button", "quiz-option", option);
      button.type = "button";
      button.addEventListener("click", () => {
        const correct = optionIndex === question.answer;
        if (correct) score += 1;
        options.querySelectorAll("button").forEach((choice, choiceIndex) => {
          choice.disabled = true;
          if (choiceIndex === question.answer) choice.classList.add("correct");
          else if (choiceIndex === optionIndex) choice.classList.add("incorrect");
        });
        result.textContent = `${correct ? "Correct!" : "Not quite."} ${question.explanation}`;
        const next = node("button", "tool-button primary", index === pool.length - 1 ? "See result" : "Next question");
        next.type = "button";
        next.addEventListener("click", () => {
          index += 1;
          showQuestion();
        });
        options.append(next);
      });
      options.append(button);
    });
  }

  restart.addEventListener("click", () => {
    container.replaceChildren();
    renderQuickQuiz(container);
  });
  body.append(progress, questionText, options, result, restart);
  card.append(heading, body);
  container.append(card);
  showQuestion();
}

export function renderQuizPage(container) {
  const heading = node("header", "module-heading");
  const title = node("div");
  title.append(node("p", "eyebrow", "Play · learn · repeat"), node("h1", "", "Football quiz"));
  title.append(node("p", "module-subtitle", "A new daily question, a persistent streak, and a quick five-question round. Progress stays in this browser."));
  heading.append(title);
  const grid = node("div", "tool-grid");
  renderDailyQuiz(grid);
  renderQuickQuiz(grid);
  container.replaceChildren(heading, grid);
}

function createKitField(label, control) {
  const field = node("label", "tool-field");
  field.append(node("span", "", label), control);
  return field;
}

function renderKitPage(container) {
  const heading = node("header", "module-heading");
  const title = node("div");
  title.append(
    node("p", "eyebrow", "Create · customize · export"),
    node("h1", "", "Club kit studio"),
    node("p", "module-subtitle", "Build an original concept shirt for a club. This is a fan-made visual mockup, not official merchandise or a licensed club product."),
  );
  heading.append(title);

  const card = node("section", "tool-card full");
  const cardHeading = node("div", "tool-card-header");
  cardHeading.append(node("span", "", "Shirt designer"), node("span", "sample-tag", "CONCEPT DESIGN"));
  const body = node("div", "tool-card-body");
  const workspace = node("div", "kit-workspace");
  const fields = node("div", "kit-fields");

  const club = node("select");
  Object.keys(kitPresets).forEach((name) => {
    const option = node("option", "", name);
    option.value = name;
    option.selected = name === kitSettings.club;
    club.append(option);
  });
  fields.append(createKitField("Club inspiration", club));

  const pattern = node("select");
  [["solid", "Classic"], ["stripes", "Vertical stripes"], ["hoops", "Hoops"], ["sash", "Diagonal sash"]].forEach(([value, label]) => {
    const option = node("option", "", label);
    option.value = value;
    option.selected = value === kitSettings.pattern;
    pattern.append(option);
  });
  fields.append(createKitField("Shirt pattern", pattern));

  const colorInputs = [];
  [["primary", "Main color"], ["secondary", "Pattern color"], ["detail", "Collar & trim"]].forEach(([key, label]) => {
    const input = node("input");
    input.type = "color";
    input.value = kitSettings[key];
    input.setAttribute("aria-label", label);
    colorInputs.push([key, input]);
    fields.append(createKitField(label, input));
  });

  const actions = node("div", "tool-actions");
  const download = node("button", "tool-button primary", "Download SVG");
  download.type = "button";
  download.addEventListener("click", () => {
    downloadBlob(new Blob([kitSvg()], { type: "image/svg+xml;charset=utf-8" }), `${kitSettings.club.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-concept-kit.svg`);
  });
  const reset = node("button", "tool-button", "Reset club colors");
  reset.type = "button";
  actions.append(download, reset);
  fields.append(actions);

  const previewWrap = node("div", "kit-preview-wrap");
  const preview = node("div");
  preview.setAttribute("aria-live", "polite");
  previewWrap.append(preview);

  function updateKit() {
    kitSettings = { club: club.value, pattern: pattern.value };
    colorInputs.forEach(([key, input]) => {
      kitSettings[key] = isColor(input.value) ? input.value : "#ffffff";
    });
    saveKitSettings();
    preview.innerHTML = kitSvg(kitSettings);
  }

  club.addEventListener("change", () => {
    const preset = kitPresets[club.value];
    colorInputs.forEach(([key, input]) => {
      input.value = preset[key];
    });
    updateKit();
  });
  pattern.addEventListener("change", updateKit);
  colorInputs.forEach(([, input]) => input.addEventListener("input", updateKit));
  reset.addEventListener("click", () => {
    const preset = kitPresets[club.value];
    colorInputs.forEach(([key, input]) => {
      input.value = preset[key];
    });
    updateKit();
  });

  updateKit();
  workspace.append(fields, previewWrap);
  body.append(workspace);
  card.append(cardHeading, body);
  container.replaceChildren(heading, card);
}

function resolveTeamId(team, results) {
  const exact = results.find((result) => result.team?.name?.toLocaleLowerCase() === team.toLocaleLowerCase());
  return exact?.team?.id || results[0]?.team?.id || null;
}

async function loadRivalryResults(rivalry, resultNode, button) {
  button.disabled = true;
  resultNode.textContent = "Looking up team IDs and head-to-head fixtures…";
  try {
    const [homeResults, awayResults] = await Promise.all([
      fetchJson(`/api/teams?search=${encodeURIComponent(rivalry.home)}`),
      fetchJson(`/api/teams?search=${encodeURIComponent(rivalry.away)}`),
    ]);
    const homeId = resolveTeamId(rivalry.home, homeResults);
    const awayId = resolveTeamId(rivalry.away, awayResults);
    if (!homeId || !awayId) throw new Error("The provider could not find both teams.");
    const results = await fetchJson(`/api/head-to-head?h2h=${homeId}-${awayId}&last=10`);
    if (!results.length) {
      resultNode.textContent = "No head-to-head fixtures were returned by the provider.";
      return;
    }
    resultNode.textContent = results.slice(0, 5).map((match) => {
      const date = match.fixture?.date
        ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(match.fixture.date))
        : "Date unavailable";
      return `${date}: ${match.teams?.home?.name || "Home"} ${match.goals?.home ?? "–"}–${match.goals?.away ?? "–"} ${match.teams?.away?.name || "Away"}`;
    }).join(" · ");
  } catch (error) {
    resultNode.textContent = error.message;
  } finally {
    button.disabled = false;
  }
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Provider request returned ${response.status}.`);
  if (!Array.isArray(payload.response)) throw new Error("The provider response was not a fixture list.");
  return payload.response;
}

export function renderRivalriesPage(container, providerConfigured) {
  const heading = node("header", "module-heading");
  const title = node("div");
  title.append(
    node("p", "eyebrow", "Club matchups · football culture"),
    node("h1", "", "Rivalries"),
    node("p", "module-subtitle", "Browse notable local and national derbies. Head-to-head match results are loaded from your football provider when configured."),
  );
  heading.append(title);
  const grid = node("div", "rivalry-grid");

  rivalries.forEach((rivalry) => {
    const card = node("article", "rivalry-card");
    card.append(
      node("h2", "", rivalry.name),
      node("span", "rivalry-meta", rivalry.country),
    );
    const teams = node("div", "rivalry-teams");
    teams.append(
      node("span", "", rivalry.home),
      node("span", "rivalry-versus", "VS"),
      node("span", "", rivalry.away),
    );
    const context = node("p", "tool-muted", rivalry.context);
    const result = node("p", "rivalry-result", providerConfigured
      ? "Load recent head-to-head results from API-Football."
      : "Set up the API provider to view verified past results. No historical score is invented."));
    const button = node("button", "tool-button", "Load head-to-head");
    button.type = "button";
    button.disabled = !providerConfigured;
    button.addEventListener("click", () => loadRivalryResults(rivalry, result, button));
    card.append(teams, context, result, button);
    grid.append(card);
  });
  container.replaceChildren(heading, grid);
}

function downloadCurrentFixtures(format) {
  const fixtures = window.matchday?.getFixtures?.() || [];
  const isLive = window.matchday?.isProviderConfigured?.() === true;
  const exportObject = {
    exportedAt: new Date().toISOString(),
    provider: isLive ? "API-Football" : "demo",
    demo: !isLive,
    fixtures: fixtures.map((fixture) => ({
      id: fixture.id,
      date: fixture.date || null,
      country: fixture.country,
      league: fixture.league,
      home: fixture.home,
      away: fixture.away,
      homeScore: fixture.homeScore,
      awayScore: fixture.awayScore,
      status: fixture.status,
      time: fixture.time,
    })),
  };
  if (format === "json") {
    downloadBlob(new Blob([JSON.stringify(exportObject, null, 2)], { type: "application/json" }), `matchday-fixtures-${dateKey()}.json`);
    return;
  }
  const columns = ["id", "date", "country", "league", "home", "away", "homeScore", "awayScore", "status", "time"];
  const escapeCsv = (value) => {
    let text = value === null || value === undefined ? "" : String(value);
    if (/^[\t\r ]*[=+\-@]/.test(text)) text = `'${text}`;
    return `"${text.replaceAll('"', '""')}"`;
  };
  const rows = exportObject.fixtures.map((fixture) => columns.map((key) => fixture[key]));
  const csv = [columns, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\r\n");
  downloadBlob(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" }), `matchday-fixtures-${dateKey()}.csv`);
}

async function copyText(text) {
  if (!navigator.clipboard?.writeText) throw new Error("Clipboard access is unavailable in this browser.");
  await navigator.clipboard.writeText(text);
}

export function renderDeveloperPage(container) {
  const heading = node("header", "module-heading");
  const title = node("div");
  title.append(
    node("p", "eyebrow", "Open endpoints · portable data"),
    node("h1", "", "API & data tools"),
    node("p", "module-subtitle", "Download the current fixture list or explore the server-side API. Provider credentials stay on the server and are never included in an export."),
  );
  heading.append(title);

  const grid = node("div", "tool-grid");
  const exportCard = node("section", "tool-card");
  const exportHeader = node("div", "tool-card-header");
  exportHeader.append(node("span", "", "Export fixtures"), node("span", "sample-tag", "JSON · CSV"));
  const exportBody = node("div", "tool-card-body");
  exportBody.append(node("p", "tool-muted", "Export today's currently loaded fixtures. Demo downloads are marked as demo data in JSON."));
  const exportActions = node("div", "tool-actions");
  [["json", "Download JSON"], ["csv", "Download CSV"]].forEach(([format, label]) => {
    const button = node("button", format === "json" ? "tool-button primary" : "tool-button", label);
    button.type = "button";
    button.addEventListener("click", () => downloadCurrentFixtures(format));
    exportActions.append(button);
  });
  exportBody.append(exportActions);
  exportCard.append(exportHeader, exportBody);

  const apiCard = node("section", "tool-card");
  const apiHeader = node("div", "tool-card-header");
  apiHeader.append(node("span", "", "API explorer"), node("span", "sample-tag", "SERVER-SIDE KEY"));
  const apiBody = node("div", "tool-card-body");
  const endpoints = [
    ["GET", "/api/config", "Provider setup status"],
    ["GET", "/api/fixtures?date=YYYY-MM-DD", "Fixtures by date"],
    ["GET", "/api/fixtures?live=all", "Live fixtures"],
    ["GET", "/api/events?fixture=FIXTURE_ID", "Match timeline"],
    ["GET", "/api/statistics?fixture=FIXTURE_ID", "Match statistics"],
    ["GET", "/api/predictions?fixture=FIXTURE_ID", "Provider prediction"],
    ["GET", "/api/teams?search=TEAM_NAME", "Team search"],
    ["GET", "/api/head-to-head?h2h=HOME-AWAY", "Rivalry results"],
    ["GET", "/api/export/fixtures.csv?date=YYYY-MM-DD", "Provider CSV export"],
    ["GET", "/api/export/fixtures.json?date=YYYY-MM-DD", "Provider JSON export"],
    ["GET", "/api/openapi.json", "OpenAPI document"],
  ];
  endpoints.forEach(([method, path, description]) => {
    const row = node("div", "api-endpoint");
    row.append(node("span", "api-method", method), node("code", "api-path", path));
    const button = node("button", "api-copy", "Copy");
    button.type = "button";
    button.setAttribute("aria-label", `Copy endpoint ${path}`);
    button.addEventListener("click", async () => {
      try {
        await copyText(`${window.location.origin}${path}`);
        button.textContent = "Copied";
        setTimeout(() => { button.textContent = "Copy"; }, 1200);
      } catch (error) {
        apiStatus.textContent = error.message;
      }
    });
    row.title = description;
    row.append(button);
    apiBody.append(row);
  });
  const apiActions = node("div", "tool-actions");
  const test = node("button", "tool-button primary", "Test today's fixtures API");
  test.type = "button";
  const openApi = node("a", "tool-button", "Open API schema");
  openApi.href = "/api/openapi.json";
  openApi.target = "_blank";
  openApi.rel = "noopener noreferrer";
  openApi.style.display = "inline-flex";
  openApi.style.alignItems = "center";
  openApi.style.textDecoration = "none";
  const apiStatus = node("p", "api-status", "Checking provider setup…");
  test.addEventListener("click", async () => {
    test.disabled = true;
    apiStatus.textContent = "Requesting today's fixtures…";
    try {
      const response = await fetchJson(`/api/fixtures?date=${encodeURIComponent(dateKey())}`);
      apiStatus.textContent = `API check passed: ${response.length} fixtures returned today.`;
    } catch (error) {
      apiStatus.textContent = error.message;
    } finally {
      test.disabled = false;
    }
  });
  apiActions.append(test, openApi);
  apiBody.append(apiActions, apiStatus);
  apiCard.append(apiHeader, apiBody);
  grid.append(exportCard, apiCard);

  fetch("/api/config", { headers: { Accept: "application/json" } })
    .then(async (response) => {
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Could not read provider setup.");
      apiStatus.textContent = payload.configured
        ? "API-Football is configured. Requests run through the server."
        : "API-Football is not configured. Add API_FOOTBALL_KEY to the server environment to enable live API requests and provider exports.";
    })
    .catch((error) => { apiStatus.textContent = error.message; });

  container.replaceChildren(heading, grid);
}

export function renderFeaturePage(page, container, providerConfigured) {
  if (page === "quiz") return renderQuizPage(container);
  if (page === "kits") return renderKitPage(container);
  if (page === "rivalries") return renderRivalriesPage(container, providerConfigured);
  if (page === "developer") return renderDeveloperPage(container);
  throw new Error(`Unknown feature page: ${page}`);
}

export const quizFeatureData = Object.freeze({
  questions: quizQuestions.length,
  getDailyQuestion,
  dailyKey,
  kitSvg,
});
