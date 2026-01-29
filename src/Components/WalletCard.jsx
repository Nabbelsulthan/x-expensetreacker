import "../styles/WalletCard.css";





export default function WalletCard({ type, title, amount, buttonText, onClick }) {
  return (
    <div className={`wallet-card ${type}`}>

      <h2>
        {title}: <span>₹{amount}</span>
      </h2>

      <button type="button" onClick={onClick}>
        {buttonText}
      </button>
      
    </div>
  );
}
