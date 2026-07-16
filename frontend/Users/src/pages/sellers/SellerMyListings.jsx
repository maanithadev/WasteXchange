import { useEffect, useState } from "react";
import axios from "axios";

const SellerMyListings = () => {
    const [data, setData] = useState([])
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const wasteCategories = ["Construction", "Metals", "Wood"]
    const units = ["kg", "tons", "lbs", "units", "m3"]
    const currencyList = ["LKR", "$"]
    const statusList = ["Active", "Pending", "Draft"]

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(import.meta.env.VITE_SELLERS_GET_ALL_WASTE_LISTINGS_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
            setData(res.data)
        }

        fetchData()
    }, []);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        if (["street", "city", "state", "postal_code"].includes(name)) {
            setEditData({
                ...editData,
                location: {
                    ...editData.location,
                    [name]: value
                }
            });
        } else {
            setEditData({ ...editData, [name]: value });
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        // Here you would typically make an API call to update the listing
        console.log("Updated data:", editData);
        setIsEditModalOpen(false);
    };

    const handleDeleteConfirm = () => {
        // Here you would typically make an API call to delete the listing
        console.log("Deleted item:", itemToDelete);
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
    };

    return (
        <>
            {/* <!-- MY LISTINGS PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen relative">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">My Listings</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage the waste materials you've posted</p>
                    </div>
                    <button
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        New Listing
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* <!-- Card 1 --> */}
                    {data.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <img src={`http://localhost:3000/uploads/${item.image}`}
                                className="w-full h-40 object-cover"
                                alt={item.title} />
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-slate-900 text-sm">{item.title}</h3>
                                    <span
                                        className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{item.status}</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-4">{item.quantity} {item.unit} &middot; {item.category}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setEditData({ ...item, location: item.location || { street: "", city: "", state: "", postal_code: "" } });
                                            setIsEditModalOpen(true);
                                        }}
                                        className="flex-1 text-xs font-medium border border-slate-300 text-slate-700 rounded-lg py-2 hover:bg-slate-50">Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            setItemToDelete(item);
                                            setIsDeleteModalOpen(true);
                                        }}
                                        className="flex-1 text-xs font-medium border border-red-200 text-red-600 rounded-lg py-2 hover:bg-red-50">Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Edit Modal */}
                {isEditModalOpen && editData && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-900">Edit Listing</h2>
                                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-6">
                                {/* Image upload (dummy for edit) */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Waste Image</label>
                                    <input type="file" name="image" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Waste Title</label>
                                    <input type="text" name="title" value={editData.title || ""} onChange={handleEditChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                                </div>

                                {/* Category + Quantity/Unit */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-1">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Waste Category</label>
                                        <select name="category" value={editData.category || ""} onChange={handleEditChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                            {wasteCategories.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
                                        <input type="number" name="quantity" value={editData.quantity || ""} onChange={handleEditChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Unit</label>
                                        <select name="unit" value={editData.unit || ""} onChange={handleEditChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                            {units.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Colour */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Waste Colour</label>
                                    <input type="text" name="colour" value={editData.colour || ""} onChange={handleEditChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                                    <textarea name="description" value={editData.description || ""} onChange={handleEditChange} className="w-full min-h-[100px] rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
                                </div>

                                {/* Pricing + Currency */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
                                        <input type="number" name="price" value={editData.price || ""} onChange={handleEditChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                                        <select name="currency" value={editData.currency || ""} onChange={handleEditChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                            {currencyList.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <hr className="border-slate-200" />

                                {/* Location */}
                                <div className="flex flex-col gap-3">
                                    <label className="block text-md font-medium text-slate-700">Location</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Street</label>
                                            <input type="text" name="street" value={editData.location?.street || ""} onChange={handleEditChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                                            <input type="text" name="city" value={editData.location?.city || ""} onChange={handleEditChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                                            <input type="text" name="state" value={editData.location?.state || ""} onChange={handleEditChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Postal Code</label>
                                            <input type="text" name="postal_code" value={editData.location?.postal_code || ""} onChange={handleEditChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                        </div>
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                                    <select name="status" value={editData.status || ""} onChange={handleEditChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                        {statusList.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50">Cancel</button>
                                    <button type="submit" className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Modal */}
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Confirm Deletion</h2>
                            <p className="text-slate-600 mb-6">Are you sure you want to delete this listing? This action cannot be undone.</p>
                            <div className="flex justify-end gap-3">
                                <button onClick={() => setIsDeleteModalOpen(false)} className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50">Cancel</button>
                                <button onClick={handleDeleteConfirm} className="px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700">Continue</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default SellerMyListings
