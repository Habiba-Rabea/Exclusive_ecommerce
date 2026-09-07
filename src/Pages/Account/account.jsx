import {useState} from "react";
import Breadcrumb from "/src/Components/Common/Breadcrumb.jsx";
import {mockUser} from "/src/data/MockData.js";
import SideBar from "./Account_components/SideBar_acc/SideBar.jsx";
import MyProfile from "./Account_components/MyProfile/MyProfile.jsx";
import './Account.css';
import AddressBook from "./Account_components/AddressBook/Addresses.jsx";
import PaymentOptions from "./Account_components/MyPaymentOptions/MyPayments.jsx";


export default function Account() {
    const [activeTab, setActiveTab] =useState("profile");
    function renderContenet (){
        switch(activeTab){
            case "profile":
                return <div>profile</div>
            case "address":
                return <div>address</div>
            case "payment":
                return <div>payment</div>
            default:
                return <div>profile</div>
        }
    }
    return (
        <div className="containerAc">
            <div className="Breadcrumbs-welcome">
                <Breadcrumb items={[
                    { name: "Home", link: "/Home" },
                    { name: "Account", link: "null" }]} />
    
                <p className="welcome-txt">
                    Welcome ! <span className="my-name">{mockUser.firstName}</span>
                </p>
            </div>
            <main className="acc-container">
                <SideBar activeTab={activeTab} setActiveTab={setActiveTab}/>
                <div className="acc-content">
                    {activeTab === "profile" && <MyProfile/>}
                    {activeTab === "address" && <AddressBook/>}
                    {activeTab === "payment" && <PaymentOptions/>}
                </div>
            </main>
        </div>
        
    );
}