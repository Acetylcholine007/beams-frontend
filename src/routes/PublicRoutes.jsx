import { AppRegistration, Dashboard, Login } from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";

import NotFoundPage from "../shared/pages/NotFoundPage";
import HomePage from "../views/dashboardView/pages/HomePage";
import NodeDetailsPage from "../views/dashboardView/pages/NodeDetailsPage";
import StructurePage from "../views/dashboardView/pages/StructurePage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/structures/:structureId" element={<StructurePage />} />
      <Route
        path="/structures/:structureId/nodes/:nodeId"
        element={<NodeDetailsPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PublicRoutes;

export const publicRoutes = [
  {
    title: "Dashboard",
    icon: <Dashboard />,
    path: "/",
  },
];

export const publicRouteAuth = [
  {
    title: "Sign In",
    icon: <Login />,
    path: "/",
  },
  {
    title: "Register",
    icon: <AppRegistration />,
    path: "/",
  },
];
