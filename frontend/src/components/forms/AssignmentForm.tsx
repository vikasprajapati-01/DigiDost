'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

interface AssignmentData {
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

interface AssignmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (assignment: AssignmentData) => void;
}

export function AssignmentForm({ isOpen, onClose, onSubmit }: AssignmentFormProps) {
  const [formData, setFormData] = useState<AssignmentData & { attachments: File[] }>({
    title: '',
    description: '',
    subject: '',
    dueDate: '',
    dueTime: '',
    type: 'homework' as const,
    difficulty: 'medium' as const,
    points: '',
    instructions: '',
    attachments: [] as File[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof (AssignmentData & { attachments: File[] }), value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!formData.dueTime) newErrors.dueTime = 'Due time is required';
    if (!formData.points || isNaN(Number(formData.points))) newErrors.points = 'Valid points required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Extract only the assignment data without attachments
      const { attachments, ...assignmentData } = formData;
      onSubmit(assignmentData);
      onClose();
      setFormData({
        title: '',
        description: '',
        subject: '',
        dueDate: '',
        dueTime: '',
        type: 'homework' as const,
        difficulty: 'medium' as const,
        points: '',
        instructions: '',
        attachments: [],
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="p-0 bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Create New Assignment</h2>
                <p className="text-blue-100 mt-1">Set up a new assignment for your students</p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information Section */}
            <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignment Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.title 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
                    }`}
                    placeholder="Enter assignment title..."
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.subject 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
                    }`}
                  >
                    <option value="">Select subject...</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                    <option value="history">History</option>
                    <option value="geography">Geography</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignment Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 hover:border-gray-400 transition-all duration-200"
                  >
                    <option value="homework">Homework</option>
                    <option value="project">Project</option>
                    <option value="quiz">Quiz</option>
                    <option value="exam">Exam</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 border-2 rounded-lg bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 resize-none ${
                    errors.description 
                      ? 'border-red-400 focus:border-red-500' 
                      : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
                  }`}
                  placeholder="Provide a brief description of the assignment..."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Schedule & Grading Section */}
            <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">⏰</span>
                Schedule & Grading
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border-2 rounded-lg bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.dueDate 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
                    }`}
                  />
                  {errors.dueDate && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.dueDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Time *
                  </label>
                  <input
                    type="time"
                    value={formData.dueTime}
                    onChange={(e) => handleInputChange('dueTime', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.dueTime 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
                    }`}
                  />
                  {errors.dueTime && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.dueTime}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Points *
                  </label>
                  <input
                    type="number"
                    value={formData.points}
                    onChange={(e) => handleInputChange('points', e.target.value)}
                    min="1"
                    className={`w-full px-4 py-3 border-2 rounded-lg bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.points 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
                    }`}
                    placeholder="100"
                  />
                  {errors.points && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.points}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <div className="flex gap-3">
                  {[
                    { value: 'easy', label: 'Easy', color: 'bg-green-100 border-green-300 text-green-800' },
                    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
                    { value: 'hard', label: 'Hard', color: 'bg-red-100 border-red-300 text-red-800' },
                  ].map((difficulty) => (
                    <label key={difficulty.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="difficulty"
                        value={difficulty.value}
                        checked={formData.difficulty === difficulty.value}
                        onChange={(e) => handleInputChange('difficulty', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        formData.difficulty === difficulty.value 
                          ? difficulty.color 
                          : 'bg-gray-100 border-gray-300 text-gray-600 hover:border-gray-400'
                      }`}>
                        {difficulty.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="bg-purple-50 rounded-lg p-5 border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📝</span>
                Additional Instructions
              </h3>
              
              <textarea
                value={formData.instructions}
                onChange={(e) => handleInputChange('instructions', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 hover:border-gray-400 transition-all duration-200 resize-none"
                placeholder="Provide detailed instructions for students (optional)..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-lg"
              >
                Create Assignment
              </motion.button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}