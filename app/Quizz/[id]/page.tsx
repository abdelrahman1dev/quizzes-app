"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";


import { fetchQuizzes } from "../../lib/fetchQuizzes";
import { Quiz } from "../../lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {

  const [Quiz, setQuiz] = useState<Quiz | null>(null);
  const resolvedParams = use(params);
  const { id } = resolvedParams;






  useEffect(() => {
    fetchQuizzes().then((data) => {
      const found = data.find((q) => q.id === id);
      setQuiz(found || null);
    });
  }, [id]);


  if (!Quiz) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No quiz data available.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-card rounded-lg shadow-lg p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-shrink-0">
            <Image
              src={Quiz.image}
              width={400}
              height={300}
              alt={Quiz.courseTitle}
              className="rounded-2xl shadow-md object-cover"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-card-foreground">
              {Quiz.courseTitle}
            </h1>
            <h2 className="text-lg lg:text-xl text-muted-foreground mb-6">
              {Quiz.description}
            </h2>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium">
                Duration: {Quiz.duration} min
              </div>
              <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium">
                Difficulty: {Quiz.difficulty}
              </div>
            </div>
            <Dialog>
              <DialogTrigger className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg">

                Start Quiz
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Ready to Start?</DialogTitle>
                  <DialogDescription>
                    You are about to start the quiz: <strong>{Quiz.courseTitle}</strong>.
                    Make sure you are prepared and have enough time to complete it.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Link

                    href={`/Quizz/${Quiz.id}/${Quiz.uuid}`}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                  >
                    Let&apos;s Go!
                  </Link>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  )
}