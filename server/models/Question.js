import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
    correct: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    currentClass: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default new mongoose.model("Question", QuestionSchema);
