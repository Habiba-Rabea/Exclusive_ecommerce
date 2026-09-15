import "/src/CSS/AddressCard.css"
import { Pencil, Trash2 } from "lucide-react";
export default function AddressCard ({address ,onSetDefault,onEdit,onDelete}){
  const { id,label, isDefault, fullName, city, zip, country, phone } = address;
  
  const handleCardClick = () => {if(!isDefault) onSetDefault(id)};
  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(address);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(id);
  };
  return (
    <div className={`address-card ${isDefault ? "selected" : ""}`} onClick={handleCardClick}>
      <div className="address-card-header">
        <span className="address-label"> {label} </span>
        {isDefault && <span className="default-text">(Default)</span>}
      </div>

      <p className="address-name">{fullName}</p>
      <p className="address-details">{city}, {zip}, {country}</p>
      <p className="address-phone">Phone: {phone}</p>

      <div className="address-actions">
        <button type="button" className="edit-btn" onClick={handleEditClick}>
          <Pencil size={14} /> Edit
        </button>
        <button type="button" className="delete-btn" onClick={handleDeleteClick}>
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </div>
  );
}