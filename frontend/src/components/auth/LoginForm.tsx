'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import type { UserRole } from '@/types';
import './LoginForm.css';

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
    { role: 'student' as UserRole, email: 'student@demo.com', label: 'Student Demo' },
    { role: 'teacher' as UserRole, email: 'teacher@demo.com', label: 'Teacher Demo' },
    { role: 'principal' as UserRole, email: 'principal@demo.com', label: 'Principal Demo' }
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
    <div className="loginContainer">
      <div className="loginWrapper">
        {/* Main Login Card */}
        <div className="loginCard">
          {/* Header */}
          <div className="loginHeader">
            <div className="loginIcon">
              <svg className="loginIconSvg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="loginTitle">DigiDost</h1>
            <p className="loginSubtitle">Rural Education Platform</p>
          </div>

          {/* Form Content */}
          <div className="loginContent">
            {/* Demo Accounts */}
            <div className="demoSection">
              <h3 className="demoTitle">Quick Demo Access</h3>
              <div className="demoGrid">
                {demoAccounts.map((demo) => (
                  <button
                    key={demo.role}
                    onClick={() => fillDemoAccount(demo)}
                    className="demoButton"
                  >
                    <div className="demoButtonIcon">
                      {demo.role === 'student' ? '👨‍🎓' : demo.role === 'teacher' ? '👩‍🏫' : '👨‍💼'}
                    </div>
                    {demo.label}
                  </button>
                ))}
              </div>
              <p className="demoPassword">Password: demo123</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="loginForm">
              {/* Role Selection */}
              <div className="formGroup">
                <label className="formLabel">
                  I am a
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value as UserRole)}
                  className="formSelect"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="principal">Principal</option>
                </select>
              </div>

              {/* Email */}
              <div className="formGroup">
                <label className="formLabel">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className={`formInput ${errors.email ? 'error' : ''}`}
                />
                {errors.email && (
                  <p className="errorMessage">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="formGroup">
                <label className="formLabel">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  className={`formInput ${errors.password ? 'error' : ''}`}
                />
                {errors.password && (
                  <p className="errorMessage">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="submitButton"
              >
                {isLoading ? (
                  <div className="loading">
                    <div className="loadingSpinner"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="loginFooter">
          <p className="footerText">
            Empowering rural education through technology
          </p>
        </div>
      </div>
    </div>
  );
}