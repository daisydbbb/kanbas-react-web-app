import { BsBoxArrowInLeft } from "react-icons/bs";
import { BsBoxArrowRight } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";

export default function ImportExportSettingIcons() {
  return (
    <div className="mb-3">
      <button className="btn btn-lg btn-secondary float-end me-2">
        <IoSettingsSharp className="me-1 fs-4" />
      </button>
      <button className="btn btn-lg btn-secondary float-end me-2">
        <BsBoxArrowInLeft className="me-1 fs-4" /> Export
      </button>
      <button className="btn btn-lg btn-secondary float-end me-2">
        <BsBoxArrowRight className="me-1 fs-4" /> Import
      </button>
    </div>
  );
}
