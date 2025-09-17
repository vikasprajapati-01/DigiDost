'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingButton } from '@/components/ui/Loading';
import type { UserRole } from '@/types';

interface LoginFormData {
  email: string;
  password: string;
  role: UserRole;
}

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    role: 'student'
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const success = await login(formData.email, formData.password, formData.role);
      
      if (success) {
        // Redirect based on role
        switch (formData.role) {
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
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const demoAccounts = [
    { role: 'student' as UserRole, email: 'student@school.edu', name: 'Student Demo' },
    { role: 'teacher' as UserRole, email: 'teacher@school.edu', name: 'Teacher Demo' },
    { role: 'principal' as UserRole, email: 'principal@school.edu', name: 'Principal Demo' }
  ];

  const fillDemoAccount = (demo: typeof demoAccounts[0]) => {
    setFormData({
      email: demo.email,
      password: 'demo123',
      role: demo.role
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-green-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 space-y-6 bg-white">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Welcome to DigiDost
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Rural Education Gamification Platform
            </p>
          </div>

          {/* Demo Accounts */}
          <div className="space-y-3">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center font-medium">Quick Demo Access:</p>
            <div className="grid gap-2">
              {demoAccounts.map((demo) => (
                <Button
                  key={demo.role}
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoAccount(demo)}
                  className="justify-start text-gray-800 dark:text-gray-200 border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <span className="capitalize">{demo.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                I am a:
              </label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value as UserRole)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="principal">Principal</option>
              </select>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <LoadingButton
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="w-full"
            >
              Sign In
            </LoadingButton>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Demo credentials: Any email with password "demo123"</p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}