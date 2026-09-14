import { useState } from "react";
import { useAuth } from "/src/Context/AuthContext.jsx";
import PaymentCard from "/src/Components/Common/PaymentCard.jsx";
import FormInput from "/src/Components/UI/Account_Input.jsx";
import { cardTypes } from "/src/data/cardLogos.js";
import {
  CARD_HOLDER_REGEX, CARD_HOLDER_ERROR_MESSAGE,
  EXPIRY_REGEX, EXPIRY_ERROR_MESSAGE,
  CARD_NUMBER_REGEX, CARD_NUMBER_ERROR_MESSAGE
} from "/src/Utils/validation";
import "./MyPayments.css";

const emptyForm = { holder: "", cardNumber: "", expiry: "", type: cardTypes[0].value };

export default function PaymentOptions() {
  const { currentUser, updateUser } = useAuth();
  const cards = currentUser?.paymentCards || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCard, setNewCard] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const handleSetDefault = (id) => {
    const updatedCards = cards.map((c) => ({ ...c, isDefault: c.id === id }));
    updateUser({ paymentCards: updatedCards });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewCard(emptyForm);
    setFormError("");
  };

  const handleDeleteCard = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this card?");
    if (!confirmed) return;

    let updatedCards = cards.filter((c) => c.id !== id);

    if (updatedCards.length > 0 && !updatedCards.some((c) => c.isDefault)) {
      updatedCards = updatedCards.map((c, i) => ({ ...c, isDefault: i === 0 }));
    }

    updateUser({ paymentCards: updatedCards });
  };

  const handleSaveCard = (e) => {
    e.preventDefault();
    
    if (!CARD_HOLDER_REGEX.test(newCard.holder)) {
    setFormError("Holder name: " + CARD_HOLDER_ERROR_MESSAGE);
    return;
  }
  if (!CARD_NUMBER_REGEX.test(newCard.cardNumber.replace(/\s/g, ""))) {
    setFormError("Card number: " + CARD_NUMBER_ERROR_MESSAGE);
    return;
  }
  if (!EXPIRY_REGEX.test(newCard.expiry)) {
    setFormError("Expiry: " + EXPIRY_ERROR_MESSAGE);
    return;
  }
  setFormError("");
    const last4 = newCard.cardNumber.replace(/\s/g, "").slice(-4);
    const cardToAdd = {
      id: Date.now(),
      type: newCard.type,
      last4,
      expiry: newCard.expiry,
      holder: newCard.holder,
      isDefault: cards.length === 0,
    };

    updateUser({ paymentCards: [...cards, cardToAdd] });
    closeModal();
  };

  return (
    <div className="payment-options">
      <h2 className="my-title">My Payment Options</h2>

      <div className="payment-grid">
        {cards.map((card) => (
          <PaymentCard
            key={card.id}
            card={card}
            isSelected={card.isDefault}
            onSelect={() => handleSetDefault(card.id)}
            onDelete={handleDeleteCard}
          />
        ))}

        <div className="payment-card add-card" onClick={() => setIsModalOpen(true)}>
          <span className="add-icon">+</span>
          <p>Add New Card</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="payment-modal-overlay" onClick={closeModal}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Card</h3>
            {formError && <p className="error-message">{formError}</p>}
            <form onSubmit={handleSaveCard}>
              <div className="form-input">
                <label>Card Type</label>
                <select name="type" value={newCard.type} onChange={handleFormChange} required>
                  {cardTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <FormInput
                name="holder"
                placeholder="Card Holder Name"
                value={newCard.holder}
                onChange={handleFormChange}
                required
              />

              <FormInput
                name="cardNumber"
                placeholder="Card Number"
                value={newCard.cardNumber}
                onChange={handleFormChange}
                required
              />

              <FormInput
                name="expiry"
                placeholder="MM/YY"
                value={newCard.expiry}
                onChange={handleFormChange}
                required
              />

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
