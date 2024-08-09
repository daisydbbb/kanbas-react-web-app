import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import { setQuizzes } from "./reducer";
import { useEffect } from "react";
import { FaPencil } from "react-icons/fa6";

const getDate = (dateString: any) => {
  const date_string = dateString.split("T")[0];
  const date = new Date(date_string);
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
const getTime = (dateString: any) => {
  const timeString = dateString.split("T")[1];
  if (timeString > "11:59") {
    return timeString + "pm";
  } else {
    return timeString + "am";
  }
};

export default function Details() {
  const { cid, qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currQuiz = quizzes.filter(
    (quiz: any) => quiz.course === cid && quiz._id === qid
  )[0];

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
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button type="button" className="btn btn-secondary me-2">
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
          <div className="col-sm-7">
            {currQuiz.multiple_attempts ? currQuiz.attempts : "No"}
          </div>

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
            <td>
              {currQuiz.due && getDate(currQuiz.due)}{" "}
              {currQuiz.due && getTime(currQuiz.due)}
            </td>
            <td>Everyone</td>
            <td>
              {currQuiz.available_from && getDate(currQuiz.available_from)}{" "}
              {currQuiz.available_from && getTime(currQuiz.available_from)}
            </td>
            <td>
              {currQuiz.available_to && getDate(currQuiz.available_to)}{" "}
              {currQuiz.available_to && getTime(currQuiz.available_to)}
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <div className="d-flex center-item">
        <button type="button" className="btn btn-danger">
          Start the Quiz
        </button>
      </div>
    </div>
  );
}
