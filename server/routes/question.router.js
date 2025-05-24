import express from "express";
import Question from "../models/Question.js";
import { checkRole } from "../utils/checkRole.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { subject, currentClass, limit = 10 } = req.query;

    // Преобразуем limit в число
    const sampleLimit = parseInt(limit);

    // Если указан subject и currentClass — фильтруем и возвращаем случайные вопросы
    if (subject && currentClass) {
      const questionList = await Question.aggregate([
        { $match: { subject, currentClass } },
        { $sample: { size: sampleLimit } },
      ]);
      return res.json({ questionList });
    }

    // Если только subject
    if (subject) {
      const questionList = await Question.aggregate([
        { $match: { subject } },
        { $sample: { size: sampleLimit } },
      ]);
      return res.json({ questionList });
    }

    // Если только currentClass
    if (currentClass) {
      const questionList = await Question.aggregate([
        { $match: { currentClass } },
        { $sample: { size: sampleLimit } },
      ]);
      return res.json({ questionList });
    }

    // Без фильтрации — просто случайные вопросы
    const questionList = await Question.aggregate([
      { $sample: { size: sampleLimit } },
    ]);
    return res.json({ questionList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", checkRole, async (req, res) => {
  const question = new Question({
    question: req.body.question,
    answers: req.body.answers,
    correct: req.body.correct,
    subject: req.body.subject,
    currentClass: req.body.currentClass,
  });

  if (
    !question.question ||
    !question.subject ||
    !question.correct ||
    !question.answers ||
    !question.currentClass
  ) {
    return res.status(402).json({ message: "All fields are required" });
  }

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, question, subject, correct, answers } = req.body;

  if (!id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newQuestion = await Question.findByIdAndUpdate(
      id,
      { title, question, subject, correct, answers },
      {
        new: true,
      }
    );
    res.json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
