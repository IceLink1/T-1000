import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { QuestionState } from "@/types/index";

const API_URL = "http://localhost:5000";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async ({ subject }: { subject: string | null }) => {
    console.log(subject);

    const response = await axios.get(
      `${API_URL}/questions${subject ? `?subject=${subject}` : ""}`
    );
    return response.data;
  }
);

export const addQuestion = createAsyncThunk(
  "questions/addQuestion",
  async (questionData: any) => {
    const response = await axios.post(`${API_URL}/questions`, questionData);
    return response.data;
  }
);

const initialState: QuestionState = {
  questions: [],
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
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Произошла ошибка";
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      });
  },
});

export default questionSlice.reducer;
