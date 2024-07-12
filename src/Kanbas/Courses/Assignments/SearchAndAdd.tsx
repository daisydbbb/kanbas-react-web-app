import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import "./style.css";

export default function SearchAndAdd() {
  return (
    <div>
      <div className="search-bar wd-grid-col-third-page d-inline-flex p-2 with-border">
        <CiSearch className="me-1 fs-3" />
        <input
          id="wd-search-assignment"
          type="text"
          placeholder="Search..."
          className="form-control no-border d-inline-block w-75 me-2"
        />
      </div>

      <button
        id="wd-add-assignment"
        className="btn btn-lg btn-danger float-end me-4"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </button>
      <button
        id="wd-add-assignmen-group"
        className="btn btn-lg btn-secondary me-1 float-end"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </button>
    </div>
  );
}
