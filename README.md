# ShopVibe — Bug Detective Workshop

A broken e-commerce app. Your mission: find every bug by adding logging.

## Setup

1. Clone this repo
2. Copy `.env.example` to `server/.env` and fill in your MongoDB Atlas URI (and optional GA4 keys)
3. Install dependencies:

```bash
cd server && npm install
cd ../client && npm install
```

4. Seed some products into your MongoDB Atlas database (use MongoDB Compass or any GUI)
5. Start both:

```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

6. Open http://localhost:5173

## The Challenge

The app looks complete. But it's full of bugs across every layer:

- **Backend** — routes, models, services
- **Frontend** — components, hooks, state
- **Network** — API calls, CORS
- **Analytics** — GA4 event tracking

Your task is to **add logging** at each layer to discover what's wrong. There is no logging pre-installed. You decide where to add it.

## Thinking Flow

For each feature or screen you interact with:

1. **Observe** — What's behaving strangely? A crash? Wrong data? Slow response? Silent failure?
2. **Hypothesize** — What layer could cause this? Frontend state? Backend query? Network config?
3. **Add logging** — Place `console.log`, `console.warn`, `console.error`, or backend logging in the suspected area
4. **Confirm** — Do the logs match your hypothesis?
5. **Fix** — Apply the fix and verify with your logs

Repeat until all 20 bugs are found.

## Logging Tools

You are expected to install and configure these yourself:

- **Backend**: `winston` + `morgan` (npm packages) — log requests, errors, and server events
- **Frontend**: `console.log/warn/error` with structured messages
- **Network**: Axios request/response interceptors
- **Analytics**: GA4 Measurement Protocol (already wired, but broken)

## Hints

- Every route file has at least one bug
- Not all bugs crash the app — some are subtle
- The GA4 code sends events but something is wrong with them
- Some bugs only appear under specific conditions

Happy hunting.
