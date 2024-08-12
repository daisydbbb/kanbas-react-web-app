import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as client from "./Courses/client";
import { useState, useEffect } from "react";
import store from "./store";
import Account from "./Account";
import { Provider } from "react-redux";
import Session from "./Account/Session";
import ProtectedRoute from "./ProtectedRoutes";
import AllCourses from "./AllCourses";

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    setCourses(courses);
  };
  useEffect(() => {
    fetchCourses();
  }, [courses]);

  const addNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    setCourses([...courses, newCourse]);
  };
  const deleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
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
  return (
    <Provider store={store}>
      <Session>
        <div id="wd-kanbas" className="h-100">
          <div className="d-flex h-100">
            <div className="bg-black d-none d-md-block">
              <KanbasNavigation />
            </div>

            <div className="flex-fill p-4">
              <Routes>
                <Route path="/" element={<Navigate to="Dashboard" />} />
                <Route path="/Account/*" element={<Account />} />
                <Route
                  path="Dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard
                        courses={courses}
                        course={course}
                        setCourse={setCourse}
                        addNewCourse={addNewCourse}
                        deleteCourse={deleteCourse}
                        updateCourse={updateCourse}
                        setCourses={setCourses}
                        fetchCourses={fetchCourses}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Courses/:cid/*"
                  element={
                    <ProtectedRoute>
                      <Courses courses={courses} />
                    </ProtectedRoute>
                  }
                />
                <Route path="Calendar" element={<h1>Calendar</h1>} />
                <Route path="Inbox" element={<h1>Inbox</h1>} />
                <Route path="Enroll" element={<AllCourses />} />
              </Routes>
            </div>
          </div>
        </div>
      </Session>
    </Provider>
  );
}
