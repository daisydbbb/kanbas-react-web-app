import { useParams, useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { updateAssignment } from "./reducer";
import React, { useState } from "react";

export default function Editor() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const assignment_id = pathname.split("/")[5];
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentAssignment = assignments.filter(
    (assignment: any) =>
      assignment.course === cid && assignment._id === assignment_id
  )[0];

  const [form, setForm] = useState(currentAssignment);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    alert("New edits have been saved!");
    dispatch(updateAssignment(form));
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

        <input
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
                type="date"
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
                      type="date"
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
                      type="date"
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

{
  /* {assignments
                  .filter(
                    (assignment: any) =>
                      assignment.course === cid && assignment._id === assignment_id
                  )
                  .map((assignment: any) => (
                    <div>
                      <div id="wd-assignment-name">
                        <label htmlFor="wd-name">
                          <b>Assignment Name</b>
                        </label>
                        <br />
                        <input
                          id="wd-name"
                          className="form-control"
                          value={`${assignment.title}`}
                        />
                      </div>
                      <br />

                      <div id="wd-description" className="form-control">
                        The assignment is{" "}
                        <span style={{ color: "red" }}>available online</span> <br />
                        Submit a link to the landing page of your Web application running
                        on Netlify. <br />
                        The landing page should include the following: <br />
                        <ul>
                          <li> Your full name and section</li>
                          <li>Links to each of the lab assignments </li>
                          <li>Link to the Kanbas application </li>
                          <li>Links to all relevant source code repositories</li>
                        </ul>
                        The Kanbas application should include a link to navigate back to
                        the landing page.
                      </div>
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
                            value={`${assignment.points}`}
                          />
                        </div>
                      </div>
                      <br />

                      <div id="assignment-group" className="row">
                        <label
                          htmlFor="wd-group"
                          className="col-sm-4 d-flex align-items-center justify-content-end"
                        >
                          Assignment Group
                        </label>
                        <div className="col-sm-8 dropdown">
                          <select id="wd-group" className="form-control">
                            <option>ASSIGNMENTS</option>
                          </select>
                        </div>
                      </div>
                      <br />

                      <div id="assignment-display-grade" className="row">
                        <label
                          htmlFor="wd-display-grade-as"
                          className="col-sm-4 d-flex align-items-center justify-content-end"
                        >
                          Display Grade as
                        </label>
                        <div className="col-sm-8 dropdown">
                          <select id="wd-display-grade-as" className="form-control">
                            <option>Percentage</option>
                          </select>
                        </div>
                      </div>
                      <br />

                      <div id="assignment-submission-type" className="row">
                        <label className="col-sm-4 d-flex align-items-top justify-content-end">
                          Submission Type
                        </label>
                        <div className="col-sm-8 ">
                          <div className="card">
                            <div className="card-body dropdown">
                              <select className="form-control">
                                <option>Online</option>
                              </select>
                              <div className="card-padding">
                                <b>Online Entry Options </b>
                                <br />
                                <input
                                  type="checkbox"
                                  name="online-entry-options"
                                  id="wd-text-entry"
                                />
                                <label htmlFor="wd-text-entry">Text Entry</label>
                                <br />
                                <input
                                  type="checkbox"
                                  name="online-entry-options"
                                  id="wd-website-url"
                                />
                                <label htmlFor="wd-website-url">Website URL</label>
                                <br />
                                <input
                                  type="checkbox"
                                  name="online-entry-options"
                                  id="wd-media-recordings"
                                />
                                <label htmlFor="wd-media-recordings">
                                  Media Recordings
                                </label>
                                <br />
                                <input
                                  type="checkbox"
                                  name="online-entry-options"
                                  id="wd-student-annotation"
                                />
                                <label htmlFor="wd-student-annotation">
                                  Student Annotation
                                </label>
                                <br />
                                <input
                                  type="checkbox"
                                  name="online-entry-options"
                                  id="wd-file-upload"
                                />
                                <label htmlFor="wd-file-upload">File Uploads</label>
                                <br />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <br />

                      <div id="assignment-assign" className="row">
                        <label className="col-sm-4 d-flex align-items-top justify-content-end">
                          Assign
                        </label>
                        <div className="col-sm-8">
                          <div className="form-control">
                            <b>Assign to</b>
                            <input className="form-control" defaultValue="Everyone" />
                            <br />
                            <b>Due</b>
                            <input
                              className="form-control"
                              type="date"
                              id="wd-due-date"
                              defaultValue={`${assignment.due}`}
                            />
                            <br />
                            <div id="availabe-time-container">
                              <div className="row">
                                <div className="col">
                                  <b>Available from </b>
                                  <br />
                                  <input
                                    type="date"
                                    className="form-control"
                                    id="wd-available-from"
                                    defaultValue={`${assignment.available_from}`}
                                  />
                                </div>
                                <div className="col">
                                  <b>Until </b>
                                  <br />
                                  <input
                                    type="date"
                                    className="form-control"
                                    id="wd-available-until"
                                    defaultValue={`${assignment.available_to}`}
                                  />
                                </div>
                              </div>
                            </div>
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))} */
}
