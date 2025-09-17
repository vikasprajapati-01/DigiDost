'use client';

import { TeacherOnlyRoute } from '@/components/auth/RoleBasedRedirect';
import { Navigation } from '@/components/layout/Navigation';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { useAuthStore } from '@/store/authStore';
import { useAssignmentStore } from '@/store/assignmentStore';
import { motion } from 'framer-motion';

export default function TeacherDashboard() {
  const { user } = useAuthStore();
  const { assignments } = useAssignmentStore();

  // Calculate stats
  const totalAssignments = assignments.length;
  const pendingAssignments = assignments.filter(a => a.status === 'published').length;
  const completedAssignments = assignments.filter(a => a.status === 'closed').length;

  return (
    <TeacherOnlyRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <Navigation />
        
        <main className="lg:ml-64 container mx-auto px-4 pt-4 pb-6 max-w-6xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your classes and inspire your students
              </p>
            </div>
            <LogoutButton variant="outline" />
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <h3 className="text-lg font-semibold mb-2">Total Students</h3>
                <div className="text-3xl font-bold">156</div>
                <div className="text-blue-100 text-sm">Across 5 classes</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
                <h3 className="text-lg font-semibold mb-2">Assignments</h3>
                <div className="text-3xl font-bold">{totalAssignments}</div>
                <div className="text-green-100 text-sm">{pendingAssignments} pending review</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <h3 className="text-lg font-semibold mb-2">Average Grade</h3>
                <div className="text-3xl font-bold">85%</div>
                <div className="text-purple-100 text-sm">+3% this month</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <h3 className="text-lg font-semibold mb-2">Active Classes</h3>
                <div className="text-3xl font-bold">5</div>
                <div className="text-orange-100 text-sm">Math, Science, English</div>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="text-2xl mb-2">📝</div>
                    <div className="font-medium">Create Assignment</div>
                    <div className="text-sm text-gray-600">New homework or test</div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-green-50 rounded-lg border-2 border-green-200 hover:border-green-300 transition-colors"
                  >
                    <div className="text-2xl mb-2">📊</div>
                    <div className="font-medium">View Analytics</div>
                    <div className="text-sm text-gray-600">Student progress reports</div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200 hover:border-purple-300 transition-colors"
                  >
                    <div className="text-2xl mb-2">👥</div>
                    <div className="font-medium">Manage Classes</div>
                    <div className="text-sm text-gray-600">View student lists</div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200 hover:border-orange-300 transition-colors"
                  >
                    <div className="text-2xl mb-2">🏆</div>
                    <div className="font-medium">Tournaments</div>
                    <div className="text-sm text-gray-600">Create competitions</div>
                  </motion.button>
                </div>
              </Card>

              {/* Recent Assignments */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Assignments</h3>
                <div className="space-y-4">
                  {assignments.slice(0, 3).map((assignment, index) => (
                    <motion.div
                      key={assignment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={assignment.status === 'published' ? 'warning' : 'success'}
                          size="sm"
                        >
                          {assignment.status}
                        </Badge>
                        <div className="text-sm text-gray-500">
                          {assignment.submissions?.length || 0} submissions
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Submission Status */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Submission Status</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completed</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>In Progress</span>
                      <span>12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Not Started</span>
                      <span>3%</span>
                    </div>
                    <Progress value={3} className="h-2" />
                  </div>
                </div>
              </Card>

              {/* Top Performers */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Top Performers</h3>
                <div className="space-y-3">
                  {[
                    { name: "Priya Sharma", score: 95, xp: 1240 },
                    { name: "Arjun Patel", score: 92, xp: 1180 },
                    { name: "Meera Singh", score: 89, xp: 1150 },
                  ].map((student, index) => (
                    <div key={student.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{student.name}</div>
                          <div className="text-xs text-gray-600">{student.xp} XP</div>
                        </div>
                      </div>
                      <Badge variant="success" size="sm">
                        {student.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Upcoming Deadlines */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Upcoming Deadlines</h3>
                <div className="space-y-3">
                  {[
                    { title: "Math Quiz", date: "Tomorrow", urgent: true },
                    { title: "Science Project", date: "3 days", urgent: false },
                    { title: "English Essay", date: "1 week", urgent: false },
                  ].map((deadline) => (
                    <div key={deadline.title} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{deadline.title}</div>
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
        </main>
      </div>
    </TeacherOnlyRoute>
  );
}