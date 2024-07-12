import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
  return (
    <div id="wd-modules" className="row">
      <div className="col-12 mb-4">
        <ModulesControls />
      </div>
      <div className="row">
        <ul id="wd-modules" className="list-group rounded-0">
          <li
            id="wd-module"
            className="list-group-item p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              Week 1
              <ModuleControlButtons />
            </div>
            <ul id="wd-lessons" className="list-group rounded-0">
              <li
                id="wd-lesson"
                className="list-group-item p-3 ps-1 left-green"
              >
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
                <LessonControlButtons />
              </li>
              <li
                id="wd-lesson"
                className="list-group-item p-3 ps-1 left-green"
              >
                <BsGripVertical className="me-2 fs-3" />
                Introduction to the course
                <LessonControlButtons />
              </li>
              <li
                id="wd-lesson"
                className="list-group-item p-3 ps-1 left-green"
              >
                <BsGripVertical className="me-2 fs-3" />
                Learn what is Web Development
                <LessonControlButtons />
              </li>
              <li
                id="wd-lesson"
                className="list-group-item p-3 ps-1 left-green"
              >
                <BsGripVertical className="me-2 fs-3" />
                LESSON 1
                <LessonControlButtons />
              </li>
              <li
                id="wd-lesson"
                className="list-group-item p-3 ps-1 left-green"
              >
                <BsGripVertical className="me-2 fs-3" />
                LESSON 2
                <LessonControlButtons />
              </li>
            </ul>
          </li>
          <li
            id="wd-module"
            className="list-group-item p-0 mb-5 fs-5 border-gray"
          >
            <div id="wd-title" className="p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              Week 2
              <ModuleControlButtons />
            </div>
            <ul className="wd-lessons list-group rounded-0">
              <li
                id="wd-lesson"
                className="list-group-item p-3 ps-1 left-green"
              >
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
                <LessonControlButtons />
              </li>
              <li
                id="wd-lesson"
                className="list-group-item p-3 ps-1 left-green"
              >
                <BsGripVertical className="me-2 fs-3" />
                LESSON 1
                <LessonControlButtons />
              </li>
              <li
                id="wd-lesson"
                className="list-group-item p-3 ps-1 left-green"
              >
                <BsGripVertical className="me-2 fs-3" />
                LESSON 2
                <LessonControlButtons />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
