// User and Authentication Types
export type UserRole = 'student' | 'teacher' | 'principal';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  dateJoined: Date;
  lastActive: Date;
  isOnline: boolean;
  schoolId: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  language: 'en' | 'hi' | 'te' | 'ta' | 'bn';
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  offlineSync: boolean;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reducedMotion: boolean;
}

// Student specific types
export interface Student extends User {
  role: 'student';
  classId: string;
  rollNumber: string;
  parentContact: string;
  dateOfBirth: Date;
  address: string;
  gameProfile: GameProfile;
  academicInfo: AcademicInfo;
}

export interface GameProfile {
  level: number;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  badges: Badge[];
  achievements: Achievement[];
  coins: number;
  gems: number;
  rank: number;
  weeklyXP: number;
  monthlyXP: number;
}

export interface AcademicInfo {
  grade: number;
  section: string;
  subjects: string[];
  attendance: number;
  overallGrade: string;
  parentEngagement: number;
}

// Teacher specific types
export interface Teacher extends User {
  role: 'teacher';
  employeeId: string;
  subjects: string[];
  classes: string[];
  qualifications: string[];
  experience: number;
  specializations: string[];
}

// Principal specific types
export interface Principal extends User {
  role: 'principal';
  employeeId: string;
  yearsOfExperience: number;
  qualifications: string[];
}

// School and Class types
export interface School {
  id: string;
  name: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  contactNumber: string;
  email: string;
  establishedYear: number;
  type: 'government' | 'private' | 'aided';
  totalStudents: number;
  totalTeachers: number;
  infrastructure: Infrastructure;
  performance: SchoolPerformance;
}

export interface Infrastructure {
  totalClassrooms: number;
  libraryAvailable: boolean;
  computerLabAvailable: boolean;
  internetConnectivity: 'none' | 'limited' | 'good' | 'excellent';
  electricityAvailable: boolean;
  playgroundAvailable: boolean;
}

export interface SchoolPerformance {
  averageAttendance: number;
  passPercentage: number;
  dropoutRate: number;
  teacherStudentRatio: number;
  avgScoreImprovement: number;
}

export interface Class {
  id: string;
  name: string;
  grade: number;
  section: string;
  teacherId: string;
  students: string[];
  subjects: string[];
  schedules: ClassSchedule[];
  academicYear: string;
  totalStrength: number;
  averageAttendance: number;
  performanceMetrics: ClassPerformance;
}

export interface ClassSchedule {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  periods: Period[];
}

export interface Period {
  startTime: string;
  endTime: string;
  subject: string;
  teacherId: string;
  type: 'regular' | 'practical' | 'sports' | 'break';
}

export interface ClassPerformance {
  averageScore: number;
  attendanceRate: number;
  assignmentCompletion: number;
  engagementScore: number;
  improvementTrend: 'improving' | 'stable' | 'declining';
}

// Assignment types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  classId: string;
  teacherId: string;
  type: 'homework' | 'project' | 'quiz' | 'exam';
  dueDate: Date;
  createdAt: Date;
  maxMarks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in minutes
  instructions: string[];
  attachments: FileAttachment[];
  submissions: AssignmentSubmission[];
  gradingCriteria: GradingCriteria[];
  status: 'draft' | 'published' | 'closed';
  autoGrade: boolean;
  allowLateSubmission: boolean;
  xpReward: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: Date;
  content: string;
  attachments: FileAttachment[];
  status: 'submitted' | 'graded' | 'returned';
  score?: number;
  feedback?: string;
  gradedAt?: Date;
  gradedBy?: string;
  attempts: number;
  timeSpent: number; // in minutes
}

export interface GradingCriteria {
  criterion: string;
  maxPoints: number;
  description: string;
}

export interface FileAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

// Learning and Content types
export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  grade: number;
  chapters: Chapter[];
  totalLessons: number;
  estimatedHours: number;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  order: number;
  lessons: Lesson[];
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  learningObjectives: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  chapterId: string;
  type: 'video' | 'interactive' | 'reading' | 'quiz' | 'game';
  content: LessonContent;
  duration: number;
  xpReward: number;
  difficultyLevel: number;
  isLocked: boolean;
  prerequisites: string[];
  tags: string[];
  lastUpdated: Date;
  viewCount: number;
  rating: number;
}

export interface LessonContent {
  text?: string;
  videoUrl?: string;
  audioUrl?: string;
  images?: string[];
  interactiveElements?: InteractiveElement[];
  quiz?: Quiz;
  downloadSize?: number; // for offline optimization
}

export interface InteractiveElement {
  id: string;
  type: 'animation' | 'simulation' | 'drag-drop' | 'click-reveal';
  content: Record<string, unknown>;
  instructions: string;
}

// Assessment types
export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
  maxAttempts: number;
  shuffleQuestions: boolean;
  showCorrectAnswers: boolean;
  xpReward: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  multimedia?: {
    image?: string;
    audio?: string;
    video?: string;
  };
}

// Gamification types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: 'achievement' | 'milestone' | 'streak' | 'social' | 'special';
  criteria: BadgeCriteria;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  earnedAt?: Date;
  progress?: number; // percentage towards earning
}

export interface BadgeCriteria {
  type: 'xp' | 'streak' | 'assignments' | 'lessons' | 'tournaments' | 'social';
  target: number;
  timeframe?: 'daily' | 'weekly' | 'monthly' | 'total';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  coinReward: number;
  unlockedAt: Date;
  category: string;
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum';
}

// Tournament types
export interface Tournament {
  id: string;
  name: string;
  description: string;
  subject: string;
  grade: number;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  maxParticipants: number;
  currentParticipants: number;
  entryFee: number; // in coins
  prizePool: TournamentPrize[];
  rules: string[];
  status: 'upcoming' | 'registration' | 'active' | 'completed' | 'cancelled';
  type: 'quiz' | 'assignment' | 'project' | 'speed-test';
  difficulty: 'easy' | 'medium' | 'hard';
  participants: TournamentParticipant[];
  leaderboard: LeaderboardEntry[];
}

export interface TournamentParticipant {
  studentId: string;
  registeredAt: Date;
  score?: number;
  rank?: number;
  completed: boolean;
  timeSpent?: number;
}

export interface TournamentPrize {
  rank: number;
  coins: number;
  gems: number;
  badge?: string;
  title?: string;
}

export interface LeaderboardEntry {
  studentId: string;
  studentName: string;
  score: number;
  rank: number;
  timeTaken: number;
  completedAt: Date;
}

// Analytics and Reports types
export interface AnalyticsData {
  studentPerformance: StudentPerformanceData[];
  classAnalytics: ClassAnalyticsData[];
  subjectAnalytics: SubjectAnalyticsData[];
  engagementMetrics: EngagementMetrics;
  learningProgress: LearningProgressData[];
  attendanceData: AttendanceData[];
  timeFrame: 'daily' | 'weekly' | 'monthly' | 'yearly';
  generatedAt: Date;
}

export interface StudentPerformanceData {
  studentId: string;
  studentName: string;
  subjects: SubjectPerformance[];
  overallGrade: string;
  rank: number;
  attendanceRate: number;
  improvementTrend: number; // percentage change
  strengths: string[];
  areasForImprovement: string[];
}

export interface SubjectPerformance {
  subject: string;
  averageScore: number;
  assignmentsCompleted: number;
  lessonsCompleted: number;
  timeSpent: number;
  rank: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface ClassAnalyticsData {
  classId: string;
  className: string;
  totalStudents: number;
  averagePerformance: number;
  attendanceRate: number;
  engagementScore: number;
  topPerformers: string[];
  strugglingStudents: string[];
  subjectWisePerformance: Record<string, number>;
}

export interface SubjectAnalyticsData {
  subject: string;
  totalStudents: number;
  averageScore: number;
  completionRate: number;
  timeSpent: number;
  popularLessons: string[];
  difficultTopics: string[];
  improvementSuggestions: string[];
}

export interface EngagementMetrics {
  dailyActiveUsers: number;
  averageSessionTime: number;
  lessonsCompleted: number;
  assignmentsSubmitted: number;
  tournamentsParticipated: number;
  streakMaintenance: number;
  offlineUsage: number;
}

export interface LearningProgressData {
  studentId: string;
  subject: string;
  chaptersCompleted: number;
  lessonsCompleted: number;
  quizzesTaken: number;
  averageScore: number;
  timeSpent: number;
  currentLevel: number;
  nextMilestone: string;
  estimatedCompletion: Date;
}

export interface AttendanceData {
  date: Date;
  classId: string;
  totalStudents: number;
  presentStudents: number;
  absentStudents: string[];
  lateArrivals: string[];
  attendanceRate: number;
}

// Communication types
export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  type: 'text' | 'audio' | 'image' | 'document';
  content: string;
  attachments?: FileAttachment[];
  sentAt: Date;
  readAt?: Date;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  category: 'academic' | 'administrative' | 'announcement' | 'personal';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'assignment' | 'achievement' | 'reminder' | 'announcement' | 'system';
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
  actionUrl?: string;
  actionText?: string;
  priority: 'low' | 'normal' | 'high';
}

// System and Utility types
export interface AppState {
  isOnline: boolean;
  isLoading: boolean;
  currentUser: User | null;
  theme: 'light' | 'dark';
  language: string;
  notifications: Notification[];
  lastSyncTime: Date | null;
  offlineQueueSize: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface FilterOptions {
  subject?: string;
  grade?: number;
  difficulty?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Offline and Sync types
export interface OfflineAction {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  timestamp: Date;
  retryCount: number;
  maxRetries: number;
}

export interface SyncStatus {
  lastSyncTime: Date | null;
  pendingActions: number;
  syncInProgress: boolean;
  lastSyncError: string | null;
}

// Chart and visualization types
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

export interface DashboardWidget {
  id: string;
  type: 'chart' | 'metric' | 'list' | 'progress';
  title: string;
  data: Record<string, unknown>;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  refreshInterval?: number;
}