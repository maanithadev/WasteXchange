import { Link } from "react-router-dom";
import { XCircle, ArrowLeft } from "lucide-react";

const BuyerPaymentFailed = () => {
    return (
        <main className="flex-1 bg-slate-50 min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-10 text-center relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-50 to-transparent"></div>

                <div className="relative z-10">
                    <div className="relative mx-auto w-24 h-24 mb-8">
                        <div className="relative flex justify-center items-center w-full h-full bg-red-100 rounded-full border-4 border-white shadow-sm">
                            <XCircle className="w-12 h-12 text-red-600" strokeWidth={3} />
                        </div>
                    </div>

                    <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Payment Failed</h1>

                    <p className="text-slate-500 mb-10 leading-relaxed text-sm px-2">
                        We couldn't process your payment and your order has been cancelled. Please try again or use a different payment method.
                    </p>

                    <div className="flex flex-col gap-3.5">
                        <Link to="/buyer/browse-marketplace" className="w-full">
                            <button className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center gap-2">
                                <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
                                Back to Shop
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BuyerPaymentFailed;
