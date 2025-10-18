"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuizStore } from "../../../store/useQuizStore";
import { fetchQuizzes } from "../../../lib/fetchQuizzes";
import { Quiz } from "../../../lib/types";

export default function QuizQuestions({
  params,
}: {
  quiz?: Quiz;
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    setQuiz,
    quiz: Quiz,
    currentIndex,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    answers,
    setAnswer,
    markUnanswered,
  } = useQuizStore();


  useEffect(() => {
    let active = true;
    params.then((p) => {
      if (active) setResolvedParams(p);
    });
    return () => {
      active = false;
    };
  }, [params]);


useEffect(() => {
  const loadQuiz = async () => {
    if (!resolvedParams) {
      setLoading(false);
      return;
    }

    // If there's no quiz yet or the current quiz id doesn't match, fetch and set the correct quiz.
    if (!Quiz || Quiz.id !== resolvedParams.id) {
      const data = await fetchQuizzes();
      const found = data.find((q) => q.id === resolvedParams.id);
      if (found) setQuiz(found);
    }
    setLoading(false);
  };

  loadQuiz();
}, [resolvedParams, Quiz, setQuiz]);

  useEffect(() => {
    if (!Quiz || !resolvedParams) return;

    const total = Quiz.questions.length;
    const answeredCount = Object.values(answers).filter((a) => a?.isAnswered).length;

    if (answeredCount === total) {
      router.replace(`/Quizz/${resolvedParams.id}/Results`);
    }
  }, [Quiz, answers, resolvedParams, router]);


  if (loading || !resolvedParams) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4"
      >
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 max-w-6xl w-full">
          {/* Navigation Dots Skeleton */}
          <div className="flex lg:flex-col gap-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="w-8 h-8 rounded-full" />
            ))}
          </div>

          {/* Main Quiz Card Skeleton */}
          <div className="flex-1 bg-card rounded-2xl shadow-xl border p-4 lg:p-8 space-y-4 lg:space-y-6">
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-1/4 mx-auto" />
            <Skeleton className="h-3 w-full rounded-full" />
            <Skeleton className="h-6 w-3/4" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full rounded-lg" />
              ))}
            </div>
            <div className="flex justify-between items-center pt-4">
              <Skeleton className="h-10 w-20" />
              <div className="flex gap-3">
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-10 w-20" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!Quiz || !Quiz.questions?.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen text-muted-foreground"
      >
        No quiz data available.
      </motion.div>
    );
  }

  /* ✅ 5. Normal rendering after quiz is loaded */
  const question = Quiz.questions[currentIndex];
  const total = Quiz.questions.length;
  const progress = Math.floor(((currentIndex + 1) / total) * 100);
  const answerState = answers[question.id];
  const selected = answerState?.selectedAnswer || null;

  const handleNext = () => nextQuestion();
  const handleSkip = () => {
    if (currentIndex < total - 1) {
      markUnanswered(question.id);
      nextQuestion();
    }
    else {
      handleDone();
      markUnanswered(question.id);
    }
  };

  const handleDone = () => {
    router.push(`/Quizz/${resolvedParams.id}/Results`);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4"
    >
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 max-w-6xl w-full">
        {/* Navigation Dots */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
          {Quiz.questions.map((_, index) => {
            const answerState = answers[Quiz.questions[index].id];
            const isAnswered = answerState?.isAnswered;
            const isSkipped = answerState && !answerState.isAnswered;
            const isCurrent = index === currentIndex;

            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToQuestion(index)}
                className={`flex-shrink-0 w-8 h-8 rounded-full border-2 transition-all text-xs font-medium ${isCurrent
                    ? "border-primary bg-primary text-primary-foreground"
                    : isAnswered
                      ? "border-green-500 bg-green-500 text-white"
                      : isSkipped
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-muted bg-muted text-muted-foreground hover:border-primary"
                  }`}
              >
                {index + 1}
              </motion.button>
            );
          })}
        </div>

        {/* Main Quiz Card */}
        <div className="flex-1 bg-card rounded-2xl shadow-xl border p-4 lg:p-8 space-y-4 lg:space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-center text-foreground"
          >
            {Quiz.courseTitle}
          </motion.h2>

          <div className="text-center text-sm text-muted-foreground">
            Question {currentIndex + 1} of {total}
          </div>

          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-primary h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-foreground">{question.question}</h3>

              <ul className="space-y-3">
                {question.options.map((option, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={optionVariants}
                    initial="hidden"
                    animate="visible"
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selected === option
                        ? "border-primary bg-primary/10"
                        : "border-muted hover:border-primary/50"
                      }`}
                    onClick={() => setAnswer(question.id, option)}
                  >
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        checked={selected === option}
                        onChange={() => setAnswer(question.id, option)}
                        className="hidden"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${selected === option
                            ? "border-primary bg-primary"
                            : "border-muted"
                          }`}
                      />
                      <span className="text-foreground">{option}</span>
                    </label>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevQuestion}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 lg:px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm lg:text-base"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </motion.button>

            <div className="flex gap-2 lg:gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSkip}
                className="px-4 lg:px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium transition-all text-sm lg:text-base"
              >
                Skip
              </motion.button>

              {currentIndex < total - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 lg:px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all text-sm lg:text-base"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDone}
                  className="px-4 lg:px-6 py-3 bg-green-500 text-white rounded-lg font-medium transition-all text-sm lg:text-base"
                >
                  Done
                </motion.button>
              )}
            </div>
          </div>

          {answerState && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-sm text-center ${answerState.isAnswered ? "text-green-600" : "text-red-600"
                }`}
            >
              {answerState.isAnswered ? "Answered" : "Skipped"}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
