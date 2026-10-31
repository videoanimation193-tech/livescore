"use strict";

const demoFixtures = [
  {
    id: "demo-ars-che",
    league: "Premier League",
    country: "England",
    home: "Arsenal",
    away: "Chelsea",
    homeScore: 2,
    awayScore: 1,
    status: "live",
    time: "63′",
    demo: {
      events: [
        { elapsed: 18, team: "Arsenal", player: "Sample scorer", type: "Goal", detail: "Normal Goal" },
        { elapsed: 42, team: "Chelsea", player: "Sample scorer", type: "Goal", detail: "Normal Goal" },
        { elapsed: 56, team: "Arsenal", player: "Sample scorer", type: "Goal", detail: "Normal Goal" },
      ],
      statistics: [
        { type: "Ball Possession", home: 54, away: 46 },
        { type: "Total Shots", home: 12, away: 9 },
        { type: "Shots on Goal", home: 5, away: 3 },
        { type: "Corner Kicks", home: 6, away: 4 },
        { type: "Passes Accuracy", home: 88, away: 82 },
      ],
      prediction: { home: "49%", draw: "27%", away: "24%", advice: "Illustrative example prediction only." },
    },
  },
  {
    id: "demo-eve-liv",
    league: "Premier League",
    country: "England",
    home: "Everton",
    away: "Liverpool",
    homeScore: 0,
    awayScore: 0,
    status: "live",
    time: "28′",
    demo: {
      events: [{ elapsed: 15, team: "Everton", player: "", type: "Card", detail: "Yellow Card" }],
      statistics: [
        { type: "Ball Possession", home: 38, away: 62 },
        { type: "Total Shots", home: 4, away: 7 },
        { type: "Shots on Goal", home: 1, away: 2 },
        { type: "Corner Kicks", home: 2, away: 5 },
        { type: "Passes Accuracy", home: 73, away: 88 },
      ],
      prediction: { home: "22%", draw: "25%", away: "53%", advice: "Illustrative example prediction only." },
    },
  },
  {
    id: "demo-rm-sev",
    league: "La Liga",
    country: "Spain",
    home: "Real Madrid",
    away: "Sevilla",
    homeScore: 3,
    awayScore: 2,
    status: "finished",
    time: "FT",
    demo: {
      events: [
        { elapsed: 14, team: "Real Madrid", player: "Sample scorer", type: "Goal", detail: "Normal Goal" },
        { elapsed: 37, team: "Sevilla", player: "Sample scorer", type: "Goal", detail: "Normal Goal" },
        { elapsed: 62, team: "Real Madrid", player: "Sample scorer", type: "Goal", detail: "Normal Goal" },
        { elapsed: 79, team: "Sevilla", player: "Sample scorer", type: "Goal", detail: "Normal Goal" },
        { elapsed: 88, team: "Real Madrid", player: "Sample scorer", type: "Goal", detail: "Normal Goal" },
      ],
      statistics: [
        { type: "Ball Possession", home: 61, away: 39 },
        { type: "Total Shots", home: 17, away: 10 },
        { type: "Shots on Goal", home: 8, away: 4 },
        { type: "Corner Kicks", home: 7, away: 3 },
        { type: "Passes Accuracy", home: 91, away: 79 },
      ],
      prediction: { home: "55%", draw: "24%", away: "21%", advice: "Illustrative example prediction only." },
    },
  },
  {
    id: "demo-gir-bet",
    league: "La Liga",
    country: "Spain",
    home: "Girona",
    away: "Real Betis",
    homeScore: 1,
    awayScore: 1,
    status: "finished",
    time: "FT",
    demo: {
      events: [
        { elapsed: 31, team: "Girona", player: "Sample scorer", type: "Goal", detail: "Normal Goal" },
        { elapsed: 72, team: "Real Betis", player: "Sample scorer", type: "Goal", detail: "Normal Goal" },
      ],
      statistics: [
        { type: "Ball Possession", home: 52, away: 48 },
        { type: "Total Shots", home: 11, away: 10 },
        { type: "Shots on Goal", home: 4, away: 4 },
        { type: "Corner Kicks", home: 5, away: 4 },
        { type: "Passes Accuracy", home: 85, away: 84 },
      ],
      prediction: { home: "39%", draw: "31%", away: "30%", advice: "Illustrative example prediction only." },
    },
  },
  {
    id: "demo-int-nap",
    league: "Serie A",
    country: "Italy",
    home: "Inter",
    away: "Napoli",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    time: "20:45",
    demo: {
      events: [],
      statistics: [],
      prediction: { home: "46%", draw: "28%", away: "26%", advice: "Illustrative example prediction only." },
    },
  },
  {
    id: "demo-bay-lev",
    league: "Bundesliga",
    country: "Germany",
    home: "Bayern",
    away: "Leverkusen",
    homeScore: 2,
    awayScore: 2,
    status: "live",
    time: "74′",
    demo: {
      events: [
        { elapsed: 9, team: "Bayern", player: "Sample scorer", type: "Goal", detail: "Normal Goal" },
        { elapsed: 25, team: "Leverkusen", player: "Sample scorer", type: "Goal", detail: "Normal Goal" },
        { elapsed: 51, team: "Bayern", player: "Sample scorer", type: "Goal", detail: "Normal Goal" },
        { elapsed: 68, team: "Leverkusen", player: "Sample scorer", type: "Goal", detail: "Normal Goal" },
      ],
      statistics: [
        { type: "Ball Possession", home: 56, away: 44 },
        { type: "Total Shots", home: 15, away: 13 },
        { type: "Shots on Goal", home: 7, away: 6 },
        { type: "Corner Kicks", home: 5, away: 6 },
        { type: "Passes Accuracy", home: 87, away: 83 },
      ],
      prediction: { home: "43%", draw: "29%", away: "28%", advice: "Illustrative example prediction only." },
    },
  },
];

const demoCountryGroups = {
  Europe: {
    England: ["Premier League", "Championship", "League One", "League Two", "National League", "FA Cup", "EFL Cup", "Community Shield"],
    Spain: ["La Liga", "Segunda División", "Primera RFEF", "Copa del Rey", "Supercopa de España"],
    Italy: ["Serie A", "Serie B", "Serie C", "Coppa Italia", "Supercoppa Italiana"],
    Germany: ["Bundesliga", "2. Bundesliga", "3. Liga", "DFB Pokal", "DFL Super Cup"],
    France: ["Ligue 1", "Ligue 2", "National", "Coupe de France", "Trophée des Champions"],
    Netherlands: ["Eredivisie", "Eerste Divisie", "KNVB Cup", "Johan Cruyff Shield"],
    Portugal: ["Primeira Liga", "Liga Portugal 2", "Taça de Portugal", "Supertaça"],
    Turkey: ["Süper Lig", "1. Lig", "Turkish Cup", "Turkish Super Cup"],
  },
  Asia: {
    "Saudi Arabia": ["Saudi Pro League", "First Division", "King's Cup", "Saudi Super Cup"],
    International: ["AFC Champions League Elite", "AFC Champions League Two", "AFC Asian Cup", "AFC Challenge League"],
  },
  Africa: {
    Kenya: ["FKF Premier League", "National Super League", "FKF Cup", "Super Cup"],
    "South Africa": ["Premiership", "Motsepe Foundation Championship", "Nedbank Cup", "MTN8"],
    International: ["CAF Champions League", "CAF Confederation Cup", "CAF Super Cup", "Africa Cup of Nations", "CHAN"],
  },
  "North America": {
    "United States": ["MLS", "USL Championship", "US Open Cup", "Leagues Cup"],
  },
  "South America": {
    Brazil: ["Serie A", "Serie B", "Copa do Brasil", "State Championships"],
  },
  International: {
    World: ["FIFA World Cup", "World Cup Qualifiers", "International Friendlies", "Olympic Games"],
    Europe: ["UEFA Champions League", "UEFA Europa League", "UEFA Conference League", "UEFA Super Cup", "UEFA Youth League", "UEFA Nations League"],
  },
};

const countryCodes = {
  England: "GB", Spain: "ES", Italy: "IT", Germany: "DE", France: "FR", Netherlands: "NL",
  Portugal: "PT", Turkey: "TR", "Saudi Arabia": "SA", "United States": "US", Brazil: "BR",
  Kenya: "KE", "South Africa": "ZA",
};
const continentCodes = {
  Africa: "DZ AO BJ BW BF BI CV CM CF TD KM CG CD CI DJ EG GQ ER SZ ET GA GM GH GN GW KE LS LR LY MG MW ML MR MU MA MZ NA NE NG RW ST SN SC SL SO ZA SS SD TZ TG TN UG EH ZM ZW",
  Asia: "AF AM AZ BH BD BT BN KH CN CY GE IN ID IR IQ IL JP JO KZ KW KG LA LB MY MV MN MM NP KP OM PK PS PH QA SA SG KR LK SY TW TJ TH TL TR TM AE UZ VN YE",
  Europe: "AL AD AT BY BE BA BG HR CY CZ DK EE FO FI FR DE GI GR GG VA HU IS IE IM IT JE LV LI LT LU MT MD MC ME NL MK NO PL PT RO RU SM RS SK SI ES SE CH UA GB AX XK",
  "North America": "AG BS BB BZ BM CA KY CR CU CW DM DO SV GL GD GT HT HN JM MX NI PA KN LC VC TT TC US",
  "South America": "AR BO BR CL CO EC FK GF GY PY PE SR UY VE",
  Oceania: "AS AU CK FJ PF GU KI MH FM NR NC NZ MP PW PG WS SB TO TV VU",
};
const continentByCountryCode = new Map(
  Object.entries(continentCodes).flatMap(([continent, codes]) => codes.split(" ").map((code) => [code, continent])),
);
const countryNameToCode = new Map(Object.entries(countryCodes).map(([name, code]) => [name.toLowerCase(), code]));

function countryFlag(code, country) {
  const countryCode = (code || countryNameToCode.get(String(country).toLowerCase()) || "").toUpperCase();
  if (!/^[A-Z]{2}$/.test(countryCode)) return countryCode ? "🌐" : "⚽";
  return String.fromCodePoint(...[...countryCode].map((letter) => 127397 + letter.charCodeAt(0)));
}

function continentFor(country, code) {
  const normalized = String(country || "").toLowerCase();
  if (["world", "international", "europe", "africa", "asia", "oceania", "north america", "south america"].includes(normalized)) {
    return "International";
  }
  return continentByCountryCode.get(String(code || countryNameToCode.get(normalized) || "").toUpperCase()) || "Other regions";
}

function makeDemoCatalog() {
  return Object.entries(demoCountryGroups).flatMap(([continent, countries]) =>
    Object.entries(countries).flatMap(([country, competitions]) =>
      competitions.map((name) => ({
        id: "",
        name,
        country,
        countryCode: countryCodes[country] || "",
        continent,
        type: /(cup|copa|coupe|pokal|shield|super cup|supertaça|supercopa|supercoppa|trophy|mtn8|qualifier|friendl|olympic|nations league|champions league|europa league|conference league|confederation|africa cup|asian cup|world cup)/i.test(name)
          ? "Cup"
          : "League",
        season: "",
      })),
    ),
  );
}

const statusLabels = {
  live: "Live",
  finished: "Finished",
  upcoming: "Upcoming",
};
const statOrder = [
  "Ball Possession",
  "Total Shots",
  "Shots on Goal",
  "Shots off Goal",
  "Blocked Shots",
  "Corner Kicks",
  "Offsides",
  "Fouls",
  "Passes Accuracy",
  "Yellow Cards",
  "Red Cards",
  "Expected Goals",
];
const state = {
  fixtures: [...demoFixtures],
  catalog: makeDemoCatalog(),
  providerConfigured: false,
  activeView: "today",
  activeLeague: "all",
  activeLeagueId: "",
  activeSeason: "",
  activeCountry: "",
  competitionSearch: "",
  catalogLoadError: "",
  searchTerm: "",
  selectedId: demoFixtures[0].id,
  detailTab: "overview",
  detailCache: new Map(),
  detailErrors: [],
  loadingFixtures: false,
};

const fixtureGroups = document.getElementById("fixture-groups");
const competitionList = document.getElementById("competition-list");
const leagueSearchInput = document.getElementById("league-search");
const catalogNote = document.getElementById("catalog-note");
const detailHeader = document.getElementById("match-detail");
const detailContent = document.getElementById("detail-content");
const searchInput = document.getElementById("search");
const refreshButton = document.getElementById("refresh");
const banner = document.getElementById("provider-banner");
const bannerTitle = document.getElementById("provider-banner-title");
const bannerMessage = document.getElementById("provider-banner-message");
const fixtureList = document.getElementById("fixture-list");
const sampleMatchTag = document.getElementById("sample-match-tag");
const providerSetupLink = document.getElementById("provider-setup-link");

window.matchday = Object.freeze({
  getFixtures: () => structuredClone(state.fixtures),
  isProviderConfigured: () => state.providerConfigured,
});

function element(tag, className = "", text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function dateParam(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function setBanner(title, message, visible = true) {
  banner.hidden = !visible;
  bannerTitle.textContent = title;
  bannerMessage.textContent = message;
}

function updateProviderPresentation() {
  fixtureList.setAttribute("aria-label", state.providerConfigured ? "Football fixtures" : "Sample football fixtures");
  sampleMatchTag.hidden = state.providerConfigured;
  providerSetupLink.hidden = state.providerConfigured;
}

function localDateTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(date);
}

function fixtureStatus(fixture) {
  const code = fixture?.status?.short || "";
  if (["1H", "2H", "HT", "ET", "P", "BT", "LIVE"].includes(code)) return "live";
  if (["FT", "AET", "PEN", "CANC", "ABD", "AWD", "WO"].includes(code)) return "finished";
  return "upcoming";
}

function mapFixture(item) {
  const status = fixtureStatus(item.fixture);
  const elapsed = item.fixture?.status?.elapsed;
  let time = localDateTime(item.fixture?.date);
  if (status === "finished") time = "FT";
  if (status === "live") time = elapsed === null || elapsed === undefined ? "LIVE" : `${elapsed}′`;

  return {
    id: String(item.fixture?.id),
    apiId: Number(item.fixture?.id),
    league: item.league?.name || "Other competitions",
    leagueId: String(item.league?.id || ""),
    country: item.league?.country || "International",
    home: item.teams?.home?.name || "Home",
    away: item.teams?.away?.name || "Away",
    homeTeamId: item.teams?.home?.id,
    awayTeamId: item.teams?.away?.id,
    homeScore: Number.isFinite(item.goals?.home) ? item.goals.home : null,
    awayScore: Number.isFinite(item.goals?.away) ? item.goals.away : null,
    status,
    statusCode: item.fixture?.status?.short,
    statusLong: item.fixture?.status?.long,
    time,
    elapsed,
    date: item.fixture?.date,
    venue: item.fixture?.venue?.name || "",
    referee: item.fixture?.referee || "",
    round: item.league?.round || "",
    homeWinner: item.teams?.home?.winner,
    awayWinner: item.teams?.away?.winner,
  };
}

async function apiRequest(path) {
  const response = await fetch(path, { headers: { Accept: "application/json" } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Server returned HTTP ${response.status}.`);
  if (!Array.isArray(payload.response)) throw new Error("The football service returned an unexpected response.");
  return payload.response;
}

function countFor(filter) {
  if (filter === "today") return state.fixtures.length;
  if (filter === "favorites") {
    const favorites = loadFavorites();
    return state.fixtures.filter((fixture) => favorites.has(fixture.id)).length;
  }
  return state.fixtures.filter((fixture) => fixture.status === filter).length;
}

function loadFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem("matchday-favorite-fixtures") || "[]");
    const validIds = new Set(state.fixtures.map((fixture) => fixture.id));
    return new Set(Array.isArray(value) ? value.filter((id) => validIds.has(id)) : []);
  } catch (error) {
    console.warn("Could not read saved fixtures:", error);
    return new Set();
  }
}

function saveFavorites(favoriteIds) {
  try {
    localStorage.setItem("matchday-favorite-fixtures", JSON.stringify([...favoriteIds]));
  } catch (error) {
    console.warn("Could not save followed fixtures:", error);
  }
}

function renderCounts() {
  document.querySelectorAll("[data-count]").forEach((node) => {
    node.textContent = String(countFor(node.dataset.count));
  });
}

function renderCompetitions() {
  competitionList.replaceChildren();
  catalogNote.textContent = state.catalogLoadError
    ? `Could not load the provider catalogue: ${state.catalogLoadError}`
    : state.providerConfigured
      ? `${state.catalog.length.toLocaleString()} current competitions from API-Football. Coverage depends on provider availability and your plan.`
    : `${state.catalog.length} sample competitions · demo catalogue, not a complete live provider list.`;

  const allButton = element("button", `competition-button${state.activeLeague === "all" && !state.activeCountry ? " active" : ""}`);
  allButton.type = "button";
  allButton.setAttribute("aria-pressed", String(state.activeLeague === "all" && !state.activeCountry));
  allButton.append(element("span", "competition-mark", "⚽"), document.createTextNode("All competitions"));
  allButton.append(element("span", "side-count", String(state.fixtures.length)));
  allButton.addEventListener("click", () => {
    state.activeLeague = "all";
    state.activeLeagueId = "";
    state.activeSeason = "";
    state.activeCountry = "";
    refreshCompetitionSelection();
  });
  competitionList.append(allButton);

  const search = state.competitionSearch.trim().toLocaleLowerCase();
  const grouped = new Map();
  state.catalog.forEach((competition) => {
    const continent = competition.continent || "Other regions";
    const country = competition.country || "Other";
    const matchesSearch = !search ||
      `${continent} ${country} ${competition.name} ${competition.type}`.toLocaleLowerCase().includes(search);
    if (!matchesSearch) return;
    if (!grouped.has(continent)) grouped.set(continent, new Map());
    const countries = grouped.get(continent);
    if (!countries.has(country)) countries.set(country, []);
    countries.get(country).push(competition);
  });

  const tree = element("div", "competition-tree");
  [...grouped.keys()].sort((a, b) => a.localeCompare(b)).forEach((continent) => {
    const continentNode = element("details", "continent-node");
    const continentCountries = grouped.get(continent);
    const continentCompetitions = [...continentCountries.values()].flat();
    const hasActiveSelection = state.activeCountry
      ? continentCountries.has(state.activeCountry)
      : continentCompetitions.some((competition) =>
        competition.id
          ? competition.id === state.activeLeagueId
          : competition.name === state.activeLeague && competition.country === state.activeCountry,
      );
    continentNode.open = Boolean(search) || hasActiveSelection;
    const continentSummary = element("summary");
    continentSummary.append(document.createTextNode(continent));
    const continentTotal = [...continentCountries.values()].reduce((total, items) => total + items.length, 0);
    continentSummary.append(element("span", "side-count", String(continentTotal)));
    continentNode.append(continentSummary);

    const countryList = element("div", "continent-children");
    [...continentCountries.keys()].sort((a, b) => a.localeCompare(b)).forEach((country) => {
      const countryNode = element("details", `country-node${state.activeCountry === country ? " is-active" : ""}`);
      const countryCompetitions = continentCountries.get(country);
      const hasSelectedCompetition = countryCompetitions.some((competition) =>
        competition.id
          ? competition.id === state.activeLeagueId
          : competition.name === state.activeLeague && competition.country === country,
      );
      countryNode.open = Boolean(search) || state.activeCountry === country || hasSelectedCompetition;
      const countrySummary = element("summary");
      countrySummary.append(
        element("span", "country-flag", countryFlag(
        continentCountries.get(country)[0]?.countryCode,
          country,
        )),
        document.createTextNode(country),
      );
      const countryFixtureCount = state.fixtures.filter((fixture) => fixture.country === country).length;
      countrySummary.append(element("span", "side-count", String(countryFixtureCount)));
      countryNode.append(countrySummary);

      const competitionItems = element("div", "competition-items");
      grouped.get(continent).get(country)
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((competition) => {
          const isActive = competition.id
            ? competition.id === state.activeLeagueId
            : competition.name === state.activeLeague && country === state.activeCountry;
          const button = element("button", `competition-button${isActive ? " active" : ""}`);
          button.type = "button";
          button.setAttribute("aria-pressed", String(isActive));
          button.title = `${competition.name}${competition.season ? ` · ${competition.season}` : ""}`;
          button.append(
            element("span", "competition-mark", competition.type === "League" ? "L" : "C"),
            document.createTextNode(competition.name),
          );
          const fixtureCount = state.fixtures.filter((fixture) =>
            competition.id ? fixture.leagueId === competition.id : fixture.league === competition.name,
          ).length;
          button.append(element("span", "side-count", String(fixtureCount)));
          button.addEventListener("click", () => {
            state.activeLeague = competition.name;
            state.activeLeagueId = competition.id;
            state.activeSeason = competition.season;
            state.activeCountry = competition.id ? "" : country;
            refreshCompetitionSelection();
          });
          competitionItems.append(button);
        });
      countryNode.append(competitionItems);
      countrySummary.addEventListener("click", (event) => {
        event.preventDefault();
        state.activeCountry = state.activeCountry === country ? "" : country;
        state.activeLeague = "all";
        state.activeLeagueId = "";
        state.activeSeason = "";
        refreshCompetitionSelection();
      });
      countryList.append(countryNode);
    });
    continentNode.append(countryList);
    tree.append(continentNode);
  });

  if (!tree.childElementCount) {
    tree.append(element("div", "competition-empty", "No leagues match your search."));
  }
  competitionList.append(tree);
}

function refreshCompetitionSelection() {
  renderCompetitions();
  if (state.providerConfigured) {
    loadFixtures().catch(showLoadError);
  } else {
    const visible = getVisibleFixtures();
    if (!visible.some((fixture) => fixture.id === state.selectedId)) {
      state.selectedId = visible[0]?.id || "";
    }
    renderFixtures();
    renderDetails();
    if (state.selectedId) loadMatchDetails();
  }
}

async function loadLeagueCatalog() {
  state.catalog = [];
  state.catalogLoadError = "";
  try {
    const response = await apiRequest("/api/leagues?current=true");
    state.catalog = response
      .filter((item) => item?.league?.id && item?.league?.name)
      .map((item) => {
        const country = item.country?.name || "International";
        const currentSeason = item.seasons?.find((season) => season.current)?.year;
        const season = currentSeason ?? item.seasons?.at(-1)?.year ?? "";
        return {
          id: String(item.league.id),
          name: item.league.name,
          country,
          countryCode: item.country?.code || "",
          continent: continentFor(country, item.country?.code),
          type: item.league.type || "Competition",
          season: String(season),
        };
      });
    if (state.catalog.length === 0) {
      state.catalogLoadError = "the provider returned no current competitions.";
    }
  } catch (error) {
    state.catalogLoadError = error.message;
  }
  renderCompetitions();
}

function getVisibleFixtures() {
  const query = state.searchTerm.trim().toLocaleLowerCase();
  const favorites = loadFavorites();
  return state.fixtures.filter((fixture) => {
    const matchesView =
      state.activeView === "today" ||
      (state.activeView === "favorites" && favorites.has(fixture.id)) ||
      fixture.status === state.activeView;
    const matchesLeague = state.activeLeague === "all" ||
      (state.activeLeagueId ? fixture.leagueId === state.activeLeagueId : fixture.league === state.activeLeague);
    const matchesCountry = !state.activeCountry || fixture.country === state.activeCountry;
    const matchesSearch =
      !query ||
      `${fixture.home} ${fixture.away} ${fixture.league} ${fixture.country}`.toLocaleLowerCase().includes(query);
    return matchesView && matchesLeague && matchesCountry && matchesSearch;
  });
}

function renderFixture(fixture, favorites) {
  const row = element("article", `fixture-row${fixture.id === state.selectedId ? " selected" : ""}`);
  const isFavorite = favorites.has(fixture.id);
  const favorite = element("button", `favorite-button${isFavorite ? " is-favorite" : ""}`, isFavorite ? "★" : "☆");
  favorite.type = "button";
  favorite.setAttribute("aria-label", `${isFavorite ? "Stop following" : "Follow"} ${fixture.home} versus ${fixture.away}`);
  favorite.setAttribute("aria-pressed", String(isFavorite));
  favorite.title = isFavorite ? "Remove from following" : "Add to following";
  favorite.addEventListener("click", () => {
    if (favorites.has(fixture.id)) favorites.delete(fixture.id);
    else favorites.add(fixture.id);
    saveFavorites(favorites);
    renderCounts();
    renderFixtures();
  });

  const select = element("button", "fixture-main");
  select.type = "button";
  select.setAttribute("aria-label", `${fixture.home} ${fixture.homeScore ?? ""} versus ${fixture.away} ${fixture.awayScore ?? ""}, ${statusLabels[fixture.status]}`);
  select.setAttribute("aria-pressed", String(fixture.id === state.selectedId));

  const kickoff = element("span", `kickoff${fixture.status === "live" ? " live" : ""}`, fixture.time);
  const teams = element("span", "teams");
  const homeWinner = fixture.homeWinner ?? (fixture.homeScore !== null && fixture.awayScore !== null && fixture.homeScore > fixture.awayScore);
  const awayWinner = fixture.awayWinner ?? (fixture.awayScore !== null && fixture.homeScore !== null && fixture.awayScore > fixture.homeScore);
  teams.append(
    element("span", `team-name${homeWinner ? " winner" : ""}`, fixture.home),
    element("span", `team-name${awayWinner ? " winner" : ""}`, fixture.away),
  );

  const score = element("span", `fixture-score${fixture.status === "upcoming" ? " upcoming" : ""}`);
  if (fixture.status === "upcoming") {
    score.append(element("span", "", "–"), element("span", "", "–"));
  } else {
    score.append(
      element("span", "", fixture.homeScore === null ? "–" : String(fixture.homeScore)),
      element("span", "", fixture.awayScore === null ? "–" : String(fixture.awayScore)),
    );
  }

  const label = fixture.status === "live" ? `LIVE ${fixture.time}` : statusLabels[fixture.status];
  const matchState = element("span", `fixture-state ${fixture.status}`, label);
  select.append(kickoff, teams, score, matchState);
  select.addEventListener("click", () => selectFixture(fixture.id));
  row.append(favorite, select);
  return row;
}

function renderFixtures() {
  const visible = getVisibleFixtures();
  const favorites = loadFavorites();
  fixtureGroups.replaceChildren();

  if (state.loadingFixtures) {
    fixtureGroups.append(element("div", "empty-state", "Loading football fixtures…"));
    return;
  }

  if (!visible.length) {
    const empty = element("div", "empty-state");
    empty.append(
      element("strong", "", state.activeView === "favorites" ? "No followed matches yet" : "No matches found"),
      document.createTextNode(state.activeView === "favorites"
        ? "Tap a star beside a fixture to add it to your following list."
        : state.providerConfigured
          ? "Try another status or competition. There may be no fixtures in this selection right now."
          : "Configure an API-Football key to load today's worldwide fixtures."),
    );
    fixtureGroups.append(empty);
    return;
  }

  const groups = new Map();
  visible.forEach((fixture) => {
    if (!groups.has(fixture.league)) groups.set(fixture.league, []);
    groups.get(fixture.league).push(fixture);
  });

  groups.forEach((groupFixtures, league) => {
    const group = element("section", "league-group");
    const heading = element("div", "league-heading");
    heading.append(
      element("span", "competition-mark", league.slice(0, 1)),
      element("span", "", league),
      element("span", "league-country", `· ${groupFixtures[0].country}`),
      element("span", "league-total", `${groupFixtures.length} ${groupFixtures.length === 1 ? "match" : "matches"}`),
    );
    group.append(heading);
    groupFixtures.forEach((fixture) => group.append(renderFixture(fixture, favorites)));
    fixtureGroups.append(group);
  });
}

function renderDetailHeader(fixture) {
  if (!fixture) {
    detailHeader.replaceChildren(element("p", "detail-league", "Select a match to see its analysis."));
    return;
  }

  const homeMark = element("span", "team-mark", fixture.home.slice(0, 2).toUpperCase());
  homeMark.setAttribute("aria-hidden", "true");
  const awayMark = element("span", "team-mark", fixture.away.slice(0, 2).toUpperCase());
  awayMark.setAttribute("aria-hidden", "true");
  detailHeader.replaceChildren(
    element("p", "detail-league", `${fixture.country} · ${fixture.league}`),
    element("p", "detail-state", `${fixture.status === "live" ? `LIVE · ${fixture.time}` : fixture.status === "finished" ? "Finished" : fixture.time}${state.providerConfigured ? "" : " · demo"}`),
  );

  const teams = element("div", "detail-teams");
  const home = element("div", "detail-team");
  home.append(homeMark, element("span", "detail-team-name", fixture.home));
  const away = element("div", "detail-team");
  away.append(awayMark, element("span", "detail-team-name", fixture.away));
  const scoreText = fixture.status === "upcoming"
    ? fixture.time
    : `${fixture.homeScore ?? "–"} – ${fixture.awayScore ?? "–"}`;
  teams.append(
    home,
    element("div", `detail-score${fixture.status === "upcoming" ? " upcoming" : ""}`, scoreText),
    away,
  );
  detailHeader.append(teams);
}

function renderDetailError() {
  if (!state.detailErrors.length) return;
  const message = state.detailErrors.map((error) => error.message).join(" ");
  detailContent.append(element("div", "detail-error", message));
}

function getSelectedFixture() {
  return state.fixtures.find((fixture) => fixture.id === state.selectedId);
}

function selectFixture(id) {
  if (state.selectedId === id) return;
  state.selectedId = id;
  state.detailErrors = [];
  renderFixtures();
  renderDetails();
  loadMatchDetails();
}

function valueToNumber(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const number = Number(value.replace("%", "").replaceAll(",", ""));
    if (Number.isFinite(number)) return number;
  }
  return null;
}

function providerStatistics(response, fixture) {
  if (!Array.isArray(response) || response.length < 2) return [];
  const homeTeam = response.find((team) => team.team?.id === fixture.homeTeamId) || response[0];
  const awayTeam = response.find((team) => team.team?.id === fixture.awayTeamId) || response[1];
  const awayValues = new Map((awayTeam.statistics || []).map((item) => [item.type, item.value]));
  return (homeTeam.statistics || [])
    .map((item) => ({
      type: item.type,
      home: valueToNumber(item.value),
      away: valueToNumber(awayValues.get(item.type)),
    }))
    .filter((item) => item.home !== null && item.away !== null);
}

function providerPrediction(response) {
  const prediction = response?.[0]?.predictions;
  const percent = prediction?.percent;
  if (!percent) return null;
  const home = Number.parseFloat(percent.home);
  const draw = Number.parseFloat(percent.draw);
  const away = Number.parseFloat(percent.away);
  if (![home, draw, away].every(Number.isFinite)) return null;
  return {
    home,
    draw,
    away,
    advice: typeof prediction.advice === "string" ? prediction.advice : "",
    winner: prediction.winner?.name || "",
    goalsHome: prediction.goals?.home || "",
    goalsAway: prediction.goals?.away || "",
    source: "API-Football prediction endpoint",
  };
}

function demoDetail(fixture) {
  const demo = fixture.demo;
  return {
    events: demo?.events || [],
    statistics: demo?.statistics || [],
    prediction: demo?.prediction
      ? {
          home: Number.parseFloat(demo.prediction.home),
          draw: Number.parseFloat(demo.prediction.draw),
          away: Number.parseFloat(demo.prediction.away),
          advice: demo.prediction.advice,
          source: "Illustrative demo estimate",
        }
      : null,
    errors: [],
  };
}

async function loadMatchDetails() {
  const fixture = getSelectedFixture();
  if (!fixture) return;
  if (!state.providerConfigured) {
    state.detailCache.set(fixture.id, demoDetail(fixture));
    renderDetails();
    return;
  }
  if (state.detailCache.has(fixture.id)) {
    renderDetails();
    return;
  }

  state.detailCache.set(fixture.id, { loading: true, events: [], statistics: [], prediction: null });
  renderDetails();
  const endpoints = [
    ["events", `/api/events?fixture=${encodeURIComponent(fixture.apiId)}`],
    ["statistics", `/api/statistics?fixture=${encodeURIComponent(fixture.apiId)}`],
    ["prediction", `/api/predictions?fixture=${encodeURIComponent(fixture.apiId)}`],
  ];
  const results = await Promise.allSettled(endpoints.map(([, path]) => apiRequest(path)));
  if (fixture.id !== state.selectedId) return;

  const detail = { events: [], statistics: [], prediction: null, errors: [] };
  results.forEach((result, index) => {
    const [key] = endpoints[index];
    if (result.status === "rejected") {
      detail.errors.push(new Error(`${key[0].toUpperCase()}${key.slice(1)} unavailable: ${result.reason.message}`));
      return;
    }
    if (key === "events") detail.events = result.value;
    if (key === "statistics") detail.statistics = providerStatistics(result.value, fixture);
    if (key === "prediction") detail.prediction = providerPrediction(result.value);
  });
  state.detailCache.set(fixture.id, detail);
  state.detailErrors = detail.errors;
  renderDetails();
}

function renderTimeline(detail, fixture) {
  renderDetailError();
  const events = [...(detail?.events || [])].sort((a, b) => {
    const elapsedA = Number(a.time?.elapsed ?? a.elapsed ?? 0);
    const elapsedB = Number(b.time?.elapsed ?? b.elapsed ?? 0);
    return elapsedA - elapsedB;
  });
  if (!events.length) {
    detailContent.append(element("div", "empty-state", "No match events are available."));
    return;
  }

  const timeline = element("div", "timeline");
  events.forEach((event) => {
    const elapsed = event.time?.elapsed ?? event.elapsed;
    const extra = event.time?.extra;
    const minute = elapsed === null || elapsed === undefined
      ? "—"
      : `${elapsed}${extra ? `+${extra}` : ""}′`;
    const detailText = event.detail || event.type || "Match event";
    const isGoal = /goal|penalty scored/i.test(`${event.type} ${event.detail}`);
    const item = element("div", `timeline-event${isGoal ? " goal" : ""}`);
    const actor = [event.player?.name || event.player, event.assist?.name ? `Assist: ${event.assist.name}` : ""]
      .filter(Boolean)
      .join(" · ");
    const description = element("span", "timeline-description");
    description.append(document.createTextNode(`${event.team?.name || event.team || ""} · ${detailText}`));
    if (actor) description.append(element("span", "timeline-player", actor));
    item.append(element("span", "timeline-minute", minute), description);
    timeline.append(item);
  });
  detailContent.append(timeline);
  if (!state.providerConfigured) {
    detailContent.append(element("p", "prediction-source", "Sample events shown for interface preview; they are not real match commentary."));
  } else if (fixture.status === "upcoming") {
    detailContent.prepend(element("div", "detail-error", "The match has not started yet; event data may be empty."));
  }
}

function normalizeStatLabel(label) {
  return String(label || "")
    .replace("Shots on Goal", "Shots on target")
    .replace("Corner Kicks", "Corners")
    .replace("Ball Possession", "Possession")
    .replace("Passes Accuracy", "Pass accuracy")
    .replace("Expected Goals", "Expected goals (xG)");
}

function renderStatistics(detail, fixture) {
  renderDetailError();
  const statistics = detail?.statistics || [];
  const ordered = [...statistics].sort((a, b) => {
    const indexA = statOrder.indexOf(a.type);
    const indexB = statOrder.indexOf(b.type);
    return (indexA < 0 ? 999 : indexA) - (indexB < 0 ? 999 : indexB);
  });
  if (!ordered.length) {
    detailContent.append(element("div", "empty-state", fixture.status === "upcoming"
      ? "Match statistics will appear once play starts."
      : "Statistics are not available for this match." ));
    return;
  }

  ordered.forEach((stat) => {
    const total = Math.max(Math.abs(stat.home) + Math.abs(stat.away), 1);
    const homePercent = Math.min(100, Math.round((Math.abs(stat.home) / total) * 100));
    const awayPercent = 100 - homePercent;
    const row = element("div", "detail-stat");
    row.append(
      element("span", "detail-stat-value", formatStat(stat.home, stat.type)),
      element("span", "detail-stat-track"),
      element("span", "detail-stat-label", normalizeStatLabel(stat.type)),
      element("span", "detail-stat-value", formatStat(stat.away, stat.type)),
    );
    const track = row.children[1];
    const homeFill = element("span", "detail-stat-home");
    homeFill.style.width = `${homePercent}%`;
    const awayFill = element("span", "detail-stat-away");
    awayFill.style.width = `${awayPercent}%`;
    track.append(homeFill, awayFill);
    detailContent.append(row);
  });
}

function formatStat(value, type) {
  if (typeof value === "string" && value.endsWith("%")) return value;
  return /possession|accuracy/i.test(type) ? `${value}%` : String(value);
}

function renderAnalysis(detail, fixture) {
  renderDetailError();
  const stats = detail?.statistics || [];
  const getStat = (...names) => stats.find((stat) => names.includes(stat.type));
  const possession = getStat("Ball Possession");
  const shots = getStat("Total Shots");
  const shotsOnGoal = getStat("Shots on Goal", "Shots on target");
  const corners = getStat("Corner Kicks", "Corners");
  const xg = getStat("Expected Goals", "xG");

  const copy = fixture.status === "upcoming"
    ? "This fixture has not started. Match analysis will use match statistics after they become available."
    : "Analysis below is based only on the match statistics returned by the selected data source.";
  detailContent.append(element("p", "analysis-copy", copy));

  const insights = [];
  if (possession) {
    const homePossession = Number.parseFloat(possession.home);
    const awayPossession = Number.parseFloat(possession.away);
    if (Number.isFinite(homePossession) && Number.isFinite(awayPossession)) {
      const leader = homePossession === awayPossession
        ? "Possession is even."
        : `${homePossession > awayPossession ? fixture.home : fixture.away} have more possession (${homePossession}%–${awayPossession}%).`;
      insights.push(leader);
    }
  }
  if (shots) {
    insights.push(`Total shots: ${fixture.home} ${shots.home}, ${fixture.away} ${shots.away}.`);
  }
  if (shotsOnGoal) {
    insights.push(`Shots on target: ${fixture.home} ${shotsOnGoal.home}, ${fixture.away} ${shotsOnGoal.away}.`);
  }
  if (corners) {
    insights.push(`Corners: ${fixture.home} ${corners.home}, ${fixture.away} ${corners.away}.`);
  }
  if (xg) {
    insights.push(`Expected goals: ${fixture.home} ${xg.home}, ${fixture.away} ${xg.away}.`);
  }
  if (!insights.length) {
    detailContent.append(element("div", "empty-state", "There is not enough match data to build an analysis yet."));
    return;
  }

  const list = element("ul", "analysis-list");
  insights.forEach((insight) => list.append(element("li", "", insight)));
  detailContent.append(list);
  if (!state.providerConfigured) {
    detailContent.append(element("p", "prediction-source", "Illustrative sample statistics—not live data."));
  }
}

function renderPrediction(detail, fixture) {
  renderDetailError();
  const prediction = detail?.prediction;
  if (!prediction) {
    detailContent.append(element("div", "empty-state", state.providerConfigured
      ? "A provider prediction is not available for this match or subscription."
      : "Demo prediction estimate unavailable."));
    return;
  }

  const home = Number(prediction.home);
  const draw = Number(prediction.draw);
  const away = Number(prediction.away);
  if (![home, draw, away].every(Number.isFinite)) {
    detailContent.append(element("div", "empty-state", "The provider did not return valid prediction probabilities."));
    return;
  }

  const total = home + draw + away;
  const normalized = total > 0
    ? [home, draw, away].map((value) => (value / total) * 100)
    : [0, 0, 0];
  const row = element("div", "probability-row");
  [
    ["Home", normalized[0]],
    ["Draw", normalized[1]],
    ["Away", normalized[2]],
  ].forEach(([label, probability]) => {
    const item = element("div", "probability");
    item.append(
      element("strong", "", `${Math.round(probability)}%`),
      element("span", "", label),
    );
    row.append(item);
  });
  const bar = element("div", "probability-bar");
  normalized.forEach((probability) => {
    const segment = element("span");
    segment.style.width = `${probability}%`;
    bar.append(segment);
  });
  detailContent.append(row, bar);
  if (prediction.winner) {
    detailContent.append(element("p", "prediction-advice", `Provider pick: ${prediction.winner}`));
  }
  if (prediction.advice) {
    detailContent.append(element("p", "prediction-advice", prediction.advice));
  }
  detailContent.append(element("p", "prediction-source",
    state.providerConfigured
      ? "Provider model estimate, not a guarantee or betting advice."
      : "Illustrative demo estimate only. Configure the API for provider predictions; this is not betting advice."));
}

function renderDetails() {
  const fixture = getSelectedFixture();
  renderDetailHeader(fixture);
  detailContent.replaceChildren();
  if (!fixture) {
    detailContent.append(element("div", "empty-state", "Choose a fixture to view analysis."));
    return;
  }

  const detail = state.detailCache.get(fixture.id);
  if (detail?.loading) {
    detailContent.append(element("div", "detail-loading", "Loading match analysis…"));
    return;
  }
  if (!detail) {
    detailContent.append(element("div", "detail-loading", "Preparing match details…"));
    return;
  }

  if (state.detailTab === "timeline") renderTimeline(detail, fixture);
  else if (state.detailTab === "statistics") renderStatistics(detail, fixture);
  else if (state.detailTab === "prediction") renderPrediction(detail, fixture);
  else renderAnalysis(detail, fixture);
}

function setView(view) {
  state.activeView = view;
  document.querySelectorAll("[data-view]").forEach((button) => {
    const active = button.dataset.view === view;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    if (button.closest(".topnav")) {
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    }
  });

  if (state.providerConfigured) {
    loadFixtures().catch((error) => showLoadError(error));
  } else {
    renderFixtures();
  }
}

function showLoadError(error) {
  setBanner("DATA ERROR", error.message);
  state.loadingFixtures = false;
  renderFixtures();
  renderCounts();
  refreshButton.disabled = false;
  refreshButton.title = "Retry loading fixtures";
}

async function loadFixtures() {
  if (state.loadingFixtures) return;
  state.loadingFixtures = true;
  refreshButton.disabled = true;
  refreshButton.title = "Refreshing match data";
  renderFixtures();

  try {
    const query = new URLSearchParams();
    if (state.activeView === "live") query.set("live", "all");
    else query.set("date", dateParam());
    if (state.activeLeagueId) {
      query.set("league", state.activeLeagueId);
      if (/^\d{4}$/.test(state.activeSeason)) query.set("season", state.activeSeason);
    } else if (state.activeCountry && !["World", "International"].includes(state.activeCountry)) {
      query.set("country", state.activeCountry);
    }
    const response = await apiRequest(`/api/fixtures?${query.toString()}`);
    state.fixtures = response.map(mapFixture).filter((fixture) => fixture.id !== "undefined");
    state.detailCache.clear();
    if (!state.fixtures.some((fixture) => fixture.id === state.selectedId)) {
      state.selectedId = state.fixtures[0]?.id || "";
    }
    state.loadingFixtures = false;
    setBanner("", "", false);
    const selectedCompetition = state.activeLeague === "all" ? "" : ` · ${state.activeLeague}`;
    const selectedCountry = state.activeCountry ? ` · ${state.activeCountry}` : "";
    document.getElementById("date-label").textContent =
      `${state.activeView === "live" ? "Live worldwide · refreshed automatically" : new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(new Date())}${selectedCompetition}${selectedCountry}`;
    document.getElementById("footer-note").textContent =
      "Live fixture data provided by API-Football. Match details and predictions depend on provider coverage and your subscription.";
    renderCompetitions();
    renderCounts();
    renderFixtures();
    renderDetails();
    if (state.selectedId) loadMatchDetails();
  } catch (error) {
    state.loadingFixtures = false;
    throw error;
  } finally {
    refreshButton.disabled = false;
    refreshButton.title = "Refresh match data";
  }
}

async function initialize() {
  document.getElementById("date-label").textContent =
    new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(new Date());
  try {
    const response = await fetch("/api/config", { headers: { Accept: "application/json" } });
    const configuration = await response.json();
    if (!response.ok) throw new Error(configuration.error || "Could not check the football data setup.");
    state.providerConfigured = configuration.configured === true;
    updateProviderPresentation();
    if (state.providerConfigured) {
      await loadLeagueCatalog();
    }
    state.loadingFixtures = false;
    renderCompetitions();
    renderCounts();
    renderFixtures();
    renderDetails();
    window.dispatchEvent(new CustomEvent("matchday:provider-status", {
      detail: { configured: state.providerConfigured },
    }));
  } catch (error) {
    console.error("Could not check API configuration:", error.message);
    state.providerConfigured = false;
    updateProviderPresentation();
    setBanner("DEMO MODE", "Start the Matchday server to connect to live scores.");
  }

  if (state.providerConfigured) {
    document.getElementById("footer-note").textContent =
      "Loading today's match data from API-Football.";
    loadFixtures().catch(showLoadError);
  } else {
    setBanner(
      "DEMO MODE",
      "These sample matches are not live. Add your API-Football key to this app's .env file and restart the server to load provider data. Keep the key server-side.",
    );
    document.getElementById("date-label").textContent = "Illustrative sample fixtures";
    document.getElementById("footer-note").textContent =
      "Demo content only. No match data is live or refreshed; configure a provider key for real fixtures, statistics, and predictions.";
    renderCompetitions();
    renderCounts();
    renderFixtures();
    renderDetails();
    loadMatchDetails();
  }
}

searchInput.addEventListener("input", () => {
  state.searchTerm = searchInput.value;
  renderFixtures();
});

leagueSearchInput.addEventListener("input", () => {
  state.competitionSearch = leagueSearchInput.value;
  renderCompetitions();
});

refreshButton.addEventListener("click", () => {
  if (!state.providerConfigured) {
    setBanner("DEMO MODE", "Add API_FOOTBALL_KEY to the server environment, then restart Matchday to load live data.");
    return;
  }
  state.detailCache.clear();
  loadFixtures().catch(showLoadError);
});

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll("[data-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    state.detailTab = button.dataset.tab;
    document.querySelectorAll("[data-tab]").forEach((tab) => {
      const active = tab.dataset.tab === state.detailTab;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    renderDetails();
  });
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && state.providerConfigured && state.activeView === "live") {
    loadFixtures().catch(showLoadError);
  }
});

setInterval(() => {
  if (state.providerConfigured && state.activeView === "live" && document.visibilityState === "visible") {
    loadFixtures().catch(showLoadError);
  }
}, 60_000);

initialize();
