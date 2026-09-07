import { useState } from "react";
import { mockPayments } from "/src/data/MockData.js";
import PaymentCard from "/src/Components/Common/PaymentCard.jsx";
import "./MyPayments.css";

export default function PaymentOptions() {
  const [selectedId, setSelectedId] = useState(mockPayments[0]?.id);

  return (
    <div className="payment-options">
      <h2 className="my-title">My Payment Options</h2>

      <div className="payment-grid">
        {mockPayments.map((card) => (
          <PaymentCard
            key={card.id}
            card={card}
            isSelected={selectedId === card.id}
            onSelect={() => setSelectedId(card.id)}
          />
        ))}

        <div className="payment-card add-card">
          <span className="add-icon">+</span>
          <p>Add New Card</p>
        </div>
      </div>
    </div>
  );
}