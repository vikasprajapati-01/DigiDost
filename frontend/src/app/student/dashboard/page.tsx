'use client';

import { StudentOnlyRoute } from '@/components/auth/RoleBasedRedirect';
import { Navigation } from '@/components/layout/Navigation';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { useAuthStore } from '@/store/authStore';
import { useGameStore } from '@/store/gameStore';
import './StudentDashboard.css';
import { motion } from 'framer-motion';

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const { 
    level, 
    xp, 
    coins, 
    currentStreak, 
    weeklyXP, 
    achievements,
    getXPForNextLevel,
    getProgressToNextLevel
  } = useGameStore();

  // Calculate achievement stats
  const achievementsUnlocked = achievements.filter(a => a.unlockedAt !== null).length;
  const totalAchievements = achievements.length;

  return (
    <StudentOnlyRoute>
      <div className="dashboardContainer">
        <Navigation />
        <main className="mainContent">
          <div className="contentWrapper">
            <div className="header">
              <div className="headerText">
                <h1 className="title">
                  Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
                </h1>
                <p className="subtitle">
                  Ready to continue your learning journey?
                </p>
              </div>
              <LogoutButton variant="outline" />
            </div>

            {/* Stats Overview */}
            <div className="statsGrid">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="statCard blue">
                  <h3 className="statTitle">Level</h3>
                  <div className="statValue">{level}</div>
                  <div className="statSubtext">{getXPForNextLevel()} XP to next</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="statCard green">
                  <h3 className="statTitle">Total XP</h3>
                  <div className="statValue">{xp.toLocaleString()}</div>
                  <div className="statSubtext">points earned</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="statCard purple">
                  <h3 className="statTitle">Coins</h3>
                  <div className="statValue">{coins}</div>
                  <div className="statSubtext">to spend</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="statCard orange">
                  <h3 className="statTitle">Achievements</h3>
                  <div className="statValue">{achievementsUnlocked}/{totalAchievements}</div>
                  <div className="statSubtext">unlocked</div>
                </div>
              </motion.div>
            </div>

            {/* Content Grid */}
            <div className="contentGrid">
              {/* Main Content */}
              <div className="leftColumn">
                {/* Quick Actions */}
                <Card className="sectionCard">
                  <h3 className="sectionTitle">🚀 Quick Actions</h3>
                  <div className="quickActionsGrid">
                    <motion.a
                      href="/student/assignments"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="actionCard"
                    >
                      <div className="actionIcon">📝</div>
                      <div className="actionTitle">View Assignments</div>
                      <div className="actionDescription">Check homework and tasks</div>
                    </motion.a>

                    <motion.a
                      href="/student/tournaments"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="actionCard"
                    >
                      <div className="actionIcon">🏆</div>
                      <div className="actionTitle">Join Tournament</div>
                      <div className="actionDescription">Compete with classmates</div>
                    </motion.a>

                    <motion.a
                      href="/student/marketplace"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="quickActionCard marketplaceCard"
                    >
                      <div className="text-3xl mb-2">🎮</div>
                      <div className="quickActionTitle">Games</div>
                      <div className="quickActionSubtitle">Play games</div>
                    </motion.a>

                    <motion.a
                      href="/student/achievements"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="quickActionCard achievementsCard"
                    >
                      <div className="text-3xl mb-2">🏆</div>
                      <div className="quickActionTitle">Achievements</div>
                      <div className="quickActionSubtitle">View your progress</div>
                    </motion.a>
                  </div>
                </Card>

                {/* Recent Achievements */}
                <Card className="sectionCard">
                  <h3 className="sectionTitle">🏅 Recent Achievements</h3>
                  <div className="space-y-4">
                    {achievements.slice(0, 3).map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="achievementItem"
                      >
                        <div className="achievementContent">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="achievementTitle">{achievement.title}</h4>
                            <p className="achievementDescription">{achievement.description}</p>
                          </div>
                        </div>
                        <div className="achievementMeta">
                          <Badge 
                            variant={achievement.unlockedAt ? 'success' : 'secondary'}
                            size="sm"
                          >
                            {achievement.unlockedAt ? 'Unlocked' : 'Locked'}
                          </Badge>
                          <div className="achievementXP">
                            +{achievement.xpReward} XP
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="rightColumn">
                {/* Learning Progress */}
                <Card className="sectionCard">
                  <h3 className="sectionTitle">📈 Learning Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="progressLabel">
                        <span className="progressText">Current Level Progress</span>
                        <span className="progressText">{Math.round(getProgressToNextLevel())}%</span>
                      </div>
                      <Progress value={getProgressToNextLevel()} className="h-2" />
                      <div className="progressSubtext">
                        {getXPForNextLevel() - (xp - (level > 1 ? (level - 1) * 100 : 0))} XP to next level
                      </div>
                    </div>
                    <div>
                      <div className="progressLabel">
                        <span className="progressText">Weekly Goal</span>
                        <span className="progressText">{Math.round((weeklyXP / 500) * 100)}%</span>
                      </div>
                      <Progress value={(weeklyXP / 500) * 100} className="h-2" />
                      <div className="progressSubtext">
                        {Math.max(0, 500 - weeklyXP)} XP remaining this week
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Learning Streak */}
                <Card className="streakCard">
                  <h3 className="sectionTitle">🔥 Learning Streak</h3>
                  <div className="text-center">
                    <div className="streakValue">{currentStreak}</div>
                    <div className="streakLabel">
                      {currentStreak === 1 ? 'day' : 'days'} in a row
                    </div>
                    <div className="streakMessage">
                      {currentStreak > 0 
                        ? "Great job! Keep the momentum going!" 
                        : "Start your learning streak today!"}
                    </div>
                  </div>
                </Card>

                {/* Weekly Goals */}
                <Card className="goalsCard">
                  <h3 className="sectionTitle">📊 This Week&apos;s Goals</h3>
                  <div className="space-y-3">
                    <div className="goalItem">
                      <div>
                        <div className="goalLabel">XP Earned</div>
                        <div className="text-xs text-gray-600">{weeklyXP}/500 XP</div>
                      </div>
                      <Badge variant="success" size="sm">
                        {Math.round((weeklyXP / 500) * 100)}%
                      </Badge>
                    </div>
                    <div className="goalItem">
                      <div>
                        <div className="goalLabel">Assignments Done</div>
                        <div className="text-xs text-gray-600">3/5 completed</div>
                      </div>
                      <Badge variant="warning" size="sm">
                        60%
                      </Badge>
                    </div>
                    <div className="goalItem">
                      <div>
                        <div className="goalLabel">Tournament Rank</div>
                        <div className="text-xs text-gray-600">Class standing</div>
                      </div>
                      <Badge variant="secondary" size="sm">
                        #12
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Upcoming Deadlines */}
                <Card className="sectionCard">
                  <h3 className="sectionTitle">📅 Upcoming Deadlines</h3>
                  <div className="space-y-3">
                    {[
                      { title: "Math Quiz", date: "Tomorrow", urgent: true },
                      { title: "Science Project", date: "3 days", urgent: false },
                      { title: "English Essay", date: "1 week", urgent: false },
                    ].map((deadline) => (
                      <div key={deadline.title} className="goalItem">
                        <div>
                          <div className="goalLabel">{deadline.title}</div>
                          <div className="text-xs text-gray-600">Due in {deadline.date}</div>
                        </div>
                        {deadline.urgent && (
                          <Badge variant="error" size="sm">
                            Urgent
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </StudentOnlyRoute>
  );
}