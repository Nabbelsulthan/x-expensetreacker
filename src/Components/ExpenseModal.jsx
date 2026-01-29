import { useEffect, useState } from "react";
import "../styles/Modal.css";

export default function ExpenseModal({ editingExpense, onSave, onClose }) {
  const [title, setTitle] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);

      setPrice(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    }
  }, [editingExpense]);

  const submit = (e) => {
    e.preventDefault();
    if (!title || !price || !category || !date) return;

    onSave({
      id: editingExpense?.id || Date.now(),
      title,
      amount: Number(price),
      category,
      date,
    });
  };

  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={submit}>
        <h2>{editingExpense ? "Edit Expenses" : "Add Expenses"}</h2>

        <input name="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />

        <input name="price" type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />

        <select name="category" value={category} onChange={e => setCategory(e.target.value)}>

          <option value="">Select Category</option>

          <option>Food</option>

          <option>Entertainment</option>

          <option>Travel</option>

        </select>
        <input name="date" type="date" value={date} onChange={e => setDate(e.target.value)} />

        <div className="modal-actions">

          <button type="submit">Add Expense</button>
          
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
