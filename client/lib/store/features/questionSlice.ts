import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { QuestionState } from "@/types/index";

const API_URL = "http://localhost:5000";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async ({
    subject,
    currentClass,
  }: {
    subject: string | null;
    currentClass: string | null;
  }) => {
    console.log(subject);

    const response = await axios.get(
      `${API_URL}/questions${subject ? `?subject=${subject}&class=${currentClass}` : ""}`
    );
    return response.data;
  }
);

export const addQuestion = createAsyncThunk(
  "questions/addQuestion",
  async (questionData: any) => {
    const response = await axios.post(`${API_URL}/questions`, questionData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  }
);

const initialState: QuestionState = {
  questions: [],
  cursor: 1,
  loading: false,
  error: null,
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.questionList;
        state.cursor = action.payload.cursor;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Произошла ошибка";
      })
      .addCase(addQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Произошла ошибка";
      })
      .addCase(addQuestion.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export default questionSlice.reducer;
