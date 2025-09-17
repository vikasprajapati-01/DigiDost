import { LoginForm } from '@/components/auth/LoginForm';
import { PublicRoute } from '@/components/auth/RoleBasedRedirect';

export default function Home() {
  return (
    <PublicRoute>
      <LoginForm />
    </PublicRoute>
  );
}
