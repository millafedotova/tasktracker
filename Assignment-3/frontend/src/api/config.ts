export function getApiBaseUrl() {
  const url = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
  return url.replace(/\/$/, "");
}