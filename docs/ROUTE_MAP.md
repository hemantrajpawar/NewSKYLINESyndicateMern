# Route map

| Browser path | React page | Backend dependency |
|---|---|---|
| `/` | `pages/site/HomePage.jsx` | Static content |
| `/about` | `pages/site/AboutPage.jsx` | Static content |
| `/approach` | `pages/site/ApproachPage.jsx` | Static content |
| `/services` | `pages/site/ServicesPage.jsx` | Static content |
| `/contact` | `pages/site/ContactPage.jsx` | `POST /api/contact` |
| `/insights` | `pages/site/insights/InsightsPage.jsx` | Static content |
| `/insights/:slug` | `pages/site/insights/InsightDetailPage.jsx` | Static content |
| `/projects` | `pages/site/projects/ProjectDeskPage.jsx` | `GET /api/projects`, `DELETE /api/projects/:id` |
| `/projects/new` | `pages/site/projects/NewProjectPage.jsx` | `POST /api/projects` |
| `/login` | `components/auth/LoginPage.jsx` | `POST /api/auth/login` |
| `/register` | `components/auth/RegisterPage.jsx` | `POST /api/auth/register`, `POST /api/auth/verify-otp` |
| `/forgot-password` | `components/auth/ForgotPasswordPage.jsx` | `POST /api/auth/forgot-password` |
| `/reset-password` | `components/auth/ResetPasswordPage.jsx` | `POST /api/auth/reset-password` |
| `/auth/callback` | `pages/AuthCallbackPage.jsx` | Google OAuth callback redirect |

All public marketing pages are wrapped by the shared `SiteLayout` in `client/src/App.jsx`. Project desk pages are wrapped by `RequireAuth`.

Backend-only preserved endpoint: `GET /api/time` returns the current server timestamp with `Cache-Control: no-store`.
