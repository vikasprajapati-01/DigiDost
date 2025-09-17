import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, UserRole } from '@/types';
import { STORAGE_KEYS } from '@/types/constants';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  updateProfile: (updates: Partial<User>) => void;
  switchRole: (role: UserRole) => void; // For demo purposes
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string, role?: UserRole) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Simple validation - in real app this would be proper authentication
          if (password !== 'demo123') {
            throw new Error('Invalid credentials');
          }
          
          // Determine role from email or use provided role
          const userRole = role || 
            (email.includes('student') ? 'student' : 
             email.includes('teacher') ? 'teacher' : 
             email.includes('principal') ? 'principal' : 'student');
          
          // Mock user data - in real app this would come from API
          const mockUser: User = {
            id: `${userRole}-1`,
            name: userRole === 'student' ? 'Priya Sharma' :
                  userRole === 'teacher' ? 'Dr. Rajesh Kumar' : 'Mrs. Sunita Verma',
            email,
            role: userRole,
            avatar: `/demo.jpg`,
            phone: userRole === 'student' ? '+91 9876543210' :
                   userRole === 'teacher' ? '+91 9876543211' : '+91 9876543212',
            dateJoined: new Date('2024-01-15'),
            lastActive: new Date(),
            isOnline: true,
            schoolId: 'school-1',
            preferences: {
              language: 'en',
              theme: 'light',
              notifications: true,
              offlineSync: true,
              fontSize: 'medium',
              highContrast: false,
              reducedMotion: false,
            },
          };

          set({ 
            user: mockUser, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          });
          
          return true;
        } catch (error) {
          set({ 
            error: 'Login failed. Please check your credentials.', 
            isLoading: false 
          });
          return false;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          error: null 
        });
      },

      clearError: () => {
        set({ error: null });
      },

      updateProfile: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },

      switchRole: (role: UserRole) => {
        const { user } = get();
        if (user) {
          // Generate appropriate user data for the role
          const updatedUser: User = {
            ...user,
            id: `${role}-1`,
            name: role === 'student' ? 'Priya Sharma' :
                  role === 'teacher' ? 'Dr. Rajesh Kumar' : 'Mrs. Sunita Verma',
            email: `${role}@demo.com`,
            role,
            avatar: `/demo.jpg`,
          };
          set({ user: updatedUser });
        }
      },
    }),
    {
      name: STORAGE_KEYS.AUTH_TOKEN,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);