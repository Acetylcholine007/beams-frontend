import { Dashboard, Logout } from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";

import NotFoundPage from "../shared/pages/NotFoundPage";
import HomePage from "../views/dashboardView/pages/HomePage";
import NodeDetailsPage from "../views/dashboardView/pages/NodeDetailsPage";
import NodesPage from "../views/dashboardView/pages/NodesPage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/structures/:structureId" element={<NodesPage />} />
      <Route
        path="/structures/:structureId/nodes/:nodeId"
        element={<NodeDetailsPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AdminRoutes;

export const adminRoutes = [
  {
    title: "Dashboard",
    icon: <Dashboard />,
    path: "/",
  },
];

export const adminRouteAuth = [
  {
    title: "Sign Out",
    icon: <Logout />,
    path: "/",
  },
];
