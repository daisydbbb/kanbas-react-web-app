import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import store from "./store";
import Account from "./Account";
import { Provider } from "react-redux";
import Session from "./Account/Session";
import ProtectedRoute from "./ProtectedRoutes";
import AllCourses from "./AllCourses";

export default function Kanbas() {
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
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="Courses/:cid/*" element={<Courses />} />
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
