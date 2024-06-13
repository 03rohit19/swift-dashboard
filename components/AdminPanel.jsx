import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import DashBoard from "./components/DashBoard";
import DashBoard from "./DashBoard";
import ProfileScreen from "./ProfileScreen";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <DashBoard />,
  },
  {
    path: "/profile",
    element: <ProfileScreen />,
  },
]);
const AdminPanel = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default AdminPanel;
