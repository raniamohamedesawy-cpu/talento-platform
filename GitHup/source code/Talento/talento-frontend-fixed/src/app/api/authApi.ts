/**
 * Auth API module.
 * Mirrors:  POST /api/auth/register
 *           POST /api/auth/login
 *           GET  /api/users/me
 *           PUT  /api/users/me
 */
import api from "../lib/axiosInstance";
import type { User } from "../types";

// ── Request / Response shapes (match backend DTOs) ────────────────────────────

export interface RegisterRequest {
  name:      string;
  email:     string;
  password:  string;
  title?:    string;
  location?: string;
}

export interface LoginRequest {
  email:    string;
  password: string;
}

export interface AuthResponse {
  token:     string;
  tokenType: string;
  expiresAt: string;
  user:      User;
}

export interface UpdateProfileRequest {
  name?:     string;
  title?:    string;
  location?: string;
  bio?:      string;
  // Notification preferences
  notifSessionReminders?: boolean;
  notifNewMessages?:      boolean;
  notifMatchAlerts?:      boolean;
  // Privacy
  profilePublic?:    boolean;
  showLocation?:     boolean;
  showOnlineStatus?: boolean;
}

// ── API calls ─────────────────────────────────────────────────────────────────

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/api/auth/register", data);
  persistAuth(res.data);
  return res.data;
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/api/auth/login", data);
  persistAuth(res.data);
  return res.data;
}

export async function logout(): Promise<void> {
  clearAuth();
}

export async function getMe(): Promise<User> {
  const res = await api.get<User>("/api/users/me");
  return res.data;
}

export async function updateProfile(data: UpdateProfileRequest): Promise<User> {
  const res = await api.put<User>("/api/users/me", data);
  // Keep cached user in sync
  localStorage.setItem("talento_user", JSON.stringify(res.data));
  return res.data;
}

// ── Storage helpers ───────────────────────────────────────────────────────────

function persistAuth(auth: AuthResponse): void {
  localStorage.setItem("talento_token", auth.token);
  localStorage.setItem("talento_user",  JSON.stringify(auth.user));
}

export function clearAuth(): void {
  localStorage.removeItem("talento_token");
  localStorage.removeItem("talento_user");
}

export function getStoredToken(): string | null {
  return localStorage.getItem("talento_token");
}

export function getStoredUser(): User | null {
  const raw = localStorage.getItem("talento_user");
  if (!raw) return null;
  try { return JSON.parse(raw) as User; }
  catch { return null; }
}

export function isAuthenticated(): boolean {
  return !!getStoredToken();
}
