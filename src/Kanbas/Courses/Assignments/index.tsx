import SearchAndAdd from "./SearchAndAdd";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import AssignmentControlButton from "./AssignmentControlButton";
import { MdExpandMore } from "react-icons/md";
import Weighing from "./Weighing";
import AssignmentLeftIcons from "./AssignmentLeftIcons";
import { useParams } from "react-router";
import { updateAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getUTCDate();
  const month = monthNames[date.getUTCMonth()];
  const formattedDate = `${month} ${day}`;
  return formattedDate;
};

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();

  return (
    <div id="wd-assignments" className="row">
      <div id="wd-search-assignment" className="col-12 mb-4 ">
        <SearchAndAdd cid={cid} />
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
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li className="wd-assignment-list-item list-group-item p-3 ps-1 left-green">
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
                            {!assignment.editing && assignment.title}
                            {assignment.editing && (
                              <input
                                className="form-control w-50 d-inline-block"
                                onChange={(e) =>
                                  dispatch(
                                    updateAssignment({
                                      ...assignment,
                                      title: e.target.value,
                                    })
                                  )
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    dispatch(
                                      updateAssignment({
                                        ...assignment,
                                        editing: false,
                                      })
                                    );
                                  }
                                }}
                                value={assignment.title}
                              />
                            )}
                          </div>
                          <div>
                            <span style={{ color: "red" }}>
                              Multiple Modules{" "}
                            </span>
                            | <b>Not available until</b>{" "}
                            {assignment.available_from &&
                              formatDate(assignment.available_from)}{" "}
                            at 12:00 am |
                          </div>
                          <div>
                            <b>Due</b>{" "}
                            {assignment.due && formatDate(assignment.due)} at
                            11:59pm | {assignment.points} pts
                          </div>
                        </ul>
                      </div>
                      <div
                        id="assignment_status"
                        className="col-auto assignment_status_pos"
                      >
                        <AssignmentControlButton
                          assignmentId={assignment._id}
                          cid={cid}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </div>
    </div>
  );
}
