import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import "./style.css";
import * as client from "./client";
import { useSelector, useDispatch } from "react-redux";
import { addQuestion, updateQuestion } from "./reducer";
import WYSIWYGQuestionEditor from "../WYSIWYGQuestionEditor";

export default function TrueFalseEditor() {
  const { cid, qid, questionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { questions } = useSelector((state: any) => state.questionsReducer);

  let currentQuestion = questions.filter(
    (question: any) => question._id === questionId
  )[0];
  let isNew = false;
  if (currentQuestion === undefined) {
    isNew = true;
    currentQuestion = {
      _id: new Date().getTime().toString(),
      quiz: qid,
      type: "TF",
      title: "Question Title",
      description: "Question Description... e.g. Is 1+1 = 2?",
      points: 10,
      options: ["True", "False"],
      answer: "True",
    };
  }
  const [question, setQuestion] = useState(currentQuestion);

  const addNewQuestion = async (question: any) => {
    const newQuestion = await client.createQuestion(
      cid as string,
      qid as string,
      question
    );
    dispatch(addQuestion(newQuestion));
  };

  const handleChange = (e: any) => {
    const selectedValue = e.target.value;
    switch (selectedValue) {
      case "TF":
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/TF/new_link`);
        break;
      case "MC":
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/MC/new_link`);
        break;
      case "FB":
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/FB/new_link`);
        break;
      default:
        break;
    }
  };

  const saveQuestion = async (question: any) => {
    const status = await client.updateQuestion(question);
    dispatch(updateQuestion(question));
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions`);
  };
  const handleSave = async () => {
    if (isNew) {
      dispatch(addQuestion(question));
      await addNewQuestion(question);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions`);
    } else {
      dispatch(updateQuestion(question));
      await saveQuestion(question);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions`);
    }
  };

  return (
    <div className="container">
      <div id="true-false-content" className="form">
        <div id="title-type-points" className="question-row">
          <div className="question-title">
            <input
              className="form-control"
              value={question.title}
              onChange={(e) =>
                setQuestion({ ...question, title: e.target.value })
              }
              style={{ marginRight: 5 }}
            />
          </div>
          <div className="question-type">
            <select
              className="form-select"
              onChange={handleChange}
              defaultValue="TF"
            >
              <option value="TF">True/False</option>
              <option value="MC">Multiple Choice</option>
              <option value="FB">Fill in Blank</option>
            </select>
          </div>
          <div className="question-points">
            Pts:
            <input
              className="form-control w-50"
              type="number"
              min="0"
              value={question.points}
              onChange={(e) =>
                setQuestion({ ...question, points: parseInt(e.target.value) })
              }
            />
          </div>
        </div>

        <hr />
        <div id="description">
          <p>
            Enter your question text, then select if True or False is the
            correct answer.
          </p>
          <h4>Question: </h4>
          <WYSIWYGQuestionEditor form={question} setForm={setQuestion} />
        </div>
        <br />
        <div id="answers">
          <h4>Answers: </h4>
          <input
            type="radio"
            id="true"
            name="true-false"
            defaultChecked={question.answer === "True"}
            onClick={(e) => setQuestion({ ...question, answer: "True" })}
          />
          <label htmlFor="true">True</label>
          <br />
          <input
            type="radio"
            id="false"
            name="true-false"
            defaultChecked={question.answer === "False"}
            onClick={(e) => setQuestion({ ...question, answer: "False" })}
          />
          <label htmlFor="false">False</label>
          <br />
        </div>
      </div>
      <hr />
      <div>
        <button
          className="btn btn-md btn-secondary me-1"
          onClick={handleCancel}
          style={{ borderRadius: 5 }}
        >
          Cancel
        </button>
        <button
          className="btn btn-md btn-danger"
          type="submit"
          onClick={handleSave}
          style={{ borderRadius: 5 }}
        >
          Update Question
        </button>
      </div>
    </div>
  );
}
