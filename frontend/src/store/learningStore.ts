import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Subject, Chapter, Lesson, Quiz } from '@/types';
import { mockSubjects, mockChapters, mockLessons, mockQuizzes } from '@/data/mockData';
import { STORAGE_KEYS } from '@/types/constants';

interface LearningProgress {
  lessonId: string;
  completed: boolean;
  score?: number;
  timeSpent: number;
  lastAccessed: Date;
  attempts: number;
}

interface LearningState {
  subjects: Subject[];
  chapters: Chapter[];
  lessons: Lesson[];
  quizzes: Quiz[];
  progress: Record<string, LearningProgress>;
  currentLesson: Lesson | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchSubjects: (grade: number) => Promise<void>;
  fetchChapters: (subjectId: string) => Promise<void>;
  fetchLessons: (chapterId: string) => Promise<void>;
  startLesson: (lessonId: string) => Promise<void>;
  completeLesson: (lessonId: string, timeSpent: number, score?: number) => Promise<void>;
  takeQuiz: (quizId: string) => Promise<void>;
  submitQuizResult: (quizId: string, score: number, timeSpent: number) => Promise<void>;
  getSubjectProgress: (subjectId: string) => number;
  getChapterProgress: (chapterId: string) => number;
  getLessonProgress: (lessonId: string) => LearningProgress | null;
  getRecommendedLessons: (studentId: string) => Lesson[];
  searchContent: (query: string) => (Lesson | Chapter | Subject)[];
  clearError: () => void;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      subjects: mockSubjects,
      chapters: mockChapters,
      lessons: mockLessons,
      quizzes: mockQuizzes,
      progress: {},
      currentLesson: null,
      isLoading: false,
      error: null,

      fetchSubjects: async (grade: number) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const filteredSubjects = mockSubjects.filter(subject => subject.grade === grade);
          set({ subjects: filteredSubjects, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch subjects', isLoading: false });
        }
      },

      fetchChapters: async (subjectId: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 300));
          
          const filteredChapters = mockChapters.filter(chapter => chapter.subjectId === subjectId);
          set({ chapters: filteredChapters, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch chapters', isLoading: false });
        }
      },

      fetchLessons: async (chapterId: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 300));
          
          const filteredLessons = mockLessons.filter(lesson => lesson.chapterId === chapterId);
          set({ lessons: filteredLessons, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch lessons', isLoading: false });
        }
      },

      startLesson: async (lessonId: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 200));
          
          const { lessons, progress } = get();
          const lesson = lessons.find(l => l.id === lessonId);
          
          if (!lesson) {
            throw new Error('Lesson not found');
          }
          
          // Update lesson view count
          const updatedLessons = lessons.map(l =>
            l.id === lessonId ? { ...l, viewCount: l.viewCount + 1 } : l
          );
          
          // Initialize or update progress
          const currentProgress = progress[lessonId];
          const updatedProgress = {
            ...progress,
            [lessonId]: {
              lessonId,
              completed: currentProgress?.completed || false,
              score: currentProgress?.score,
              timeSpent: currentProgress?.timeSpent || 0,
              lastAccessed: new Date(),
              attempts: (currentProgress?.attempts || 0) + 1,
            },
          };
          
          set({
            currentLesson: lesson,
            lessons: updatedLessons,
            progress: updatedProgress,
            isLoading: false,
          });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to start lesson', isLoading: false });
        }
      },

      completeLesson: async (lessonId: string, timeSpent: number, score?: number) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const { progress } = get();
          const currentProgress = progress[lessonId];
          
          const updatedProgress = {
            ...progress,
            [lessonId]: {
              lessonId,
              completed: true,
              score: score || currentProgress?.score,
              timeSpent: (currentProgress?.timeSpent || 0) + timeSpent,
              lastAccessed: new Date(),
              attempts: currentProgress?.attempts || 1,
            },
          };
          
          set({ progress: updatedProgress, isLoading: false });
          
          // Award XP and coins (in real app, this would be handled by game store)
          console.log(`Lesson completed! +${50} XP, +${5} coins`);
        } catch (error) {
          set({ error: 'Failed to complete lesson', isLoading: false });
        }
      },

      takeQuiz: async (quizId: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 300));
          
          const { quizzes } = get();
          const quiz = quizzes.find(q => q.id === quizId);
          
          if (!quiz) {
            throw new Error('Quiz not found');
          }
          
          set({ isLoading: false });
          // Quiz data is available for the component to use
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to load quiz', isLoading: false });
        }
      },

      submitQuizResult: async (quizId: string, score: number, timeSpent: number) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // In a real app, this would save the quiz result
          console.log(`Quiz completed! Score: ${score}, Time: ${timeSpent}s`);
          
          set({ isLoading: false });
        } catch (error) {
          set({ error: 'Failed to submit quiz result', isLoading: false });
        }
      },

      getSubjectProgress: (subjectId: string) => {
        const { subjects, chapters, lessons, progress } = get();
        const subject = subjects.find(s => s.id === subjectId);
        if (!subject) return 0;
        
        const subjectChapters = chapters.filter(c => c.subjectId === subjectId);
        const subjectLessons = lessons.filter(l => 
          subjectChapters.some(c => c.id === l.chapterId)
        );
        
        if (subjectLessons.length === 0) return 0;
        
        const completedLessons = subjectLessons.filter(l => 
          progress[l.id]?.completed
        ).length;
        
        return Math.round((completedLessons / subjectLessons.length) * 100);
      },

      getChapterProgress: (chapterId: string) => {
        const { lessons, progress } = get();
        const chapterLessons = lessons.filter(l => l.chapterId === chapterId);
        
        if (chapterLessons.length === 0) return 0;
        
        const completedLessons = chapterLessons.filter(l => 
          progress[l.id]?.completed
        ).length;
        
        return Math.round((completedLessons / chapterLessons.length) * 100);
      },

      getLessonProgress: (lessonId: string) => {
        const { progress } = get();
        return progress[lessonId] || null;
      },

      getRecommendedLessons: (studentId: string) => {
        const { lessons, progress } = get();
        
        // Return lessons that are not completed, ordered by difficulty
        return lessons
          .filter(lesson => !progress[lesson.id]?.completed && !lesson.isLocked)
          .sort((a, b) => a.difficultyLevel - b.difficultyLevel)
          .slice(0, 5); // Return top 5 recommendations
      },

      searchContent: (query: string) => {
        const { subjects, chapters, lessons } = get();
        const searchTerm = query.toLowerCase();
        
        const results: (Lesson | Chapter | Subject)[] = [];
        
        // Search in subjects
        subjects.forEach(subject => {
          if (subject.name.toLowerCase().includes(searchTerm) ||
              subject.description.toLowerCase().includes(searchTerm)) {
            results.push(subject);
          }
        });
        
        // Search in chapters
        chapters.forEach(chapter => {
          if (chapter.title.toLowerCase().includes(searchTerm) ||
              chapter.description.toLowerCase().includes(searchTerm)) {
            results.push(chapter);
          }
        });
        
        // Search in lessons
        lessons.forEach(lesson => {
          if (lesson.title.toLowerCase().includes(searchTerm) ||
              lesson.description.toLowerCase().includes(searchTerm) ||
              lesson.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
            results.push(lesson);
          }
        });
        
        return results;
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: STORAGE_KEYS.OFFLINE_DATA + '_learning',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        subjects: state.subjects,
        chapters: state.chapters,
        lessons: state.lessons,
        progress: state.progress 
      }),
    }
  )
);