import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="h-screen bg-gradient-to-r from-blue-900 to-red-600 dark:from-gray-800 dark:to-gray-900">
      <div className="md:w-9/12 lg:w-7/12  w-full mx-auto lg:py-14 lg:px-12 py-6 px-4">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
