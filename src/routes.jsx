import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import { getItem } from "./utils/storage";

function ProtectedRoutes({ redirectTo }) {
  const token = getItem("token");

  return token ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
      </Route>

      <Route element={<ProtectedRoutes redirectTo="/signin" />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
