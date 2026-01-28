import "./App.css";
import WalletCard from "./Components/WalletCard";

function App() {
  return (
    <div className="App">
      <h1>Expense Tracker</h1>

      <div className="hero-rect">
        <WalletCard
          type="wallet"
          title="Wallet Balance"
          amount={4500}
          buttonText="+ Add Income"
        />

        <WalletCard
          type="expense"
          title="Expenses"
          amount={500}
          buttonText="+ Add Expense"
        />
      </div>
    </div>
  );
}

export default App;
