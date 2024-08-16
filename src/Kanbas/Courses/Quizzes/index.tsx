import { useParams, useNavigate } from "react-router";
import { MdExpandMore } from "react-icons/md";
import SearchAndAdd from "./SearchAndAdd";
import { useSelector, useDispatch } from "react-redux";
import { IoRocketOutline } from "react-icons/io5";
import * as client from "./client";
import { useEffect } from "react";
import { setQuizzes } from "./reducer";
import QuizControlButton from "./QuizControlButton";
import { useLocation } from "react-router";

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

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const time_now = get_now();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchQuizzes = async () => {
    const quizzes = await client.fetchQuizzes(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div id="wd-quizzes" className="row">
      <div id="wd-search-quiz" className="col-12 mb-4 ">
        <SearchAndAdd cid={cid} />
        <div className="float-end">
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
                <div key={quiz._id}>
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
                                    `${getDate(quiz.available_from)} 11:59pm`}
                                </>
                              ) : time_now > quiz.available_to ? (
                                <b>Closed</b>
                              ) : (
                                <b>Available</b>
                              )}{" "}
                              | <b>Due</b>{" "}
                              {quiz.due && `${getDate(quiz.due)} 11:59pm`} |{" "}
                              {currentUser &&
                              currentUser.role === "STUDENT" &&
                              quiz.score ? (
                                <b>{quiz.score}/</b>
                              ) : (
                                ""
                              )}
                              {quiz.points} pts | {quiz.question_number}{" "}
                              Questions
                            </div>
                          </ul>
                        </div>
                        <div id="quiz_status" className="col-auto mt-3">
                          <QuizControlButton quiz={quiz} />
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
              ))}
          </ul>
        </li>
      </div>
    </div>
  );
}
