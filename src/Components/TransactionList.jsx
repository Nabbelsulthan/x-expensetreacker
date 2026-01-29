import "../styles/TransactionList.css";




export default function TransactionList({ expenses, onEdit, onDelete }) {

  if (!expenses || expenses.length === 0) {
    return (
      <div className="transactions-card">

        <div className="no-transactions">No transactions!</div>
      </div>
    );
  }

  return (
    <div className="transactions-card">
      {expenses.map((e) => (

        <div className="transaction-row" key={e.id}>
          <div>
            <strong>{e.title}</strong>

            <div className="date">{e.date}</div>
          </div>

          <div className="actions">

            <span className="amount">₹{e.amount}</span>

            <button className="edit" onClick={() => onEdit(e)}>✎</button>
            
            <button className="delete" onClick={() => onDelete(e)}>×</button>
          </div>
        </div>
      ))}
    </div>
  );
}
