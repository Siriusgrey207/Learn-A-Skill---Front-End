import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./organisms/Home";
import TeachASkill from "./organisms/TeachASkill";
import Promote from "./organisms/Promote";
import Account from "./organisms/Account";
import Donate from "./organisms/Donate";
import About from "./organisms/About";
import LoginAndSignup from "./organisms/LoginAndSignup";
import VerifyEmail from "./organisms/VerifyEmail";
import Whiteboard from "./organisms/Whiteboard";
import ResetPassword from "./organisms/ResetPassword";

const App: React.FC = () => {
  window.EXCALIDRAW_ASSET_PATH = "/src/assets/excalidraw-assets/";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachASkill" element={<TeachASkill />} />
        <Route path="/promote" element={<Promote />} />
        <Route path="/account/:userId" element={<Account />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/about" element={<About />} />

        {/* Authentication */}
        <Route path="/login" element={<LoginAndSignup />} />
        <Route path="/user/verify-email" element={<VerifyEmail />} />
        <Route path="/user/reset-password" element={<ResetPassword />} />

        {/* Whiteboard */}
        <Route path="/whiteboard" element={<Whiteboard />} />
      </Routes>
    </Router>
  );
};

export default App;
