# Source review and migration report

## Source package reviewed

The uploaded RAR contained 141 file entries across the Base44 project. The application was a React 19 + TanStack Start project with a Base44 runtime, Base44 auth SDK, server functions, Cloudflare Vite plugin and Tailwind/shadcn-style UI kit.

The source routes represented:

- Home
- About
- Approach
- Contact
- Services
- Insights listing
- Insight detail (`$slug`)
- Projects register
- New project

The source also contained shared home/site components, contact/project forms, a login/register/reset-password UI, MFA/consent screens, hooks, a shared UI kit, site configuration and content data.

## Migration mapping

| Base44 source concept | MERN destination |
|---|---|
| `src/routes/site/*` | `client/src/pages/site/*` |
| `src/component/*` | `client/src/components/*` |
| `src/lib/content.js` | `client/src/lib/content.js` |
| `src/lib/siteConfig.js` | `client/src/lib/siteConfig.js` |
| TanStack file routes | React Router routes in `client/src/App.jsx` |
| Base44 auth SDK | REST adapter in `client/src/api/base44Client.js` + Express auth routes |
| Base44 server functions | Express controllers and REST routes |
| Browser-only project store | Mongoose `Project` model and authenticated API |
| Contact form's simulated submit | Express contact API + `ContactEnquiry` model |
| Base44 entity persistence | MongoDB/Mongoose |
| Base44 platform middleware | Express JWT middleware |
| Base44 app runtime and Vite plugin | Vite React plugin |
| Tailwind CSS design tokens | Original `index.css` and Tailwind config retained for static CSS compilation |

## Naming and directory conventions

```text
client/
  src/
    api/                 # HTTP/API adapters
    components/
      auth/
      contact/
      home/
      projects/
      services/
      site/
      ui/
    hooks/
    lib/                 # shared frontend config/content/helpers
    pages/
      auth/
      site/
        insights/
        projects/
    App.jsx
    main.jsx
    index.css

server/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    utils/
    app.js
    server.js
```

Page components are named by purpose (`HomePage`, `InsightDetailPage`, `ProjectDeskPage`). Backend files use conventional `*Controller.js`, `*Routes.js`, and singular Mongoose model names.

## Functional changes

### Authentication

- Email/password registration and login use Express endpoints.
- Registration sends a six-digit email OTP with a ten-minute expiry.
- Passwords are hashed with bcrypt.
- Authenticated requests use JWT bearer tokens.
- Forgot-password tokens are hashed in MongoDB and expire after 30 minutes.
- Google OAuth is implemented as an optional redirect/callback flow, enabled only when credentials are configured.

### Project register

- The previous localStorage project store was replaced with MongoDB persistence.
- `/projects` and `/projects/new` are gated by the frontend auth provider.
- API endpoints require a valid JWT and query by `createdBy`, so users only see/delete their own records.

### Contact enquiries

- The existing client-side validation and visual success state remain.
- Valid submissions are persisted to MongoDB.
- The existing email and WhatsApp follow-up links remain available after submission.

## Items requiring client confirmation or final production setup

1. **Media ownership:** `siteConfig.js` still points to public `media.base44.com` image URLs. Copy those files to an owned CDN or `client/public/images` before decommissioning Base44.
2. **MFA:** the uploaded MFA and consent screens depended on Base44-specific MFA APIs and were not wired into the source route table. They have not been represented as working MERN MFA features.
3. **Google OAuth:** add Google client ID/secret and register the callback URL.
4. **Email delivery:** configure SMTP for production OTP and reset emails.
5. **Authorisation policy:** project endpoints currently allow each verified account to manage its own projects. If the project register should be admin-only, define the admin user/role policy before launch.
6. **Visual regression:** run the application locally and compare each route at desktop, tablet and mobile breakpoints. The code preserves original components, class names, image references, font links and motion components, but an actual browser pixel comparison was not possible here.

## File-by-file audit

`docs/SOURCE_FILE_AUDIT.csv` contains one disposition row for each of the 141 source archive files, including copied, replaced, transformed and excluded files with destination paths and reasons.

## Validation performed

- All backend JavaScript files passed `node --check`.
- All frontend `.js` and `.jsx` files passed TypeScript transpile/parser syntax checks.
- All local frontend imports were checked for missing files.
- No active `@base44/*`, `@tanstack/*`, `createFileRoute`, `createServerFn` or `Base44Scripts` references remain in the converted app source.
- `npm install` could not complete because the package registry request timed out in the execution environment; therefore the Vite production build and browser-level test are still pending.
