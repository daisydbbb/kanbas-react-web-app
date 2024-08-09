import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";

export default function SearchAndAdd({ cid }: { cid: string | undefined }) {
  const navigate = useNavigate();
  const handleAdd = () => {
    const _id = "new_id";
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${_id}/Edit`);
  };
  return (
    <div>
      <div className="search-bar wd-grid-col-third-page d-inline-flex p-1 with-border">
        <CiSearch className="me-1 fs-3" />
        <input
          id="wd-search-assignment"
          type="text"
          placeholder="Search for Quiz"
          className="form-control no-border d-inline-block w-75 me-2"
        />
      </div>
      <div className="float-end">
        <button
          id="wd-add-assignment"
          className="btn btn-lg btn-danger me-1"
          onClick={handleAdd}
          style={{ borderRadius: "5px" }}
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Quiz
        </button>
        <button
          className="btn btn-lg btn-secondary me-1"
          style={{ borderRadius: "5px" }}
        >
          <IoEllipsisVertical className="fs-4 position-relative" />
        </button>
      </div>
      <br />
      <br />
      <hr />
    </div>
  );
}
