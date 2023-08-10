import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard2 from "./pages/Dashboard2";
import Dashboard from "./pages/Dashboard";
import { getItem } from "./utils/storage";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import useLoading from "./hooks/useLoading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProtectedRoutes({ redirectTo }) {
  const token = getItem("token");

  return token ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MainRoutes() {
  const { openLoading } = useLoading();

  return (
    <>
      <ToastContainer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoading}
      >
        <CircularProgress sx={{ color: "var(--cor-primaria)" }} />
      </Backdrop>

      <Routes>
        <Route path="/">
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoutes redirectTo="/" />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default MainRoutes;
