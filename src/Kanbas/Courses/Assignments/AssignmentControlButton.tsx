import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { renameAssignment } from "./reducer";

export default function AssignmentControlButton({
  assignment,
  cid,
  deleteAssignment,
}: {
  assignment: any;
  cid: string | undefined;
  deleteAssignment: (assignmentId: string) => void;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    const userConfirmed: boolean = window.confirm(
      "Are you sure you want to delete the assignment?"
    );
    if (userConfirmed) {
      deleteAssignment(assignment._id);
    }
  };

  return (
    <div className="d-none d-sm-block ">
      {/* ---- Remove later ----*/}
      <FaPencil
        className="text-primary me-2 mb-1"
        onClick={() => {
          dispatch(renameAssignment(assignment._id));
        }}
      />
      <FaRegEdit
        className="text-warning me-2 mb-1"
        onClick={() =>
          navigate(`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`)
        }
      />
      <FaTrash className="text-danger me-2 mb-1" onClick={handleDelete} />
      {/* ---- -Remove later ---- */}

      <GreenCheckmark />
      <div className="dropdown d-inline">
        <IoEllipsisVertical
          className="fs-4 dropdown-toggle "
          data-bs-toggle="dropdown"
        />
        <ul className="dropdown-menu">
          <li
            className="dropdown-item"
            onClick={() => {
              dispatch(renameAssignment(assignment._id));
            }}
          >
            <FaPencil className="text-primary me-2 mb-1" />
            Rename
          </li>

          <li
            className="dropdown-item"
            onClick={() =>
              navigate(`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`)
            }
          >
            <FaRegEdit className="text-warning me-2 mb-1" />
            Edit
          </li>

          <li className="dropdown-item" onClick={handleDelete}>
            <FaTrash className="text-danger me-2 mb-1" />
            Delete
          </li>
        </ul>
      </div>
    </div>
  );
}
