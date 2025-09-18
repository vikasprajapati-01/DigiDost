import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Assignment, AssignmentSubmission } from '@/types';
import { mockAssignments } from '@/data/mockData';
import { STORAGE_KEYS } from '@/types/constants';

interface AssignmentState {
  assignments: Assignment[];
  submissions: Record<string, AssignmentSubmission[]>;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchAssignments: (classId?: string) => Promise<void>;
  createAssignment: (assignment: Omit<Assignment, 'id' | 'createdAt'>) => Promise<void>;
  updateAssignment: (id: string, updates: Partial<Assignment>) => Promise<void>;
  deleteAssignment: (id: string) => Promise<void>;
  submitAssignment: (assignmentId: string, submission: Omit<AssignmentSubmission, 'id' | 'submittedAt'>) => Promise<void>;
  gradeSubmission: (submissionId: string, score: number, feedback: string) => Promise<void>;
  getAssignmentById: (id: string) => Assignment | null;
  getStudentAssignments: () => Assignment[];
  getTeacherAssignments: (teacherId: string) => Assignment[];
  clearError: () => void;
}

export const useAssignmentStore = create<AssignmentState>()(
  persist(
    (set, get) => ({
      assignments: mockAssignments,
      submissions: {},
      isLoading: false,
      error: null,

      fetchAssignments: async (classId?: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          let filteredAssignments = mockAssignments;
          if (classId) {
            filteredAssignments = mockAssignments.filter(a => a.classId === classId);
          }
          
          set({ assignments: filteredAssignments, isLoading: false });
        } catch {
          set({ error: 'Failed to fetch assignments', isLoading: false });
        }
      },

      createAssignment: async (assignmentData) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newAssignment: Assignment = {
            ...assignmentData,
            id: `assignment-${Date.now()}`,
            createdAt: new Date(),
            submissions: [],
          };
          
          const { assignments } = get();
          set({ 
            assignments: [...assignments, newAssignment], 
            isLoading: false 
          });
        } catch {
          set({ error: 'Failed to create assignment', isLoading: false });
        }
      },

      updateAssignment: async (id, updates) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const { assignments } = get();
          const updatedAssignments = assignments.map(assignment =>
            assignment.id === id ? { ...assignment, ...updates } : assignment
          );
          
          set({ assignments: updatedAssignments, isLoading: false });
        } catch {
          set({ error: 'Failed to update assignment', isLoading: false });
        }
      },

      deleteAssignment: async (id) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const { assignments } = get();
          const filteredAssignments = assignments.filter(assignment => assignment.id !== id);
          
          set({ assignments: filteredAssignments, isLoading: false });
        } catch {
          set({ error: 'Failed to delete assignment', isLoading: false });
        }
      },

      submitAssignment: async (assignmentId, submissionData) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newSubmission: AssignmentSubmission = {
            ...submissionData,
            id: `submission-${Date.now()}`,
            assignmentId,
            submittedAt: new Date(),
            status: 'submitted',
            attempts: 1,
          };
          
          const { submissions } = get();
          const assignmentSubmissions = submissions[assignmentId] || [];
          
          set({
            submissions: {
              ...submissions,
              [assignmentId]: [...assignmentSubmissions, newSubmission]
            },
            isLoading: false
          });
        } catch {
          set({ error: 'Failed to submit assignment', isLoading: false });
        }
      },

      gradeSubmission: async (submissionId, score, feedback) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const { submissions } = get();
          const updatedSubmissions = { ...submissions };
          
          for (const assignmentId in updatedSubmissions) {
            updatedSubmissions[assignmentId] = updatedSubmissions[assignmentId].map(sub =>
              sub.id === submissionId 
                ? { 
                    ...sub, 
                    score, 
                    feedback, 
                    status: 'graded',
                    gradedAt: new Date(),
                    gradedBy: 'current-teacher' 
                  } 
                : sub
            );
          }
          
          set({ submissions: updatedSubmissions, isLoading: false });
        } catch {
          set({ error: 'Failed to grade submission', isLoading: false });
        }
      },

      getAssignmentById: (id) => {
        const { assignments } = get();
        return assignments.find(assignment => assignment.id === id) || null;
      },

      getStudentAssignments: () => {
        const { assignments } = get();
        // In a real app, this would filter by student's class
        return assignments;
      },

      getTeacherAssignments: (teacherId) => {
        const { assignments } = get();
        return assignments.filter(assignment => assignment.teacherId === teacherId);
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: STORAGE_KEYS.OFFLINE_DATA + '_assignments',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        assignments: state.assignments,
        submissions: state.submissions 
      }),
    }
  )
);