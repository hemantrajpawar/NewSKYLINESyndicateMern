# Skyline Syndicate — MERN migration

This repository converts the uploaded Base44/TanStack Start project into a separated MERN application:

- `client/` — React 19 + Vite + React Router
- `server/` — Express REST API + MongoDB/Mongoose
- `docs/` — route map, source audit and setup notes

The existing Skyline Syndicate page composition, content, brand tokens, typography, image references, animations and responsive utility class names have been retained wherever possible. Base44 SDK and TanStack Start runtime dependencies have been removed.

## 1. Prerequisites

- Node.js 20 LTS or newer
- npm
- MongoDB local instance or MongoDB Atlas database
- SMTP account for registration OTP and password reset emails (required in production)
- Google OAuth credentials only if you want Google sign-in

## 2. Configure the backend

```bash
cd server
cp .env.example .env
```

Set at least:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/skyline_syndicate
JWT_SECRET=generate-a-long-random-secret-at-least-32-characters
JWT_EXPIRES_IN=7d
```

Generate a JWT secret with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

For OTP and password reset emails, configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `SMTP_FROM`. In development without SMTP, OTP values are written to the API terminal; do not run production without SMTP configured.

Optional Google OAuth:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

Register this exact callback URL in Google Cloud Console. Add the production API callback URL when deploying.

Install and start the API:

```bash
npm install
npm run dev
```

API health check: `http://localhost:5000/api/health`

## 3. Configure the frontend

In a second terminal:

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

The Vite dev server runs at `http://localhost:5173` and proxies `/api` to `http://localhost:5000`. If your API is hosted elsewhere, set `VITE_API_URL` in `client/.env`.

Production build:

```bash
npm run build
npm run preview
```

The production frontend output is `client/dist/`.

## 4. Main routes

| URL | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/approach` | Approach |
| `/services` | Services |
| `/insights` | Insights listing |
| `/insights/:slug` | Insight detail |
| `/contact` | Contact and enquiry form |
| `/projects` | Authenticated project register |
| `/projects/new` | Authenticated project creation |
| `/login` | Login |
| `/register` | Register + email OTP |
| `/forgot-password` | Password reset request |
| `/reset-password?token=...` | Password reset |
| `/auth/callback` | Google OAuth callback |

## 5. REST API

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/api/health` | Public | API health |
| GET | `/api/time` | Public | Current server time (preserved source endpoint) |
| POST | `/api/auth/register` | Public | Register and send OTP |
| POST | `/api/auth/verify-otp` | Public | Verify OTP and issue JWT |
| POST | `/api/auth/resend-otp` | Public | Resend verification OTP |
| POST | `/api/auth/login` | Public | Email/password login |
| GET | `/api/auth/me` | JWT | Current user |
| POST | `/api/auth/logout` | JWT | Client token logout acknowledgement |
| POST | `/api/auth/forgot-password` | Public | Send password reset email |
| POST | `/api/auth/reset-password` | Public | Reset password |
| GET | `/api/auth/google` | Public | Start Google OAuth |
| GET | `/api/auth/google/callback` | Public | Complete Google OAuth |
| GET | `/api/projects` | JWT | List the signed-in user's projects |
| POST | `/api/projects` | JWT | Create a project |
| DELETE | `/api/projects/:id` | JWT | Delete an owned project |
| POST | `/api/contact` | Public + rate limit | Persist contact enquiry |

## 6. Styling and UI preservation

The uploaded UI is authored with Tailwind utility class names and Tailwind `@apply` directives. Rewriting every one of those classes into hand-authored CSS in the same migration would risk visual drift. To preserve the original layout and responsive behavior, the original class names and design tokens are retained and compiled into ordinary static CSS during the Vite build using Tailwind as a **development/build-time compiler only**. Tailwind is not a browser runtime dependency. The resulting `dist/assets/*.css` is standard CSS.

The brand tokens and base styles are in `client/src/index.css`; the original palette and typography configuration is in `client/tailwind.config.js`. Do not remove the build-time CSS compiler until a full utility-to-component CSS conversion has been visually regression-tested.

## 7. Important migration notes

- Base44 SDK, Base44 Vite plugin, Base44 runtime scripts, TanStack Start, TanStack Router and Base44 server functions were removed from the active application.
- Existing images are still referenced from the original Base44 media CDN in `client/src/lib/siteConfig.js`. They remain visible as long as those public URLs remain available. Before fully shutting down the Base44 project, download these assets and move them to your own `/public/images/` directory or an owned CDN, then update `siteConfig.js`.
- The original MFA components depended on Base44's proprietary MFA endpoints and were not wired into the active route table. Email/password auth, email OTP verification, password reset and optional Google OAuth have been migrated. MFA management needs a separate provider-neutral implementation (for example, TOTP) if it is a client requirement.
- Google OAuth is optional and will not work until its credentials and callback URL are configured.
- Project records are now stored in MongoDB and scoped to the authenticated user. Contact enquiries are stored in MongoDB.
- The contact form now submits to the backend and then keeps the existing email/WhatsApp follow-up actions.
- This project has been statically syntax-checked. A complete npm install, Vite production build, browser render and visual comparison could not be run in this environment because npm registry access timed out. Run the install/build steps above and compare all routes at desktop and mobile widths before client presentation.

## 8. Production deployment

Deploy `server/` and `client/` separately:

1. Create MongoDB Atlas database and allow only the backend host IPs.
2. Deploy the Express server to a Node-capable host (Cloud Run, Render, Railway, VPS, etc.).
3. Set backend environment variables in the host's secret manager; never commit `.env`.
4. Build the React client with `VITE_API_URL` pointing to the deployed API URL.
5. Host `client/dist/` on a static host/CDN.
6. Configure SPA fallback so deep links such as `/insights/example` and `/projects` serve `index.html`.
7. Set CORS `CLIENT_URL` to the exact production frontend origin.
8. Configure SMTP and Google OAuth callback URLs if those features are enabled.
9. Test registration, OTP, login, contact submission, project create/list/delete, and password reset before handing the site to the client.
