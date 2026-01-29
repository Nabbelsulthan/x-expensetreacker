import { useEffect, useState } from "react";

import WalletCard from "./Components/WalletCard.jsx";
import TransactionList from "./Components/TransactionList.jsx";
import ExpenseChart from "./Components/ExpenseChart.jsx";
import TopExpenses from "./Components/TopExpenses.jsx";
import ExpenseModal from "./Components/ExpenseModal.jsx";
import BalanceModal from "./Components/BalanceModal.jsx";
import "./styles/App.css";

const DEFAULT_BALANCE = 5000;

export default function App() {
  const [walletBalance, setWalletBalance] = useState(DEFAULT_BALANCE);
  const [expenses, setExpenses] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const e = JSON.parse(localStorage.getItem("expenses"));
    const b = Number(localStorage.getItem("walletBalance"));
    if (e) setExpenses(e);
    if (!isNaN(b)) setWalletBalance(b);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("walletBalance", walletBalance);
  }, [expenses, walletBalance]);

  const addBalance = (amt) => {
    setWalletBalance((b) => b + amt);
    setActiveModal(null);
  };

  const saveExpense = (exp) => {
    if (!editingExpense && exp.amount > walletBalance) {
      alert("Insufficient balance");
      return;
    }

    if (editingExpense) {
      setExpenses((prev) =>
        prev.map((e) => (e.id === exp.id ? exp : e))
      );
      setWalletBalance((b) => b + editingExpense.amount - exp.amount);
    } else {
      setExpenses((prev) => [...prev, exp]);
      setWalletBalance((b) => b - exp.amount);
    }

    setEditingExpense(null);
    setActiveModal(null);
  };

  const deleteExpense = (exp) => {
    setExpenses((prev) => prev.filter((e) => e.id !== exp.id));
    setWalletBalance((b) => b + exp.amount);
  };

  return (
    <div className="app">
      <h1>Expense Tracker</h1>

      <div className="dashboard-top">
        <WalletCard
          type="wallet"
          title="Wallet Balance"
          amount={walletBalance}
          buttonText="+ Add Income"
          onClick={() => setActiveModal("BALANCE")}
        />

        <WalletCard
          type="expense"
          title="Expenses"
          amount={expenses.reduce((s, e) => s + e.amount, 0)}
          buttonText="+ Add Expense"
          onClick={() => setActiveModal("EXPENSE")}
        />

        <ExpenseChart expenses={expenses} />
      </div>

      <div className="dashboard-bottom">
        <div className="left-section">
          <h2 className="section-title">Recent Transactions</h2>
          <TransactionList
            expenses={expenses}
            onEdit={(e) => {
              setEditingExpense(e);
              setActiveModal("EDIT");
            }}
            onDelete={deleteExpense}
          />
        </div>

        <div className="right-section">
          <h2 className="section-title">Top Expenses</h2>
          <TopExpenses expenses={expenses} />
        </div>
      </div>

      {activeModal === "BALANCE" && (
        <BalanceModal onAdd={addBalance} onClose={() => setActiveModal(null)} />
      )}

      {(activeModal === "EXPENSE" || activeModal === "EDIT") && (
        <ExpenseModal
          editingExpense={editingExpense}
          onSave={saveExpense}
          onClose={() => {
            setEditingExpense(null);
            setActiveModal(null);
          }}
        />
      )}
    </div>
  );
}
