"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  api,
  clearSession,
  getToken,
  setToken as persistToken,
  SESSION_EXPIRED_EVENT,
  USER_KEY,
} from "./api";
import type { AuthResponse, AuthUser, RegisterEmployerInput } from "./types";

const ALLOWED_ROLES: AuthUser["role"][] = ["EMPLOYER", "ADMIN"];

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterEmployerInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function persistUser(user: AuthUser): void {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function isAllowed(user: AuthUser): boolean {
  return ALLOWED_ROLES.includes(user.role) && user.status === "ACTIVE";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const token = getToken();
      if (!token) {
        if (!cancelled) setLoading(false);
        return;
      }
      try {
        const me = await api.get<AuthUser>("/auth/me");
        if (!isAllowed(me)) {
          clearSession();
          if (!cancelled) setUser(null);
          return;
        }
        persistUser(me);
        if (!cancelled) setUser(me);
      } catch {
        clearSession();
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function onExpired() {
      setUser(null);
    }
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired);
  }, []);

  const persistSession = useCallback(
    (response: AuthResponse) => {
      persistToken(response.accessToken);
      persistUser(response.user);
      setUser(response.user);
      router.replace("/portal");
    },
    [router],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await api.post<AuthResponse>("/auth/login", { email, password });
      if (!ALLOWED_ROLES.includes(response.user.role)) {
        throw new Error("This portal is for employer administrators only.");
      }
      if (response.user.status !== "ACTIVE") {
        throw new Error("This account is not active.");
      }
      persistSession(response);
    },
    [persistSession],
  );

  const register = useCallback(
    async (payload: RegisterEmployerInput) => {
      const response = await api.post<AuthResponse>("/auth/register/employer", payload);
      if (response.user.role !== "EMPLOYER") {
        throw new Error("This portal is for employer administrators only.");
      }
      persistSession(response);
    },
    [persistSession],
  );

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    router.replace("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
