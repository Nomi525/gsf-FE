// import { createBrowserHistory } from "history";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ChangePassword from "../container/auth/admin/changePassword/ChangePassword";
import ForgotPassword from "../container/auth/admin/forgotPassword/ForgotPassword";
import Login from "../container/auth/admin/login/Login";
import OtpVerification from "../container/auth/admin/otpVerification/OtpVerification";
import ResetPassword from "../container/auth/admin/resetPassword/ResetPassword";
import AdminProfile from "../container/pages/admin/adminProfile/AdminProfile";
import Dashboard from "../container/pages/admin/dashboard/Dashboard";
import Home from "../container/pages/admin/Home/Home";
import PrivacyPolicy from "../container/pages/admin/privcyPolicy/PrivacyPolicy";
import TermsCondition from "../container/pages/admin/termsCondition/TermsCondition";
import ControlForm from "../container/pages/admin/controlForm/ControlForm";
import UserList from "../container/pages/admin/user/UserList";
import UsePrivateRoutes from "./UsePrivateRoutes";
import GSFPageNotFound from "../component/common/GSFPageNotFound";
import EquipmentList from "../container/pages/admin/equipment/Equipment";
import GSFLoader from "../component/common/GSFLoader";

// const history = createBrowserHistory();

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<GSFPageNotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="otpverification" element={<OtpVerification />} />
        <Route path="/loader" element={<GSFLoader />} />

        <Route element={<UsePrivateRoutes />}>
          <Route path="/admin" element={<Dashboard />}>
            <Route path="dashboard" element={<Home />} />
            <Route path="changepassword" element={<ChangePassword />} />
            <Route path="profile" element={<AdminProfile />} />

            <Route path="user-list" element={<UserList />} />
            <Route path="control-from-details" element={<ControlForm />} />
            <Route path="equipment-details" element={<EquipmentList />} />

            <Route path="terms-condition" element={<TermsCondition />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default AppRoutes;
