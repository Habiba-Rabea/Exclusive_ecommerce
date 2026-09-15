import {useState} from "react";
import { useAuth } from "/src/Context/AuthContext.jsx";
import AddressCard from "/src/Components/Common/AdressCard.jsx";
import FormInput from "/src/Components/UI/Account_Input.jsx";
import {
  NAME_REGEX, NAME_ERROR_MESSAGE,
  PHONE_REGEX, PHONE_ERROR_MESSAGE,
  ZIP_REGEX, ZIP_ERROR_MESSAGE
} from "/src/Utils/validation";
import "./Addresses.css";

export default function AddressBook() {
  const {currentUser,updateUser} = useAuth();
  const addresses=currentUser?.addresses || [];

  const handleSetDefault = (id) => {
  const updatedAddresses = addresses.map((addr) => ({
    ...addr,
    isDefault: addr.id === id,
  }));
  updateUser({ addresses: updatedAddresses });
};
const [isModalOpen, setIsModalOpen] = useState(false);
const [editingId, setEditingId] = useState(null);
const [formError, setFormError] = useState("");
const [newAddress, setNewAddress] = useState({
  label:"",
  fullName: "",
  city: "",
  zip: "",
  phone: "",
});
const handleFormChange = (e) => {
  const { name, value } = e.target;
  setNewAddress((prevAddress) => ({
    ...prevAddress,
    [name]: value,
  }));
}
const closeModal = () => {
  setIsModalOpen(false);
  setEditingId(null);
  setNewAddress({ label: "", fullName: "", city: "", zip: "", phone: "" });
};

const handleSaveAddress = (e) => {
  e.preventDefault();

  if (!NAME_REGEX.test(newAddress.fullName)) {
    setFormError("Full name: " + NAME_ERROR_MESSAGE);
    return;
  }
  if (!ZIP_REGEX.test(newAddress.zip)) {
    setFormError("Zip: " + ZIP_ERROR_MESSAGE);
    return;
  }
  if (!PHONE_REGEX.test(newAddress.phone)) {
    setFormError("Phone: " + PHONE_ERROR_MESSAGE);
    return;
  }
  setFormError("");
  
  if (editingId) {
    const updatedAddresses = addresses.map((addr) =>
      addr.id === editingId ? { ...addr, ...newAddress } : addr
    );
    updateUser({ addresses: updatedAddresses });
  } else {
    const addressToAdd = {
      ...newAddress,
      id: Date.now(),
      isDefault: addresses.length === 0,
    };
    updateUser({ addresses: [...addresses, addressToAdd] });
  }

  closeModal();
};

const handleEditClick = (address) => {
  setNewAddress({
    label: address.label,
    fullName: address.fullName,
    city: address.city,
    zip: address.zip,
    phone: address.phone,
  });
  setEditingId(address.id);
  setIsModalOpen(true);
};

const handleDeleteAddress = (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this address?");
  if (!confirmed) return;

  const updatedAddresses = addresses.filter((addr) => addr.id !== id);
  updateUser({ addresses: updatedAddresses });
};
  return (
    <main className="address-book">
      <h2 className="my-title">Address Book</h2>

      <div className="address-grid">
        {addresses.map((addr) => (
          <AddressCard 
          key={addr.id} 
          address={addr} 
          onSetDefault={handleSetDefault}
          onEdit={handleEditClick}
          onDelete={handleDeleteAddress}
          />
        ))}

        <div className="address-card add-card" onClick={()=>setIsModalOpen(true)}>
          <span className="add-icon">+</span>
          <p>Add New Address</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="address-modal-overlay" onClick={closeModal}>
          <div className="address-modal" onClick={(e) => e.stopPropagation()}>

            <h3>{editingId ? "Edit Address" : "Add New Address"}</h3>
            {formError && <p className="error-message">{formError}</p>}
            <form onSubmit={handleSaveAddress}>
              <FormInput label="Label" name="label" placeholder="Label (e.g. Home, Work)" value={newAddress.label} onChange={handleFormChange} required />
              <FormInput label="full name" name="fullName" placeholder="john smith" value={newAddress.fullName} onChange={handleFormChange} required />
              <FormInput label="city" name="city" placeholder="cairo" value={newAddress.city} onChange={handleFormChange} required />
              <FormInput label="ZIP Code" name="zip" placeholder="12345" value={newAddress.zip} onChange={handleFormChange} required />
              <FormInput label="Phone" name="phone" placeholder="01*********" value={newAddress.phone} onChange={handleFormChange} required />

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-save">Save Address</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}