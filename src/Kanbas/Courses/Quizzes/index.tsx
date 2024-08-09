import { useParams, useNavigate } from "react-router";
import { MdExpandMore } from "react-icons/md";
import SearchAndAdd from "./SearchAndAdd";
import { useSelector, useDispatch } from "react-redux";
import { IoRocketOutline } from "react-icons/io5";
import * as client from "./client";
import { useEffect } from "react";
import { setQuizzes } from "./reducer";
import QuizControlButton from "./QuizControlButton";

const get_now = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  return formattedDate;
};
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

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const time_now = get_now();

  const fetchQuizzes = async () => {
    const quizzes = await client.fetchQuizzes(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, [quizzes]);

  return (
    <div id="wd-quizzes" className="row">
      <div id="wd-search-quiz" className="col-12 mb-4 ">
        <SearchAndAdd cid={cid} />
      </div>

      <div className="row">
        <li className="list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-quiz-title p-3 ps-2 bg-secondary ">
            <MdExpandMore className="me-2 fs-3" />
            <b>Quizzes</b>
          </div>

          <ul id="wd-quizzes-list" className="list-group rounded-0">
            {quizzes
              .filter((quiz: any) => quiz.course === cid)
              .map((quiz: any) => (
                <li className="wd-quiz-list-item list-group-item p-3 ps-1 left-green">
                  <div className="container">
                    <div className="row justify-content-md-center">
                      <div id="quiz-left-icons" className="col-auto d-flex">
                        <IoRocketOutline
                          style={{ color: "green" }}
                          className="me-2 fs-3 mt-3"
                        />
                      </div>
                      <div id="assignment-content" className="col">
                        <ul className="list-unstyled mb-0">
                          <div
                            style={{ fontSize: "24px" }}
                            onClick={() =>
                              navigate(
                                `/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`
                              )
                            }
                          >
                            {quiz.title}
                          </div>
                          <div>
                            {time_now < quiz.available_from ? (
                              <>
                                <b>Not available until</b>{" "}
                                {quiz.available_from &&
                                  getDate(quiz.available_from)}{" "}
                                at{" "}
                                {quiz.available_from &&
                                  getTime(quiz.available_from)}
                              </>
                            ) : time_now > quiz.available_to ? (
                              <b>Closed</b>
                            ) : (
                              <b>Available</b>
                            )}{" "}
                            | <b>Due</b> {quiz.due && getDate(quiz.due)} at{" "}
                            {quiz.due && getTime(quiz.due)} |{" "}
                            {quiz.score === "" ? "" : <b>{quiz.score}/</b>}
                            {quiz.points} pts | {quiz.question_number} Questions
                          </div>
                        </ul>
                      </div>
                      <div id="quiz_status" className="col-auto mt-3">
                        <QuizControlButton quiz={quiz} />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </div>
    </div>
  );
}
