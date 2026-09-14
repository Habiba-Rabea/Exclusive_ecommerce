import React, { useState } from "react";
import SideBar from "./Account_components/SideBar_acc/SideBar";
import MyProfile from "./Account_components/MyProfile/MyProfile";
import { useAuth } from "/src/Context/AuthContext.jsx";
import "./Account.css";

export default function Account() {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  console.log("Current User Data:", currentUser);
  const userName =
    currentUser?.firstName ||
    currentUser?.first_name ||
    currentUser?.displayName ||
    (currentUser?.name ? currentUser.name.split(" ")[0] : null) ||
    (currentUser?.email ? currentUser.email.split("@")[0] : null) ||
    "User";

  return (
    <div className="account-wrapper">
      <div className="account-top-header">
        <div className="account-breadcrumb">
          <span>Home</span> / <span className="active-page">My Account</span>
        </div>
        <div className="account-welcome-text">
          Welcome! <span className="highlight-username">{userName}</span>
        </div>
      </div>

      <div className="account-main-grid">
        <aside className="account-sidebar-section">
          <SideBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={logout}
          />
        </aside>

        <main className="account-card-section">
          {activeTab === "profile" && <MyProfile />}
        </main>
      </div>
    </div>
  );
}