import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    title: String,
    questions: Array,
    subject: String,
  },
  {
    timestamps: true,
  }
);

export default new mongoose.model("Question", QuestionSchema);
