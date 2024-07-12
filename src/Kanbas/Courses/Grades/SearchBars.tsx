import { CiSearch } from "react-icons/ci";
import { LuFilter } from "react-icons/lu";
export default function SearchBars() {
  return (
    <div>
      <div className="row">
        <div className="col">
          <b>Student Names</b>
          <br />
          <div className="search-bar d-inline-flex p-2 with-border w-100 mt-2">
            <CiSearch className="me-1 fs-3" />
            <input
              id="wd-search-assignment"
              type="text"
              placeholder="Search Students"
              className="form-control no-border d-inline-block me-2"
            />
          </div>
        </div>
        <div className="col">
          <b>Assignment Names</b>
          <br />
          <div className="search-bar d-inline-flex p-2 with-border w-100 mt-2">
            <CiSearch className="me-1 fs-3" />
            <input
              id="wd-search-assignment"
              type="text"
              placeholder="Search Assignments"
              className="form-control no-border d-inline-block me-2"
            />
          </div>
        </div>
      </div>
      <div>
        <button className="btn btn-lg btn-secondary me-2 mt-3">
          <span>
            <LuFilter className="me-1 fs-4" />
          </span>{" "}
          Apply Filters
        </button>
      </div>
    </div>
  );
}
