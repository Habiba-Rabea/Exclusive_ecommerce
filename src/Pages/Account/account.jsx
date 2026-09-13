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
    const [activeTab, setActiveTab] = useState("profile");
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };
    const displayName = currentUser 
        ? (currentUser.firstName ? `${currentUser.firstName} ${currentUser.lastName || ''}`.trim() : currentUser.name || "User")
        : "User";
    return (
        <div className="containerAc">
            <div className="Breadcrumbs-welcome d-flex justify-content-between align-items-center">
                <Breadcrumb items={[
                    { name: "Home", link: "/" },
                    { name: "Account", link: null }
                ]} />
                <div className="d-flex align-items-center gap-3">
                    <p className="welcome-txt mb-0">
                        Welcome ! <span className="my-name" style={{ color: '#DB4444', fontWeight: '600' }}>
                            {displayName}
                        </span>
                    </p>
                </div>
            </div>
            <main className="acc-container">
                <SideBar 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    onLogout={handleLogout} 
                />
                <div className="acc-content">
                    {activeTab === "profile" && <MyProfile currentUser={currentUser} />}
                    {activeTab === "address" && <AddressBook />}
                    {activeTab === "payment" && <PaymentOptions />}
                </div>
            </main>
        </div>
    );
}