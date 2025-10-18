export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  id: string;
  courseTitle: string;
  description: string;
  image: string;
  duration: number;
  difficulty: string;
  uuid: string;
  questions: Question[];
}
