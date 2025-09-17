import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store';
import { UserRole } from '@/types';
import { LoadingScreen } from '../ui/Loading';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
  fallbackUrl?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiredRole,
  fallbackUrl = '/login',
}) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // Don't redirect if still loading
    if (isLoading) return;

    // Redirect to login if not authenticated
    if (!isAuthenticated || !user) {
      router.replace(fallbackUrl);
      return;
    }

    // Check role permissions if specified
    if (requiredRole) {
      const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
      if (!allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on user role
        const dashboardRoutes = {
          student: '/student/dashboard',
          teacher: '/teacher/dashboard',
          principal: '/principal/dashboard',
        };
        router.replace(dashboardRoutes[user.role]);
        return;
      }
    }
  }, [isAuthenticated, user, requiredRole, router, isLoading, fallbackUrl]);

  // Show loading while checking authentication
  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // Don't render children if not authenticated or wrong role
  if (!isAuthenticated || !user) {
    return <LoadingScreen message="Redirecting to login..." />;
  }

  if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!allowedRoles.includes(user.role)) {
      return <LoadingScreen message="Redirecting..." />;
    }
  }

  return <>{children}</>;
};

// Higher-order component version
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    requiredRole?: UserRole | UserRole[];
    fallbackUrl?: string;
  } = {}
) {
  const WrappedComponent: React.FC<P> = (props) => {
    return (
      <AuthGuard {...options}>
        <Component {...props} />
      </AuthGuard>
    );
  };

  WrappedComponent.displayName = `withAuthGuard(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

// Role-specific guard components
export const StudentGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthGuard requiredRole="student">{children}</AuthGuard>
);

export const TeacherGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthGuard requiredRole="teacher">{children}</AuthGuard>
);

export const PrincipalGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthGuard requiredRole="principal">{children}</AuthGuard>
);

export const StaffGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthGuard requiredRole={['teacher', 'principal']}>{children}</AuthGuard>
);

// Guest guard - only for non-authenticated users
interface GuestGuardProps {
  children: React.ReactNode;
  redirectUrl?: string;
}

export const GuestGuard: React.FC<GuestGuardProps> = ({
  children,
  redirectUrl,
}) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && user) {
      const defaultRedirect = redirectUrl || {
        student: '/student/dashboard',
        teacher: '/teacher/dashboard', 
        principal: '/principal/dashboard',
      }[user.role];

      router.replace(defaultRedirect);
    }
  }, [isAuthenticated, user, router, isLoading, redirectUrl]);

  if (isLoading) {
    return <LoadingScreen message="Loading..." />;
  }

  if (isAuthenticated && user) {
    return <LoadingScreen message="Redirecting to dashboard..." />;
  }

  return <>{children}</>;
};