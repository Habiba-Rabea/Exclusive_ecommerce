import FormInput from "/src/Components/UI/Account_Input.jsx";
import { useState, useEffect } from "react";
import { User as UserIcon } from "lucide-react";
import { useAuth } from "/src/Context/AuthContext.jsx";
import {
  NAME_REGEX,
  NAME_ERROR_MESSAGE,
} from "/src/Utils/validation";
import "./MyProfile.css";

export default function EditProfileForm() {
  const { currentUser, updateProfile, refreshProfile } = useAuth();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  });

  const [profileError, setProfileError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!currentUser) return;
      try {
        setLoading(true);
        await refreshProfile();
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const fullName =
      currentUser.name ||
      [currentUser.firstName || currentUser.first_name, currentUser.lastName || currentUser.last_name]
        .filter(Boolean)
        .join(" ") ||
      "";

    const parts = fullName.trim().split(/\s+/);
    const firstName = currentUser.firstName || currentUser.first_name || parts[0] || "";
    const lastName =
      currentUser.lastName ||
      currentUser.last_name ||
      (parts.length > 1 ? parts.slice(1).join(" ") : "");

    setProfileData({
      firstName,
      lastName,
      email: currentUser.email || currentUser.username || "",
      image: currentUser.image || "",
    });
  }, [currentUser]);

  function handleProfileChange(e) {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    setProfileError("");
    setSuccessMsg("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setProfileError("");
    setSuccessMsg("");

    if (!NAME_REGEX.test(profileData.firstName)) {
      setProfileError("First name: " + NAME_ERROR_MESSAGE);
      return;
    }

    if (profileData.lastName && !NAME_REGEX.test(profileData.lastName)) {
      setProfileError("Last name: " + NAME_ERROR_MESSAGE);
      return;
    }

    if (profileData.image && profileData.image.length > 500) {
      setProfileError("Photo URL is too long (max 500 characters)");
      return;
    }

    try {
      setLoading(true);
      await updateProfile({
        firstName: profileData.firstName.trim(),
        lastName: profileData.lastName.trim(),
        image: profileData.image.trim() || null,
      });
      setSuccessMsg("Profile updated successfully");
    } catch (error) {
      setProfileError(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    if (!currentUser) return;

    const fullName =
      currentUser.name ||
      [currentUser.firstName || currentUser.first_name, currentUser.lastName || currentUser.last_name]
        .filter(Boolean)
        .join(" ") ||
      "";

    const parts = fullName.trim().split(/\s+/);
    const firstName = currentUser.firstName || currentUser.first_name || parts[0] || "";
    const lastName =
      currentUser.lastName ||
      currentUser.last_name ||
      (parts.length > 1 ? parts.slice(1).join(" ") : "");

    setProfileData({
      firstName,
      lastName,
      email: currentUser.email || currentUser.username || "",
      image: currentUser.image || "",
    });
    setProfileError("");
    setSuccessMsg("");
  }

  return (
    <main className="edit-profile">
      <h2 className="edit-profile-title">Edit Your Profile</h2>

      <form onSubmit={handleSubmit}>
        {profileError && <p className="error-message">{profileError}</p>}
        {successMsg && <p className="success-message">{successMsg}</p>}

        <div className="avatar-row">
          <div className="avatar-preview">
            {profileData.image ? (
              <img
                src={profileData.image}
                alt="Profile"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextSibling?.classList.remove("hidden");
                }}
              />
            ) : null}
            <div className={`avatar-fallback ${profileData.image ? "hidden" : ""}`}>
              <UserIcon size={36} />
            </div>
          </div>
          <div className="avatar-field">
            <FormInput
              label="Photo URL"
              name="image"
              value={profileData.image}
              onChange={handleProfileChange}
              placeholder="https://example.com/my-photo.jpg"
            />
            <p className="field-hint">Paste a link to an image you already have online</p>
          </div>
        </div>

        <div className="form-row">
          <FormInput
            label="First Name"
            name="firstName"
            value={profileData.firstName}
            onChange={handleProfileChange}
            placeholder="John"
            required
          />
          <FormInput
            label="Last Name"
            name="lastName"
            value={profileData.lastName}
            onChange={handleProfileChange}
            placeholder="Smith"
          />
        </div>

        <div className="form-row single">
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={profileData.email}
            readOnly
            disabled
            className="input-readonly"
          />
          <p className="field-hint">Email cannot be changed from here</p>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={handleCancel} disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </main>
  );
}
