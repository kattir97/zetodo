import CreateGroupInput from "../comps/CreateGroupInput";
import GroupsList from "../comps/GroupsList";
import TodoGroupHeader from "../comps/TodoGroupHeader";

function GroupsListPage() {
  return (
    <>
      <TodoGroupHeader />
      <CreateGroupInput />
      <GroupsList />
    </>
  );
}

export default GroupsListPage;
