import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "/src/Components/Common/Breadcrumb.jsx";
import SideBar from "./Account_components/SideBar_acc/SideBar.jsx";
import MyProfile from "./Account_components/MyProfile/MyProfile.jsx";
import AddressBook from "./Account_components/AddressBook/Addresses.jsx";
import PaymentOptions from "./Account_components/MyPaymentOptions/MyPayments.jsx";
import { useAuth } from "../../Context/AuthContext"; 
import './Account.css';
export default function Account() {
    const [activeTab, setActiveTab] =useState("profile");

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };
    
    const displayName = currentUser?.firstName || "User";
    return (
        <div className="containerAc">
            <div className="Breadcrumbs-welcome">
                <Breadcrumb items={[
                    { name: "Home", link: "/" },
                    { name: "Account", link: "null" }]} />
    
                <p className="welcome-txt">
                    Welcome ! <span className="my-name">{displayName}</span>
                </p>
            </div>
            <main className="acc-container">
                <SideBar activeTab={activeTab} setActiveTab={setActiveTab}
                onLogout={handleLogout}/>
                <div className="acc-content">
                    {activeTab === "profile" && <MyProfile/>}
                    {activeTab === "address" && <AddressBook/>}
                    {activeTab === "payment" && <PaymentOptions/>}
                </div>
            </main>
        </div>
        
    );
}