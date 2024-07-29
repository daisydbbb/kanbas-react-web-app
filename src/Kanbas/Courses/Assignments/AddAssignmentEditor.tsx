export default function AddAssignmentEditor({
  dialogTitle,
  assignmentName,
  setAssignmentName,
  assignmentDescription,
  setAssignmentDescription,
  addAssignment,
}: {
  dialogTitle: string;
  assignmentName: string;
  setAssignmentName: (name: string) => void;
  assignmentDescription: string;
  setAssignmentDescription: (description: string) => void;
  addAssignment: () => void;
}) {
  return (
    <div
      id="wd-add-assign-dialog"
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <input
              className="form-control"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
            />
            <br />
            <textarea
              className="form-control"
              value={assignmentDescription}
              onChange={(e) => setAssignmentDescription(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              onClick={addAssignment}
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-danger"
            >
              Add Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
