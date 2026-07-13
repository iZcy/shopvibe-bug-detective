# ShopVibe — Bug Detective Workshop

A broken e-commerce app. Your mission: find every bug by adding logging.

---

## Local Setup

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

---

## Production Deployment

### 1. MongoDB Atlas

1. Go to https://cloud.mongodb.com and create a free cluster (M0 shared)
2. Under **Database Access**, create a database user (user + password)
3. Under **Network Access**, add `0.0.0.0/0` to allow connections from anywhere
4. Under **Databases** → your cluster → **Connect** → **Drivers**, copy the connection string
5. It looks like: `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/shopvibe?retryWrites=true&w=majority`
6. You'll use this URI in Railway's environment variables

### 2. Railway (Backend)

1. Go to https://railway.app and create a new project
2. Choose **Deploy from GitHub repo** → select this repo
3. Add a `ROOT` variable: `server` (tells Railway the server lives inside the `server/` folder)
4. Set these environment variables in Railway:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `CORS_ORIGIN` | Your Netlify frontend URL (e.g. `https://shopvibe.netlify.app`) |
| `GA_MEASUREMENT_ID` | (optional) GA4 Measurement ID |
| `GA_API_SECRET` | (optional) GA4 API Secret |

5. **Deploy**. Railway will auto-detect the `start` script in `server/package.json`
6. Once deployed, Railway gives you a URL like `https://shopvibe-production.up.railway.app` — copy this for Netlify

### 3. Netlify (Frontend)

1. Go to https://netlify.com and create a new site from Git
2. Select this repo
3. Set build settings:

| Setting | Value |
|---------|-------|
| Base directory | `client` |
| Build command | `npm run build` |
| Publish directory | `client/dist` |

4. Add these environment variables:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | Your Railway backend URL (e.g. `https://shopvibe-production.up.railway.app`) |
| `VITE_GA_MEASUREMENT_ID` | (optional) GA4 Measurement ID |
| `VITE_GA_API_SECRET` | (optional) GA4 API Secret |

5. **Deploy**. The `_redirects` file handles client-side routing automatically
6. Copy your Netlify URL (e.g. `https://shopvibe.netlify.app`) and set it as `CORS_ORIGIN` in Railway's environment variables, then redeploy Railway

### 4. Environment Variable Summary

**Railway (server):**
```
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/shopvibe?retryWrites=true&w=majority
CORS_ORIGIN=https://<your-netlify-site>.netlify.app
```

**Netlify (client):**
```
VITE_API_URL=https://<your-railway-site>.up.railway.app
```

---

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
