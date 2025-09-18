import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import './Progress.css';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'blue',
  showLabel = false,
  animated = true,
  className,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('progressContainer', className)}>
      {showLabel && (
        <div className="progressLabel">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn('progressBar', size)}>
        {animated ? (
          <motion.div
            className={cn('progressFill', color)}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ) : (
          <div
            className={cn('progressFill', color)}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
};

// Circular progress component
interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showLabel?: boolean;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = '#3b82f6',
  showLabel = true,
  className,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn('circularProgressContainer', className)}>
      <svg width={size} height={size} className="circularProgressSvg">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      {showLabel && (
        <div className="circularProgressLabel">
          <span className="circularProgressText">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

// XP Progress bar with level indication
interface XPProgressProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  className?: string;
}

export const XPProgress: React.FC<XPProgressProps> = ({
  currentXP,
  nextLevelXP,
  level,
  className,
}) => {
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <div className={cn('xpProgressContainer', className)}>
      <div className="xpProgressHeader">
        <span className="xpProgressLevel">Level {level}</span>
        <span className="xpProgressXP">
          {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
        </span>
      </div>
      <div className="xpProgressBar">
        <motion.div
          className="xpProgressFill"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

// Streak progress indicator
interface StreakProgressProps {
  currentStreak: number;
  targetStreak: number;
  className?: string;
}

export const StreakProgress: React.FC<StreakProgressProps> = ({
  currentStreak,
  targetStreak,
  className,
}) => {
  const progress = (currentStreak / targetStreak) * 100;

  return (
    <div className={cn('streakProgressContainer', className)}>
      <div className="streakProgressHeader">
        <span className="streakProgressLabel">🔥 Streak</span>
        <span className="streakProgressCount">
          {currentStreak} / {targetStreak} days
        </span>
      </div>
      <div className="streakProgressBar">
        <motion.div
          className="streakProgressFill"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

// Multi-step progress indicator
interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
  className?: string;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
  className,
}) => {
  return (
    <div className={cn('stepProgressContainer', className)}>
      <div className="stepProgressSteps">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              <div className="stepProgressStep">
                <div
                  className={cn(
                    'stepProgressStepCircle',
                    isCompleted
                      ? 'completed'
                      : isCurrent
                      ? 'current'
                      : 'upcoming'
                  )}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                {stepLabels && stepLabels[index] && (
                  <span className="stepProgressStepLabel">
                    {stepLabels[index]}
                  </span>
                )}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={cn(
                    'stepProgressConnector',
                    isCompleted ? 'completed' : 'upcoming'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};