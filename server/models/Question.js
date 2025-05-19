import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
    correct: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default new mongoose.model("Question", QuestionSchema);
