import { Quiz } from "./types";

export async function fetchQuizzes(): Promise<Quiz[]> {
  try {
    const res = await fetch("/data/quizzes.json");
    if (!res.ok) throw new Error("Failed to fetch quizzes");
    return await res.json();
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    return [];
  }
}
