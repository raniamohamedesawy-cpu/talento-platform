/**
 * Axios instance shared by all API modules.
 *
 * Responsibilities:
 *  - Attaches `Authorization: Bearer <token>` to every request automatically
 *  - On 401 → clears storage and redirects to landing page
 *  - Base URL driven by VITE_API_URL env variable (falls back to localhost:8080)
 */
import axios from "axios";
import { getApiBaseUrl } from "./apiBase";

const BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
});

// ── Request interceptor: attach JWT ───────────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("talento_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: handle 401 ─────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("talento_token");
      localStorage.removeItem("talento_user");
      // Hard redirect so App re-mounts and shows LandingPage
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
