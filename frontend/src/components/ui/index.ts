// Core UI Components
export { Button } from './Button';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, XPCard, StatCard } from './Card';
export { Progress, CircularProgress, XPProgress, StreakProgress, StepProgress } from './Progress';
export { Badge, NotificationBadge, AchievementBadge, SubjectBadge, DifficultyBadge, StatusBadge } from './Badge';
export { OfflineIndicator, ConnectionQuality, useNetworkStatus } from './OfflineIndicator';
export { 
  LoadingSpinner, 
  LoadingScreen, 
  LoadingCard, 
  LoadingSkeleton, 
  LoadingButton,
  LoadingAssignments,
  LoadingDashboard,
  LoadingLessons,
  GlobalLoading
} from './Loading';

// Optimization Components
export { OptimizedImage } from './OptimizedImage';
export { LazyWrapper } from './LazyWrapper';
export { ConnectionStatus } from './ConnectionStatus';

// Layout Components
export { Navigation } from '../layout/Navigation';

// Auth Components
export { 
  AuthGuard, 
  withAuthGuard, 
  StudentGuard, 
  TeacherGuard, 
  PrincipalGuard, 
  StaffGuard, 
  GuestGuard 
} from '../auth/AuthGuard';

// Re-export commonly used types
export type { ButtonProps } from './Button';