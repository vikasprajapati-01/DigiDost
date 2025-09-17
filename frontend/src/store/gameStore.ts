import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Badge, Achievement } from '@/types';
import { mockBadges, mockAchievements } from '@/data/mockData';
import { STORAGE_KEYS, GAME_CONSTANTS } from '@/types/constants';

interface GameState {
  level: number;
  xp: number;
  coins: number;
  gems: number;
  currentStreak: number;
  longestStreak: number;
  lastLoginDate: string | null;
  badges: Badge[];
  achievements: Achievement[];
  weeklyXP: number;
  monthlyXP: number;
  rank: number;
  isLoading: boolean;
  
  // Actions
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  addGems: (amount: number) => void;
  spendGems: (amount: number) => boolean;
  updateStreak: () => void;
  unlockBadge: (badgeId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  checkDailyLogin: () => void;
  getXPForNextLevel: () => number;
  getProgressToNextLevel: () => number;
  calculateLevel: (xp: number) => number;
  checkBadgeProgress: (badgeId: string) => number;
  resetWeeklyXP: () => void;
  resetMonthlyXP: () => void;
  updateRank: (newRank: number) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      level: 1,
      xp: 0,
      coins: 100, // Starting coins
      gems: 5, // Starting gems
      currentStreak: 0,
      longestStreak: 0,
      lastLoginDate: null,
      badges: [],
      achievements: [],
      weeklyXP: 0,
      monthlyXP: 0,
      rank: 0,
      isLoading: false,

      addXP: (amount: number) => {
        const { level, xp, weeklyXP, monthlyXP } = get();
        const newXP = xp + amount;
        const newLevel = get().calculateLevel(newXP);
        
        set({
          xp: newXP,
          level: newLevel,
          weeklyXP: weeklyXP + amount,
          monthlyXP: monthlyXP + amount,
        });
        
        // Check for level up achievement
        if (newLevel > level) {
          console.log(`Level up! Now level ${newLevel}`);
          // In real app, show level up animation/notification
        }
      },

      addCoins: (amount: number) => {
        const { coins } = get();
        set({ coins: coins + amount });
      },

      spendCoins: (amount: number) => {
        const { coins } = get();
        if (coins >= amount) {
          set({ coins: coins - amount });
          return true;
        }
        return false;
      },

      addGems: (amount: number) => {
        const { gems } = get();
        set({ gems: gems + amount });
      },

      spendGems: (amount: number) => {
        const { gems } = get();
        if (gems >= amount) {
          set({ gems: gems - amount });
          return true;
        }
        return false;
      },

      updateStreak: () => {
        const { currentStreak, longestStreak, lastLoginDate } = get();
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
        
        if (lastLoginDate === yesterday) {
          // Consecutive day
          const newStreak = currentStreak + 1;
          set({
            currentStreak: newStreak,
            longestStreak: Math.max(longestStreak, newStreak),
            lastLoginDate: today,
          });
          
          // Award streak bonus
          get().addXP(GAME_CONSTANTS.XP_STREAK_BONUS);
          get().addCoins(2);
          
        } else if (lastLoginDate !== today) {
          // First login today or streak broken
          set({
            currentStreak: 1,
            lastLoginDate: today,
          });
        }
      },

      unlockBadge: (badgeId: string) => {
        const { badges } = get();
        const availableBadge = mockBadges.find(b => b.id === badgeId);
        
        if (availableBadge && !badges.some(b => b.id === badgeId)) {
          const unlockedBadge: Badge = {
            ...availableBadge,
            earnedAt: new Date(),
            progress: 100,
          };
          
          set({ badges: [...badges, unlockedBadge] });
          console.log(`Badge unlocked: ${availableBadge.name}`);
        }
      },

      unlockAchievement: (achievementId: string) => {
        const { achievements } = get();
        const availableAchievement = mockAchievements.find(a => a.id === achievementId);
        
        if (availableAchievement && !achievements.some(a => a.id === achievementId)) {
          set({ achievements: [...achievements, availableAchievement] });
          
          // Award XP and coins
          get().addXP(availableAchievement.xpReward);
          get().addCoins(availableAchievement.coinReward);
          
          console.log(`Achievement unlocked: ${availableAchievement.title}`);
        }
      },

      checkDailyLogin: () => {
        const today = new Date().toDateString();
        const { lastLoginDate } = get();
        
        if (lastLoginDate !== today) {
          get().updateStreak();
          
          // Daily login bonus
          get().addXP(20);
          get().addCoins(5);
          
          console.log('Daily login bonus: +20 XP, +5 coins');
        }
      },

      getXPForNextLevel: () => {
        const { level } = get();
        return Math.floor(
          GAME_CONSTANTS.LEVEL_XP_BASE * 
          Math.pow(GAME_CONSTANTS.LEVEL_XP_MULTIPLIER, level - 1)
        );
      },

      getProgressToNextLevel: () => {
        const { level, xp } = get();
        const currentLevelXP = Math.floor(
          GAME_CONSTANTS.LEVEL_XP_BASE * 
          Math.pow(GAME_CONSTANTS.LEVEL_XP_MULTIPLIER, level - 2)
        );
        const nextLevelXP = get().getXPForNextLevel();
        const progressXP = xp - currentLevelXP;
        const requiredXP = nextLevelXP - currentLevelXP;
        
        return Math.max(0, Math.min(100, (progressXP / requiredXP) * 100));
      },

      calculateLevel: (xp: number) => {
        let level = 1;
        let totalXPNeeded = 0;
        
        while (level < GAME_CONSTANTS.MAX_LEVEL) {
          const xpForThisLevel = Math.floor(
            GAME_CONSTANTS.LEVEL_XP_BASE * 
            Math.pow(GAME_CONSTANTS.LEVEL_XP_MULTIPLIER, level - 1)
          );
          
          if (xp < totalXPNeeded + xpForThisLevel) {
            break;
          }
          
          totalXPNeeded += xpForThisLevel;
          level++;
        }
        
        return level;
      },

      checkBadgeProgress: (badgeId: string) => {
        const badge = mockBadges.find(b => b.id === badgeId);
        if (!badge) return 0;
        
        const { currentStreak, xp, achievements } = get();
        
        switch (badge.criteria.type) {
          case 'streak':
            return Math.min(100, (currentStreak / badge.criteria.target) * 100);
          case 'xp':
            return Math.min(100, (xp / badge.criteria.target) * 100);
          case 'social':
            return Math.min(100, (achievements.length / badge.criteria.target) * 100);
          default:
            return 0;
        }
      },

      resetWeeklyXP: () => {
        set({ weeklyXP: 0 });
      },

      resetMonthlyXP: () => {
        set({ monthlyXP: 0 });
      },

      updateRank: (newRank: number) => {
        set({ rank: newRank });
      },
    }),
    {
      name: STORAGE_KEYS.OFFLINE_DATA + '_game',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        level: state.level,
        xp: state.xp,
        coins: state.coins,
        gems: state.gems,
        currentStreak: state.currentStreak,
        longestStreak: state.longestStreak,
        lastLoginDate: state.lastLoginDate,
        badges: state.badges,
        achievements: state.achievements,
        weeklyXP: state.weeklyXP,
        monthlyXP: state.monthlyXP,
        rank: state.rank,
      }),
    }
  )
);