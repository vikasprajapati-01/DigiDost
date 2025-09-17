import { 
  Student, Teacher, Principal, Class, Assignment, Subject, 
  Chapter, Lesson, Tournament, Badge, Achievement, Quiz,
  Question, Notification, School, AssignmentSubmission
} from '@/types';

// Mock School Data
export const mockSchool: School = {
  id: 'school-1',
  name: 'Government High School Rampur',
  address: 'Village Rampur, Tehsil Bhokardan',
  district: 'Jalna',
  state: 'Maharashtra',
  pincode: '431114',
  contactNumber: '+91 2482 234567',
  email: 'ghsrampur@education.gov.in',
  establishedYear: 1985,
  type: 'government',
  totalStudents: 180,
  totalTeachers: 12,
  infrastructure: {
    totalClassrooms: 8,
    libraryAvailable: true,
    computerLabAvailable: false,
    internetConnectivity: 'limited',
    electricityAvailable: true,
    playgroundAvailable: true,
  },
  performance: {
    averageAttendance: 78,
    passPercentage: 85,
    dropoutRate: 8,
    teacherStudentRatio: 15,
    avgScoreImprovement: 12,
  },
};

// Mock Student Data
export const mockStudents: Student[] = [
  {
    id: 'student-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@student.com',
    role: 'student',
    avatar: '/demo.jpg',
    phone: '+91 9876543210',
    dateJoined: new Date('2024-01-15'),
    lastActive: new Date(),
    isOnline: true,
    schoolId: 'school-1',
    classId: 'class-9a',
    rollNumber: 'GHS2024001',
    parentContact: '+91 9876543200',
    dateOfBirth: new Date('2009-05-15'),
    address: 'Village Rampur, Jalna, Maharashtra',
    preferences: {
      language: 'hi',
      theme: 'light',
      notifications: true,
      offlineSync: true,
      fontSize: 'medium',
      highContrast: false,
      reducedMotion: false,
    },
    gameProfile: {
      level: 12,
      totalXP: 15420,
      currentStreak: 5,
      longestStreak: 15,
      badges: [],
      achievements: [],
      coins: 250,
      gems: 12,
      rank: 3,
      weeklyXP: 850,
      monthlyXP: 3200,
    },
    academicInfo: {
      grade: 9,
      section: 'A',
      subjects: ['mathematics', 'science', 'english', 'hindi', 'history'],
      attendance: 92,
      overallGrade: 'A',
      parentEngagement: 85,
    },
  },
  {
    id: 'student-2',
    name: 'Arjun Patel',
    email: 'arjun.patel@student.com',
    role: 'student',
    avatar: '/demo.jpg',
    phone: '+91 9876543211',
    dateJoined: new Date('2024-01-15'),
    lastActive: new Date(Date.now() - 30 * 60 * 1000),
    isOnline: false,
    schoolId: 'school-1',
    classId: 'class-9a',
    rollNumber: 'GHS2024002',
    parentContact: '+91 9876543201',
    dateOfBirth: new Date('2009-03-22'),
    address: 'Village Rampur, Jalna, Maharashtra',
    preferences: {
      language: 'en',
      theme: 'dark',
      notifications: true,
      offlineSync: true,
      fontSize: 'large',
      highContrast: false,
      reducedMotion: true,
    },
    gameProfile: {
      level: 10,
      totalXP: 12800,
      currentStreak: 8,
      longestStreak: 12,
      badges: [],
      achievements: [],
      coins: 180,
      gems: 8,
      rank: 5,
      weeklyXP: 720,
      monthlyXP: 2800,
    },
    academicInfo: {
      grade: 9,
      section: 'A',
      subjects: ['mathematics', 'science', 'english', 'hindi', 'geography'],
      attendance: 88,
      overallGrade: 'B+',
      parentEngagement: 70,
    },
  },
];

// Mock Teacher Data
export const mockTeachers: Teacher[] = [
  {
    id: 'teacher-1',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@teacher.com',
    role: 'teacher',
    avatar: '/demo.jpg',
    phone: '+91 9876543220',
    dateJoined: new Date('2020-06-01'),
    lastActive: new Date(),
    isOnline: true,
    schoolId: 'school-1',
    employeeId: 'EMP001',
    subjects: ['mathematics', 'physics'],
    classes: ['class-9a', 'class-10b'],
    qualifications: ['M.Sc. Mathematics', 'B.Ed.', 'Ph.D. Mathematics'],
    experience: 8,
    specializations: ['Advanced Mathematics', 'Physics', 'STEM Education'],
    preferences: {
      language: 'en',
      theme: 'light',
      notifications: true,
      offlineSync: true,
      fontSize: 'medium',
      highContrast: false,
      reducedMotion: false,
    },
  },
  {
    id: 'teacher-2',
    name: 'Mrs. Meera Singh',
    email: 'meera.singh@teacher.com',
    role: 'teacher',
    avatar: '/demo.jpg',
    phone: '+91 9876543221',
    dateJoined: new Date('2019-03-15'),
    lastActive: new Date(),
    isOnline: true,
    schoolId: 'school-1',
    employeeId: 'EMP002',
    subjects: ['english', 'hindi'],
    classes: ['class-8a', 'class-9a'],
    qualifications: ['M.A. English Literature', 'B.Ed.'],
    experience: 12,
    specializations: ['English Literature', 'Creative Writing', 'Language Arts'],
    preferences: {
      language: 'hi',
      theme: 'light',
      notifications: true,
      offlineSync: true,
      fontSize: 'medium',
      highContrast: false,
      reducedMotion: false,
    },
  },
];

// Mock Principal Data
export const mockPrincipal: Principal = {
  id: 'principal-1',
  name: 'Mrs. Sunita Verma',
  email: 'sunita.verma@principal.com',
  role: 'principal',
  avatar: '/demo.jpg',
  phone: '+91 9876543230',
  dateJoined: new Date('2018-01-01'),
  lastActive: new Date(),
  isOnline: true,
  schoolId: 'school-1',
  employeeId: 'PRIN001',
  yearsOfExperience: 20,
  qualifications: ['M.Ed.', 'M.A. Education', 'Ph.D. Educational Administration'],
  preferences: {
    language: 'hi',
    theme: 'light',
    notifications: true,
    offlineSync: true,
    fontSize: 'medium',
    highContrast: false,
    reducedMotion: false,
  },
};

// Mock Classes Data
export const mockClasses: Class[] = [
  {
    id: 'class-9a',
    name: 'Class 9-A',
    grade: 9,
    section: 'A',
    teacherId: 'teacher-1',
    students: ['student-1', 'student-2'],
    subjects: ['mathematics', 'science', 'english', 'hindi', 'history'],
    schedules: [
      {
        day: 'monday',
        periods: [
          { startTime: '09:00', endTime: '09:45', subject: 'mathematics', teacherId: 'teacher-1', type: 'regular' },
          { startTime: '09:45', endTime: '10:30', subject: 'science', teacherId: 'teacher-2', type: 'regular' },
          { startTime: '10:30', endTime: '11:15', subject: 'english', teacherId: 'teacher-2', type: 'regular' },
          { startTime: '11:15', endTime: '11:30', subject: 'break', teacherId: '', type: 'break' },
          { startTime: '11:30', endTime: '12:15', subject: 'hindi', teacherId: 'teacher-2', type: 'regular' },
          { startTime: '12:15', endTime: '13:00', subject: 'history', teacherId: 'teacher-1', type: 'regular' },
        ],
      },
    ],
    academicYear: '2024-25',
    totalStrength: 25,
    averageAttendance: 85,
    performanceMetrics: {
      averageScore: 78,
      attendanceRate: 85,
      assignmentCompletion: 92,
      engagementScore: 80,
      improvementTrend: 'improving',
    },
  },
];

// Mock Subjects Data
export const mockSubjects: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Learn numbers, algebra, geometry and more',
    icon: '🔢',
    color: '#3b82f6',
    grade: 9,
    chapters: [],
    totalLessons: 45,
    estimatedHours: 90,
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Explore physics, chemistry and biology',
    icon: '🔬',
    color: '#10b981',
    grade: 9,
    chapters: [],
    totalLessons: 38,
    estimatedHours: 76,
  },
  {
    id: 'english',
    name: 'English',
    description: 'Master reading, writing and communication',
    icon: '📚',
    color: '#f59e0b',
    grade: 9,
    chapters: [],
    totalLessons: 32,
    estimatedHours: 64,
  },
];

// Mock Chapters Data
export const mockChapters: Chapter[] = [
  {
    id: 'math-ch1',
    title: 'Number Systems',
    description: 'Understanding rational and irrational numbers',
    subjectId: 'mathematics',
    order: 1,
    lessons: [],
    estimatedTime: 180, // minutes
    difficulty: 'beginner',
    prerequisites: [],
    learningObjectives: [
      'Understand rational numbers',
      'Learn about irrational numbers',
      'Perform operations on real numbers',
    ],
  },
];

// Mock Lessons Data
export const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Introduction to Rational Numbers',
    description: 'Learn what rational numbers are and how to work with them',
    chapterId: 'math-ch1',
    type: 'interactive',
    content: {
      text: 'A rational number is any number that can be expressed as the quotient or fraction p/q of two integers...',
      images: ['/demo.jpg'],
      interactiveElements: [
        {
          id: 'interactive-1',
          type: 'drag-drop',
          content: {},
          instructions: 'Drag the numbers to the correct category',
        },
      ],
      downloadSize: 2500000, // 2.5MB
    },
    duration: 25,
    xpReward: 50,
    difficultyLevel: 1,
    isLocked: false,
    prerequisites: [],
    tags: ['numbers', 'fractions', 'math'],
    lastUpdated: new Date('2024-01-01'),
    viewCount: 156,
    rating: 4.5,
  },
];

// Mock Assignments Data
export const mockAssignments: Assignment[] = [
  {
    id: 'assignment-1',
    title: 'Rational Numbers Worksheet',
    description: 'Complete exercises on rational number operations',
    subject: 'mathematics',
    classId: 'class-9a',
    teacherId: 'teacher-1',
    type: 'homework',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    createdAt: new Date(),
    maxMarks: 50,
    difficulty: 'medium',
    estimatedTime: 60,
    instructions: [
      'Solve all problems in the worksheet',
      'Show your working clearly',
      'Submit before the due date',
    ],
    attachments: [
      {
        id: 'attach-1',
        name: 'rational-numbers-worksheet.pdf',
        url: '/assignments/rational-numbers-worksheet.pdf',
        type: 'application/pdf',
        size: 1500000,
        uploadedAt: new Date(),
      },
    ],
    submissions: [],
    gradingCriteria: [
      {
        criterion: 'Accuracy',
        maxPoints: 30,
        description: 'Correctness of answers',
      },
      {
        criterion: 'Working',
        maxPoints: 15,
        description: 'Clear presentation of solution steps',
      },
      {
        criterion: 'Timeliness',
        maxPoints: 5,
        description: 'Submission within deadline',
      },
    ],
    status: 'published',
    autoGrade: false,
    allowLateSubmission: true,
    xpReward: 100,
  },
];

// Mock Tournaments Data
export const mockTournaments: Tournament[] = [
  {
    id: 'tournament-1',
    name: 'Math Champions League',
    description: 'Test your mathematical skills against students from other schools',
    subject: 'mathematics',
    grade: 9,
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    registrationDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    maxParticipants: 100,
    currentParticipants: 45,
    entryFee: 10, // coins
    prizePool: [
      { rank: 1, coins: 500, gems: 50, badge: 'math-champion', title: 'Math Champion' },
      { rank: 2, coins: 300, gems: 30, badge: 'math-runner-up', title: 'Math Runner-up' },
      { rank: 3, coins: 200, gems: 20, badge: 'math-bronze', title: 'Math Bronze' },
    ],
    rules: [
      'Each participant gets 30 minutes to complete the quiz',
      'No external help allowed',
      'Top 3 participants will receive prizes',
    ],
    status: 'registration',
    type: 'quiz',
    difficulty: 'medium',
    participants: [],
    leaderboard: [],
  },
];

// Mock Badges Data
export const mockBadges: Badge[] = [
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Complete lessons for 7 consecutive days',
    icon: '🔥',
    color: '#f59e0b',
    category: 'streak',
    criteria: {
      type: 'streak',
      target: 7,
      timeframe: 'daily',
    },
    rarity: 'common',
    progress: 71, // 5/7 days
  },
  {
    id: 'math-master',
    name: 'Math Master',
    description: 'Complete all mathematics lessons in a chapter',
    icon: '🧮',
    color: '#3b82f6',
    category: 'achievement',
    criteria: {
      type: 'lessons',
      target: 10,
    },
    rarity: 'rare',
    progress: 80, // 8/10 lessons
  },
];

// Mock Achievements Data
export const mockAchievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🌟',
    xpReward: 100,
    coinReward: 20,
    unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    category: 'milestone',
    rarity: 'bronze',
  },
  {
    id: 'quiz-champion',
    title: 'Quiz Champion',
    description: 'Score 100% on 5 quizzes',
    icon: '🏆',
    xpReward: 250,
    coinReward: 50,
    unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    category: 'achievement',
    rarity: 'gold',
  },
];

// Mock Notifications Data
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'student-1',
    title: 'New Assignment Posted',
    message: 'Dr. Rajesh Kumar has posted a new mathematics assignment',
    type: 'info',
    category: 'assignment',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    actionUrl: '/student/assignments',
    actionText: 'View Assignment',
    priority: 'normal',
  },
  {
    id: 'notif-2',
    userId: 'student-1',
    title: 'Achievement Unlocked!',
    message: 'You earned the "Quiz Champion" achievement',
    type: 'success',
    category: 'achievement',
    isRead: true,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    actionUrl: '/student/achievements',
    actionText: 'View Achievements',
    priority: 'low',
  },
];

// Mock Quiz Data
export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    title: 'Rational Numbers Quiz',
    description: 'Test your understanding of rational numbers',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Which of the following is a rational number?',
        options: ['√2', 'π', '3/4', '√3'],
        correctAnswer: '3/4',
        explanation: '3/4 can be expressed as a fraction p/q where p and q are integers',
        points: 5,
        difficulty: 'easy',
        tags: ['rational-numbers'],
      },
      {
        id: 'q2',
        type: 'true-false',
        question: 'Every integer is a rational number',
        correctAnswer: 'true',
        explanation: 'Every integer n can be written as n/1, making it a rational number',
        points: 3,
        difficulty: 'easy',
        tags: ['rational-numbers', 'integers'],
      },
    ],
    timeLimit: 300, // 5 minutes
    passingScore: 70,
    maxAttempts: 3,
    shuffleQuestions: true,
    showCorrectAnswers: true,
    xpReward: 75,
  },
];

// Export all mock data
export const mockData = {
  school: mockSchool,
  students: mockStudents,
  teachers: mockTeachers,
  principal: mockPrincipal,
  classes: mockClasses,
  subjects: mockSubjects,
  chapters: mockChapters,
  lessons: mockLessons,
  assignments: mockAssignments,
  tournaments: mockTournaments,
  badges: mockBadges,
  achievements: mockAchievements,
  notifications: mockNotifications,
  quizzes: mockQuizzes,
};