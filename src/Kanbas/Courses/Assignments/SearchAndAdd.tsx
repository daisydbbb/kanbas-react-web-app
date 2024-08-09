import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function SearchAndAdd({ cid }: { cid: string | undefined }) {
  const navigate = useNavigate();
  const handleAdd = () => {
    const _id = "new_id";
    navigate(`/Kanbas/Courses/${cid}/Assignments/${_id}`);
  };

  return (
    <div>
      <div className="search-bar wd-grid-col-third-page d-inline-flex p-1 with-border">
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
        onClick={handleAdd}
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
