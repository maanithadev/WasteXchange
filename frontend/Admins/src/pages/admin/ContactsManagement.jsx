import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ContactsManagement = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(import.meta.env.VITE_ADMIN_BACKEND_URL + import.meta.env.VITE_GET_ALL_CONTACTS_URL, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setData(res.data);
                applyFilter(res.data, filter);
            } catch (err) {
                if (err.message === "Request failed with status code 429") {
                    toast.error("Too many requests, please try again later.");
                } else {
                    toast.error('Something went wrong! Please try again later.');
                }
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    const applyFilter = (contactsData, currentFilter) => {
        switch (currentFilter) {
            case "done reading":
                setFilteredData(contactsData.filter((contact) => contact.isRead === true));
                break;
            case "need to read":
                setFilteredData(contactsData.filter((contact) => contact.isRead === false));
                break;
            default:
                setFilteredData(contactsData);
                break;
        }
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        applyFilter(data, newFilter);
    };

    const handleMarkAsRead = async (id) => {
        try {
            await axios.put(`${import.meta.env.VITE_ADMIN_BACKEND_URL}${import.meta.env.VITE_MARK_CONTACT_READ_URL}/${id}/read`, {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            setRefresh(!refresh);
            toast.success('Marked as read successfully!');
            setSelectedContact(null);
        } catch (err) {
            if (err.message === "Request failed with status code 429") {
                toast.error("Too many requests, please try again later.");
            } else {
                toast.error('Something went wrong! Please try again later.');
            }
        }
    };

    return (
        <>
            {/* <!-- CONTACTS MANAGEMENT PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Contacts Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Review and manage guest contact messages</p>
                </div>

                {/* <!-- Filter tabs --> */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 w-fit">
                        <button onClick={() => handleFilterChange("all")}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-md ${filter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>All
                        </button>
                        <button onClick={() => handleFilterChange("need to read")}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-md ${filter === 'need to read' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>Need to Read
                        </button>
                        <button onClick={() => handleFilterChange("done reading")}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-md ${filter === 'done reading' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>Done Reading
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Name</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Email</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Subject</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Status</th>
                                    <th className="text-right font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-3.5 font-medium text-slate-800">{item.name}</td>
                                        <td className="px-6 py-3.5 text-slate-500">{item.email}</td>
                                        <td className="px-6 py-3.5 text-slate-700 max-w-xs truncate">{item.subject}</td>
                                        <td className="px-6 py-3.5">
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${item.isRead ? 'bg-emerald-200 text-black' : 'bg-yellow-200 text-black'}`}>
                                                {item.isRead ? "Read" : "Unread"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5 text-right space-x-1 whitespace-nowrap">
                                            <button onClick={() => setSelectedContact(item)}
                                                className="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Contact Details Modal */}
            {selectedContact && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                            <h2 className="text-lg font-semibold text-slate-800">Contact Details</h2>
                            <button onClick={() => setSelectedContact(null)} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Name</label>
                                    <input type="text" readOnly value={selectedContact.name || ""}
                                        className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                                    <input type="text" readOnly value={selectedContact.email || ""}
                                        className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Subject</label>
                                    <input type="text" readOnly value={selectedContact.subject || ""}
                                        className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Message</label>
                                    <textarea readOnly rows="4" value={selectedContact.message || ""}
                                        className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 resize-none text-slate-700 outline-none"></textarea>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Submitted Date</label>
                                    <input type="text" readOnly value={new Date(selectedContact.created_at).toLocaleString()}
                                        className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                            <button onClick={() => setSelectedContact(null)}
                                className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors">Cancel
                            </button>
                            {!selectedContact.isRead && (
                                <button onClick={() => handleMarkAsRead(selectedContact._id)}
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">Mark done reading
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ContactsManagement;
