import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Quiz } from "../lib/types";

interface AnswerState {
  selectedAnswer: string;
  isCorrect: boolean;
  isAnswered: boolean;
}

interface QuizState {
  quiz: Quiz | null;
  currentIndex: number;
  answers: Record<string, AnswerState>;
  setQuiz: (quiz: Quiz) => void;
  setAnswer: (questionId: string, selected: string) => void;
  markUnanswered: (questionId: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToQuestion: (index: number) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>()(
 
    (set, get) => ({
      quiz: null,
      currentIndex: 0,
      answers: {},

      setQuiz: (quiz) => set({ quiz }),
      setAnswer: (questionId, selected) => {
        const quiz = get().quiz;
        if (!quiz) return;
        const question = quiz.questions.find((q) => q.id === questionId);
        const isCorrect = question?.correctAnswer === selected;

        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: { selectedAnswer: selected, isCorrect, isAnswered: true },
          },
        }));
      },
      markUnanswered: (questionId) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: { selectedAnswer: "", isCorrect: false, isAnswered: false },
          },
        })),
      nextQuestion: () => {
        const total = get().quiz?.questions.length ?? 0;
        const next = get().currentIndex + 1;
        if (next < total) set({ currentIndex: next });
      },
      prevQuestion: () => {
        const prev = get().currentIndex - 1;
        if (prev >= 0) set({ currentIndex: prev });
      },
      goToQuestion: (index) => {
        const total = get().quiz?.questions.length ?? 0;
        if (index >= 0 && index < total) set({ currentIndex: index });
      },
      reset: () => set({ quiz: null, currentIndex: 0, answers: {} }),
    }
  )
);
