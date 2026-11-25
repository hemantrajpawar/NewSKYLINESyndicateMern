const API_BASE = import.meta.env.VITE_API_URL || "";
const authHeaders = () => {
  const token = localStorage.getItem("skyline_access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}/api${path}`, { ...options, headers: { "Content-Type": "application/json", ...authHeaders(), ...(options.headers || {}) } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Unable to complete request");
  return data;
}
export async function readProjects() { const data = await api("/projects"); return data.projects || []; }
export async function createProject(values) { const data = await api("/projects", { method: "POST", body: JSON.stringify(values) }); return data.project; }
export async function removeProject(id) { return api(`/projects/${id}`, { method: "DELETE" }); }
export function formatProjectDate(value) {
  try { return new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }); }
  catch { return "—"; }
}
