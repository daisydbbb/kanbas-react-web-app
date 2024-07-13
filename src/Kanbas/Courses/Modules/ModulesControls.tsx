import { FaPlus } from "react-icons/fa6";
import { IoBan } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
export default function ModulesControls() {
  return (
    <div
      id="wd-modules-controls"
      className="d-flex flex-wrap-nowrap justify-content-end align-items-center"
      style={{ gap: "8px" }}
    >
      <button id="wd-collapse-all-btn" className="btn btn-lg btn-secondary">
        Collapse All
      </button>

      <button id="wd-view-progress-btn" className="btn btn-lg btn-secondary">
        View Progress
      </button>

      <div className="dropdown d-inline">
        <button
          id="wd-publish-all-btn"
          className="btn btn-lg btn-secondary dropdown-toggle "
          data-bs-toggle="dropdown"
        >
          <GreenCheckmark />
          Publish All
        </button>

        <ul className="dropdown-menu">
          <li>
            <a
              id="wd-publish-all-modules-and-items-btn"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Publish all modules and items
            </a>
          </li>

          <li>
            <a
              id="wd-publish-modules-only-button"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Publish modules only
            </a>
          </li>

          <li>
            <a
              id="wd-unpublish-all-modules-and-items"
              className="dropdown-item"
              href="#"
            >
              <IoBan className="me-1 fs-5" />
              Unpublish all modules and items
            </a>
          </li>

          <li>
            <a
              id="wd-unpublish-modules-only"
              className="dropdown-item"
              href="#"
            >
              <IoBan className="me-1 fs-5" />
              Unpublish modules only
            </a>
          </li>
        </ul>
      </div>

      <button id="wd-add-module-btn" className="btn btn-lg btn-danger">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </button>
    </div>
  );
}
