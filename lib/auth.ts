import type { LoginUser } from "@/app/login/login-action";

const USER_STORAGE_KEY = "loggedInUser";


export function saveUserToStorage(user: LoginUser): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }
}


  // Get user data from localStorage

export function getUserFromStorage(): LoginUser | null {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem(USER_STORAGE_KEY);
    if (userData) {
      try {
        return JSON.parse(userData) as LoginUser;
      } catch {
        return null;
      }
    }
  }
  return null;
}



export function removeUserFromStorage(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_STORAGE_KEY);
    // Also clear cookies
    document.cookie = "user=; path=/; max-age=0";
  }
}


export function logout(): void {
  removeUserFromStorage();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}


export function hasRole(user: LoginUser | null, requiredRole: string): boolean {
  if (!user) return false;
  return user.role === requiredRole;
}

export function hasAnyRole(
  user: LoginUser | null,
  requiredRoles: string[]
): boolean {
  if (!user) return false;
  return requiredRoles.includes(user.role);
}

// get user's role from the localStorage

export function getUserRole(): string | null {
  if (typeof window !== "undefined") {
    const user = getUserFromStorage();
    return user?.role || null;
  }
  return null;
}

