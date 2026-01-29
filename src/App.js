import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

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

  /* Snackbar state */
  const [snackOpen, setSnackOpen] = useState(false);

  /* Load from localStorage */
  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    const storedBalance = localStorage.getItem("walletBalance");

    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }

    if (storedBalance !== null) {
      setWalletBalance(Number(storedBalance));
    }
  }, []);


  /* Persist to localStorage */
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("walletBalance", walletBalance);
  }, [expenses, walletBalance]);

  /* Add balance */
  const addBalance = (amt) => {
    setWalletBalance((prev) => prev + amt);
    setActiveModal(null);
  };

  /* Add / Edit expense */
  const saveExpense = (exp) => {
    if (!editingExpense && exp.amount > walletBalance) {
      setSnackOpen(true);
      return;
    }

    if (editingExpense) {
      setExpenses((prev) =>
        prev.map((e) => (e.id === exp.id ? exp : e))
      );
      setWalletBalance(
        (prev) => prev + editingExpense.amount - exp.amount
      );
    } else {
      setExpenses((prev) => [...prev, exp]);
      setWalletBalance((prev) => prev - exp.amount);
    }

    setEditingExpense(null);
    setActiveModal(null);
  };

  /* Delete expense */
  const deleteExpense = (exp) => {
    setExpenses((prev) => prev.filter((e) => e.id !== exp.id));
    setWalletBalance((prev) => prev + exp.amount);
  };

  return (
    <div className="app">
      {/* ONLY ONE h1 */}
      <h1>Expense Tracker</h1>

      {/* ===== TOP SECTION ===== */}
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
          amount={expenses.reduce((sum, e) => sum + e.amount, 0)}
          buttonText="+ Add Expense"
          onClick={() => setActiveModal("EXPENSE")}
        />

        {/* Chart ALWAYS visible */}
        <ExpenseChart expenses={expenses} />
      </div>

      {/* ===== BOTTOM SECTION ===== */}
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

      {/* ===== MODALS ===== */}
      {activeModal === "BALANCE" && (
        <BalanceModal
          onAdd={addBalance}
          onClose={() => setActiveModal(null)}
        />
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

      {/* ===== SNACKBAR ERROR ===== */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setSnackOpen(false)}
        >
          Insufficient wallet balance
        </Alert>
      </Snackbar>
    </div>
  );
}
