/**
 * Resolves API/WebSocket base URL for dev, Docker (nginx proxy), and production.
 * Empty VITE_API_URL → same-origin (recommended behind nginx /api proxy).
 */
export function getApiBaseUrl(): string {
  const configured = import.meta.env.VITE_API_URL;
  if (configured === undefined || configured === null) {
    return typeof window !== "undefined" ? window.location.origin : "http://localhost:8080";
  }
  const trimmed = String(configured).trim();
  if (trimmed === "") {
    return typeof window !== "undefined" ? window.location.origin : "http://localhost:8080";
  }
  return trimmed.replace(/\/$/, "");
}
