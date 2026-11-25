const API_BASE = import.meta.env.VITE_API_URL || "";
const TOKEN_KEY = "skyline_access_token";
const getToken = () => localStorage.getItem(TOKEN_KEY);
async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}/api${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}), ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) { const error = new Error(data.message || "Request failed"); error.status = response.status; throw error; }
  return data;
}
export const base44 = {
  auth: {
    hasToken: () => Boolean(getToken()),
    setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
    me: async () => (await request("/auth/me")).user,
   
loginViaEmailPassword: async (email, password) => {
  const data = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (data.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
  }

  return data;
}
,
    register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
    verifyOtp: async (payload) => { const data = await request("/auth/verify-otp", { method: "POST", body: JSON.stringify(payload) }); if (data.token) localStorage.setItem(TOKEN_KEY, data.token); return data; },
    resendOtp: (email) => request("/auth/resend-otp", { method: "POST", body: JSON.stringify({ email }) }),
    resetPasswordRequest: (email) => request("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }),
    resetPassword: ({ resetToken, newPassword }) => request("/auth/reset-password", { method: "POST", body: JSON.stringify({ token: resetToken, password: newPassword }) }),
    loginWithProvider: (provider, returnTo = "/") => { if (provider !== "google") throw new Error("Unsupported provider"); window.location.href = `${API_BASE}/api/auth/google?returnTo=${encodeURIComponent(returnTo)}`; },
    redirectToLogin: (returnTo = window.location.href) => { window.location.href = `/login?returnTo=${encodeURIComponent(returnTo)}`; },
    logout: async () => { try { await request("/auth/logout", { method: "POST" }); } finally { localStorage.removeItem(TOKEN_KEY); } },

verifyMfa: async (challengeToken, otpCode) => {
  const data = await request("/auth/verify-mfa", {
    method: "POST",
    body: JSON.stringify({ challengeToken, otpCode }),
  });

  if (data.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
  }

  return data;
},

startMfaChange: (action, password) =>
  request("/auth/mfa/start-change", {
    method: "POST",
    body: JSON.stringify({ action, password }),
  }),

confirmMfaChange: (action, otpCode) =>
  request("/auth/mfa/confirm-change", {
    method: "POST",
    body: JSON.stringify({ action, otpCode }),
  }),

  },
};
