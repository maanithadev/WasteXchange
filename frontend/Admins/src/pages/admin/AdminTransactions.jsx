import { useEffect, useState } from "react";
import axios from "axios"

const AdminTransactions = () => {
    const [data, setData] = useState([]);
    const [cardData, setCardData] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    useEffect(() => {
        async function loadPayments() {
            const res = await axios.get(import.meta.env.VITE_GET_ALL_PAYMENTS_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setData(res.data);
        }
        
        async function loadCards() {
            const res = await axios.get(import.meta.env.VITE_GET_ADMIN_TRANSACTIONS_CARDS_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setCardData(res.data);
        }

        loadPayments()
        loadCards()
    }, []);

    const handleView = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const getPaymentDetails = (item) => {
        if (!item) return null;
        const details = { ...item };
        delete details.order_id;
        delete details.seller_id;
        delete details.buyer_id;
        return details;
    };

    const renderDynamicFields = (obj, parentKey = '') => {
        if (!obj) return null;

        return Object.entries(obj).map(([key, value]) => {
            // Ignore specified fields
            // if (key === '_id' || key === '__v' || key === 'cyberSourceTransaction_id') return null;

            // Format the label
            let label = key;
            // if (parentKey) {
            //     let formattedParent = parentKey.replace('_id', '');
            //     if (key === 'company_name') label = `${formattedParent} Company`;
            //     else label = `${formattedParent} ${key}`;
            // }

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                return renderDynamicFields(value, key);
            }

            if (Array.isArray(value)) {
                value = value.join(', ');
            }

            return (
                <div key={`${parentKey}-${key}`} className="">
                    <label className="block text-sm font-medium text-slate-700 mb-1 capitalize text-nowrap truncate">{label.replace(/_/g, ' ')}</label>
                    <input type="text" readOnly value={value || ""} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600 focus:outline-none" />
                </div>
            )
        });
    }

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const filteredData = data.filter((item) => {
        if (!item.created_at) return false;
        const itemDate = new Date(item.created_at);
        if (filter === "month") {
            return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
        } else if (filter === "year") {
            return itemDate.getFullYear() === currentYear;
        }
        return true;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <>
            {/* <!-- TRANSACTIONS / PAYMENT OVERSIGHT PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-slate-900">Transactions &amp; Payment Oversight</h1>
                    <p class="text-sm text-slate-500 mt-1">Monitor platform-wide payment activity</p>
                </div>

                {/* <!-- Summary stat cards --> */}
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div class="bg-white rounded-lg border border-slate-200 p-4">
                        <p class="text-xs font-medium text-slate-500 mb-1">Total Revenue Processed (Current Month)</p>
                        <p class="text-2xl font-bold text-slate-900">RS. {cardData.totalRevenue || 0}</p>
                    </div>
                    <div class="bg-white rounded-lg border border-slate-200 p-4">
                        <p class="text-xs font-medium text-slate-500 mb-1">Pending Payouts (Current Month)</p>
                        <p class="text-2xl font-bold text-slate-900">RS. {cardData.pendingPayouts || 0}</p>
                    </div>
                    <div class="bg-white rounded-lg border border-slate-200 p-4">
                        <p class="text-xs font-medium text-slate-500 mb-1">Disputed Transactions (Failed Current Month)</p>
                        <p class="text-2xl font-bold text-red-600">RS. {cardData.disputedTransactions || 0}</p>
                    </div>
                </div>

                {/* Filter Controls */}
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div class="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 w-fit">
                        <button onClick={() => setFilter("all")} class={`text-xs font-semibold px-3 py-1.5 rounded-md ${filter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>All</button>
                        <button onClick={() => setFilter("month")} class={`text-xs font-semibold px-3 py-1.5 rounded-md ${filter === 'month' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>Current Month</button>
                        <button onClick={() => setFilter("year")} class={`text-xs font-semibold px-3 py-1.5 rounded-md ${filter === 'year' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>Current Year</button>
                    </div>
                </div>

                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-slate-50 border-b border-slate-200">
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Transaction ID</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Order Reference</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Buyer</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Seller</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Amount</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Status</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Date</th>
                                    <th class="text-right font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td class="px-6 py-3.5 font-mono text-xs text-slate-600">{item.transaction_id}</td>
                                        <td class="px-6 py-3.5 font-mono text-xs text-slate-600">{item.order_id?.order_reference_number}</td>
                                        <td class="px-6 py-3.5 text-slate-700">{item.buyer_id?.company_name}</td>
                                        <td class="px-6 py-3.5 text-slate-700">{item.seller_id?.company_name}</td>
                                        <td class="px-6 py-3.5 text-slate-700">{item.order_id?.currency}{item.order_id?.total_price}</td>
                                        <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{item.payment_status}</span></td>
                                        <td class="px-6 py-3.5 text-slate-500">{new Date(item.created_at).toLocaleDateString()}</td>
                                        <td class="px-6 py-3.5 text-right"><button onClick={() => handleView(item)} class="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View Details</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredData.length)}</span> of <span className="font-medium">{filteredData.length}</span> results
                            </p>
                            <div className="flex space-x-1">
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 text-sm border border-slate-300 rounded-md disabled:opacity-50 text-slate-600 bg-white hover:bg-slate-50"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button 
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-1 text-sm border rounded-md ${currentPage === page ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 text-slate-600 hover:bg-slate-50 bg-white'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 text-sm border border-slate-300 rounded-md disabled:opacity-50 text-slate-600 bg-white hover:bg-slate-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* <!-- MODAL --> */}
                {isModalOpen && selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
                            <div className="flex items-center justify-between p-6 border-b border-slate-200">
                                <h2 className="text-xl font-bold text-slate-800">Payment Details</h2>
                                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 focus:outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                            <div className="p-6 overflow-y-auto flex-1">
                                {selectedItem && (
                                    <>
                                        <div className="mb-8">
                                            <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">Payment Details</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                {renderDynamicFields(getPaymentDetails(selectedItem))}
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">Order Details</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                {renderDynamicFields(selectedItem.order_id)}
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">Seller Details</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                {renderDynamicFields(selectedItem.seller_id)}
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">Buyer Details</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                {renderDynamicFields(selectedItem.buyer_id)}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default AdminTransactions
