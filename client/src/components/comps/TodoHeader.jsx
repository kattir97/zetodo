import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { GroupsContext } from "../../contexts/GroupsContext";
import { useNavigate, useParams } from "react-router-dom";

function TodoHeader() {
  const [group, setGroup] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [mode, setMode] = useState(false);
  const { fetchGroup, updateGroup, setShowModal } = useContext(GroupsContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchGroup(id);
      setGroup(result);
      setGroupName(result.name);
    };

    fetchData();
  }, []);

  const handleInpute = (e) => {
    setGroupName(e.target.value);
  };

  const handleMode = () => {
    setMode(!mode);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const updates = {
      name: groupName,
    };
    await updateGroup(id, updates);
    handleMode();
  };

  const handleDeleteGroup = async () => {
    setShowModal(true);
    // await deleteGroup(id);
    // navigate("/groups");
  };

  const viewModeJsx = (
    <>
      <h4 className="text-2xl md:text-3xl font-bold text-white mr-3">{groupName}</h4>
      <RiEdit2Fill
        className="text-2xl md:text-3xl text-white  cursor-pointer"
        onClick={handleMode}
      />
    </>
  );

  const editModeJsx = (
    <input
      value={groupName ?? ""}
      onChange={(e) => handleInpute(e)}
      className="p-2 border-none outline-none rounded"
    />
  );

  return (
    <div className="flex justify-between mb-8">
      <BiArrowBack
        className="text-3xl font-bold text-white cursor-pointer"
        onClick={() => navigate("/groups")}
      />
      <form className="flex items-center justify-center" onSubmit={(e) => handleSubmitForm(e)}>
        {mode ? editModeJsx : viewModeJsx}
      </form>
      <RiDeleteBin6Line
        className="text-3xl text-white cursor-pointer hover:text-red-300"
        onClick={() => handleDeleteGroup()}
      />
    </div>
  );
}

export default TodoHeader;
