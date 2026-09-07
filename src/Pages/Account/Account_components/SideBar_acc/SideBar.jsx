import { Link } from "react-router-dom";
import "./SideBar.css";

const accountLinks = [
  { key: "profile", label: "My Profile" },
  { key: "address", label: "Address Book" },
  { key: "payment", label: "My Payment Options" },
];
const orderLinks = ["My Returns", "My Cancellations"];
    
export default function SideBar({ activeTab, setActiveTab }) {
  return (
    <aside className="SideBar">
        {/**mobile */}
      <select className="SideBar-select" value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
        {accountLinks.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
        ))}
      </select>
        {/**account */}
        <h3 className="SideBar-title">Manage My Account</h3>
        <ul>
        {accountLinks.map((item) => (
            <li key={item.key}>
            <button
                className={activeTab === item.key ? "active" : ""}
                onClick={() => setActiveTab(item.key)}
            >
                {item.label}
            </button>
            </li>
        ))}
        </ul>
        {/**orders */}
        <h3 className="SideBar-title">My Orders</h3>
        <ul>
            {orderLinks.map((label) => (
            <li key={label}>
               <span className="static-Link">{label}</span>
            </li>
            ))}
        </ul>
        {/**wishlist */}
      <h3 className="SideBar-title">
        <Link to="/wishlist" className="wishlist-link">
          My WishList
        </Link>
      </h3>
    </aside>
  );
}

