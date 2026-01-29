import "../styles/TopExpenses.css";





export default function TopExpenses({ expenses }) {


  const totals = ["Entertainment", "Food", "Travel"].map((cat) => ({
    name: cat,
    value: expenses
      .filter((e) => e.category === cat)
      .reduce((s, e) => s + e.amount, 0),
  }));

  const max = Math.max(...totals.map((t) => t.value), 1);

  return (
    <div className="top-expenses-card">
      {totals.map((t) => (
        <div key={t.name}>

          <span>{t.name}</span>

          <div className="bar">
            <div
              className="fill"
              
              style={{ width: `${(t.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
