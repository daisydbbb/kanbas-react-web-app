import { useParams, useLocation, useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import * as client from "./client";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions, deleteQuestion, calcPoints } from "./reducer";

export default function Questions() {
  const { cid, qid } = useParams();
  const { questions, totalPoints } = useSelector(
    (state: any) => state.questionsReducer
  );
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    const questions = await client.fetchQuestions(cid as string, qid as string);
    dispatch(setQuestions(questions));
    dispatch(calcPoints());
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  const removeQuestion = async (questionId: string) => {
    await client.deleteQuestion(questionId);
    dispatch(deleteQuestion(questionId));
  };

  return (
    <div>
      <div id="quiz-edit-top-right" className="d-flex float-end mb-3">
        <h5>Points {totalPoints}</h5>
      </div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${pathname.includes("Edit") ? "active" : ""}`}
            aria-current="page"
            href={`#Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`}
          >
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              pathname.includes("Questions") ? "active" : ""
            }`}
            aria-current="page"
            href={`#Kanbas/Courses/${cid}/Quizzes/${qid}/Questions`}
          >
            Questions
          </a>
        </li>
      </ul>
      <div className="d-flex center-item" style={{ width: "100%" }}>
        <button
          type="button"
          className="btn btn-lg btn-secondary mt-3 me-3"
          onClick={() =>
            navigate(
              `/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/TF/new_link`
            )
          }
          style={{ borderRadius: "5px" }}
        >
          <FaPlus /> New Question
        </button>
      </div>
      <br />

      <ul id="wd-questions-list">
        {questions.map((q: any, index: number) => (
          <div
            className="card"
            style={{
              width: "100%",
              marginBottom: 20,
              borderRadius: 0,
              border: "1px solid #ddd",
            }}
            key={q._id}
          >
            <div className="card-body" style={{ padding: 20 }}>
              <div className="card-title row" style={{ marginBottom: 10 }}>
                <div className="col-10">
                  <h4 style={{ fontSize: 20, fontWeight: "bold" }}>
                    Question {index + 1}
                  </h4>
                </div>
                <div className="col-2 text-end" style={{ fontSize: 16 }}>
                  {q.points} pts
                </div>
              </div>
              <p
                className="card-text d-flex"
                style={{ marginLeft: 10, fontSize: 18 }}
              >
                {q.description &&
                  q.description.includes("<p>") &&
                  q.description.replace(/<\/?p>/g, "")}
              </p>
              <div className="form-check">
                {q.options &&
                  q.options.map((o: any, index: number) => (
                    <div key={index + 1} style={{ marginTop: 3 }}>
                      <hr style={{ margin: "10px 0" }} />
                      <input
                        className="form-check-input"
                        type="radio"
                        name="option-value"
                        id={o}
                      />
                      <label className="form-check-label" htmlFor={o}>
                        {o}
                      </label>
                    </div>
                  ))}
              </div>
              <button
                className="btn btn-md btn-secondary me-2 mt-3"
                onClick={() =>
                  navigate(
                    `/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/${q.type}/${q._id}`
                  )
                }
              >
                Edit
              </button>
              <button
                className="btn btn-md btn-danger me-2 mt-3"
                onClick={() => removeQuestion(q._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
