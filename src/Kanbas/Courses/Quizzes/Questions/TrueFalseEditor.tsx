import { useNavigate } from "react-router";

export default function TrueFalseEditor() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };
  return (
    <div>
      This is the Editor for TrueFalseEditor
      <hr />
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
          // onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
