import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
export default function ModuleControlButtons() {
  return (
    <div className="d-none d-sm-block float-end">
      <BsPlus style={{ fontSize: "1.8em" }} />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
