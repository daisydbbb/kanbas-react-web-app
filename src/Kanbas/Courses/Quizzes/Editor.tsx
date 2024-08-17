import { useParams, useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, updateQuiz } from "./reducer";
import React, { useState } from "react";
import * as client from "./client";
import { FaBan } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { IoEllipsisVertical } from "react-icons/io5";
import WYSIWYGEditor from "../WYSIWYGEditor";

export default function Editor() {
  const { cid, qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  let currentQuiz = quizzes.filter(
    (quiz: any) => quiz.course === cid && quiz._id === qid
  )[0];
  let isNew = false;
  if (currentQuiz === undefined) {
    isNew = true;
    currentQuiz = {
      _id: new Date().getTime().toString(),
      title: "Unnamed Quiz",
      course: cid,
      instructions: "",
      due: "",
      available_from: "",
      available_to: "",
      points: 0,
      score: 0,
      question_number: 1,
      published: false,
      quiz_type: "Graded Quiz",
      group: "Quizzes",
      shuffle: true,
      time: 20,
      multiple_attempts: false,
      attempts: 1,
      one_question: true,
      webcam: false,
      lock_after_answer: false,
    };
  }

  const [form, setForm] = useState(currentQuiz);
  const addNewQuiz = async (quiz: any) => {
    const newQuiz = await client.createQuiz(cid as string, quiz);
    dispatch(addQuiz(newQuiz));
  };

  const saveQuiz = async (quiz: any) => {
    const status = await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };
  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };
  const handleSave = async () => {
    if (isNew) {
      dispatch(addQuiz(form));
      await addNewQuiz(form);
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } else {
      dispatch(updateQuiz(form));
      await saveQuiz(form);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    }
  };
  const handleSaveAndPublish = async () => {
    const updatedForm = { ...form, published: true };
    if (isNew) {
      dispatch(addQuiz(updatedForm));
      await addNewQuiz(updatedForm);
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } else {
      dispatch(updateQuiz(updatedForm));
      await saveQuiz(updatedForm);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    }
  };
  return (
    <div>
      <div id="quiz-edit-top-right" className="d-flex float-end mb-3">
        <h4>Points {form.points}</h4>
        {form.published ? (
          <div style={{ fontSize: 20, marginLeft: 15 }}>
            <TiTick className="text-success" /> Published{" "}
          </div>
        ) : (
          <div style={{ fontSize: 20, marginLeft: 15, marginRight: 12 }}>
            <FaBan className="text-secondary" /> Not Published{" "}
          </div>
        )}
        <button
          className="btn btn-sm btn-secondary"
          style={{ borderRadius: "2px" }}
        >
          <IoEllipsisVertical className="fs-4 position-relative" />
        </button>
      </div>
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${
                pathname.includes("Edit") ? "active" : ""
              }`}
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
      </div>
      <div id="wd-quizzes-editor" className="form-group">
        <div>
          <div id="wd-quiz-name" className="mb-3">
            <input
              id="wd-name"
              className="form-control"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          Quiz Instructions: <br />
          Edit / View / Insert / Format / Tools / Table
          <WYSIWYGEditor form={form} setForm={setForm} />
          <br />
          <div id="quiz-details" className="row">
            <div className="col-sm-4 d-flex align-items-center justify-content-end">
              Quiz Type
            </div>
            <div className="col-sm-8">
              <select
                value={form.quiz_type}
                onChange={(e) =>
                  setForm({ ...form, quiz_type: e.target.value })
                }
                className="form-select float-start w-50 wd-select-role"
              >
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Servey">Ungraded Servey</option>
              </select>
            </div>
          </div>
          <div id="quiz-points" className="row mt-3">
            <div className="col-sm-4 d-flex align-items-center justify-content-end">
              Points
            </div>
            <div className="col-sm-8">
              <input
                type="number"
                min="0"
                value={form.points}
                onChange={(e) =>
                  setForm({ ...form, points: parseInt(e.target.value) })
                }
                className="form-control"
                style={{ width: 70 }}
              ></input>
            </div>
          </div>
          <div id="quiz-number" className="row mt-3">
            <div className="col-sm-4 d-flex align-items-center justify-content-end">
              Question Number
            </div>
            <div className="col-sm-8">
              <input
                type="number"
                min="1"
                value={form.question_number}
                onChange={(e) =>
                  setForm({
                    ...form,
                    question_number: parseInt(e.target.value),
                  })
                }
                className="form-control"
                style={{ width: 70 }}
              ></input>
            </div>
          </div>
          <br />
          <div id="quiz-groups" className="row">
            <div className="col-sm-4 d-flex align-items-center justify-content-end">
              Assignment Group
            </div>
            <div className="col-sm-8">
              <select
                value={form.group}
                onChange={(e) => setForm({ ...form, group: e.target.value })}
                className="form-select float-start w-50 wd-select-role"
              >
                <option value="Quizzes">Quizzes</option>
                <option value="Exams">Exams</option>
                <option value="Assignments">Assignments</option>
                <option value="Project">Project</option>
              </select>
            </div>
          </div>
          <br />
          <div id="quiz-options" className="row mb-2">
            <div className="col-sm-4"></div>
            <div className="col-sm-8">
              <b>Options</b> <br />
              <input
                type="checkbox"
                defaultChecked={form.shuffle}
                onChange={(e) =>
                  setForm({ ...form, shuffle: e.target.checked })
                }
                style={{ marginTop: 10 }}
              />{" "}
              Shuffle Answers <br />
              <div>
                <input type="checkbox" defaultChecked={form.time > 0} /> Time
                Limit{" "}
                <input
                  type="number"
                  min="1"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  style={{ width: 50, marginLeft: 20, marginTop: 10 }}
                />{" "}
                Minutes
              </div>
              <br />
              <input
                type="checkbox"
                checked={form.multiple_attempts}
                onChange={(e) =>
                  setForm({
                    ...form,
                    multiple_attempts: e.target.checked,
                    attempts: e.target.checked ? 2 : 1,
                  })
                }
              />{" "}
              Allow Multiple Attempts <br />
              {form.multiple_attempts && (
                <div>
                  {" "}
                  <input
                    value={form.attempts}
                    min={2}
                    onChange={(e) =>
                      setForm({ ...form, attempts: parseInt(e.target.value) })
                    }
                    style={{ width: 30 }}
                  />{" "}
                  times
                </div>
              )}
            </div>
          </div>
          <br />
          <div id="quiz-assign" className="row">
            <div className="col-sm-4 d-flex align-items-top justify-content-end">
              Assign
            </div>
            <div className="col-sm-8">
              <div className="form-control">
                <b>Assign To</b>
                <input className="form-control" value="Everyone" />
                <br />
                <b>Due</b>
                <input
                  className="form-control"
                  type="date"
                  id="wd-due-date"
                  value={form.due}
                  onChange={(e) => setForm({ ...form, due: e.target.value })}
                />
                <br />
                <div id="availabe-time-container">
                  <div className="row">
                    <div className="col">
                      <b>Available from </b>
                      <br />
                      <input
                        type="date"
                        className="form-control"
                        id="wd-available-from"
                        value={form.available_from}
                        onChange={(e) =>
                          setForm({ ...form, available_from: e.target.value })
                        }
                      />
                    </div>
                    <div className="col">
                      <b>Until </b>
                      <br />
                      <input
                        type="date"
                        className="form-control"
                        id="wd-available-until"
                        value={
                          form.available_to > form.available_from
                            ? form.available_to
                            : ""
                        }
                        onChange={(e) =>
                          setForm({ ...form, available_to: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="button-container">
          <button
            id="button-right-align"
            className="btn btn-lg btn-secondary me-1 float-end"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            id="button-right-align"
            className="btn btn-lg btn-secondary me-1 float-end"
            type="submit"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            id="button-right-align"
            className="btn btn-lg btn-danger me-1 float-end"
            type="submit"
            onClick={handleSaveAndPublish}
          >
            Save and Publish
          </button>
        </div>
      </div>
    </div>
  );
}
