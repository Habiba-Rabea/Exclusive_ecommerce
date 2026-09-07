import { Link } from "react-router-dom";
import "./Sidebar.css";

const accountLinks = [
  { key: "profile", label: "My Profile" },
  { key: "address", label: "Address Book" },
  { key: "payment", label: "My Payment Options" },
];
const orderLinks = ["My Returns", "My Cancellations"];
    
export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="sidebar">
        {/**mobile */}
      <select className="sidebar-select" value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
        {accountLinks.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
        ))}
      </select>
        {/**account */}
        <h3 className="sidebar-title">Manage My Account</h3>
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
        <h3 className="sidebar-title">My Orders</h3>
        <ul>
            {orderLinks.map((label) => (
            <li key={label}>
               <span className="static-Link">{label}</span>
            </li>
            ))}
        </ul>
        {/**wishlist */}
      <h3 className="sidebar-title">
        <Link to="/wishlist" className="wishlist-link">
          My WishList
        </Link>
      </h3>
    </aside>
  );
}

