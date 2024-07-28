import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import "./style.css";
import AddAssignmentEditor from "./AddAssignmentEditor";

export default function SearchAndAdd({
  assignmentName,
  setAssignmentName,
  addAssignment,
}: {
  assignmentName: string;
  setAssignmentName: (name: string) => void;
  addAssignment: () => void;
}) {
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
        data-bs-toggle="modal"
        data-bs-target="#wd-add-assign-dialog"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </button>
      <AddAssignmentEditor
        dialogTitle="Add Assignment"
        assignmentName={assignmentName}
        setAssignmentName={setAssignmentName}
        addAssignment={addAssignment}
      />

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
