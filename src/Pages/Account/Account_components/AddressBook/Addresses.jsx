import { mockAddresses } from "/src/data/MockData.js";
import AddressCard from "/src/Components/Common/AdressCard.jsx";
import "./Addresses.css";

export default function AddressBook() {
  return (
    <main className="address-book">
      <h2 className="my-title">Address Book</h2>

      <div className="address-grid">
        {mockAddresses.map((addr) => (
          <AddressCard key={addr.id} address={addr} />
        ))}

        <div className="address-card add-card">
          <span className="add-icon">+</span>
          <p>Add New Address</p>
        </div>
      </div>
    </main>
  );
}