import { useNavigate } from "react-router-dom";
import * as client from "../Courses/client";
import { useState, useEffect } from "react";

export default function AllCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({});
  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    setCourses(courses);
  };
  const updateCourse = async () => {
    await client.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const nagivate = useNavigate();

  const handleCancel = () => {
    nagivate(-1);
  };
  const handleSave = () => {
    updateCourse();
    nagivate("/Kanbas/Dashboard", { state: { courses } });
  };

  return (
    <div id="all-courses">
      <h1>Choose Courses for Enrollment</h1>
      <div style={{ marginLeft: 10 }}>
        {courses.map((course: any) => (
          <div>
            <input
              type="checkbox"
              defaultChecked={course.enrolled}
              onChange={(e) =>
                setCourse({ ...course, enrolled: e.target.checked })
              }
            />{" "}
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
