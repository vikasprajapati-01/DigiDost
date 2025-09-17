'use client';

import { StudentOnlyRoute } from '@/components/auth/RoleBasedRedirect';
import { Navigation } from '@/components/layout/Navigation';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { useAuthStore } from '@/store/authStore';
import { useGameStore } from '@/store/gameStore';
import { GAME_CONSTANTS } from '@/types/constants';
import { motion } from 'framer-motion';

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const { 
    level, 
    xp, 
    coins, 
    currentStreak, 
    weeklyXP, 
    badges, 
    achievements,
    getXPForNextLevel,
    getProgressToNextLevel
  } = useGameStore();

  // Calculate level progress
  const nextLevelXP = getXPForNextLevel();
  const levelProgress = getProgressToNextLevel();
  const currentLevelXP = xp - (level > 1 ? (level - 1) * GAME_CONSTANTS.LEVEL_XP_BASE : 0);

  // Get recent achievements (last 3)
  const recentAchievements = achievements
    .filter(achievement => achievement.unlockedAt !== null)
    .sort((a, b) => new Date(b.unlockedAt || 0).getTime() - new Date(a.unlockedAt || 0).getTime())
    .slice(0, 3);

  // Calculate achievement stats
  const achievementsUnlocked = achievements.filter(a => a.unlockedAt !== null).length;
  const totalAchievements = achievements.length;

  return (
    <StudentOnlyRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Navigation />
        
        <main className="lg:ml-64 container mx-auto px-4 pt-4 pb-6 max-w-6xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-gray-600 mt-1">
                Ready to continue your learning adventure?
              </p>
            </div>
            <LogoutButton variant="outline" />
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <h3 className="text-lg font-semibold mb-2">Experience Points</h3>
                <div className="text-3xl font-bold">{xp}</div>
                <div className="text-blue-100 text-sm">+{weeklyXP} this week</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
                <h3 className="text-lg font-semibold mb-2">Current Level</h3>
                <div className="text-3xl font-bold">{level}</div>
                <div className="text-green-100 text-sm">{Math.round(levelProgress)}% to next level</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <h3 className="text-lg font-semibold mb-2">Achievements</h3>
                <div className="text-3xl font-bold">{achievementsUnlocked}</div>
                <div className="text-purple-100 text-sm">of {totalAchievements} unlocked</div>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Level Progress */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Level Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Level {level}</span>
                    <span>{currentLevelXP} / {nextLevelXP} XP</span>
                  </div>
                  <Progress 
                    value={levelProgress} 
                    className="h-3"
                  />
                  <p className="text-sm text-gray-600">
                    {nextLevelXP - currentLevelXP} XP needed to reach Level {level + 1}
                  </p>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="text-2xl mb-2">📚</div>
                    <div className="font-medium">Continue Learning</div>
                    <div className="text-sm text-gray-600">Resume your lessons</div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-green-50 rounded-lg border-2 border-green-200 hover:border-green-300 transition-colors"
                  >
                    <div className="text-2xl mb-2">📝</div>
                    <div className="font-medium">Assignments</div>
                    <div className="text-sm text-gray-600">Check pending work</div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200 hover:border-purple-300 transition-colors"
                  >
                    <div className="text-2xl mb-2">🏆</div>
                    <div className="font-medium">Tournaments</div>
                    <div className="text-sm text-gray-600">Join competitions</div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200 hover:border-orange-300 transition-colors"
                  >
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="font-medium">Practice</div>
                    <div className="text-sm text-gray-600">Sharpen your skills</div>
                  </motion.button>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Achievements */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Achievements</h3>
                <div className="space-y-3">
                  {recentAchievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{achievement.title}</div>
                        <div className="text-xs text-gray-600">{achievement.description}</div>
                      </div>
                      <Badge variant="secondary" size="sm">
                        +{achievement.xpReward} XP
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Study Streak */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Study Streak</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">
                    {currentStreak}
                  </div>
                  <div className="text-gray-600 mb-4">days in a row</div>
                  <div className="text-sm text-gray-500">
                    Keep it up! Complete a lesson today to continue your streak.
                  </div>
                </div>
              </Card>

              {/* Weekly Goals */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Weekly Goals</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>XP Goal</span>
                      <span>{weeklyXP} / 500</span>
                    </div>
                    <Progress value={(weeklyXP / 500) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Lessons Completed</span>
                      <span>3 / 5</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </StudentOnlyRoute>
  );
}