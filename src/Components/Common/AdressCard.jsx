import "/src/CSS/AddressCard.css"
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
export default function AddressCard({ address }) {
  const { label, isDefault, fullName, city, zip, country, phone } = address;

  return (
    <div className="address-card">
      <div className="address-card-header">
        <span className="address-label">
          {label} {isDefault && <span className="default-text">(Default)</span>}
        </span>
        <MoreVertical size={18} className="menu-icon" />
      </div>

      <p className="address-name">{fullName}</p>
      <p className="address-details">{city}, {zip}, {country}</p>
      <p className="address-phone">Phone: {phone}</p>

      <div className="address-actions">
        <button type="button" className="edit-btn">
          <Pencil size={14} /> Edit
        </button>
        <button type="button" className="delete-btn">
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </div>
  );
}