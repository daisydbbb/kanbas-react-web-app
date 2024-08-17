import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import { setQuizzes } from "./reducer";
import { useEffect } from "react";
import { FaPencil } from "react-icons/fa6";
import FacultyRoutes from "../../FacultyRoutes";

const getDate = (dateString: any) => {
  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getUTCDate();
  const month = monthNames[date.getUTCMonth()];
  const formattedDate = `${month} ${day}`;
  return formattedDate;
};

export default function Details() {
  const { cid, qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currQuiz = quizzes.filter(
    (quiz: any) => quiz.course === cid && quiz._id === qid
  )[0];
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  let usedAttempts = 0;
  if (currentUser.scores && qid && qid in currentUser.scores) {
    usedAttempts = currentUser.scores[qid]?.usedAttempts || 0;
  }

  const fetchQuizzes = async () => {
    const quizzes = await client.fetchQuizzes(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (!currQuiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex center-item">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={() => navigate(`/Kanbas/Courses/${currQuiz.course}/Quizzes`)}
        >
          Back
        </button>
        <FacultyRoutes>
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() =>
              navigate(
                `/Kanbas/Courses/${currQuiz.course}/Quizzes/${currQuiz._id}/Preview`
              )
            }
          >
            Preview
          </button>
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() =>
              navigate(
                `/Kanbas/Courses/${currQuiz.course}/Quizzes/${currQuiz._id}/Edit`
              )
            }
          >
            <FaPencil className="text-secondary me-2" />
            Edit
          </button>
        </FacultyRoutes>
      </div>
      <hr />
      <div>
        <h3>{currQuiz.title}</h3>
        <div id="quiz-property" className="row">
          <div className="col-sm-5 d-flex justify-content-end mb-2">
            <b>Quiz Type</b>
          </div>
          <div className="col-sm-7">{currQuiz.quiz_type}</div>

          <div className="col-sm-5 d-flex justify-content-end mb-2">
            <b>Points</b>
          </div>
          <div className="col-sm-7">{currQuiz.points}</div>

          <div className="col-sm-5 d-flex justify-content-end mb-2">
            <b>Assignment Group</b>
          </div>
          <div className="col-sm-7">{currQuiz.group}</div>

          <div className="col-sm-5 d-flex justify-content-end mb-2">
            <b>Shuffle Answers</b>
          </div>
          <div className="col-sm-7">{currQuiz.shuffle ? "Yes" : "No"}</div>

          <div className="col-sm-5 d-flex justify-content-end mb-2">
            <b>Time Limit</b>
          </div>
          <div className="col-sm-7">{currQuiz.time}</div>

          <div className="col-sm-5 d-flex justify-content-end mb-2">
            <b>Multiple Attempts</b>
          </div>
          <div className="col-sm-7">{currQuiz.attempts > 1 ? "Yes" : "No"}</div>

          <div className="col-sm-5 d-flex justify-content-end mb-2">
            <b>Remaining Attempts</b>
          </div>
          <div className="col-sm-7">{currQuiz.attempts - usedAttempts}</div>

          <div className="col-sm-5 d-flex justify-content-end mb-2">
            <b>View Response</b>
          </div>
          <div className="col-sm-7">Always</div>

          <div className="col-sm-5 d-flex justify-content-end mb-2">
            <b>Show Correct Answers</b>
          </div>
          <div className="col-sm-7">Immediately</div>

          <div className="col-sm-5 d-flex justify-content-end mb-2">
            <b>One Question at a Time</b>
          </div>
          <div className="col-sm-7">{currQuiz.one_question ? "Yes" : "No"}</div>

          <div
            className="col-sm-5 d-flex justify-content-end mb-2"
            style={{ textAlign: "right" }}
          >
            <b>Require Respondus LockDown Browser</b>
          </div>
          <div className="col-sm-7">No</div>

          <div
            className="col-sm-5 d-flex justify-content-end mb-2"
            style={{ textAlign: "right" }}
          >
            <b>Required to View Quiz Results</b>
          </div>
          <div className="col-sm-7">No</div>

          <div className="col-sm-5 d-flex justify-content-end mb-2">
            <b>Webcam Required</b>
          </div>
          <div className="col-sm-7">{currQuiz.webcam ? "Yes" : "No"}</div>

          <div
            className="col-sm-5 d-flex justify-content-end mb-2"
            style={{ textAlign: "right" }}
          >
            <b>Lock Questions After Answering</b>
          </div>
          <div className="col-sm-7">
            {currQuiz.lock_after_answer ? "Yes" : "No"}
          </div>
        </div>
      </div>
      <br />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Due</th>
            <th scope="col">For</th>
            <th scope="col">Available from</th>
            <th scope="col">Available Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{currQuiz.due && `${getDate(currQuiz.due)} 11:59pm`}</td>
            <td>Everyone</td>
            <td>
              {currQuiz.available_from &&
                `${getDate(currQuiz.available_from)} 11:59pm`}
            </td>
            <td>
              {currQuiz.available_to &&
                `${getDate(currQuiz.available_to)} 11:59pm`}
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      {currentUser && currentUser.role === "STUDENT" && (
        <div className="d-flex center-item">
          {currQuiz.published ? (
            currQuiz.attempts - usedAttempts > 0 ? (
              <button
                type="button"
                className="btn btn-danger"
                style={{ borderRadius: 5 }}
                onClick={() => navigate(`TakeQuiz`)}
              >
                Start the Quiz
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                style={{ borderRadius: 5 }}
                onClick={() => navigate(`Preview`)}
              >
                View Lastest Attempt
              </button>
            )
          ) : (
            <button
              type="button"
              className="btn btn-secondary"
              style={{ borderRadius: 5 }}
            >
              Start the Quiz
            </button>
          )}
        </div>
      )}
      {currentUser && currentUser.role === "FACULTY" && (
        <div className="d-flex center-item">
          <button
            type="button"
            className="btn btn-danger"
            style={{ borderRadius: 5 }}
            onClick={() => navigate(`TakeQuiz`)}
          >
            Start the Quiz
          </button>
        </div>
      )}
    </div>
  );
}
