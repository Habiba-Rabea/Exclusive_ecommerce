import FormInput from "/src/Components/UI/Account_Input.jsx";
import { mockUser } from "/src/data/MockData.js";
import "./MyProfile.css";

export default function EditProfileForm() {
  return (
    <main className="edit-profile">
      <h2 className="edit-profile-title">Edit Your Profile</h2>

      <form>
        <div className="form-row">
          <FormInput label="First Name" defaultValue={mockUser.firstName} placeholder="john"/>
          <FormInput label="Last Name" defaultValue={mockUser.lastName} placeholder="smith"/>
        </div>

        <div className="form-row">
          <FormInput label="Email" defaultValue={mockUser.email} placeholder="example@gmail.com"/>
          <FormInput label="Address" defaultValue={mockUser.address} placeholder="Kingston, 5236, United State"/>
        </div>

        <div className="form-row single">
          <label className="section-label">Password Changes</label>
        </div>

        <div className="form-row single">
          <FormInput type="password" placeholder="Current Password" />
        </div>

        <div className="form-row single">
          <FormInput type="password" placeholder="New Password" />
        </div>

        <div className="form-row single">
          <FormInput type="password" placeholder="Confirm New Password" />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel">Cancel</button>
          <button type="submit" className="btn-save">Save Changes</button>
        </div>
      </form>
    </main>
  );
}