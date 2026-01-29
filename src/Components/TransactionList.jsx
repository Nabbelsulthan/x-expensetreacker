import "../styles/TransactionList.css";

export default function TransactionList({ expenses, onEdit, onDelete }) {
  return (
    <div className="transactions-card">
      {expenses.map((e) => (
        <div key={e.id} className="transaction-row">
          <div>
            <strong>{e.title}</strong>
            <div className="date">{e.date}</div>
          </div>

          <div className="actions">
            <span>₹{e.amount}</span>
            <button type="button" onClick={() => onEdit(e)}>✎</button>
            <button type="button" onClick={() => onDelete(e)}>×</button>
          </div>
        </div>
      ))}
    </div>
  );
}
