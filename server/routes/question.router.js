import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { subject } = req.query;
    if (subject) {
      const { _id, title, subject, questions } = await Question.find({
        subject,
      });
      return res.json({
        _id,
        title,
        subject,
        count: questions.length + 1,
      });
    }
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const question = new Question({
    title: req.body.title,
    questions: req.body.questions,
    subject: req.body.subject,
    teacher: req.body.teacher,
  });

  if (!question.title || !question.questions || !question.subject) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  const { title, questions, subject } = req.body;

  if (!id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const question = await Question.findByIdAndUpdate(
      id,
      { title, questions, subject },
      {
        new: true,
      }
    );
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
