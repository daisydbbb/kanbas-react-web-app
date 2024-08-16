import { useParams, useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import * as client from "../Questions/client";
import { setQuestions, calcPoints } from "../Questions/reducer";
import { FaArrowLeft } from "react-icons/fa";
import { current } from "@reduxjs/toolkit";

export default function Preview() {
  const { cid, qid } = useParams();
  const { questions } = useSelector((state: any) => state.questionsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchQuestions = async () => {
    const questions = await client.fetchQuestions(cid as string, qid as string);
    dispatch(setQuestions(questions));
    dispatch(calcPoints());
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div>
      <div>
        <div
          className="float-end"
          style={{ marginRight: 50, marginBottom: 10 }}
        >
          {currentUser &&
            (currentUser.role === "STUDENT" ? (
              <button
                className="btn btn-md btn-secondary"
                style={{ borderRadius: 0 }}
              >
                Student View
              </button>
            ) : (
              <button
                className="btn btn-md btn-secondary"
                style={{ borderRadius: 0 }}
              >
                Faculty View
              </button>
            ))}
        </div>
        <ul id="wd-questions-list">
          {questions.map((q: any, index: number) => (
            <div
              className="card"
              style={{
                width: "90%",
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
                  {q.description}
                </p>
                <div className="preview-faculty">
                  {q.options &&
                  currentUser &&
                  currentUser.role === "FACULTY" &&
                  q.type !== "FB" ? (
                    q.options.map((o: any, index: number) => (
                      <div key={index + 1} style={{ marginTop: 3 }}>
                        <hr style={{ margin: "10px 0" }} />
                        <input
                          className="form-check-input"
                          type="radio"
                          name="option-value"
                          id={`${q._id}-${index}`}
                          checked={o === q.faculty_answer}
                          readOnly
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`${q._id}-${index}`}
                        >
                          {o}
                        </label>

                        {o === q.faculty_answer && (
                          <span style={{ marginLeft: 10 }}>
                            {q.faculty_answer === q.answer ? (
                              <>
                                <FaArrowLeft
                                  style={{ color: "green", marginRight: 5 }}
                                />
                                <span style={{ color: "green" }}>Correct </span>
                              </>
                            ) : (
                              <>
                                <FaArrowLeft
                                  style={{ color: "red", marginRight: 5 }}
                                />
                                <span style={{ color: "red" }}>Incorrect </span>
                              </>
                            )}
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div style={{ background: "none" }}>
                      Your Answer: {q.faculty_answer}{" "}
                      {q.answer_options.includes(q.faculty_answer) ? (
                        <>
                          <FaArrowLeft
                            style={{ color: "green", marginRight: 5 }}
                          />
                          <span style={{ color: "green" }}>Correct </span>
                        </>
                      ) : (
                        <>
                          <FaArrowLeft
                            style={{ color: "red", marginRight: 5 }}
                          />
                          <span style={{ color: "red" }}>Incorrect </span>
                        </>
                      )}
                      <br />
                      Correct Answers:
                      <ul>
                        {q.answer_options.map((a: any) => (
                          <li> {a} </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ul>

        <button
          className="btn btn-md btn-secondary float-end "
          style={{ borderRadius: 5, marginRight: 100 }}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}
