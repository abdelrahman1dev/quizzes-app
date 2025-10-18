"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Quiz {
  id: string;
  courseTitle: string;
  description: string;
  image: string;
}

interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-card rounded-lg group cursor-pointer shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20">
      <div className="p-6">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div className="space-y-4">
              <div className="relative h-48 overflow-hidden rounded-lg shadow-inner transition-all duration-300 group-hover:shadow-lg">
                <Image
                  src={ "https://imageplaceholder.net/600x400/eeeeee"}
                  alt={quiz.courseTitle}
                  
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors duration-200">
                  {quiz.courseTitle}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                  {quiz.description}
                </p>
                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]">
                  Open Quiz
                </button>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-card-foreground">{quiz.courseTitle}</DialogTitle>
              <DialogDescription className="text-muted-foreground">{quiz.description}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Link href={`/Quizz/${quiz.id}`}>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg transition-colors duration-200 mx-auto shadow-md hover:shadow-lg"
                >
                  Start Quiz
                </button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
