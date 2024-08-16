import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchQuestions = async (courseId: string, quizId: string) => {
  const response = await axios.get(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`
  );
  return response.data;
};

export const createQuestion = async (
  courseId: string,
  quizId: string,
  question: any
) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`,
    question
  );
  return response.data;
};

const QUESTION_API = `${REMOTE_SERVER}/api/questions`;
export const deleteQuestion = async (questionId: string) => {
  const response = await axios.delete(`${QUESTION_API}/${questionId}`);
  return response.data;
};
export const updateQuestion = async (question: any) => {
  const response = await axios.put(`${QUESTION_API}/${question._id}`, question);
  return response.data;
};
