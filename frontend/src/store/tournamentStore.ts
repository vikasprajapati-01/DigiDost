import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Tournament, TournamentParticipant, LeaderboardEntry } from '@/types';
import { mockTournaments } from '@/data/mockData';
import { STORAGE_KEYS } from '@/types/constants';

interface TournamentState {
  tournaments: Tournament[];
  userParticipations: Record<string, TournamentParticipant>;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchTournaments: () => Promise<void>;
  createTournament: (tournament: Omit<Tournament, 'id' | 'currentParticipants' | 'participants' | 'leaderboard'>) => Promise<void>;
  joinTournament: (tournamentId: string, studentId: string) => Promise<void>;
  leaveTournament: (tournamentId: string, studentId: string) => Promise<void>;
  submitTournamentResult: (tournamentId: string, studentId: string, score: number, timeTaken: number) => Promise<void>;
  getTournamentById: (id: string) => Tournament | null;
  getStudentTournaments: (studentId: string) => Tournament[];
  getLeaderboard: (tournamentId: string) => LeaderboardEntry[];
  clearError: () => void;
}

export const useTournamentStore = create<TournamentState>()(
  persist(
    (set, get) => ({
      tournaments: mockTournaments,
      userParticipations: {},
      isLoading: false,
      error: null,

      fetchTournaments: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({ tournaments: mockTournaments, isLoading: false });
        } catch {
          set({ error: 'Failed to fetch tournaments', isLoading: false });
        }
      },

      createTournament: async (tournamentData) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newTournament: Tournament = {
            ...tournamentData,
            id: `tournament-${Date.now()}`,
            currentParticipants: 0,
            participants: [],
            leaderboard: [],
          };
          
          const { tournaments } = get();
          set({ 
            tournaments: [...tournaments, newTournament], 
            isLoading: false 
          });
        } catch {
          set({ error: 'Failed to create tournament', isLoading: false });
        }
      },

      joinTournament: async (tournamentId, studentId) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const { tournaments, userParticipations } = get();
          
          // Check if tournament exists and has space
          const tournament = tournaments.find(t => t.id === tournamentId);
          if (!tournament) {
            throw new Error('Tournament not found');
          }
          
          if (tournament.currentParticipants >= tournament.maxParticipants) {
            throw new Error('Tournament is full');
          }
          
          if (tournament.status !== 'registration') {
            throw new Error('Registration is closed');
          }
          
          // Add participant
          const participant: TournamentParticipant = {
            studentId,
            registeredAt: new Date(),
            completed: false,
          };
          
          const updatedTournaments = tournaments.map(t =>
            t.id === tournamentId
              ? {
                  ...t,
                  currentParticipants: t.currentParticipants + 1,
                  participants: [...t.participants, participant],
                }
              : t
          );
          
          set({
            tournaments: updatedTournaments,
            userParticipations: {
              ...userParticipations,
              [tournamentId]: participant,
            },
            isLoading: false,
          });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to join tournament', isLoading: false });
        }
      },

      leaveTournament: async (tournamentId, studentId) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const { tournaments, userParticipations } = get();
          
          const updatedTournaments = tournaments.map(t =>
            t.id === tournamentId
              ? {
                  ...t,
                  currentParticipants: Math.max(0, t.currentParticipants - 1),
                  participants: t.participants.filter(p => p.studentId !== studentId),
                }
              : t
          );
          
          const updatedParticipations = { ...userParticipations };
          delete updatedParticipations[tournamentId];
          
          set({
            tournaments: updatedTournaments,
            userParticipations: updatedParticipations,
            isLoading: false,
          });
        } catch {
          set({ error: 'Failed to leave tournament', isLoading: false });
        }
      },

      submitTournamentResult: async (tournamentId, studentId, score, timeTaken) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const { tournaments, userParticipations } = get();
          
          // Update participant data
          const updatedTournaments = tournaments.map(tournament => {
            if (tournament.id === tournamentId) {
              const updatedParticipants = tournament.participants.map(p =>
                p.studentId === studentId
                  ? { ...p, score, completed: true, timeSpent: timeTaken }
                  : p
              );
              
              // Create leaderboard entry
              const leaderboardEntry: LeaderboardEntry = {
                studentId,
                studentName: 'Student Name', // In real app, get from user data
                score,
                rank: 0, // Will be calculated
                timeTaken,
                completedAt: new Date(),
              };
              
              // Update leaderboard and calculate ranks
              const updatedLeaderboard = [...tournament.leaderboard, leaderboardEntry]
                .sort((a, b) => {
                  if (a.score !== b.score) return b.score - a.score; // Higher score first
                  return a.timeTaken - b.timeTaken; // Faster time first for same score
                })
                .map((entry, index) => ({ ...entry, rank: index + 1 }));
              
              return {
                ...tournament,
                participants: updatedParticipants,
                leaderboard: updatedLeaderboard,
              };
            }
            return tournament;
          });
          
          // Update user participation
          const updatedParticipations = {
            ...userParticipations,
            [tournamentId]: {
              ...userParticipations[tournamentId],
              score,
              completed: true,
              timeSpent: timeTaken,
            },
          };
          
          set({
            tournaments: updatedTournaments,
            userParticipations: updatedParticipations,
            isLoading: false,
          });
        } catch {
          set({ error: 'Failed to submit tournament result', isLoading: false });
        }
      },

      getTournamentById: (id) => {
        const { tournaments } = get();
        return tournaments.find(tournament => tournament.id === id) || null;
      },

      getStudentTournaments: (studentId) => {
        const { tournaments, userParticipations } = get();
        return tournaments.filter(tournament => 
          userParticipations[tournament.id]?.studentId === studentId
        );
      },

      getLeaderboard: (tournamentId) => {
        const { tournaments } = get();
        const tournament = tournaments.find(t => t.id === tournamentId);
        return tournament?.leaderboard || [];
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: STORAGE_KEYS.OFFLINE_DATA + '_tournaments',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        tournaments: state.tournaments,
        userParticipations: state.userParticipations 
      }),
    }
  )
);