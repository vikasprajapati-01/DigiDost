'use client';

import { useState } from 'react';
import { TeacherOnlyRoute } from '@/components/auth/RoleBasedRedirect';
import { Navigation } from '@/components/layout/Navigation';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { Badge } from '@/components/ui/Badge';
import { AssignmentForm } from '@/components/forms/AssignmentForm';
import { useAuthStore } from '@/store/authStore';
import { useAssignmentStore } from '@/store/assignmentStore';
import { motion } from 'framer-motion';
import './TeacherDashboard.css';

interface AssignmentFormData {
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  dueTime: string;
  type: "homework" | "project" | "quiz" | "exam";
  difficulty: "easy" | "medium" | "hard";
  points: string;
  instructions?: string;
}

export default function TeacherDashboard() {
  const { user } = useAuthStore();
  const { assignments, createAssignment } = useAssignmentStore();
  const [isAssignmentFormOpen, setIsAssignmentFormOpen] = useState(false);

  // Calculate stats
  const totalAssignments = assignments.length;
  const pendingAssignments = assignments.filter(a => a.status === 'published').length;

  const handleCreateAssignment = (assignmentData: AssignmentFormData) => {
    createAssignment({
      title: assignmentData.title,
      description: assignmentData.description,
      subject: assignmentData.subject,
      dueDate: new Date(`${assignmentData.dueDate}T${assignmentData.dueTime}`),
      type: assignmentData.type,
      difficulty: assignmentData.difficulty,
      maxMarks: Number(assignmentData.points),
      instructions: assignmentData.instructions ? [assignmentData.instructions] : [],
      status: 'published',
      classId: 'default-class',
      teacherId: user?.id || 'teacher-1',
      estimatedTime: 60, // Default 60 minutes
      attachments: [],
      submissions: [],
      gradingCriteria: [],
      autoGrade: false,
      allowLateSubmission: true,
      xpReward: Math.floor(Number(assignmentData.points) / 10),
    });
  };

  return (
    <TeacherOnlyRoute>
      <div className="teacherDashboardContainer">
        <Navigation />
        
        <main className="teacherMainContent">
          <div className="teacherContentWrapper">
            {/* Header */}
            <div className="teacherHeader">
              <div className="teacherHeaderText">
                <h1 className="teacherTitle">
                  Welcome back, {user?.name?.split(' ')[0]}! 👩‍🏫
                </h1>
                <p className="teacherSubtitle">
                  Manage your classes and inspire your students
                </p>
              </div>
              <LogoutButton variant="outline" />
            </div>

            {/* Stats Overview */}
            <div className="teacherStatsGrid">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="teacherStatCard blue"
              >
                <h3 className="teacherStatCardTitle">Total Students</h3>
                <div className="teacherStatCardValue">156</div>
                <div className="teacherStatCardSubtext">Across 5 classes</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="teacherStatCard green"
              >
                <h3 className="teacherStatCardTitle">Assignments</h3>
                <div className="teacherStatCardValue">{totalAssignments}</div>
                <div className="teacherStatCardSubtext">{pendingAssignments} pending review</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="teacherStatCard purple"
              >
                <h3 className="teacherStatCardTitle">Average Grade</h3>
                <div className="teacherStatCardValue">85%</div>
                <div className="teacherStatCardSubtext">+3% this month</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="teacherStatCard orange"
              >
                <h3 className="teacherStatCardTitle">Active Classes</h3>
                <div className="teacherStatCardValue">5</div>
                <div className="teacherStatCardSubtext">Math, Science, English</div>
              </motion.div>
            </div>

            <div className="teacherMainGrid">
              {/* Main Content */}
              <div className="teacherLeftColumn">
                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="teacherContentCard"
                >
                  <h3 className="teacherSectionTitle">Quick Actions</h3>
                  <div className="teacherQuickActionsGrid">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsAssignmentFormOpen(true)}
                      className="teacherQuickAction blue"
                    >
                      <div className="teacherQuickActionIcon">📝</div>
                      <div className="teacherQuickActionTitle">Create Assignment</div>
                      <div className="teacherQuickActionDesc">New homework or test</div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="teacherQuickAction green"
                    >
                      <div className="teacherQuickActionIcon">📊</div>
                      <div className="teacherQuickActionTitle">View Analytics</div>
                      <div className="teacherQuickActionDesc">Student progress reports</div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="teacherQuickAction purple"
                    >
                      <div className="teacherQuickActionIcon">👥</div>
                      <div className="teacherQuickActionTitle">Manage Classes</div>
                      <div className="teacherQuickActionDesc">View student lists</div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="teacherQuickAction orange"
                    >
                      <div className="teacherQuickActionIcon">🏆</div>
                      <div className="teacherQuickActionTitle">Tournaments</div>
                      <div className="teacherQuickActionDesc">Create games</div>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Recent Assignments */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="teacherContentCard"
                >
                  <h3 className="teacherSectionTitle">Recent Assignments</h3>
                  <div className="teacherAssignmentList">
                    {assignments.slice(0, 3).map((assignment, index) => (
                      <motion.div
                        key={assignment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="teacherAssignmentItem"
                      >
                        <div className="teacherAssignmentContent">
                          <h4 className="teacherAssignmentTitle">{assignment.title}</h4>
                          <p className="teacherAssignmentMeta">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="teacherAssignmentActions">
                          <Badge 
                            variant={assignment.status === 'published' ? 'warning' : 'success'}
                            size="sm"
                          >
                            {assignment.status}
                          </Badge>
                          <div className="teacherAssignmentStats">
                            {assignment.submissions?.length || 0} submissions
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="teacherRightColumn">
                {/* Submission Status */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="teacherSidebarCard"
                >
                  <h3 className="teacherSectionTitle">Submission Status</h3>
                  <div>
                    <div className="teacherProgressItem">
                      <div className="teacherProgressLabel">
                        <span>Completed</span>
                        <span>85%</span>
                      </div>
                      <div className="teacherProgressBar">
                        <div className="teacherProgressFill blue" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div className="teacherProgressItem">
                      <div className="teacherProgressLabel">
                        <span>In Progress</span>
                        <span>12%</span>
                      </div>
                      <div className="teacherProgressBar">
                        <div className="teacherProgressFill yellow" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                    <div className="teacherProgressItem">
                      <div className="teacherProgressLabel">
                        <span>Not Started</span>
                        <span>3%</span>
                      </div>
                      <div className="teacherProgressBar">
                        <div className="teacherProgressFill green" style={{ width: '3%' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Top Performers */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="teacherSidebarCard"
                >
                  <h3 className="teacherSectionTitle">Top Performers</h3>
                  <div className="teacherPerformersList">
                    {[
                      { name: "Priya Sharma", score: 95, xp: 1240 },
                      { name: "Arjun Patel", score: 92, xp: 1180 },
                      { name: "Meera Singh", score: 89, xp: 1150 },
                    ].map((student, index) => (
                      <div key={student.name} className="teacherPerformerItem">
                        <div className="teacherPerformerInfo">
                          <div className="teacherPerformerRank">
                            {index + 1}
                          </div>
                          <div className="teacherPerformerDetails">
                            <div className="teacherPerformerName">{student.name}</div>
                            <div className="teacherPerformerXP">{student.xp} XP</div>
                          </div>
                        </div>
                        <Badge variant="success" size="sm">
                          {student.score}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Upcoming Deadlines */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="teacherSidebarCard"
                >
                  <h3 className="teacherSectionTitle">Upcoming Deadlines</h3>
                  <div className="teacherDeadlinesList">
                    {[
                      { title: "Math Quiz", date: "Tomorrow", urgent: true },
                      { title: "Science Project", date: "3 days", urgent: false },
                      { title: "English Essay", date: "1 week", urgent: false },
                    ].map((deadline) => (
                      <div key={deadline.title} className="teacherDeadlineItem">
                        <div className="teacherDeadlineContent">
                          <div className="teacherDeadlineTitle">{deadline.title}</div>
                          <div className="teacherDeadlineDate">Due in {deadline.date}</div>
                        </div>
                        {deadline.urgent && (
                          <Badge variant="error" size="sm">
                            Urgent
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>

        {/* Assignment Form Modal */}
        <AssignmentForm
          isOpen={isAssignmentFormOpen}
          onClose={() => setIsAssignmentFormOpen(false)}
          onSubmit={handleCreateAssignment}
        />
      </div>
    </TeacherOnlyRoute>
  );
}