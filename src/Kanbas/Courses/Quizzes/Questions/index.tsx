import { useParams, useLocation, useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa6";

export default function Questions() {
  const { cid, qid } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
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
      <div className="d-flex center-item">
        <button
          type="button"
          className="btn btn-lg btn-secondary mt-3 "
          onClick={() =>
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/TF`)
          }
        >
          <FaPlus /> True/False
        </button>
      </div>

      {/* show the list of existing questions, .map */}
    </div>
  );
}
