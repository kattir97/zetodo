import { createContext, useState } from "react";
import zetodoApi from "../apis/zetodoApi";

export const GroupsContext = createContext();

export function GroupsProvider({ children }) {
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState("light");

  const fetchAllGroups = async (userId) => {
    const response = await zetodoApi.get("/", { params: { userId: userId } });
    setGroups(response.data.data.groups);
    return response;
  };

  const fetchGroup = async (id) => {
    const response = await zetodoApi.get(`/${id}`);
    return response.data.data.group;
  };

  const createGroup = async (newGroup) => {
    const response = await zetodoApi.post("/", newGroup);
    setGroups([...groups, response.data.data.group]);
  };

  const updateGroup = async (id, updatedGroup) => {
    const response = await zetodoApi.put(`/${id}`, updatedGroup, { params: { id: id } });
    const newGroup = response.data.data.group;

    const newList = groups.map((el) => {
      if (el.id === id) {
        return newGroup;
      } else {
        return el;
      }
    });

    setGroups(newList);
  };

  const deleteGroup = async (id) => {
    await zetodoApi.delete(`/${id}`, { params: { id: id } });
  };

  const data = {
    fetchAllGroups,
    fetchGroup,
    createGroup,
    updateGroup,
    deleteGroup,
    setGroups,
    groups,
    showModal,
    setShowModal,
    theme,
    setTheme,
  };

  return <GroupsContext.Provider value={data}>{children}</GroupsContext.Provider>;
}
