"use client";
import React from "react";
import Link from "next/link";
import { useQuizStore } from "@/app/store/useQuizStore";

export default function QuizDonePage() {
  const { quiz, answers , reset } = useQuizStore();
  const totalQuestions = quiz ? quiz.questions.length : 0;
  const correctAnswersCount = Object.values(answers).filter((ans) => ans.isCorrect).length;


  const handleReset = () => {
    reset();
    window.location.href = "/";
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <p className="text-lg text-muted-foreground">No quiz data available.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 space-y-12">
      {/* 🎉 Summary Card */}
      <div className="text-center max-w-lg bg-card rounded-lg shadow-lg p-8">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          You completed <strong>{quiz.courseTitle}</strong>!
        </p>

        <p className="text-2xl font-semibold mb-6">
          You answered {correctAnswersCount} / {totalQuestions} correctly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Take Another Quiz
          </Link>

          <button
            onClick={() => window.print()}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Print Results
          </button>
          <button
            onClick={handleReset}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Reset Progress
          </button>
        </div>
      </div>

     
      {quiz.questions.some((q) => {
        const a = answers[q.id];
        return a && !a.isCorrect;
      }) && (
        <div className="max-w-2xl w-full bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Incorrect Answers</h2>
          <ul className="space-y-4 text-left">
            {quiz.questions.map((question) => {
              const answer = answers[question.id];
              if (answer && !answer.isCorrect) {
                return (
                  <li key={question.id} className="border-b pb-3">
                    <h3 className="font-semibold">{question.question}</h3>
                    <p>
                      Your answer:{" "}
                      <span className="text-red-500">{answer.selectedAnswer || "No answer"}</span>
                    </p>
                    <p>
                      Correct answer:{" "}
                      <span className="text-green-500">{question.correctAnswer}</span>
                    </p>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
