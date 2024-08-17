import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as client from "../Questions/client";
import * as client1 from "../Quizzes/client";
import * as client2 from "../../Account/client";
import { setQuestions } from "../Questions/reducer";
import { FaCheck } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { setQuizzes } from "../Quizzes/reducer";
import { setCurrentUser } from "../../Account/reducer";

const get_now = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const formattedDate = `${month}/${day} at ${hours}:${minutes}`;
  return formattedDate;
};

export default function Score() {
  const { cid, qid } = useParams();
  const { questions } = useSelector((state: any) => state.questionsReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [userAnswers, setUserAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );
  const [user, setUser] = useState(currentUser);

  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    const fetchedQuestions = await client.fetchQuestions(
      cid as string,
      qid as string
    );
    dispatch(setQuestions(fetchedQuestions));
  };
  const fetchQuizzes = async () => {
    const fetchedQuizzes = await client1.fetchQuizzes(cid as string);
    dispatch(setQuizzes(fetchedQuizzes));
  };
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchQuestions(), fetchQuizzes()]);
      setLoading(false);
    };
    fetchData();
    if (startTime === "") {
      setStartTime(get_now());
    }
  }, []);

  if (loading || !questions || !quizzes) {
    return <div>Loading...</div>;
  }

  const quizId = questions[currentQuestion]?.quiz;
  const [currQuiz] = quizzes.filter((q: any) => q._id === quizId);

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question: any, index: number) => {
      if (question.type === "TF" || question.type === "MC") {
        if (userAnswers[index] === question.answer) {
          score += question.points;
        }
      } else {
        if (question.answer_options.includes(userAnswers[index])) {
          score += question.points;
        }
      }
    });

    const records: { [key: string]: any } = {};
    questions.forEach((question: any, index: number) => {
      records[question._id] = userAnswers[index];
    });

    if (user.role === "STUDENT" && qid) {
      const updatedScores = user.scores || {};
      if (!(qid in updatedScores)) {
        const newRecord = { ...records, usedAttempts: 1, score: score };
        const updatedUser = {
          ...user,
          scores: { ...updatedScores, [qid]: newRecord },
        };
        console.log(updatedUser);
        client2.update(updatedUser);
        dispatch(setCurrentUser(updatedUser));
      } else {
        const prevAttempts = updatedScores[qid]?.usedAttempts || 0;
        const newRecord = {
          ...records,
          usedAttempts: prevAttempts + 1,
          score: score,
        };
        const updatedUser = {
          ...user,
          scores: { ...updatedScores, [qid]: newRecord },
        };
        console.log(updatedUser);
        client2.update(updatedUser);
        dispatch(setCurrentUser(updatedUser));
      }
    }

    if (user.role === "FACULTY" && qid) {
      const updatedScores = user.scores || {};

      const newRecord = { ...records, usedAttempts: 0, score: score };
      const updatedUser = {
        ...user,
        scores: { ...updatedScores, [qid]: newRecord },
      };

      console.log(updatedUser);
      client2.update(updatedUser);
      dispatch(setCurrentUser(updatedUser));
    }

    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const goToNextQuestion = () => setCurrentQuestion((prev) => prev + 1);
  const goToPrevQuestion = () => setCurrentQuestion((prev) => prev - 1);

  let allAnswered = false;
  if (!userAnswers.includes("")) {
    allAnswered = true;
  }

  return (
    <div>
      <div id="quiz-header">
        <div className="row">
          <div className="col-9">
            <h3>{currQuiz && currQuiz.title}</h3>
          </div>
          <div className="col-3 float-right">
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
        Started: {startTime}
        <h3>Quiz Instructions</h3>
      </div>
      <hr />
      <div className="row">
        <div
          id="question-content"
          className="col col-9 d-flex center-item card"
          style={{
            width: "70%",
            borderRadius: 0,
            padding: 20,
            marginLeft: 20,
          }}
        >
          <div className="row">
            <div className="col-10">
              <h4 style={{ fontSize: 20, fontWeight: "bold" }}>
                Question {currentQuestion + 1}
              </h4>
            </div>
            <div className="col-2 text-end" style={{ fontSize: 16 }}>
              {questions[currentQuestion] && questions[currentQuestion].points}{" "}
              pts
            </div>
            <hr />
          </div>

          <p>
            {questions[currentQuestion] &&
              questions[currentQuestion].description.replace(/<\/?p>/g, "")}
          </p>

          {questions[currentQuestion] &&
            (questions[currentQuestion].type === "FB" ? (
              <div>
                <hr />
                Your answer (a-z, 0-9 only):{" "}
                <input
                  className="form-control"
                  value={userAnswers[currentQuestion] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                />
              </div>
            ) : (
              <div>
                {questions[currentQuestion].options.map(
                  (option: any, index: number) => (
                    <div key={index + 1}>
                      <hr />
                      <input
                        type="radio"
                        name="answer"
                        value={option}
                        id={option}
                        checked={userAnswers[currentQuestion] === option}
                        onChange={() => handleAnswerChange(option)}
                        style={{ marginRight: 5 }}
                      />
                      <label key={index} htmlFor={option}>
                        {option}
                      </label>
                    </div>
                  )
                )}
              </div>
            ))}
        </div>
        <div className="col col-3">
          <h4 style={{ marginLeft: 30 }}>Questions</h4>
          <ul>
            {questions.map((q: any, index: number) => (
              <ul key={index + 1}>
                {userAnswers[index] === "" ? (
                  <>
                    <FaRegQuestionCircle style={{ color: "gray" }} />{" "}
                    {`Question ${index + 1}`}
                  </>
                ) : (
                  <>
                    <FaCheck style={{ color: "green" }} />{" "}
                    {`Question ${index + 1}`}
                  </>
                )}
              </ul>
            ))}
          </ul>
        </div>
      </div>
      <br />
      <div
        id="prev-next-buttons"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {currentQuestion > 0 && (
          <button
            className="btn btn-md btn-secondary"
            onClick={goToPrevQuestion}
            style={{ borderRadius: 5 }}
          >
            Previous
          </button>
        )}

        {currentQuestion < questions.length - 1 && (
          <div style={{ marginLeft: "auto" }}>
            <button
              className="btn btn-md btn-secondary"
              style={{
                borderRadius: 5,
                marginRight: 20,
              }}
              onClick={goToNextQuestion}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <hr />

      <button
        onClick={handleSubmit}
        className={`btn btn-md float-end ${
          allAnswered ? "btn-danger" : "btn-secondary"
        }`}
        style={{ borderRadius: 5, marginRight: 20 }}
      >
        Submit Quiz
      </button>
    </div>
  );
}
