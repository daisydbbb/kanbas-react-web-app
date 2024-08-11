import SearchAndAdd from "./SearchAndAdd";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import AssignmentControlButton from "./AssignmentControlButton";
import { MdExpandMore } from "react-icons/md";
import Weighing from "./Weighing";
import AssignmentLeftIcons from "./AssignmentLeftIcons";
import { useParams } from "react-router";
import { deleteAssignment, setAssignments, updateAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import { useEffect } from "react";
import FacultyRoutes from "../../FacultyRoutes";

const getDate = (dateString: any) => {
  const date_string = dateString.split("T")[0];
  const date = new Date(date_string);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getUTCDate();
  const month = monthNames[date.getUTCMonth()];
  const formattedDate = `${month} ${day}`;
  return formattedDate;
};
const getTime = (dateString: any) => {
  const timeString = dateString.split("T")[1];
  // console.log("here", dateString, timeString);
  if (timeString > "11:59") {
    return timeString + "pm";
  } else {
    return timeString + " am";
  }
};

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const fetchAssignments = async () => {
    const modules = await client.fetchAssignments(cid as string);
    dispatch(setAssignments(modules));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  const removeAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  const saveAssignment = async (assignment: any) => {
    const status = await client.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

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
                                  saveAssignment({
                                    ...assignment,
                                    title: e.target.value,
                                  })
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    saveAssignment({
                                      ...assignment,
                                      editing: false,
                                    });
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
                              getDate(assignment.available_from)}{" "}
                            at {getTime(assignment.available_from)} |
                          </div>
                          <div>
                            <b>Due</b>{" "}
                            {assignment.due && getDate(assignment.due)} at{" "}
                            {getTime(assignment.available_from)} |{" "}
                            {assignment.points} pts
                          </div>
                        </ul>
                      </div>
                      {/* <FacultyRoutes> */}
                      <div
                        id="assignment_status"
                        className="col-auto assignment_status_pos"
                      >
                        <AssignmentControlButton
                          assignment={assignment}
                          cid={cid}
                          deleteAssignment={(assignmentId: any) => {
                            removeAssignment(assignmentId);
                          }}
                        />
                      </div>
                      {/* </FacultyRoutes> */}
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
