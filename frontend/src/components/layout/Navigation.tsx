import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  BookOpenIcon, 
  TrophyIcon, 
  StarIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { useCurrentUser, useAppStore } from '@/store';
import { UserRole } from '@/types';
import { ConnectionStatus } from '@/components/ui/ConnectionStatus';
import { ROUTES } from '@/types/constants';
import './Navigation.css';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: number;
  roles: UserRole[];
}

const navigationItems: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
    roles: ['student', 'teacher', 'principal'],
  },
  {
    name: 'Learn',
    href: '/student/learn',
    icon: BookOpenIcon,
    roles: ['student'],
  },
  {
    name: 'Assignments',
    href: '/student/assignments',
    icon: BookOpenIcon,
    roles: ['student'],
  },
  {
    name: 'Tournaments',
    href: '/student/tournaments',
    icon: TrophyIcon,
    roles: ['student'],
  },
  {
    name: 'Achievements',
    href: '/student/achievements',
    icon: StarIcon,
    roles: ['student'],
  },
  {
    name: 'Classes',
    href: '/teacher/classes',
    icon: UserGroupIcon,
    roles: ['teacher'],
  },
  {
    name: 'Assignments',
    href: '/teacher/assignments',
    icon: BookOpenIcon,
    roles: ['teacher'],
  },
  {
    name: 'Analytics',
    href: '/teacher/reports/analytics',
    icon: ChartBarIcon,
    roles: ['teacher'],
  },
  {
    name: 'Teachers',
    href: '/principal/teachers/manage',
    icon: UserGroupIcon,
    roles: ['principal'],
  },
  {
    name: 'School Analytics',
    href: '/principal/school/analytics',
    icon: ChartBarIcon,
    roles: ['principal'],
  },
  {
    name: 'Reports',
    href: '/principal/reports/generate',
    icon: BookOpenIcon,
    roles: ['principal'],
  },
];

interface NavigationProps {
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const user = useCurrentUser();
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const router = useRouter();
  const pathname = usePathname();

  if (!user) return null;

  // Filter navigation items based on user role
  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(user.role)
  );

  // Get the appropriate dashboard route for the user role
  const getDashboardRoute = (role: UserRole) => {
    switch (role) {
      case 'student':
        return ROUTES.STUDENT.DASHBOARD;
      case 'teacher':
        return ROUTES.TEACHER.DASHBOARD;
      case 'principal':
        return ROUTES.PRINCIPAL.DASHBOARD;
      default:
        return '/';
    }
  };

  // Update dashboard href based on user role
  const navItems = filteredNavItems.map(item => {
    if (item.href === '/dashboard') {
      return {
        ...item,
        href: getDashboardRoute(user.role),
      };
    }
    return item;
  });

  const isActive = (href: string) => {
    if (href === getDashboardRoute(user.role)) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="mobileMenuButton"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle navigation menu"
      >
        {sidebarOpen ? (
          <XMarkIcon className="mobileMenuIcon" />
        ) : (
          <Bars3Icon className="mobileMenuIcon" />
        )}
      </button>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Navigation sidebar */}
      <motion.nav
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : '-100%',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className={cn(
          'navigation',
          sidebarOpen && 'open',
          className
        )}
      >
        <div className="navigationContent">
          {/* Header */}
          <div className="navigationHeader">
            <div className="logoContainer">
              <div className="logo">
                <span className="logoText">DD</span>
              </div>
              <div className="brandContainer">
                <h2 className="brandTitle">DigiDost</h2>
                <p className="userRole">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation items */}
          <div className="navigationItems">
            <ul className="navigationList">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.name} className="navigationItem">
                <Link
                  href={item.href}
                  className={cn(
                    'navigationLink',
                    active && 'active'
                  )}
                  onClick={() => {
                    // Close mobile menu when navigating
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <item.icon className="navigationIcon" />
                  <span className="navigationText">{item.name}</span>
                  {item.badge && (
                    <span className="navigationBadge">
                      {item.badge}
                    </span>
                  )}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="activeIndicator"
                    />
                  )}
                </Link>
                </li>
              );
            })}
            </ul>
          </div>

          {/* Settings link */}
          <div className="navigationFooter">
            <div className="footerContent">
            <Link
              href="/settings"
              className={cn(
                'settingsLink',
                pathname === '/settings' && 'active'
              )}
            >
              <CogIcon className="settingsIcon" />
              Settings
            </Link>
            
            {/* Connection Status */}
            <div className="connectionStatus">
              <ConnectionStatus />
            </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};