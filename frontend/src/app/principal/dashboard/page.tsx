'use client';

import { PrincipalOnlyRoute } from '@/components/auth/RoleBasedRedirect';
import { Navigation } from '@/components/layout/Navigation';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';

export default function PrincipalDashboard() {
  const { user } = useAuthStore();

  return (
    <PrincipalOnlyRoute>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <Navigation />
        
        <main className="lg:ml-64 container mx-auto px-4 pt-4 pb-6 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-gray-600 mt-1">
                School-wide insights and administrative control
              </p>
            </div>
            <LogoutButton variant="outline" />
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <h3 className="text-lg font-semibold mb-2">Total Students</h3>
                <div className="text-3xl font-bold">1,245</div>
                <div className="text-blue-100 text-sm">+23 this month</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
                <h3 className="text-lg font-semibold mb-2">Active Teachers</h3>
                <div className="text-3xl font-bold">48</div>
                <div className="text-green-100 text-sm">Across all subjects</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <h3 className="text-lg font-semibold mb-2">Attendance Rate</h3>
                <div className="text-3xl font-bold">94%</div>
                <div className="text-purple-100 text-sm">+2% from last month</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <h3 className="text-lg font-semibold mb-2">Performance Score</h3>
                <div className="text-3xl font-bold">87%</div>
                <div className="text-orange-100 text-sm">School average</div>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Administrative Actions */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Administrative Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="text-2xl mb-2">👥</div>
                    <div className="font-medium">Manage Teachers</div>
                    <div className="text-sm text-gray-600">Staff administration</div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-green-50 rounded-lg border-2 border-green-200 hover:border-green-300 transition-colors"
                  >
                    <div className="text-2xl mb-2">📊</div>
                    <div className="font-medium">School Analytics</div>
                    <div className="text-sm text-gray-600">Performance insights</div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200 hover:border-purple-300 transition-colors"
                  >
                    <div className="text-2xl mb-2">📋</div>
                    <div className="font-medium">Generate Reports</div>
                    <div className="text-sm text-gray-600">Performance reports</div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200 hover:border-orange-300 transition-colors"
                  >
                    <div className="text-2xl mb-2">🏫</div>
                    <div className="font-medium">School Settings</div>
                    <div className="text-sm text-gray-600">Configuration</div>
                  </motion.button>
                </div>
              </Card>

              {/* Performance Overview */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Subject Performance Overview</h3>
                <div className="space-y-4">
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
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{subject.subject}</h4>
                        <p className="text-sm text-gray-600">{subject.students} students</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium">{subject.average}%</div>
                          <div className={`text-sm ${
                            subject.trend.startsWith('+') ? 'text-green-600' : 
                            subject.trend.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {subject.trend}
                          </div>
                        </div>
                        <div className="w-20">
                          <Progress value={subject.average} className="h-2" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Class Distribution */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Class Distribution</h3>
                <div className="grid grid-cols-3 gap-4">
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
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="p-4 bg-gray-50 rounded-lg text-center"
                    >
                      <div className="font-medium text-lg">{grade.grade}</div>
                      <div className="text-2xl font-bold text-blue-600">{grade.students}</div>
                      <div className="text-sm text-gray-600">{grade.classes} classes</div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Teacher Performance */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Top Teachers</h3>
                <div className="space-y-3">
                  {[
                    { name: "Dr. Rajesh Kumar", subject: "Mathematics", rating: 4.9 },
                    { name: "Prof. Sunita Verma", subject: "Science", rating: 4.8 },
                    { name: "Mrs. Priya Sharma", subject: "English", rating: 4.7 },
                  ].map((teacher, index) => (
                    <div key={teacher.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{teacher.name}</div>
                          <div className="text-xs text-gray-600">{teacher.subject}</div>
                        </div>
                      </div>
                      <Badge variant="success" size="sm">
                        ⭐ {teacher.rating}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Activities */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
                <div className="space-y-3">
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
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-sm">{activity.action}</div>
                      <div className="text-xs text-gray-600">{activity.detail}</div>
                      <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* System Status */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">System Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Server Status</span>
                    <Badge variant="success" size="sm">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <Badge variant="success" size="sm">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Backup Status</span>
                    <Badge variant="warning" size="sm">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Updates</span>
                    <Badge variant="info" size="sm">Available</Badge>
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Active Assignments</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pending Reviews</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Parent Meetings</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">System Alerts</span>
                    <span className="font-medium">2</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </PrincipalOnlyRoute>
  );
}