import {
  AccountBoxSharp,
  BusinessSharp,
  DashboardSharp,
} from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";

import NotFoundPage from "../shared/pages/NotFoundPage";
import BusinessPage from "../views/businessView/pages/BusinessPage";
import DashboardPage from "../views/dashboardView/pages/DashboardPage";
import BusinessEditor from "../views/profileView/pages/BusinessEditor";
import ProfilePage from "../views/profileView/pages/ProfilePage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BusinessPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route
        path="/profile/businesses/new"
        element={<BusinessEditor isCreator={true} />}
      />
      <Route
        path="/profile/businesses/:businessId/edit"
        element={<BusinessEditor isCreator={false} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AdminRoutes;

export const adminRoutes = [
  {
    title: "Business",
    icon: <BusinessSharp />,
    path: "/",
  },
  {
    title: "Dashboard",
    icon: <DashboardSharp />,
    path: "/dashboard",
  },
  {
    title: "Profile",
    icon: <AccountBoxSharp />,
    path: "/profile",
  },
];
