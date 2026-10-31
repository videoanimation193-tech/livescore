import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

try {
  process.loadEnvFile(join(root, ".env"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 8080);
const apiBaseUrl = "https://v3.football.api-sports.io";
const providerCache = new Map();
const routePaths = new Map([
  ["/api/fixtures", "fixtures"],
  ["/api/leagues", "leagues"],
  ["/api/events", "fixtures/events"],
  ["/api/statistics", "fixtures/statistics"],
  ["/api/predictions", "predictions"],
  ["/api/teams", "teams"],
  ["/api/head-to-head", "fixtures/headtohead"],
]);
const routeParameters = new Map([
  ["/api/fixtures", new Set(["live", "date", "league", "season", "team", "country", "timezone", "last", "from", "to"])],
  ["/api/leagues", new Set(["current", "country", "season", "search", "id", "type"])],
  ["/api/events", new Set(["fixture"])],
  ["/api/statistics", new Set(["fixture"])],
  ["/api/predictions", new Set(["fixture"])],
  ["/api/teams", new Set(["search", "league", "season", "id"])],
  ["/api/head-to-head", new Set(["h2h", "last", "date", "league", "season"])],
]);
const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
]);
const publicScripts = new Map([
  ["/match-app.js", "match-app.js"],
  ["/feature-pages.js", "feature-pages.js"],
  ["/match-features.js", "match-features.js"],
]);

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(body));
}

function validateParameters(pathname, searchParams) {
  const allowed = routeParameters.get(pathname);
  const query = new URLSearchParams();

  for (const [key, value] of searchParams) {
    if (!allowed.has(key)) {
      throw Object.assign(new Error(`Unsupported parameter: ${key}.`), { status: 400 });
    }
    if (!value || value.length > 100) {
      throw Object.assign(new Error(`Invalid ${key} parameter.`), { status: 400 });
    }
    if (["fixture", "league", "season", "team", "id"].includes(key) && !/^\d+$/.test(value)) {
      throw Object.assign(new Error(`${key} must be a numeric ID.`), { status: 400 });
    }
    if (["date", "from", "to"].includes(key) && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      throw Object.assign(new Error(`${key} must use YYYY-MM-DD format.`), { status: 400 });
    }
    if (key === "live" && value !== "all") {
      throw Object.assign(new Error("live must be set to all."), { status: 400 });
    }
    if (key === "current" && value !== "true" && value !== "false") {
      throw Object.assign(new Error("current must be true or false."), { status: 400 });
    }
    query.append(key, value);
  }

  if (["/api/events", "/api/statistics", "/api/predictions"].includes(pathname) && !query.has("fixture")) {
    throw Object.assign(new Error("A fixture ID is required."), { status: 400 });
  }
  if (pathname === "/api/fixtures" && !["date", "live", "from"].some((key) => query.has(key))) {
    throw Object.assign(new Error("Choose a date or request live=all."), { status: 400 });
  }
  if (pathname === "/api/teams" && !["search", "league", "id"].some((key) => query.has(key))) {
    throw Object.assign(new Error("A team search, league ID, or team ID is required."), { status: 400 });
  }
  if (pathname === "/api/leagues" && !["current", "country", "season", "search", "id"].some((key) => query.has(key))) {
    throw Object.assign(new Error("Filter the league catalog by current season, country, season, search, or league ID."), { status: 400 });
  }
  if (pathname === "/api/head-to-head" && !query.has("h2h")) {
    throw Object.assign(new Error("A pair of team IDs is required as h2h=HOME-AWAY."), { status: 400 });
  }
  if (pathname === "/api/head-to-head" && !/^\d+-\d+$/.test(query.get("h2h"))) {
    throw Object.assign(new Error("h2h must contain two numeric team IDs, such as 33-34."), { status: 400 });
  }

  return query;
}

async function handleApiRequest(request, response, url) {
  const query = validateParameters(url.pathname, url.searchParams);
  try {
    const payload = await fetchProviderData(routePaths.get(url.pathname), query);
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(JSON.stringify({
      response: payload.response,
      results: payload.results,
      paging: payload.paging,
    }));
  } catch (error) {
    if (error.status) return sendJson(response, error.status, { error: error.message });
    console.error("Football provider request failed:", error.message);
    return sendJson(response, 502, { error: "Could not load football data." });
  }
}

function escapeCsv(value) {
  let text = value === null || value === undefined ? "" : String(value);
  if (/^[\t\r ]*[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

async function handleFixtureExport(request, response, url, format) {
  const query = validateParameters("/api/fixtures", url.searchParams);
  const result = await fetchProviderData("fixtures", query);
  const fixtures = result.response;

  if (format === "json") {
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Disposition": "attachment; filename=matchday-fixtures.json",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(JSON.stringify({ provider: "API-Football", results: result.results, fixtures }, null, 2));
    return;
  }

  const columns = ["fixture_id", "date", "status", "elapsed", "country", "league", "home_team", "away_team", "home_score", "away_score"];
  const rows = fixtures.map((item) => [
    item.fixture?.id,
    item.fixture?.date,
    item.fixture?.status?.long,
    item.fixture?.status?.elapsed,
    item.league?.country,
    item.league?.name,
    item.teams?.home?.name,
    item.teams?.away?.name,
    item.goals?.home,
    item.goals?.away,
  ]);
  const csv = [columns, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\r\n");
  response.writeHead(200, {
    "Content-Type": "text/csv; charset=utf-8",
    "Cache-Control": "no-store",
    "Content-Disposition": "attachment; filename=matchday-fixtures.csv",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(`\uFEFF${csv}`);
}

async function fetchProviderData(endpoint, query) {
  const providerKey = process.env.API_FOOTBALL_KEY?.trim();
  if (!providerKey) {
    throw Object.assign(
      new Error("Live match data is not configured. Add API_FOOTBALL_KEY to your server environment."),
      { status: 503 },
    );
  }

  const providerUrl = new URL(`${apiBaseUrl}/${endpoint}`);
  providerUrl.search = query.toString();
  const cacheKey = `${endpoint}?${query.toString()}`;
  const cached = providerCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.payload;

  let upstream;
  try {
    upstream = await fetch(providerUrl, {
      headers: { "x-apisports-key": providerKey },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    throw Object.assign(
      new Error(error.name === "TimeoutError"
        ? "The football data provider timed out. Try again shortly."
        : "Could not connect to the football data provider."),
      { status: error.name === "TimeoutError" ? 504 : 502 },
    );
  }

  const payload = await upstream.json().catch(() => null);
  if (!upstream.ok) {
    throw Object.assign(
      new Error(upstream.status === 401 || upstream.status === 403
        ? "The football data provider rejected the API key. Check API_FOOTBALL_KEY."
        : upstream.status === 429
          ? "The football data provider request limit was reached. Wait before refreshing."
          : `The football data provider returned HTTP ${upstream.status}.`),
      { status: upstream.status === 401 || upstream.status === 403 ? 502 : upstream.status },
    );
  }
  if (!payload || !Array.isArray(payload.response)) {
    throw Object.assign(new Error("The football data provider returned an unexpected response."), { status: 502 });
  }
  if (payload.errors && Object.keys(payload.errors).length > 0) {
    const firstError = Object.values(payload.errors)[0];
    throw Object.assign(
      new Error(typeof firstError === "string" ? firstError : "The football data provider could not complete this request."),
      { status: 502 },
    );
  }
  if (endpoint === "leagues" && query.get("current") === "true") {
    providerCache.set(cacheKey, {
      expiresAt: Date.now() + 6 * 60 * 60 * 1000,
      payload,
    });
  }
  return payload;
}

const publicApiDescription = {
  openapi: "3.1.0",
  info: {
    title: "Matchday Football API",
    version: "1.0.0",
    description: "Server-side API-Football v3 proxy. The provider API key is never returned to clients.",
  },
  paths: {
    "/api/config": { get: { summary: "Check whether a data provider is configured" } },
    "/api/fixtures": { get: { summary: "List fixtures by date or live status" } },
    "/api/leagues": { get: { summary: "List current leagues and competitions" } },
    "/api/events": { get: { summary: "Get a match event timeline" } },
    "/api/statistics": { get: { summary: "Get team match statistics" } },
    "/api/predictions": { get: { summary: "Get provider match predictions" } },
    "/api/teams": { get: { summary: "Search for a team" } },
    "/api/head-to-head": { get: { summary: "List head-to-head matches for two teams" } },
    "/api/export/fixtures.json": { get: { summary: "Download fixture data as JSON" } },
    "/api/export/fixtures.csv": { get: { summary: "Download fixture data as CSV" } },
  },
};

async function servePage(response) {
  try {
    const html = await readFile(join(root, "match.html"));
    response.writeHead(200, {
      "Content-Type": contentTypes.get(extname("match.html")),
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    });
    response.end(html);
  } catch (error) {
    console.error("Could not read match.html:", error.message);
    sendJson(response, 500, { error: "Could not load the match centre page." });
  }
}

async function serveScript(response, pathname) {
  const filename = publicScripts.get(pathname);
  if (!filename) return sendJson(response, 404, { error: "Not found." });
  try {
    const script = await readFile(join(root, filename));
    response.writeHead(200, {
      "Content-Type": contentTypes.get(extname(filename)),
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(script);
  } catch (error) {
    if (error.code === "ENOENT") return sendJson(response, 404, { error: "Not found." });
    throw error;
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (request.method === "GET" && url.pathname === "/api/config") {
    return sendJson(response, 200, {
      provider: "API-Football",
      configured: Boolean(process.env.API_FOOTBALL_KEY?.trim()),
    });
  }

  if (request.method === "GET" && url.pathname === "/api/openapi.json") {
    return sendJson(response, 200, publicApiDescription);
  }

  const exportMatch = url.pathname.match(/^\/api\/export\/fixtures\.(json|csv)$/);
  if (request.method === "GET" && exportMatch) {
    try {
      return await handleFixtureExport(request, response, url, exportMatch[1]);
    } catch (error) {
      return sendJson(response, error.status || 502, { error: error.message || "Fixture export failed." });
    }
  }

  if (request.method === "GET" && routePaths.has(url.pathname)) {
    try {
      return await handleApiRequest(request, response, url);
    } catch (error) {
      if (error.status) return sendJson(response, error.status, { error: error.message });
      console.error("Football API request failed:", error.message);
      return sendJson(response, 502, { error: "Could not load football data." });
    }
  }

  if (request.method === "GET" && ["/", "/match.html"].includes(url.pathname)) {
    return servePage(response);
  }

  if (request.method === "GET" && publicScripts.has(url.pathname)) {
    return serveScript(response, url.pathname);
  }

  if (request.method !== "GET") {
    return sendJson(response, 405, { error: "Method not allowed." });
  }

  return sendJson(response, 404, { error: "Not found." });
});

server.listen(port, host, () => {
  const displayHost = host === "0.0.0.0" ? "localhost" : host;
  console.log(`Matchday is running at http://${displayHost}:${port}`);
});
