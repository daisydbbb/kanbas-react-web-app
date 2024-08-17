import { useNavigate } from "react-router-dom";
import * as client from "../Courses/client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as client1 from "../Account/client";
import { setCurrentUser } from "../Account/reducer";

export default function AllCourses() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courses, setCourses] = useState<any[]>([]);
  // const [course, setCourse] = useState<any>({});
  const [enrolled, setEnrolled] = useState(currentUser.enrolled_courses);
  const dispatch = useDispatch();

  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    setCourses(courses);
  };
  // const updateCourse = async () => {
  //   await client.updateCourse(course);
  //   setCourses(
  //     courses.map((c) => {
  //       if (c._id === course._id) {
  //         return course;
  //       } else {
  //         return c;
  //       }
  //     })
  //   );
  // };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);
  const enrolledCourseName = enrolled.map((c: any) => c.name);
  const nagivate = useNavigate();

  const handleCancel = () => {
    nagivate("/Kanbas/Dashboard");
  };

  const handleSave = () => {
    const updatedUser = { ...currentUser, enrolled_courses: enrolled };
    client1.update(updatedUser);
    dispatch(setCurrentUser(updatedUser));
    nagivate("/Kanbas/Dashboard", { state: { courses } });
  };

  const handleEnroll = (course: any) => {
    const newList = [...enrolled, course];
    setEnrolled(newList);
  };
  const handleUnenroll = (course: any) => {
    const newList = enrolled.filter((c: any) => c._id !== course._id);
    setEnrolled(newList);
  };
  return (
    <div id="all-courses">
      <h1>Choose Courses for Enrollment</h1>
      <div style={{ marginLeft: 10 }}>
        {courses.map((course: any) => (
          <div key={course.name} style={{ marginBottom: 5 }}>
            {enrolledCourseName.includes(course.name) ? (
              <button
                className="btn btn-sm btn-danger me-3"
                onClick={() => handleUnenroll(course)}
              >
                Unenroll
              </button>
            ) : (
              <button
                className="btn btn-sm btn-secondary me-3"
                onClick={() => handleEnroll(course)}
              >
                Enroll
              </button>
            )}
            {course.name}
          </div>
        ))}
      </div>
      <br />
      <button className="btn btn-md btn-secondary me-2" onClick={handleCancel}>
        Cancel
      </button>
      <button className="btn btn-md btn-danger" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
