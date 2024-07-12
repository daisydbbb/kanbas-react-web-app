import { RiNewspaperLine } from "react-icons/ri";
import { BsGripVertical } from "react-icons/bs";
export default function AssignmentLeftIcons() {
  return (
    <div className="d-flex align-items-center">
      <BsGripVertical className="me-2 fs-3" />
      <RiNewspaperLine style={{ color: "green" }} className="me-2 fs-3" />
    </div>
  );
}
