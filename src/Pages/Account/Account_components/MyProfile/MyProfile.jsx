import { useState, useEffect } from "react";
import { useAuth } from "/src/Context/AuthContext.jsx";
import "./MyProfile.css";

export default function MyProfile() {
  const { currentUser } = useAuth();

  const defaultAddress = currentUser?.addresses?.find((addr) => addr.isDefault);
  const addressDisplay = defaultAddress
    ? `${defaultAddress.city}, ${defaultAddress.zip}, ${defaultAddress.country}`
    : currentUser?.address || "Kingston, 5236, United States";

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (currentUser) {
      let fName = currentUser.firstName || "";
      let lName = currentUser.lastName || "";

      if (!fName && currentUser.name) {
        const parts = currentUser.name.trim().split(" ");
        fName = parts[0] || "";
        lName = parts.slice(1).join(" ") || "";
      }

      setProfileData({
        firstName: fName,
        lastName: lName,
        email: currentUser.email || "",
        address: addressDisplay,
      });
    }
  }, [currentUser]);

  function handleProfileChange(e) {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  }

  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="profile-form-wrapper">
      <h3 className="form-title">Edit Your Profile</h3>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-row-two">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleProfileChange}
              placeholder="First Name"
              className="account-input"
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleProfileChange}
              placeholder="Last Name"
              className="account-input"
            />
          </div>
        </div>
        <div className="form-row-two">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              placeholder="example@gmail.com"
              className="account-input readonly-input"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleProfileChange}
              placeholder="Address"
              className="account-input readonly-input"
            />
          </div>
        </div>
        <div className="password-section">
          <label className="password-section-title">Password Changes</label>
          <div className="password-inputs">
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="account-input"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="account-input"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="account-input"
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="btn-cancel">Cancel</button>
          <button type="submit" className="btn-save">Save Changes</button>
        </div>
      </form>
    </div>
  );
}