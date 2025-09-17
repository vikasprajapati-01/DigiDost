'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';

interface LogoutButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  showConfirm?: boolean;
}

export function LogoutButton({ 
  className, 
  variant = 'ghost', 
  size = 'md',
  showConfirm = true 
}: LogoutButtonProps) {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    if (showConfirm) {
      if (window.confirm('Are you sure you want to sign out?')) {
        logout();
        router.push('/');
      }
    } else {
      logout();
      router.push('/');
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant={variant}
      size={size}
      className={className}
    >
      Sign Out
    </Button>
  );
}