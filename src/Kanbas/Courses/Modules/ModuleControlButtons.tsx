import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";
export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus style={{ fontSize: "1.8em" }} />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
