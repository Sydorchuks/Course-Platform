"use client"
import React, { createContext, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@/types/user';
import { useCurrentUser } from '@/hooks/use-current-user';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL2}/api/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      });
      return response.ok;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL2}/api/users/current`, {
        credentials: 'include',
      });
      
      if (response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          await logout();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  }, [refreshAccessToken]);

  const logout = useCallback(async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL2}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    // Skip auth check for public routes
    if (['/login', '/register', '/'].includes(pathname)) return;

    // Initial check
    checkAuth();

    // Set up periodic check (every 5 minutes)
    const interval = setInterval(checkAuth, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [pathname, checkAuth]);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};