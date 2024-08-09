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
import NewQuestion from "./Quizzes/Questions/NewQuestion";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
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
              <Route path="Quizzes/:qid/New" element={<NewQuestion />} />
              <Route path="People" element={<PeopleTable />} />
              <Route path="People/:uid" element={<PeopleTable />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
