import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import './Badge.css';

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  rounded = true,
  className,
  children,
}) => {
  return (
    <span
      className={cn(
        'badge',
        variant,
        size,
        rounded ? 'roundedFull' : 'rounded',
        className
      )}
    >
      {children}
    </span>
  );
};

// Notification badge for showing counts
interface NotificationBadgeProps {
  count: number;
  max?: number;
  className?: string;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  max = 99,
  className,
}) => {
  if (count <= 0) return null;

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={cn(
        'absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1',
        className
      )}
    >
      {displayCount}
    </motion.span>
  );
};

// Achievement badge component
interface AchievementBadgeProps {
  name: string;
  icon: string;
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum';
  earned?: boolean;
  earnedAt?: Date;
  onClick?: () => void;
  className?: string;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  name,
  icon,
  rarity,
  earned = false,
  earnedAt,
  onClick,
  className,
}) => {
  const rarityClasses = {
    bronze: 'from-yellow-600 to-yellow-800 border-yellow-500',
    silver: 'from-gray-400 to-gray-600 border-gray-400',
    gold: 'from-yellow-400 to-yellow-600 border-yellow-400',
    platinum: 'from-blue-400 to-purple-600 border-purple-400',
  };

  const rarityGlow = {
    bronze: 'shadow-yellow-500/25',
    silver: 'shadow-gray-500/25',
    gold: 'shadow-yellow-500/50',
    platinum: 'shadow-purple-500/50',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-200',
        earned
          ? cn('bg-gradient-to-br text-white shadow-lg', rarityClasses[rarity], rarityGlow[rarity])
          : 'bg-gray-100 text-gray-400 border border-gray-200',
        className
      )}
      onClick={onClick}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-sm font-medium text-center">{name}</h3>
      {earned && earnedAt && (
        <p className="text-xs opacity-75 mt-1">
          {earnedAt.toLocaleDateString()}
        </p>
      )}
      {!earned && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-30 rounded-lg flex items-center justify-center">
          <span className="text-xs font-medium text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            Locked
          </span>
        </div>
      )}
    </motion.div>
  );
};

// Subject badge for showing different subjects
interface SubjectBadgeProps {
  subject: string;
  icon?: string;
  color?: string;
  className?: string;
}

export const SubjectBadge: React.FC<SubjectBadgeProps> = ({
  subject,
  icon,
  color,
  className,
}) => {
  const subjectColors: Record<string, string> = {
    mathematics: 'bg-blue-100 text-blue-800 border-blue-200',
    science: 'bg-green-100 text-green-800 border-green-200',
    english: 'bg-purple-100 text-purple-800 border-purple-200',
    hindi: 'bg-orange-100 text-orange-800 border-orange-200',
    history: 'bg-red-100 text-red-800 border-red-200',
    geography: 'bg-teal-100 text-teal-800 border-teal-200',
  };

  const defaultColor = subjectColors[subject.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';

  return (
    <Badge
      variant="secondary"
      className={cn(
        color || defaultColor,
        'flex items-center space-x-1',
        className
      )}
    >
      {icon && <span>{icon}</span>}
      <span className="capitalize">{subject}</span>
    </Badge>
  );
};

// Difficulty badge
interface DifficultyBadgeProps {
  difficulty: 'easy' | 'medium' | 'hard';
  className?: string;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({
  difficulty,
  className,
}) => {
  const difficultyConfig = {
    easy: { label: 'Easy', variant: 'success' as const },
    medium: { label: 'Medium', variant: 'warning' as const },
    hard: { label: 'Hard', variant: 'error' as const },
  };

  const config = difficultyConfig[difficulty];

  return (
    <Badge variant={config.variant} size="sm" className={className}>
      {config.label}
    </Badge>
  );
};

// Status badge for assignments, tournaments, etc.
interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
}) => {
  const statusConfig: Record<string, { variant: BadgeProps['variant']; label: string }> = {
    draft: { variant: 'default', label: 'Draft' },
    published: { variant: 'info', label: 'Published' },
    submitted: { variant: 'secondary', label: 'Submitted' },
    graded: { variant: 'success', label: 'Graded' },
    overdue: { variant: 'error', label: 'Overdue' },
    upcoming: { variant: 'warning', label: 'Upcoming' },
    active: { variant: 'success', label: 'Active' },
    completed: { variant: 'success', label: 'Completed' },
    cancelled: { variant: 'error', label: 'Cancelled' },
  };

  const config = statusConfig[status.toLowerCase()] || { variant: 'default', label: status };

  return (
    <Badge variant={config.variant} size="sm" className={className}>
      {config.label}
    </Badge>
  );
};