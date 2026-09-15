import FormInput from "/src/Components/UI/Account_Input.jsx";
import {useState,useEffect} from "react";
import { useAuth } from "/src/Context/AuthContext.jsx";
import { 
  PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE,
  NAME_REGEX, NAME_ERROR_MESSAGE,
  EMAIL_REGEX, EMAIL_ERROR_MESSAGE,
} from "/src/Utils/validation";
import "./MyProfile.css";

export default function EditProfileForm() {
  const {currentUser,updateUser,usersList}=useAuth();

  const defaultAddress = currentUser?.addresses?.find((addr) => addr.isDefault);
  const addressDisplay = defaultAddress
  ? `${defaultAddress.city}, ${defaultAddress.zip}, Egypt`
  : "No address added yet";

  const [profileData, setProfileData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
  });
  
  function handleProfileChange(e) {
    const{name,value}=e.target;
    setProfileData((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  }
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const[PasswordError, setPasswordError] = useState("");
  const[ProfileError, setProfileError] = useState("");

  function handlePasswordChange(e) {
    const{name,value}=e.target;
    setPasswordData((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
  e.preventDefault();

  if (!NAME_REGEX.test(profileData.firstName)) {
    setProfileError("First name: " + NAME_ERROR_MESSAGE);
    return;
  }

  if (profileData.lastName && !NAME_REGEX.test(profileData.lastName)) {
    setProfileError("Last name: " + NAME_ERROR_MESSAGE);
    return;
  }

  if(!EMAIL_REGEX.test(profileData.email)) {
    setProfileError("Email: " + EMAIL_ERROR_MESSAGE);
    return;
  }

  const isEmailTaken = usersList.some(
  (user) =>
    user.email.toLowerCase() === profileData.email.toLowerCase() &&
    user.email.toLowerCase() !== currentUser.email.toLowerCase()
  );

  if (isEmailTaken) {
    setProfileError("This email is already registered to another account");
    return;
  }

  setProfileError("")

  const wantsPasswordChange =
    passwordData.currentPassword || passwordData.newPassword ||passwordData.confirmPassword;

  if (wantsPasswordChange) {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError("Please fill in all password fields");
      return;
    }

    if (passwordData.currentPassword !== currentUser.password) {
      setPasswordError("Current password is incorrect");
      return;
    }

    if (!PASSWORD_REGEX.test(passwordData.newPassword)) {
      setPasswordError(PASSWORD_ERROR_MESSAGE);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New password and confirmation do not match");
      return;
    }

    setPasswordError("");
    updateUser({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      password: passwordData.newPassword,
      email:profileData.email,
    })
    alert("Password changed successfully");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  } else {
    setPasswordError("");
    updateUser({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email
    });
    alert("Changes saved successfully");
  }
}
  useEffect(() => {
    if(currentUser){
      setProfileData({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email
      },);
    }
  },[currentUser]);

  function handleCancel() {
  setProfileData({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
  });
  setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  setProfileError("");
  setPasswordError("");
}
  return (
    <main className="edit-profile">
      <h2 className="edit-profile-title">Edit Your Profile</h2>

      <form onSubmit={handleSubmit}>
        {ProfileError && <p className="error-message">{ProfileError}</p>}
        <div className="form-row">
          <FormInput
            label="First Name" 
            name="firstName"
            value={profileData.firstName} 
            onChange={handleProfileChange}
            placeholder="john"
          />
          <FormInput 
            label="Last Name" 
            name="lastName"
            value={profileData.lastName}
            onChange={handleProfileChange} 
            placeholder="smith"
          />
        </div>

        <div className="form-row">
          <FormInput 
            label="Email" 
            name="email"
            type="email"
            value={profileData.email}
            onChange={handleProfileChange} 
            placeholder="example@gmail.com"
          />
          <div className="info-display">
            <label>Default Address</label>
            <p>{addressDisplay || "No address added yet"}</p>
          </div>
        </div>

        <div className="form-row single">
          <label className="section-label">Password Changes</label>
          {PasswordError && <p className="error-message">{PasswordError}</p>}
        </div>

        <div className="form-row single">
          <FormInput 
          type="password" 
          name="currentPassword"
          placeholder="Current Password" 
          value={passwordData.currentPassword}
          onChange={handlePasswordChange}
          />
        </div>

        <div className="form-row single">
          <FormInput 
          type="password" 
          name="newPassword"
          placeholder="New Password" 
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
           />
        </div>

        <div className="form-row single">
          <FormInput 
          type="password" 
          name="confirmPassword"
          placeholder="Confirm New Password" 
          value={passwordData.confirmPassword}
          onChange={handlePasswordChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="btn-save">Save Changes</button>
        </div>
      </form>
    </main>
  );
}