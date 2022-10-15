import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Unauthorized from "./pages/Unauthorized";
import AdminPage from "./pages/AdminPage";
import RequiredUser from "./helpers/RequiredUser";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<RequiredUser allowedRoles={["admin", "user"]} />}>
            <Route index element={<Homepage />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route element={<RequiredUser allowedRoles={["admin"]} />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>

          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
