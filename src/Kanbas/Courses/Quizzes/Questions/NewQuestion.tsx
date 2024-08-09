import { useParams, useLocation } from "react-router";
import { FaPlus } from "react-icons/fa6";

export default function NewQuestion() {
  const { cid, qid } = useParams();
  const { pathname } = useLocation();
  return (
    <div>
      <div id="quiz-edit-top-right" className="d-flex float-end mb-3">
        <h4>Points 0</h4>
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
            className={`nav-link ${pathname.includes("New") ? "active" : ""}`}
            aria-current="page"
            href={`#Kanbas/Courses/${cid}/Quizzes/${qid}/New`}
          >
            Questions
          </a>
        </li>
      </ul>
      <div className="d-flex center-item">
        <button type="button" className="btn btn-lg btn-secondary mt-5 mb-4">
          <FaPlus /> New Question
        </button>
      </div>

      {/* show the list of existing questions, .map */}

      <hr />
      <div className="button-container">
        <button
          id="button-right-align"
          className="btn btn-lg btn-secondary me-1 float-end"
          // onClick={handleCancel}
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
