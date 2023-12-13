import { useContext } from "react";
import ReactDOM from "react-dom";
// import TodoGroupsContext from "../../contexts/TodoGroupsContext";
import { useNavigate } from "react-router-dom";
import { PiWarningCircleBold } from "react-icons/pi";
import { GroupsContext } from "../../contexts/GroupsContext";

function DeleteModal({ setShowModal, todoGroup }) {
  const { deleteGroup } = useContext(GroupsContext);
  const navigate = useNavigate();

  const handleRemoveGroup = async () => {
    await deleteGroup(todoGroup.id);
    setShowModal(false);
    navigate("/");
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return ReactDOM.createPortal(
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-80 z-10"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-container bg-white rounded shadow-lg p-4 text-center mx-6">
          <div className="flex">
            <PiWarningCircleBold className="text-3xl text-red-800 mr-5" />
            <div className="flex flex-col items-start">
              <h2 className="font-bold text-lg">Delete Group</h2>
              <p>
                Are you sure you want to delete <span className="font-bold">{todoGroup.name}</span>{" "}
                group?
              </p>
              <div className="mt-4 flex items-end justify-end w-full">
                <button
                  onClick={handleRemoveGroup}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}
export default DeleteModal;
