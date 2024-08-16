import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import "./style.css";
import * as client from "./client";
import { useSelector, useDispatch } from "react-redux";
import { addQuestion, updateQuestion } from "./reducer";
import { FaRegTrashAlt } from "react-icons/fa";
import WYSIWYGQuestionEditor from "../WYSIWYGQuestionEditor";

export default function FillInBlankEditor() {
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
      type: "FB",
      title: "Question Title",
      description: "How much is 2+2 = ______?",
      points: 10,
      answer_options: ["4", "four"],
    };
  }
  const [question, setQuestion] = useState(currentQuestion);
  const [answerOptions, setAnswerOptions] = useState(
    currentQuestion.answer_options
  );

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

  const addNewQuestion = async (question: any) => {
    const newQuestion = await client.createQuestion(
      cid as string,
      qid as string,
      question
    );
    dispatch(addQuestion(newQuestion));
  };

  const saveQuestion = async (question: any) => {
    const status = await client.updateQuestion(question);
    dispatch(updateQuestion(question));
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions`);
  };
  const handleSave = async () => {
    const updatedQuestion = { ...question, answer_options: answerOptions };
    setQuestion(updatedQuestion);
    if (isNew) {
      dispatch(addQuestion(updatedQuestion));
      await addNewQuestion(updatedQuestion);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions`);
    } else {
      dispatch(updateQuestion(updatedQuestion));
      await saveQuestion(updatedQuestion);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions`);
    }
  };
  const handleDelete = (del_index: any) => {
    const newOptions = answerOptions.filter(
      (o: any, index: number) => index !== del_index
    );
    setAnswerOptions(newOptions);
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
              defaultValue="FB"
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
            Enter your question text, then define all possible correct answers
            for the blank. Students will see the question followed by a small
            text box to type their answer.
          </p>
          <h4>Question: </h4>
          <WYSIWYGQuestionEditor form={question} setForm={setQuestion} />
        </div>
        <br />
        <div id="answers">
          <h4>Answers: </h4>
          <ul>
            {answerOptions.map((o: any, index: number) => (
              <ul style={{ marginTop: 10 }} key={index}>
                <div className="row align-items-center">
                  <div className="col col-2">
                    <p style={{ marginBottom: 0 }}>Possible Answer</p>
                  </div>
                  <div className="col col-7 d-flex">
                    <input
                      className="col form-control"
                      value={o}
                      onChange={(e) => {
                        const newOptions = [...answerOptions];
                        newOptions[index] = e.target.value;
                        setAnswerOptions(newOptions);
                      }}
                    />
                  </div>
                  <div className="col col-1 d-flex">
                    <FaRegTrashAlt
                      className="text-danger float-start me-2"
                      onClick={() => handleDelete(index)}
                    />
                  </div>
                </div>
              </ul>
            ))}
          </ul>
          <button
            style={{
              border: "none",
              color: "red",
              background: "white",
              textDecoration: "underline",
              float: "right",
              marginRight: 20,
            }}
            onClick={() => setAnswerOptions([...answerOptions, ""])}
          >
            + Add Another answer
          </button>
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
