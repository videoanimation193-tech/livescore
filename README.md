# Matchday — Live Scores & Match Analysis

A standalone football match centre with live fixtures, a match timeline, team statistics, API-provided predictions, search, competition filters, and saved favourites.

## Run locally

1. Install Node.js 20.12 or later.
2. In PowerShell, run `Copy-Item .env.example .env` from this folder (skip this if `.env` already exists).
3. Open `.env` in VS Code and set `API_FOOTBALL_KEY=your_private_key` using the key from your [API-Football account](https://www.api-football.com/). Do not paste the key into chat, frontend code, or a public repository.
4. Run `npm start` from this folder and open `http://127.0.0.1:8080`.
5. Confirm `http://127.0.0.1:8080/api/config` reports `"configured": true`. The dashboard then loads the provider competition catalogue and today's fixtures. A rejected key or plan/quota restriction is shown as a data error in the app.

The API key is used only by the Node server and is never sent to the browser. The app uses the API-Football v3 API. Provider access, endpoint availability, and request quotas depend on your API-Football plan. Restart the server after changing `.env`.

Without a key, the UI starts in clearly labeled demo mode and does not present sample scores as live results. Predictions are shown only when the provider returns them; they are estimates, not guarantees or betting advice.

## Core features

- Current live fixtures and today's results from the provider.
- Expandable continent → country → competition catalogue for current provider leagues, with competition-season fixture filtering.
- Searchable, representative demo competition tree when no provider key is configured; demo scores and catalogue are not live or exhaustive.
- Match event timeline, fixture statistics, and provider prediction estimates.
- Search by team or competition, filter by match status and competition, and save fixtures locally.
- Automatic live fixture refresh with manual refresh.
- Responsive interface for desktop and mobile.

## API routes

- `GET /api/config` — provider setup status, never the API key.
- `GET /api/leagues?current=true` — provider's current league and cup catalogue. Results are cached on the server for six hours.
- `GET /api/fixtures?live=all` or `GET /api/fixtures?date=YYYY-MM-DD` (optional `league`, `season`, or `country` filters)
- `GET /api/events?fixture=FIXTURE_ID`
- `GET /api/statistics?fixture=FIXTURE_ID`
- `GET /api/predictions?fixture=FIXTURE_ID`

Only the supported routes and query parameters are proxied to the fixed API-Football host.
The competition catalogue can only show competitions included in the configured provider and subscription; it does not claim exhaustive worldwide historical coverage.
