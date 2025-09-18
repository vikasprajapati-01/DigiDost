import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Define Battery API types
interface BatteryManager {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format numbers with locale support
export function formatNumber(num: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale).format(num);
}

// Format dates with relative time
export function formatRelativeTime(date: Date, locale = 'en'): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const units: Array<[string, number]> = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1],
  ];
  
  for (const [unit, secondsInUnit] of units) {
    const interval = Math.floor(diffInSeconds / secondsInUnit);
    if (interval >= 1) {
      return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-interval, unit as Intl.RelativeTimeFormatUnit);
    }
  }
  
  return 'just now';
}

// Format file size
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${Math.round(size * 10) / 10} ${units[unitIndex]}`;
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Generate random ID
export function generateId(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

// Validate phone number (Indian format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[91]?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// Calculate XP for level
export function calculateXPForLevel(level: number): number {
  return Math.floor(1000 * Math.pow(1.5, level - 1));
}

// Calculate level from XP
export function calculateLevelFromXP(xp: number): number {
  let level = 1;
  let totalXP = 0;
  
  while (totalXP + calculateXPForLevel(level) <= xp) {
    totalXP += calculateXPForLevel(level);
    level++;
  }
  
  return level;
}

// Get grade suffix (1st, 2nd, 3rd, etc.)
export function getGradeSuffix(grade: number): string {
  const lastDigit = grade % 10;
  const lastTwoDigits = grade % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${grade}th`;
  }
  
  switch (lastDigit) {
    case 1:
      return `${grade}st`;
    case 2:
      return `${grade}nd`;
    case 3:
      return `${grade}rd`;
    default:
      return `${grade}th`;
  }
}

// Get difficulty color
export function getDifficultyColor(difficulty: 'easy' | 'medium' | 'hard'): string {
  switch (difficulty) {
    case 'easy':
      return 'text-green-600 bg-green-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'hard':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

// Get subject color
export function getSubjectColor(subject: string): string {
  const colors: Record<string, string> = {
    mathematics: 'bg-blue-500',
    science: 'bg-green-500',
    english: 'bg-purple-500',
    hindi: 'bg-orange-500',
    history: 'bg-red-500',
    geography: 'bg-teal-500',
    physics: 'bg-indigo-500',
    chemistry: 'bg-pink-500',
    biology: 'bg-emerald-500',
  };
  
  return colors[subject.toLowerCase()] || 'bg-gray-500';
}

// Convert string to URL-friendly slug
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Get time of day greeting
export function getGreeting(name?: string): string {
  const hour = new Date().getHours();
  const nameStr = name ? `, ${name}` : '';
  
  if (hour < 12) {
    return `Good morning${nameStr}`;
  } else if (hour < 17) {
    return `Good afternoon${nameStr}`;
  } else {
    return `Good evening${nameStr}`;
  }
}

// Check if device is mobile
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

// Check if device supports touch
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Get battery level (if supported)
export async function getBatteryLevel(): Promise<number | null> {
  if (typeof navigator === 'undefined' || !('getBattery' in navigator)) {
    return null;
  }
  
  try {
    const navigatorWithBattery = navigator as NavigatorWithBattery;
    const battery = await navigatorWithBattery.getBattery?.();
    return battery ? Math.round(battery.level * 100) : null;
  } catch {
    return null;
  }
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === 'undefined') return false;
  
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      return false;
    }
  }
}