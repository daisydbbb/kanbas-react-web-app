import { useParams, useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import React, { useState } from "react";
import * as client from "./client";

export default function Editor() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const assignment_id = pathname.split("/")[5];
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createAssignment = async (assignment: any) => {
    const newAssignment = await client.createAssignment(
      cid as string,
      assignment
    );
    dispatch(addAssignment(newAssignment));
  };
  const saveAssignment = async (assignment: any) => {
    const status = await client.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  let currentAssignment = assignments.filter(
    (assignment: any) =>
      assignment.course === cid && assignment._id === assignment_id
  )[0];
  let isNew = false;
  if (currentAssignment === undefined) {
    isNew = true;
    currentAssignment = {
      _id: assignment_id,
      title: "New Assignment",
      course: cid,
      due: "",
      available_from: "",
      available_to: "",
      points: "100",
      description: "New Assignment Description",
    };
  }

  const [form, setForm] = useState(currentAssignment);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    alert("New edits have been saved!");
    if (isNew) {
      createAssignment(form);
    }
    saveAssignment(form);
    navigate(-1);
  };

  return (
    <div id="wd-assignments-editor" className="form-group">
      <div>
        <div id="wd-assignment-name">
          <label htmlFor="wd-name">
            <b>Assignment Name</b>
          </label>
          <br />
          <input
            id="wd-name"
            className="form-control"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <br />

        <textarea
          id="wd-description"
          className="form-control"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ height: "100px" }}
        />
        <br />

        <div id="assignment-points" className="row">
          <label
            htmlFor="wd-points"
            className="col-sm-4 d-flex align-items-center justify-content-end"
          >
            Points
          </label>
          <div className="col-sm-8">
            <input
              id="wd-points"
              className="form-control"
              value={form.points}
              onChange={(e) => setForm({ ...form, points: e.target.value })}
            />
          </div>
        </div>
        <br />

        <div id="assignment-assign" className="row">
          <label className="col-sm-4 d-flex align-items-top justify-content-end">
            Assign
          </label>
          <div className="col-sm-8">
            <div className="form-control">
              <b>Due</b>
              <input
                className="form-control"
                type="datetime-local"
                id="wd-due-date"
                value={form.due}
                onChange={(e) => setForm({ ...form, due: e.target.value })}
              />
              <br />
              <div id="availabe-time-container">
                <div className="row">
                  <div className="col">
                    <b>Available from </b>
                    <br />
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="wd-available-from"
                      value={form.available_from}
                      onChange={(e) =>
                        setForm({ ...form, available_from: e.target.value })
                      }
                    />
                  </div>
                  <div className="col">
                    <b>Until </b>
                    <br />
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="wd-available-until"
                      value={
                        form.available_to > form.available_from
                          ? form.available_to
                          : ""
                      }
                      onChange={(e) =>
                        setForm({ ...form, available_to: e.target.value })
                      }
                    />
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>

        <hr />
      </div>
      <div className="button-container">
        <button
          id="button-right-align"
          className="btn btn-lg btn-secondary me-1 float-end"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          id="button-right-align"
          className="btn btn-lg btn-danger me-1 float-end"
          type="submit"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
