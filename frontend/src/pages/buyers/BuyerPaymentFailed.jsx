import {Link} from "react-router-dom";

const BuyerPaymentFailed = () => {
    return (
        <div className="w-full h-[80vh] flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-5">
                {/*<div className="icon">✅</div>*/}
                <h1>Payment Failed!</h1>
                <p className="sub">your order has been cancelled.</p>
                <Link to="/buyer/browse-marketplace" className="underline">← Back to shop</Link>
            </div>
        </div>
    )
}
export default BuyerPaymentFailed
