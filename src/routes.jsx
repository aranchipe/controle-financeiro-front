import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
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
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>

      <Route element={<ProtectedRoutes redirectTo="/signin" />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
