import FormInput from "/src/Components/UI/Account_Input.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "/src/Context/AuthContext.jsx";
import { 
  PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE,
  NAME_REGEX, NAME_ERROR_MESSAGE,
  EMAIL_REGEX, EMAIL_ERROR_MESSAGE,
} from "/src/Utils/validation";
import "./MyProfile.css";

export default function EditProfileForm() {
  // مبقاش بنستورد getProfile/updateProfile من authservice خالص هنا -
  // refreshProfile و updateProfile دلوقتي جايين من الـ Context وهو اللي
  // متكفل بالتوكن صح.
  const { currentUser, updateUser, usersList = [], refreshProfile, updateProfile } = useAuth();

  const defaultAddress = currentUser?.addresses?.find((addr) => addr.isDefault);
  const addressDisplay = defaultAddress
    ? `${defaultAddress.city}, ${defaultAddress.zip}, Egypt`
    : "No address added yet";

  const [profileData, setProfileData] = useState({
    firstName: currentUser?.firstName || currentUser?.first_name || "",
    lastName: currentUser?.lastName || currentUser?.last_name || "",
    email: currentUser?.email || "",
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [PasswordError, setPasswordError] = useState("");
  const [ProfileError, setProfileError] = useState("");
  const [loading, setLoading] = useState(false);

  // بيجيب أحدث نسخة من البروفايل من السيرفر مرة واحدة لما الصفحة تفتح.
  // refreshProfile بتستخدم التوكن الصح من جوه الـ Context، فمفيش احتمال
  // نبعت حاجة غلط في الـ Authorization header زي ما كان بيحصل قبل كده.
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
    // من غير currentUser في الـ deps عشان مانعملش لوب لا نهائي -
    // refreshProfile نفسها بتحدث currentUser.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // كل ما currentUser يتحدث (بعد refreshProfile أو أي حتة تانية)، حدّث
  // الفورم المحلي منه.
  useEffect(() => {
    setProfileData({
      firstName:
        currentUser?.firstName ||
        currentUser?.first_name ||
        (currentUser?.name ? currentUser.name.split(" ")[0] : "") ||
        "",
      lastName:
        currentUser?.lastName ||
        currentUser?.last_name ||
        (currentUser?.name ? currentUser.name.split(" ").slice(1).join(" ") : "") ||
        "",
      email: currentUser?.email || "",
    });
  }, [currentUser]);

  function handleProfileChange(e) {
    const { name, value } = e.target;
    setProfileData((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  }

  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPasswordData((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // 1. Validation
    if (!NAME_REGEX.test(profileData.firstName)) {
      setProfileError("First name: " + NAME_ERROR_MESSAGE);
      return;
    }

    if (profileData.lastName && !NAME_REGEX.test(profileData.lastName)) {
      setProfileError("Last name: " + NAME_ERROR_MESSAGE);
      return;
    }

    if (!EMAIL_REGEX.test(profileData.email)) {
      setProfileError("Email: " + EMAIL_ERROR_MESSAGE);
      return;
    }

    const isEmailTaken = usersList.some(
      (user) =>
        user.email?.toLowerCase() === profileData.email.toLowerCase() &&
        user.email?.toLowerCase() !== currentUser?.email?.toLowerCase()
    );

    if (isEmailTaken) {
      setProfileError("This email is already registered to another account");
      return;
    }

    setProfileError("");
    const wantsPasswordChange =
      passwordData.currentPassword || passwordData.newPassword || passwordData.confirmPassword;

    if (wantsPasswordChange) {
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        setPasswordError("Please fill in all password fields");
        return;
      }

      if (passwordData.currentPassword !== currentUser?.password) {
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
    }

    try {
      setLoading(true);

      // ملحوظة: الـ Profile schema الحقيقي في الـ API فيه "name" بس، مفيهوش
      // email منفصل - يعني الإيميل مش هيتحدث فعليًا على السيرفر، بس هيفضل
      // متسجل محليًا عشان العرض. لو محتاج تغيير الإيميل فعليًا لازم endpoint
      // تاني مش موجود في السبك دلوقتي.
      await updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      });

      if (updateUser) {
        updateUser({
          email: profileData.email,
          ...(wantsPasswordChange && { password: passwordData.newPassword }),
        });
      }

      alert(wantsPasswordChange ? "Password and profile updated successfully" : "Changes saved successfully");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setProfileError(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setProfileData({
      firstName: currentUser?.firstName || currentUser?.first_name || "",
      lastName: currentUser?.lastName || currentUser?.last_name || "",
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
            <p>{addressDisplay}</p>
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
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </main>
  );
}
