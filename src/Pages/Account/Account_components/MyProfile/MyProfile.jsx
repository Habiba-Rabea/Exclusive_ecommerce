import  { useState, useEffect } from 'react';
import FormInput from "/src/Components/UI/Account_Input.jsx";
import { useAuth } from "/src/Context/AuthContext";
import "./MyProfile.css";
export default function EditProfileForm() {
  const { currentUser, updateUser } = useAuth();
  const getInitialNames = (user) => {
    if (!user) return { firstName: '', lastName: '' };
    if (user.firstName || user.lastName) {
      return { firstName: user.firstName || '', lastName: user.lastName || '' };
    }
    const nameParts = (user.name || '').trim().split(' ');
    return {
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
    };
  };

  const initialNames = getInitialNames(currentUser);

  const [formData, setFormData] = useState({
    firstName: initialNames.firstName,
    lastName: initialNames.lastName,
    email: currentUser?.email || '',
    address: currentUser?.address || '',
  });
  useEffect(() => {
    if (currentUser) {
      const names = getInitialNames(currentUser);
      setFormData({
        firstName: names.firstName,
        lastName: names.lastName,
        email: currentUser.email || '',
        address: currentUser.address || '',
      });
    }
  }, [currentUser]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateUser) {
      updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        address: formData.address,
      });
      alert('Profile updated successfully!');
    }
  };

  return (
    <main className="edit-profile">
      <h2 className="edit-profile-title text-danger fw-semibold mb-4">Edit Your Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <FormInput 
              label="First Name" 
              name="firstName"
              value={formData.firstName} 
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <FormInput 
              label="Last Name" 
              name="lastName"
              value={formData.lastName} 
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <FormInput 
              label="Email" 
              name="email"
              value={formData.email} 
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="col-md-6">
            <FormInput 
              label="Address" 
              name="address"
              value={formData.address} 
              onChange={handleChange}
              placeholder="Kingston, 5236, United States"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="fw-semibold mb-3">Password Changes</label>
          <div className="d-flex flex-column gap-3">
            <FormInput type="password" placeholder="Current Password" />
            <FormInput type="password" placeholder="New Password" />
            <FormInput type="password" placeholder="Confirm New Password" />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <button type="button" className="btn btn-link text-decoration-none text-dark">
            Cancel
          </button>
          <button type="submit" className="btn btn-danger px-4 py-2">
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}