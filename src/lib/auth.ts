/**
 * PINTU SATU - AUTHENTICATION UTILITIES
 */

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "superadmin" | "admin_ops" | "pemilik_kost" | "penjaga_kost";
  kostName?: string;
  roomCount?: number;
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("pintusatu_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("pintusatu_token") || localStorage.getItem("token") || null;
  } catch {
    return null;
  }
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("pintusatu_token");
    localStorage.removeItem("token");
    localStorage.removeItem("pintusatu_user");
    localStorage.removeItem("pintusatu_role");
    document.cookie = "pintusatu_token=; path=/; max-age=0;";
  } catch {
    // ignore
  }
}
