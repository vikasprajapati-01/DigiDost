import React from 'react';
import { cn } from '@/lib/utils';
import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, padding = 'md', shadow = 'sm', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'card',
          hover && 'hover',
          `padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`,
          `shadow${shadow.charAt(0).toUpperCase() + shadow.slice(1)}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, divider = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-1.5',
        divider && 'pb-4 border-b border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('cardTitle', className)}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('cardDescription', className)}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('cardContent', className)}
    {...props}
  >
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('cardFooter', className)}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';

// Specialized cards for gamification
interface XPCardProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  className?: string;
}

export const XPCard: React.FC<XPCardProps> = ({ 
  currentXP, 
  nextLevelXP, 
  level, 
  className 
}) => {
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <Card className={cn('xpCard', className)}>
      <CardHeader>
        <CardTitle className="xpCardTitle">Level {level}</CardTitle>
        <CardDescription>
          {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="xpProgressContainer">
          <div
            className="xpProgressBar"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = 'blue',
  className,
}) => {
  return (
    <Card className={cn('statCard', color, className)}>
      <CardContent className="statCardContent">
        <div className="statCardLayout">
          <div className="statCardText">
            <p className="statCardTitle">{title}</p>
            <p className="statCardValue">{value}</p>
            {trend && (
              <p className={cn(
                'statCardTrend',
                trend.isPositive ? 'positive' : 'negative'
              )}>
                {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
              </p>
            )}
          </div>
          {icon && (
            <div className="statCardIcon">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};