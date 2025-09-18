'use client';

import { PrincipalOnlyRoute } from '@/components/auth/RoleBasedRedirect';
import { Navigation } from '@/components/layout/Navigation';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';
import './PrincipalDashboard.css';

export default function PrincipalDashboard() {
  const { user } = useAuthStore();

  return (
    <PrincipalOnlyRoute>
      <div className="principalDashboardContainer">
        <Navigation />
        
        <main className="principalMainContent">
          <div className="principalContentWrapper">
            {/* Header */}
            <div className="principalHeader">
              <div className="principalHeaderText">
                <h1 className="principalTitle">
                  Welcome back, {user?.name?.split(' ')[0]}! 👨‍💼
                </h1>
                <p className="principalSubtitle">
                  School-wide insights and administrative control
                </p>
              </div>
              <LogoutButton variant="outline" />
            </div>

            {/* Key Metrics */}
            <div className="principalMetricsGrid">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="principalMetricCard blue"
              >
                <h3 className="principalMetricCardTitle">Total Students</h3>
                <div className="principalMetricCardValue">1,245</div>
                <div className="principalMetricCardSubtext">+23 this month</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="principalMetricCard green"
              >
                <h3 className="principalMetricCardTitle">Active Teachers</h3>
                <div className="principalMetricCardValue">48</div>
                <div className="principalMetricCardSubtext">Across all subjects</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="principalMetricCard emerald"
              >
                <h3 className="principalMetricCardTitle">Attendance Rate</h3>
                <div className="principalMetricCardValue">94%</div>
                <div className="principalMetricCardSubtext">+2% from last month</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="principalMetricCard orange"
              >
                <h3 className="principalMetricCardTitle">Performance Score</h3>
                <div className="principalMetricCardValue">87%</div>
                <div className="principalMetricCardSubtext">School average</div>
              </motion.div>
            </div>

            <div className="principalMainGrid">
              {/* Main Content */}
              <div className="principalLeftColumn">
                {/* Administrative Actions */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="principalContentCard"
                >
                  <h3 className="principalSectionTitle">Administrative Actions</h3>
                  <div className="principalAdminActionsGrid">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="principalAdminAction blue"
                    >
                      <div className="principalAdminActionIcon">👥</div>
                      <div className="principalAdminActionTitle">Manage Teachers</div>
                      <div className="principalAdminActionDesc">Staff administration</div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="principalAdminAction green"
                    >
                      <div className="principalAdminActionIcon">📊</div>
                      <div className="principalAdminActionTitle">School Analytics</div>
                      <div className="principalAdminActionDesc">Performance insights</div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="principalAdminAction purple"
                    >
                      <div className="principalAdminActionIcon">📋</div>
                      <div className="principalAdminActionTitle">Generate Reports</div>
                      <div className="principalAdminActionDesc">Performance reports</div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="principalAdminAction orange"
                    >
                      <div className="principalAdminActionIcon">🏫</div>
                      <div className="principalAdminActionTitle">School Settings</div>
                      <div className="principalAdminActionDesc">Configuration</div>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Performance Overview */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="principalContentCard"
                >
                  <h3 className="principalSectionTitle">Subject Performance Overview</h3>
                  <div className="principalPerformanceList">
                    {[
                      { subject: "Mathematics", average: 88, students: 245, trend: "+3%" },
                      { subject: "Science", average: 85, students: 238, trend: "+1%" },
                      { subject: "English", average: 91, students: 245, trend: "+5%" },
                      { subject: "Social Studies", average: 82, students: 245, trend: "-1%" },
                      { subject: "Hindi", average: 89, students: 245, trend: "+2%" },
                    ].map((subject, index) => (
                      <motion.div
                        key={subject.subject}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="principalPerformanceItem"
                      >
                        <div className="principalPerformanceContent">
                          <h4 className="principalPerformanceSubject">{subject.subject}</h4>
                          <p className="principalPerformanceStudents">{subject.students} students</p>
                        </div>
                        <div className="principalPerformanceStats">
                          <div className="principalPerformanceScore">
                            <div className="principalPerformanceAverage">{subject.average}%</div>
                            <div className={`principalPerformanceTrend ${
                              subject.trend.startsWith('+') ? 'positive' : 
                              subject.trend.startsWith('-') ? 'negative' : ''
                            }`}>
                              {subject.trend}
                            </div>
                          </div>
                          <div className="principalPerformanceProgress">
                            <Progress value={subject.average} className="h-2" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Class Distribution */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="principalContentCard"
                >
                  <h3 className="principalSectionTitle">Class Distribution</h3>
                  <div className="principalClassGrid">
                    {[
                      { grade: "6th Grade", students: 198, classes: 6 },
                      { grade: "7th Grade", students: 205, classes: 6 },
                      { grade: "8th Grade", students: 189, classes: 6 },
                      { grade: "9th Grade", students: 178, classes: 5 },
                      { grade: "10th Grade", students: 165, classes: 5 },
                      { grade: "11th Grade", students: 156, classes: 5 },
                      { grade: "12th Grade", students: 154, classes: 5 }
                    ].map((grade, index) => (
                      <motion.div
                        key={grade.grade}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.05 }}
                        className="principalClassCard"
                      >
                        <div className="principalClassGrade">{grade.grade}</div>
                        <div className="principalClassStudents">{grade.students}</div>
                        <div className="principalClassCount">{grade.classes} classes</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="principalRightColumn">
                {/* Teacher Performance */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="principalSidebarCard"
                >
                  <h3 className="principalSectionTitle">Top Teachers</h3>
                  <div className="principalTeachersList">
                    {[
                      { name: "Dr. Rajesh Kumar", subject: "Mathematics", rating: 4.9 },
                      { name: "Prof. Sunita Verma", subject: "Science", rating: 4.8 },
                      { name: "Mrs. Priya Sharma", subject: "English", rating: 4.7 },
                    ].map((teacher, index) => (
                      <div key={teacher.name} className="principalTeacherItem">
                        <div className="principalTeacherInfo">
                          <div className="principalTeacherRank">
                            {index + 1}
                          </div>
                          <div className="principalTeacherDetails">
                            <div className="principalTeacherName">{teacher.name}</div>
                            <div className="principalTeacherSubject">{teacher.subject}</div>
                          </div>
                        </div>
                        <Badge variant="success" size="sm">
                          ⭐ {teacher.rating}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Recent Activities */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="principalSidebarCard"
                >
                  <h3 className="principalSectionTitle">Recent Activities</h3>
                  <div className="principalActivitiesList">
                    {[
                      { 
                        action: "New teacher enrolled", 
                        detail: "Mr. Anil Singh - Physics",
                        time: "2 hours ago",
                        type: "teacher"
                      },
                      { 
                        action: "Performance report generated", 
                        detail: "Monthly school report",
                        time: "5 hours ago",
                        type: "report"
                      },
                      { 
                        action: "Parent meeting scheduled", 
                        detail: "Grade 10 parents",
                        time: "1 day ago",
                        type: "meeting"
                      },
                    ].map((activity, index) => (
                      <div key={index} className="principalActivityItem">
                        <div className="principalActivityAction">{activity.action}</div>
                        <div className="principalActivityDetail">{activity.detail}</div>
                        <div className="principalActivityTime">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* System Status */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="principalSidebarCard"
                >
                  <h3 className="principalSectionTitle">System Status</h3>
                  <div className="principalSystemStatus">
                    <div className="principalStatusItem">
                      <span className="principalStatusLabel">Server Status</span>
                      <Badge variant="success" size="sm">Online</Badge>
                    </div>
                    <div className="principalStatusItem">
                      <span className="principalStatusLabel">Database</span>
                      <Badge variant="success" size="sm">Healthy</Badge>
                    </div>
                    <div className="principalStatusItem">
                      <span className="principalStatusLabel">Backup Status</span>
                      <Badge variant="warning" size="sm">Pending</Badge>
                    </div>
                    <div className="principalStatusItem">
                      <span className="principalStatusLabel">Updates</span>
                      <Badge variant="secondary" size="sm">Available</Badge>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 }}
                  className="principalSidebarCard"
                >
                  <h3 className="principalSectionTitle">Quick Stats</h3>
                  <div className="principalQuickStats">
                    <div className="principalStatItem">
                      <span className="principalStatLabel">Active Assignments</span>
                      <span className="principalStatValue">156</span>
                    </div>
                    <div className="principalStatItem">
                      <span className="principalStatLabel">Pending Reviews</span>
                      <span className="principalStatValue">23</span>
                    </div>
                    <div className="principalStatItem">
                      <span className="principalStatLabel">Parent Meetings</span>
                      <span className="principalStatValue">8</span>
                    </div>
                    <div className="principalStatItem">
                      <span className="principalStatLabel">System Alerts</span>
                      <span className="principalStatValue">2</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PrincipalOnlyRoute>
  );
}