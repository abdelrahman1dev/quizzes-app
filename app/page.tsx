"use client";
import QuizList from "./components/QuixList";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Available Quizzes</h1>
        <hr className="w-24 mx-auto border-border mb-12" />
        <QuizList />
      </div>
    </main>
  );
}
