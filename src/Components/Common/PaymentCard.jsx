import "/src/CSS/AddressCard.css";
import "/src/CSS/PaymentCard.css";
import { CreditCard, Trash2 } from "lucide-react";
import { getCardLogo } from "/src/data/cardLogos.js";

export default function PaymentCard({ card, isSelected, onSelect, onDelete }) {
  const { type, last4, expiry, holder } = card;
  const logoSrc = getCardLogo(type);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(card.id);
  };

  return (
    <div
      className={`payment-card ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <div className="payment-card-header">
        {logoSrc ? (
          <img src={logoSrc} alt={type} className="card-logo-img" />
        ) : (
          <CreditCard size={28} className="card-logo-icon" />
        )}
        <span className="card-number">
          {type} **** **** **** {last4}
        </span>
      </div>

      <div className="card-info-row">
        <div>
          <p className="card-label">Card Holder</p>
          <p className="card-value">{holder}</p>
        </div>
        <div>
          <p className="card-label">Expiry Date</p>
          <p className="card-value">{expiry}</p>
        </div>
      </div>

     <hr className="card-divider" />
      <div className="card-bottom-row">
        {isSelected && (
          <div className="default-indicator">
            <span className="default-dot"></span> Default
          </div>
        )}
        <button type="button" className="delete-btn" onClick={handleDeleteClick}>
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </div>
  );
}
