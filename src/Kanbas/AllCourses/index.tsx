import { useNavigate } from "react-router-dom";
import * as client from "../Courses/client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as client1 from "../Account/client";
import { setCurrentUser } from "../Account/reducer";
import FacultyRoutes from "../FacultyRoutes";
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

export default function AllCourses() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courses, setCourses] = useState<any[]>([]); // for all courses
  const [course, setCourse] = useState({
    name: "",
    number: "",
    image: "/images/reactjs.jpg",
    description: "",
  }); // for selected course

  const [enrolled, setEnrolled] = useState(currentUser.enrolled_courses);
  const [enrolledCourseName, setEnrolledCourseName] = useState<any>([]);
  const dispatch = useDispatch();
  const nagivate = useNavigate();

  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    setCourses(courses);
    const enrolledName = enrolled.map((c: any) => c.name);
    setEnrolledCourseName(enrolledName);
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

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
    const newNameList = [...enrolledCourseName, course.name];
    setEnrolled(newList);
    setEnrolledCourseName(newNameList);
  };
  const handleUnenroll = (course: any) => {
    const newList = enrolled.filter((c: any) => c._id !== course._id);
    const newNameList = enrolledCourseName.filter(
      (name: String) => name !== course.name
    );
    setEnrolled(newList);
    setEnrolledCourseName(newNameList);
  };

  const handleAddCourse = async (course: any) => {
    try {
      const newCourse = await client.createCourse(course);
      setCourses([newCourse, ...courses]);
      setCourse({
        name: "",
        number: "",
        image: "/images/reactjs.jpg",
        description: "",
      });
      alert("New course added!");
    } catch (err) {
      alert("Duplicate name!");
      console.error(err);
    }
  };

  const handleUpdateCourse = async (course: any) => {
    await client.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course.id) {
          return course;
        } else {
          return c;
        }
      })
    );
    setCourse({
      name: "",
      number: "",
      image: "/images/reactjs.jpg",
      description: "",
    });
  };

  const handleDeleteCourse = async (course: any) => {
    await client.deleteCourse(course._id);
    setCourses(courses.filter((c) => c._id !== course._id));
  };

  return (
    <div id="all-courses">
      <FacultyRoutes>
        <div className="add-new-course">
          <h5>
            Create/Edit Course
            {course.name && (
              <button
                className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={() => handleAddCourse(course)}
              >
                Add
              </button>
            )}
            {course.name && (
              <button
                className="btn btn-warning float-end me-2"
                onClick={() => handleUpdateCourse(course)}
                id="wd-update-course-click"
              >
                Update
              </button>
            )}
            {course.name && (
              <button
                className="btn btn-secondary float-end me-2"
                onClick={() => {
                  setCourse({
                    name: "",
                    number: "",
                    image: "/images/reactjs.jpg",
                    description: "",
                  });
                }}
                id="wd-update-course-click"
              >
                Clear Content
              </button>
            )}
          </h5>
          <br />

          <input
            value={course.name}
            className="form-control mb-2 w-50"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="New Course Name"
          />
          <input
            value={course.number}
            className="form-control mb-2 w-50"
            onChange={(e) => setCourse({ ...course, number: e.target.value })}
            placeholder="New Course Number"
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            placeholder="New Course Description"
          />
          <hr />
        </div>
      </FacultyRoutes>

      <h1>Choose Courses for Enrollment</h1>
      <div style={{ marginLeft: 10 }}>
        {courses.map((course: any) => (
          <div key={course.name} style={{ marginBottom: 5 }}>
            {enrolledCourseName.includes(course.name) ? (
              <button
                className="btn btn-sm btn-primary me-3"
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
            <FaPencil
              style={{
                marginLeft: 5,
                color: "orange",
              }}
              onClick={() => {
                setCourse(course);
              }}
            />
            <FaRegTrashAlt
              style={{
                marginLeft: 5,
                color: "red",
              }}
              onClick={() => handleDeleteCourse(course)}
            />
          </div>
        ))}
      </div>
      <br />
      <button className="btn btn-md btn-secondary me-2" onClick={handleCancel}>
        Cancel
      </button>
      <button className="btn btn-md btn-danger" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
}
