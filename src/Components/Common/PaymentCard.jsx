import "/src//CSS/AddressCard.css"
import { MoreVertical } from "lucide-react";
import "/src/CSS/PaymentCard.css";

export default function PaymentCard({ card, isSelected, onSelect }) {
  const { type, logo, last4, expiry, holder } = card;

  return (
    <div
      className={`payment-card ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <div className="payment-card-header">
        <img src={logo} alt={type} className="card-logo-img" />
        <span className="card-number">
          {type} **** **** **** {last4}
        </span>
        <MoreVertical size={18} className="menu-icon" />
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

      {isSelected && (
        <>
          <hr className="card-divider" />
          <div className="default-indicator">
            <span className="default-dot"></span> Default
          </div>
        </>
      )}
    </div>
  );
}