import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

const BuyerPaymentSuccess = () => {
    return (
        <main className="flex-1 bg-slate-50 min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-10 text-center relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-50 to-transparent"></div>

                <div className="relative z-10">
                    <div className="relative mx-auto w-24 h-24 mb-8">
                        <div className="relative flex justify-center items-center w-full h-full bg-emerald-100 rounded-full border-4 border-white shadow-sm">
                            <CheckCircle2 className="w-12 h-12 text-emerald-600" strokeWidth={3} />
                        </div>
                    </div>

                    <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Payment Successful!</h1>

                    <p className="text-slate-500 mb-10 leading-relaxed text-sm px-2">
                        Thank you for your order!<br />We’ve successfully received it and notified the seller.<br />Your order is currently processing. We will send you another update as soon as the seller confirms your order.
                    </p>

                    <div className="flex flex-col gap-3.5">
                        <Link to="/buyer/my-orders" className="w-full">
                            <button className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center justify-center gap-2">
                                Track Order
                                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                            </button>
                        </Link>

                        <Link to="/buyer/browse-marketplace" className="w-full">
                            <button className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2">
                                Back to Shop
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BuyerPaymentSuccess
