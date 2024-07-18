import SearchAndAdd from "./SearchAndAdd";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import AssignmentControlButton from "./AssignmentControlButton";
import { MdExpandMore } from "react-icons/md";
import Weighing from "./Weighing";
import AssignmentLeftIcons from "./AssignmentLeftIcons";
import { useParams } from "react-router";
import * as db from "../../Database";

const formatDate = (dateString: any) => {
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  return (
    <div id="wd-assignments" className="row">
      <div id="wd-search-assignment" className="col-12 mb-4 ">
        <SearchAndAdd />
      </div>
      <div className="row">
        <li className="list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignment-title p-3 ps-2 bg-secondary ">
            <BsGripVertical className="me-2 fs-3" />
            <MdExpandMore className="me-2 fs-3" />
            <b>ASSIGNMENTS</b>
            <ModuleControlButtons />
            <Weighing />
          </div>
          <ul id="wd-assignments-list" className="list-group rounded-0">
            {assignments
              .filter((assignment) => assignment.course === cid)
              .map((assignment) => (
                <li className="wd-assignment-list-item list-group-item p-3 ps-1 left-green">
                  <a
                    id="wd-assignment-link"
                    className="text-decoration-none text-dark"
                    href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                  >
                    <div className="container">
                      <div className="row justify-content-md-center">
                        <div
                          id="assignment-left-icons"
                          className="col-auto d-flex"
                        >
                          <AssignmentLeftIcons />
                        </div>
                        <div id="assignment-content" className="col">
                          <ul className="list-unstyled mb-0">
                            <div style={{ fontSize: "24px" }}>
                              <b>{assignment.title}</b>
                            </div>
                            <div>
                              <span style={{ color: "red" }}>
                                Multiple Modules{" "}
                              </span>
                              | <b>Not available until</b>{" "}
                              {formatDate(assignment.available_from)} at 12:00
                              am |
                            </div>
                            <div>
                              <b>Due</b> {formatDate(assignment.due)} at 11:59pm
                              | {assignment.points} pts
                            </div>
                          </ul>
                        </div>
                        <div
                          id="assignment_status"
                          className="col-auto assignment_status_pos"
                        >
                          <AssignmentControlButton />
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
          </ul>
        </li>
      </div>
    </div>
  );
}
