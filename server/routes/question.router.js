import express from "express";
import Question from "../models/Question.js";
import { checkRole } from "../utils/checkRole.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { subject, limit = 10, cursor = 1 } = req.query;

    if (subject) {
      const questionList = await Question.find({
        subject,
      })
        .limit(limit)
        .skip(cursor - 1)
        .sort({ createdAt: Math.random() < 0.5 ? -1 : 1 });
      // .aggregate([{ $sample: { size: parseInt(limit) } }])
      return res.json({ questionList, cursor: cursor + 1 });
    } else {
      const questionList = await Question.find().limit(limit);
      return res.json({ questionList });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", checkRole, async (req, res) => {
  const question = new Question({
    title: req.body.title,
    question: req.body.question,
    answers: req.body.answers,
    correct: req.body.correct,
    subject: req.body.subject,
  });

  if (
    !question.title ||
    !question.question ||
    !question.subject ||
    !question.correct ||
    !question.answers
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
