import { useEffect, useContext } from "react";
import { GroupsContext } from "../../contexts/GroupsContext";
import "react-circular-progressbar/dist/styles.css";
import GroupListItem from "./GroupListItem";

function GroupsList() {
  const { groups, fetchAllGroups } = useContext(GroupsContext);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllGroups();
    };

    fetchData();
  }, []);

  const renderedGroups = groups.map((todoGroup) => {
    return <GroupListItem todoGroup={todoGroup} key={todoGroup.id} />;
  });

  return (
    <div className="h-min-[40vh] bg-white rounded overflow-hidden">
      {renderedGroups && renderedGroups}
    </div>
  );
}

export default GroupsList;
