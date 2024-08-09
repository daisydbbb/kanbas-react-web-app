import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { MdUpload } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as client from "./client";
import { deleteQuiz, updateQuiz } from "./reducer";

export default function QuizControlButton({ quiz }: { quiz: any }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [localQuiz, setLocalQuiz] = useState(quiz);

  const removeQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const handleDelete = () => {
    const userConfirmed: boolean = window.confirm(
      "Are you sure you want to delete the quiz?"
    );
    if (userConfirmed) {
      removeQuiz(quiz._id);
    }
  };

  const publishQuiz = async () => {
    const updatedQuiz = { ...localQuiz, published: !localQuiz.published };
    const response = await client.updateQuiz(updatedQuiz);
    if (response) {
      setLocalQuiz(updatedQuiz);
      dispatch(updateQuiz(updatedQuiz));
    }
  };

  return (
    <div className="d-none d-sm-block ">
      {quiz.published ? (
        <GreenCheckmark />
      ) : (
        <FaBan className="text-danger me-2" />
      )}
      <div className="dropdown d-inline">
        <IoEllipsisVertical
          className="fs-4 dropdown-toggle "
          data-bs-toggle="dropdown"
        />
        <ul className="dropdown-menu">
          <li
            className="dropdown-item"
            onClick={() =>
              navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`)
            }
          >
            <FaRegEdit className="text-secondary me-2 mb-1" />
            Edit
          </li>
          <li className="dropdown-item" onClick={handleDelete}>
            <FaTrash className="text-secondary me-2 mb-1" />
            Delete
          </li>
          <li className="dropdown-item">
            {quiz.published ? (
              <div onClick={publishQuiz}>
                <IoMdDownload className="text-secondary me-2 mb-1" />
                Unpublish
              </div>
            ) : (
              <div onClick={publishQuiz}>
                <MdUpload className="text-secondary me-2 mb-1" />
                Publish
              </div>
            )}
          </li>
          <li className="dropdown-item">
            <FaCopy className="text-secondary me-2 mb-1" />
            Copy (optional)
          </li>
          <li className="dropdown-item">
            <FaSortAmountDown className="text-secondary me-2 mb-1" />
            Sort (optional)
          </li>
        </ul>
      </div>
    </div>
  );
}
