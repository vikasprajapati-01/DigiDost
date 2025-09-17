// Route constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    LEARN: '/student/learn',
    LEARN_SUBJECT: '/student/learn/[subject]',
    LEARN_CHAPTER: '/student/learn/[subject]/[chapter]',
    ASSIGNMENTS: '/student/assignments',
    TOURNAMENTS: '/student/tournaments',
    ACHIEVEMENTS: '/student/achievements',
    PROFILE: '/student/profile',
    LEADERBOARD: '/student/leaderboard',
  },
  TEACHER: {
    DASHBOARD: '/teacher/dashboard',
    CLASSES: '/teacher/classes',
    CLASS_DETAIL: '/teacher/classes/[classId]',
    ASSIGNMENTS_CREATE: '/teacher/assignments/create',
    ASSIGNMENTS_MANAGE: '/teacher/assignments',
    REPORTS: '/teacher/reports',
    ANALYTICS: '/teacher/reports/analytics',
    STUDENTS: '/teacher/students',
    COMMUNICATION: '/teacher/communication',
  },
  PRINCIPAL: {
    DASHBOARD: '/principal/dashboard',
    TEACHERS: '/principal/teachers/manage',
    ANALYTICS: '/principal/school/analytics',
    REPORTS: '/principal/reports/generate',
    SCHOOL: '/principal/school',
    RESOURCES: '/principal/resources',
  },
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    PROFILE: '/api/auth/profile',
  },
  USERS: '/api/users',
  STUDENTS: '/api/students',
  TEACHERS: '/api/teachers',
  CLASSES: '/api/classes',
  ASSIGNMENTS: '/api/assignments',
  LESSONS: '/api/lessons',
  TOURNAMENTS: '/api/tournaments',
  ACHIEVEMENTS: '/api/achievements',
  ANALYTICS: '/api/analytics',
  NOTIFICATIONS: '/api/notifications',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'digidost_auth_token',
  USER_DATA: 'digidost_user_data',
  THEME: 'digidost_theme',
  LANGUAGE: 'digidost_language',
  OFFLINE_DATA: 'digidost_offline_data',
  SYNC_QUEUE: 'digidost_sync_queue',
  PREFERENCES: 'digidost_preferences',
} as const;

// Game mechanics constants
export const GAME_CONSTANTS = {
  XP_PER_LESSON: 50,
  XP_PER_QUIZ: 25,
  XP_PER_ASSIGNMENT: 100,
  XP_STREAK_BONUS: 10,
  COINS_PER_LESSON: 5,
  COINS_PER_QUIZ: 3,
  STREAK_THRESHOLD: 7, // days
  LEVEL_XP_BASE: 1000,
  LEVEL_XP_MULTIPLIER: 1.5,
  MAX_LEVEL: 100,
  DAILY_GOAL_XP: 200,
} as const;

// Badge categories
export const BADGE_CATEGORIES = {
  STREAK: 'streak',
  ACHIEVEMENT: 'achievement',
  MILESTONE: 'milestone',
  SOCIAL: 'social',
  SPECIAL: 'special',
} as const;

// Difficulty levels
export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

// Assignment types
export const ASSIGNMENT_TYPES = {
  HOMEWORK: 'homework',
  PROJECT: 'project',
  QUIZ: 'quiz',
  EXAM: 'exam',
} as const;

// Tournament types
export const TOURNAMENT_TYPES = {
  QUIZ: 'quiz',
  ASSIGNMENT: 'assignment',
  PROJECT: 'project',
  SPEED_TEST: 'speed-test',
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const;

// Language constants
export const LANGUAGES = {
  ENGLISH: 'en',
  HINDI: 'hi',
  TELUGU: 'te',
  TAMIL: 'ta',
  BENGALI: 'bn',
} as const;

// Responsive breakpoints (matches Tailwind)
export const BREAKPOINTS = {
  XS: 360,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Offline settings
export const OFFLINE_SETTINGS = {
  MAX_CACHE_SIZE: 50 * 1024 * 1024, // 50MB
  SYNC_RETRY_ATTEMPTS: 3,
  SYNC_RETRY_DELAY: 5000, // 5 seconds
  CACHE_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
} as const;

// File upload settings
export const UPLOAD_SETTINGS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALLOWED_AUDIO_TYPES: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
} as const;

// Analytics periods
export const ANALYTICS_PERIODS = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const;

// Chart colors for analytics
export const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  SUCCESS: '#22c55e',
  INFO: '#06b6d4',
  PURPLE: '#8b5cf6',
  PINK: '#ec4899',
  INDIGO: '#6366f1',
  GRAY: '#6b7280',
} as const;

// Default pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

// Validation rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE_REGEX: /^[+]?[1-9][\d]{0,15}$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  TOURNAMENTS_ENABLED: true,
  OFFLINE_MODE_ENABLED: true,
  PUSH_NOTIFICATIONS_ENABLED: true,
  ANALYTICS_ENABLED: true,
  GAMIFICATION_ENABLED: true,
  MULTI_LANGUAGE_ENABLED: true,
  DARK_MODE_ENABLED: true,
  VOICE_NOTES_ENABLED: true,
  VIDEO_LESSONS_ENABLED: true,
  PARENT_COMMUNICATION_ENABLED: true,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  AUTHENTICATION_ERROR: 'Authentication failed. Please login again.',
  AUTHORIZATION_ERROR: 'You are not authorized to perform this action.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  NOT_FOUND: 'The requested resource was not found.',
  OFFLINE_ERROR: 'This action requires an internet connection.',
  SYNC_ERROR: 'Failed to sync data. Will retry automatically.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
  ASSIGNMENT_SUBMITTED: 'Assignment submitted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  ACHIEVEMENT_UNLOCKED: 'New achievement unlocked!',
  BADGE_EARNED: 'New badge earned!',
  LESSON_COMPLETED: 'Lesson completed successfully!',
  QUIZ_COMPLETED: 'Quiz completed successfully!',
  SYNC_SUCCESS: 'Data synced successfully!',
} as const;

// Subject icons mapping
export const SUBJECT_ICONS = {
  mathematics: '🔢',
  science: '🔬',
  english: '📚',
  hindi: '🇮🇳',
  history: '📜',
  geography: '🌍',
  physics: '⚛️',
  chemistry: '🧪',
  biology: '🦠',
  computer: '💻',
  art: '🎨',
  music: '🎵',
  sports: '⚽',
} as const;

// Grade levels
export const GRADE_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

// Days of the week
export const DAYS_OF_WEEK = [
  'monday',
  'tuesday', 
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

// Time slots
export const TIME_SLOTS = [
  '09:00-09:45',
  '09:45-10:30',
  '10:30-11:15',
  '11:15-11:30', // Break
  '11:30-12:15',
  '12:15-13:00',
  '13:00-14:00', // Lunch break
  '14:00-14:45',
  '14:45-15:30',
  '15:30-16:15',
] as const;

// Badge rarities with colors
export const BADGE_RARITIES = {
  COMMON: { label: 'Common', color: '#9ca3af' },
  UNCOMMON: { label: 'Uncommon', color: '#10b981' },
  RARE: { label: 'Rare', color: '#3b82f6' },
  EPIC: { label: 'Epic', color: '#8b5cf6' },
  LEGENDARY: { label: 'Legendary', color: '#f59e0b' },
} as const;

// Achievement rarities with colors
export const ACHIEVEMENT_RARITIES = {
  BRONZE: { label: 'Bronze', color: '#cd7f32' },
  SILVER: { label: 'Silver', color: '#c0c0c0' },
  GOLD: { label: 'Gold', color: '#ffd700' },
  PLATINUM: { label: 'Platinum', color: '#e5e4e2' },
} as const;