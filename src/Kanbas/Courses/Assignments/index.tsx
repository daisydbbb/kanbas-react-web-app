import SearchAndAdd from "./SearchAndAdd";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import AssignmentControlButton from "./AssignmentControlButton";
import { MdExpandMore } from "react-icons/md";
import Weighing from "./Weighing";
import AssignmentLeftIcons from "./AssignmentLeftIcons";
export default function Assignments() {
  return (
    <div id="wd-assignments" className="row">
      <div id="wd-search-assignment" className="col-12 mb-4 ">
        <SearchAndAdd />
      </div>
      <div className="row">
        <ul id="wd-assignments-list" className="list-group rounded-0">
          <li className="list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-assignment-title p-3 ps-2 bg-secondary ">
              <BsGripVertical className="me-2 fs-3" />
              <MdExpandMore className="me-2 fs-3" />
              ASSIGNMENTS
              <ModuleControlButtons />
              <Weighing />
            </div>
            <ul className="wd-assignment-list list-group rounded-0">
              <li className="wd-assignment-list-item list-group-item p-3 ps-1 left-green">
                <a
                  id="wd-assignment-link"
                  className="text-decoration-none text-dark"
                  href="#/Kanbas/Courses/1234/Assignments/123"
                >
                  <div className="container">
                    <div className="row justify-content-md-center">
                      <div id="assignment-left-icons" className="col-auto">
                        <AssignmentLeftIcons />
                      </div>
                      <div id="assignment-content" className="col">
                        <ul className="list-unstyled mb-0">
                          <div>A1</div>
                          <div>
                            <span style={{ color: "red" }}>
                              Multiple Modules{" "}
                            </span>
                            | <b>Not available until</b> May 6 at 12:00 am |
                          </div>
                          <div>
                            <b>Due</b> May 13 at 11:59pm | 100 pts
                          </div>
                        </ul>
                      </div>
                      <div id="assignment_status" className="col-auto">
                        <AssignmentControlButton />{" "}
                      </div>
                    </div>
                  </div>
                </a>
              </li>

              <li className="wd-assignment-list-item list-group-item p-3 ps-1 left-green">
                <a
                  id="wd-assignment-link"
                  className="text-decoration-none text-dark"
                  href="#/Kanbas/Courses/1234/Assignments/123"
                >
                  <div className="container">
                    <div className="row justify-content-md-center">
                      <div id="assignment-left-icons" className="col-auto">
                        <AssignmentLeftIcons />
                      </div>
                      <div id="assignment-content" className="col">
                        <ul className="list-unstyled mb-0">
                          <div>A2</div>
                          <div>
                            <span style={{ color: "red" }}>
                              Multiple Modules{" "}
                            </span>
                            | <b>Not available until</b> May 13 at 12:00 am |
                          </div>
                          <div>
                            <b>Due</b> May 20 at 11:59pm | 100 pts
                          </div>
                        </ul>
                      </div>
                      <div id="assignment_status" className="col-auto">
                        <AssignmentControlButton />{" "}
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li className="wd-assignment-list-item list-group-item p-3 ps-1 left-green">
                <a
                  id="wd-assignment-link"
                  className="text-decoration-none text-dark"
                  href="#/Kanbas/Courses/1234/Assignments/123"
                >
                  <div className="container">
                    <div className="row justify-content-md-center">
                      <div id="assignment-left-icons" className="col-auto">
                        <AssignmentLeftIcons />
                      </div>
                      <div id="assignment-content" className="col">
                        <ul className="list-unstyled mb-0">
                          <div>A2</div>
                          <div>
                            <span style={{ color: "red" }}>
                              Multiple Modules{" "}
                            </span>
                            | <b>Not available until</b> May 20 at 12:00 am |
                          </div>
                          <div>
                            <b>Due</b> May 27 at 11:59pm | 100 pts
                          </div>
                        </ul>
                      </div>
                      <div id="assignment_status" className="col-auto">
                        <AssignmentControlButton />{" "}
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
