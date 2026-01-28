import { Button } from "@mui/material";
import "./WalletCard.css";




export default function WalletCard({ type, title, amount, buttonText }) {
    return (
        <div className={`wallet-card ${type}`}>
            <h2>
                {title}: <span className="amount">₹{amount}</span>
            </h2>

            <Button variant="contained" className="wallet-btn">
                {buttonText}
            </Button>
        </div>
    );
}
