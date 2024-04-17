import { useEffect, useContext } from "react";
import { GroupsContext } from "../../contexts/GroupsContext";
import "react-circular-progressbar/dist/styles.css";
import GroupListItem from "./GroupListItem";
import { AuthContext } from "../../contexts/AuthContext";

function GroupsList() {
  const { groups, fetchAllGroups } = useContext(GroupsContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllGroups(user.id);
      console.log("data from groups", data);
      console.log(user);
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const renderedGroups = groups.map((todoGroup) => {
    return <GroupListItem todoGroup={todoGroup} key={todoGroup.id} />;
  });

  return <div className="h-min-[40vh] bg-white rounded overflow-hidden">{renderedGroups}</div>;
}

export default GroupsList;
