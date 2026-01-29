import { useState } from "react";
import "../styles/Modal.css";

export default function BalanceModal({ onAdd, onClose }) {
  const [amount, setAmount] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!amount) return;
    onAdd(Number(amount));
  };

  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={submit}>
        <h2>Add Balance</h2>
        <input type="number" placeholder="Income Amount" value={amount}
          onChange={(e) => setAmount(e.target.value)} />
        <div className="modal-actions">
          <button type="submit">Add Balance</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
