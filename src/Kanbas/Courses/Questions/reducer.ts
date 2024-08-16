import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  questions: [],
  totalPoints: 0,
};
const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, { payload: question }) => {
      const newQuestions: any = {
        _id: new Date().getTime().toString(),
        quiz: question.quiz,
      };
      state.questions = [...state.questions, newQuestions] as any;
    },
    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter(
        (q: any) => q._id !== questionId
      );
    },
    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === question._id ? question : q
      ) as any;
    },
    calcPoints: (state) => {
      state.totalPoints = state.questions.reduce(
        (acc: number, question: any) => acc + question.points,
        0
      );
    },
  },
});
export const {
  setQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  calcPoints,
} = questionSlice.actions;
export default questionSlice.reducer;
