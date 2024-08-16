import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Details";
import QuizEditor from "./Quizzes/Editor";
import Home from "./Home";
import Grades from "./Grades";
import PeopleTable from "./People/Table";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import Questions from "./Questions";
import TrueFalseEditor from "./Questions/TrueFalseEditor";
import MultipleChoiceEditor from "./Questions/MultipleChoiceEditor";
import FillInBlankEditor from "./Questions/FillInBlankEditor";
import Scores from "./Scores";
import Preview from "./Preview";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course.number === cid);
  const { pathname } = useLocation();
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />

      <div className="container-fluid">
        <div className="row">
          <div className="d-none d-lg-block col-md-2">
            <CoursesNavigation />
          </div>
          <div className="col-md-10">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:aid" element={<AssignmentEditor />} />
              <Route path="Grades" element={<Grades />} />
              <Route path="Quizzes" element={<Quizzes />} />
              <Route path="Quizzes/:qid" element={<QuizDetails />} />
              <Route path="Quizzes/:qid/Edit" element={<QuizEditor />} />
              <Route path="Quizzes/:qid/Questions" element={<Questions />} />
              <Route path="Quizzes/:qid/TakeQuiz" element={<Scores />} />
              <Route path="Quizzes/:qid/Preview" element={<Preview />} />
              <Route
                path="Quizzes/:qid/Questions/TF/:questionId"
                element={<TrueFalseEditor />}
              />
              <Route
                path="Quizzes/:qid/Questions/MC/:questionId"
                element={<MultipleChoiceEditor />}
              />
              <Route
                path="Quizzes/:qid/Questions/FB/:questionId"
                element={<FillInBlankEditor />}
              />
              <Route path="People" element={<PeopleTable />} />
              <Route path="People/:uid" element={<PeopleTable />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
