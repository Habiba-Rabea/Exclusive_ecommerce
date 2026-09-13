import { Link } from "react-router-dom";
import "./SideBar.css";
const accountLinks = [
  { key: "profile", label: "My Profile" },
  { key: "address", label: "Address Book" },
  { key: "payment", label: "My Payment Options" },
];
const orderLinks = ["My Returns", "My Cancellations"];
export default function SideBar({ activeTab, setActiveTab, onLogout }) {
  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "logout") {
      if (onLogout) onLogout();
    } else {
      setActiveTab(value);
    }
  };

  return (
    <aside className="SideBar">
      <select 
        className="SideBar-select" 
        value={activeTab} 
        onChange={handleSelectChange}
      >
        {accountLinks.map((item) => (
          <option key={item.key} value={item.key}>
            {item.label}
          </option>
        ))}
        <option value="logout">Log Out</option>
      </select>
      <h3 className="SideBar-title">Manage My Account</h3>
      <ul>
        {accountLinks.map((item) => (
          <li key={item.key}>
            <button
              type="button"
              className={activeTab === item.key ? "active" : ""}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <h3 className="SideBar-title">My Orders</h3>
      <ul>
        {orderLinks.map((label) => (
          <li key={label}>
            <span className="static-Link">{label}</span>
          </li>
        ))}
      </ul>
      <h3 className="SideBar-title">
        <Link to="/wishlist" className="wishlist-link">
          My WishList
        </Link>
      </h3>
      <h3 className="SideBar-title mt-4">
        <button 
          type="button"
          onClick={() => {
            if (onLogout) onLogout();
          }} 
          className="logout-btn border-0 bg-transparent p-0 text-danger fw-medium"
          style={{ color: '#DB4444', cursor: 'pointer' }}
        >
          Log Out
        </button>
      </h3>
    </aside>
  );
}