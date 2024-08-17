import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FacultyRoutes from "../FacultyRoutes";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrolled = currentUser.enrolled_courses;

  if (!currentUser) {
    return <>Loading...</>;
  }

  return (
    <div id="wd-dashboard">
      <div>
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <h4>
          Hi{" "}
          {currentUser && (
            <>
              {currentUser.username} ({currentUser.role})
            </>
          )}{" "}
          👋
        </h4>
      </div>
      <hr />

      <h2 id="wd-dashboard-published">Enrolled Courses ({enrolled.length})</h2>
      <Link to="/Kanbas/Enroll">View All Courses</Link>
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4 mt-2">
          {enrolled.map((course: any) => (
            <div
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
              key={course._id}
            >
              <Link
                to={`/Kanbas/Courses/${course.number}/Home`}
                className="text-decoration-none"
              >
                <div className="card rounded-3 overflow-hidden">
                  <img
                    src="/images/reactjs.jpg"
                    height="160px"
                    alt="course_pic"
                  />
                  <div className="card-body">
                    <span
                      className="wd-dashboard-course-link"
                      style={{
                        textDecoration: "none",
                        color: "navy",
                        fontWeight: "bold",
                      }}
                    >
                      {course.name}
                    </span>
                    <p
                      className="wd-dashboard-course-title card-text"
                      style={{ maxHeight: 53, overflow: "hidden" }}
                    >
                      {course.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
