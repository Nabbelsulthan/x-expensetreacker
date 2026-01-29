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

  const handleSubmit = (e) => {
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
      <form className="modal" onSubmit={handleSubmit}>
        <h2>Add Expense</h2>

        <input name="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <input name="price"  placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />


        <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>

          <option value="">Select</option>

          <option value="Food">Food</option>

          <option value="Travel">Travel</option>

          <option value="Entertainment">Entertainment</option>

        </select>

        <input name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <div className="modal-actions">

          <button type="submit">Add Expense</button>
          
          <button type="button" onClick={onClose}>Cancel</button>

          
        </div>
      </form>
    </div>
  );
}
