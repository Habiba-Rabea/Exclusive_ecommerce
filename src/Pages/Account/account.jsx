import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "/src/Components/Common/Breadcrumb.jsx";
import SideBar from "./Account_components/SideBar_acc/SideBar.jsx";
import MyProfile from "./Account_components/MyProfile/MyProfile.jsx";
import { useAuth } from "../../Context/AuthContext"; 
import './Account.css';
export default function Account() {
    const [activeTab, setActiveTab] =useState("profile");

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };
    
    const displayName =
  currentUser?.firstName ||
  currentUser?.first_name ||
  (currentUser?.name ? currentUser.name.split(" ")[0] : "") ||
  "User";
  
    return (
        <div className="containerAc">
            <div className="Breadcrumbs-welcome">
                <Breadcrumb items={[
                    { name: "Home", link: "/" },
                    { name: "Account", link: null }]} />
    
                <span className="welcome-txt">
                    Welcome ! <span className="my-name">{displayName}</span>
                </span>
            </div>
            <main className="acc-container">
                <SideBar activeTab={activeTab} setActiveTab={setActiveTab}
                onLogout={handleLogout}/>
                <div className="acc-content">
                    {activeTab === "profile" && <MyProfile/>}
                </div>
            </main>
        </div>
        
    );
}
