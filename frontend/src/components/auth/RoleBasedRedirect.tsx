'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { LoadingScreen } from '@/components/ui/Loading';
import type { UserRole } from '@/types';

interface RoleBasedRedirectProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
  requireAuth?: boolean;
}

export function RoleBasedRedirect({ 
  children, 
  allowedRoles,
  redirectTo = '/',
  requireAuth = true
}: RoleBasedRedirectProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (isLoading) return; // Wait for auth state to load

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      router.push('/');
      return;
    }

    // If user is authenticated but doesn't have required role
    if (isAuthenticated && user && allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on user's actual role
      switch (user.role) {
        case 'student':
          router.push('/student/dashboard');
          break;
        case 'teacher':
          router.push('/teacher/dashboard');
          break;
        case 'principal':
          router.push('/principal/dashboard');
          break;
        default:
          router.push(redirectTo);
      }
      return;
    }

    // If user is authenticated and trying to access login page
    if (!requireAuth && isAuthenticated && user) {
      switch (user.role) {
        case 'student':
          router.push('/student/dashboard');
          break;
        case 'teacher':
          router.push('/teacher/dashboard');
          break;
        case 'principal':
          router.push('/principal/dashboard');
          break;
      }
      return;
    }
  }, [isAuthenticated, user, isLoading, allowedRoles, requireAuth, redirectTo, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show content if all conditions are met
  if (requireAuth && (!isAuthenticated || !user)) {
    return <LoadingScreen />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}

// Convenience components for specific roles
export function StudentOnlyRoute({ children }: { children: React.ReactNode }) {
  return (
    <RoleBasedRedirect allowedRoles={['student']}>
      {children}
    </RoleBasedRedirect>
  );
}

export function TeacherOnlyRoute({ children }: { children: React.ReactNode }) {
  return (
    <RoleBasedRedirect allowedRoles={['teacher']}>
      {children}
    </RoleBasedRedirect>
  );
}

export function PrincipalOnlyRoute({ children }: { children: React.ReactNode }) {
  return (
    <RoleBasedRedirect allowedRoles={['principal']}>
      {children}
    </RoleBasedRedirect>
  );
}

export function EducatorRoute({ children }: { children: React.ReactNode }) {
  return (
    <RoleBasedRedirect allowedRoles={['teacher', 'principal']}>
      {children}
    </RoleBasedRedirect>
  );
}

export function PublicRoute({ children }: { children: React.ReactNode }) {
  return (
    <RoleBasedRedirect requireAuth={false}>
      {children}
    </RoleBasedRedirect>
  );
}