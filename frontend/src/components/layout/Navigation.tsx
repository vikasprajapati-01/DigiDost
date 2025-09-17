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
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-gray-200 lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle navigation menu"
      >
        {sidebarOpen ? (
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
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
          'fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-200 shadow-lg transform lg:transform-none lg:translate-x-0 lg:static lg:shadow-none',
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DD</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">DigiDost</h2>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation items */}
          <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200 relative',
                    active
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  onClick={() => {
                    // Close mobile menu when navigating
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <item.icon 
                    className={cn(
                      'w-5 h-5 mr-3 flex-shrink-0',
                      active ? 'text-blue-600' : 'text-gray-400'
                    )} 
                  />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Settings link */}
          <div className="p-3 border-t border-gray-200 space-y-3">
            <Link
              href="/settings"
              className={cn(
                'flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200',
                pathname === '/settings'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <CogIcon className="w-5 h-5 mr-3 text-gray-400" />
              Settings
            </Link>
            
            {/* Connection Status */}
            <div className="px-3 py-2">
              <ConnectionStatus />
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};