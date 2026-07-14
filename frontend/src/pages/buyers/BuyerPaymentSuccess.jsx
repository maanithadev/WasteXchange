import {Link} from "react-router-dom";

const BuyerPaymentSuccess = () => {
    return (
        <div className="w-full h-[80vh] flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-5">
                <div className="icon">✅</div>
                <h1>Payment Successful!</h1>
                <p className="sub">Thank you — your order has been confirmed.</p>
                <Link to="/buyer/browse-marketplace" className="underline">← Back to shop</Link>
            </div>
        </div>
    )
}
export default BuyerPaymentSuccess
