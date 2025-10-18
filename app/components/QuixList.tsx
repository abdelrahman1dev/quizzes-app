"use client";
import { useEffect, useState } from "react";
import { fetchQuizzes } from "../lib/fetchQuizzes";
import { Quiz } from "../lib/types";
import QuizCard from "./QuizCard";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes().then((data) => {
      setQuizzes(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="text-center py-16 text-muted-foreground text-lg">
        Loading quizzes...
      </div>
    );

  if (quizzes.length === 0)
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📚</div>
        <p className="text-muted-foreground">No available quizzes yet!</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
}
