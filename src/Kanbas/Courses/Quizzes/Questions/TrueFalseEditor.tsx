import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import "./style.css";

export default function TrueFalseEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };
  const [question, setQuestion] = useState({
    type: "TF",
    title: "Question Title",
    points: 10,
    description: "Question Description",
  });
  const handleChange = (e: any) => {
    const selectedValue = e.target.value;
    switch (selectedValue) {
      case "TF":
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/TF`);
        break;
      case "MC":
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/MC`);
        break;
      case "FB":
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/FB`);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      This is the Editor for TrueFalseEditor
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
            <select className="form-select" onChange={handleChange}>
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
          <textarea
            id="question-description"
            className="form-control"
            value={question.description}
            onChange={(e) =>
              setQuestion({ ...question, description: e.target.value })
            }
            style={{ height: "100px" }}
          />
        </div>
        <br />
        <div id="answers">
          <h4>Answers: </h4>
        </div>
      </div>
      <hr />
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
          className="btn btn-lg btn-danger me-1 float-end"
          type="submit"
          // onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
