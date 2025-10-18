import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Read your JSON data
const data = JSON.parse(fs.readFileSync("public/data/quizzes.json", "utf-8"));

// Add UUIDs to each quiz and question
const updatedData = data.map((quiz) => ({
  ...quiz,
  uuid: quiz.uuid || uuidv4(),
  questions: quiz.questions.map((q) => ({
    ...q,
    uuid: q.uuid || uuidv4(),
  })),
}));

// Overwrite the same file
fs.writeFileSync("public/data/quizzes.json", JSON.stringify(updatedData, null, 2));

console.log("✅ UUIDs added successfully and saved in public/data/quiz.json");
