import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const SellerMyListings = () => {
    const wasteCategories = ["Construction", "Metals", "Wood"]
    const units = ["kg", "tons"]
    const currencyList = ["LKR"]
    const statusList = ["Active", "Pending", "Draft"]

    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null)

    const { register, handleSubmit } = useForm({
        values: {
            image: editData.image,
            title: editData.title,
            category: editData.category,
            quantity: editData.quantity,
            unit: editData.unit,
            colour: editData.colour,
            description: editData.description,
            price: editData.price,
            currency: editData.currency,
            location: {
                street: editData.location?.street,
                city: editData.location?.city,
                state: editData.location?.state,
                postal_code: editData.location?.postal_code
            },
            status: editData.status === "Review" ? "Send for Review" : editData.status
        }
    })

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(import.meta.env.VITE_SELLERS_GET_ALL_WASTE_LISTINGS_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
            setData(res.data)
            setFilterData(res.data)
        }

        fetchData()
    }, []);

    function handleFilterChange(e) {
        switch (e.target.value) {
            case "active":
                return setFilterData(data.filter(item => {
                    return item.status === "Active"
                }))
            case "sold":
                return setFilterData(data.filter(item => {
                    return item.status === "Sold"
                }))
            case "pending":
                return setFilterData(data.filter(item => {
                    return item.status === "Pending"
                }))
            case "draft":
                return setFilterData(data.filter(item => {
                    return item.status === "Draft"
                }))
            case "rejected":
                return setFilterData(data.filter(item => {
                    return item.status === "Rejected"
                }))
            default:
                return setFilterData(data)
        }
    }

    // const handleEditChange = (e) => {
    //     const { name, value } = e.target;
    //     if (["street", "city", "state", "postal_code"].includes(name)) {
    //         setEditData({
    //             ...editData,
    //             location: {
    //                 ...editData.location,
    //                 [name]: value
    //             }
    //         });
    //     } else {
    //         setEditData({ ...editData, [name]: value });
    //     }
    // };

    async function onsubmit(formData) {
        const saveFormData = new FormData();

        if (formData.image && formData.image.length > 0) {
            saveFormData.append("image", formData.image[0]);
        }

        saveFormData.append("title", formData.title);
        saveFormData.append("category", formData.category);
        saveFormData.append("quantity", formData.quantity);
        saveFormData.append("unit", formData.unit);
        saveFormData.append("colour", formData.colour);
        saveFormData.append("description", formData.description);
        saveFormData.append("price", formData.price);
        saveFormData.append("currency", formData.currency);
        saveFormData.append("street", formData.location?.street);
        saveFormData.append("city", formData.location?.city);
        saveFormData.append("state", formData.location?.state);
        saveFormData.append("postal_code", formData.location?.postal_code);
        saveFormData.append("status", formData.status);

        try {
            const response = await axios.put(import.meta.env.VITE_UPDATE_SELLER_WASTE_LISTING_URL + editData._id,
                saveFormData,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data"
                    }
                });

            // Update local state dynamically
            setFilterData(prevData => prevData.map(item => item._id === editData._id ? response.data.formData : item));

            setIsEditModalOpen(false);
            setEditData({});
        } catch (err) {
            console.error("Error:", err);
        }
    }

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(import.meta.env.VITE_DELETE_SELLER_WASTE_LISTING_URL + selectedItem._id, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            // Update local state by removing the deleted item
            setFilterData(prevData => prevData.filter(item => item._id !== selectedItem._id));

            setIsDeleteModalOpen(false);
            setSelectedItem(null);
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    };

    const handleUpdateStatus = async () => {
        try {
            await axios.put(import.meta.env.VITE_UPDATE_LISTING_STATUS_URL,
                {
                    listing_id: editData._id,
                    status: "Review",
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
            setSelectedItem(null)
            setFilterData(prevData => prevData.map(item => item._id === editData._id ? { ...item, status: "Review" } : item))
            setIsEditModalOpen(false)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            {/* <!-- MY LISTINGS PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen relative">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">My Listings</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage the waste materials you've posted</p>
                    </div>
                    <Link to="/seller/upload-waste">
                        <button
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            New Listing
                        </button>
                    </Link>
                </div>

                <div className="mb-5">
                    <select onChange={handleFilterChange}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="sold">Sold</option>
                        <option value="pending">Pending</option>
                        <option value="draft">Draft</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* <!-- Cards --> */}
                    {filterData.map((item, index) => (
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
                                            setEditData(item);
                                            setIsEditModalOpen(true);
                                        }}
                                        className="flex-1 text-xs font-medium border border-slate-300 text-slate-700 rounded-lg py-2 hover:bg-slate-50">Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedItem(item);
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

                            {editData.status === "Rejected"
                                ? <div className="w-full">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                                        <input type="text" value={editData.status} readOnly className={`w-full text-sm border-2 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none ${editData.status === "Rejected" ? "border-red-500" : "border-slate-200"}`} />
                                        {editData.suspend_message !== null && <div className="mt-5">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Reason for Rejection</label>
                                            <textarea value={editData.suspend_message} rows="5" readOnly className={`w-full text-sm border-2 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none ${editData.status === "Rejected" ? "border-red-500" : "border-slate-200"}`} />
                                        </div>}
                                    </div>
                                    <div className="flex justify-end gap-3 pt-4">
                                        <button type="button" onClick={handleUpdateStatus} className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">Request Editing Access</button>
                                        <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50">Cancel</button>
                                    </div>
                                </div>
                                : <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
                                    {/* Image upload (dummy for edit) */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Waste Image</label>
                                        <input type="file" {...register("image")} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                                    </div>

                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Waste Title</label>
                                        <input type="text" {...register("title")} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                                    </div>

                                    {/* Category + Quantity/Unit */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-1">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Waste Category</label>
                                            <select {...register("category")} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                                {wasteCategories.map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
                                            <input type="number" {...register("quantity")} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Unit</label>
                                            <select {...register("unit")} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                                {units.map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Colour */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Waste Colour</label>
                                        <input type="text" {...register("colour")} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                                        <textarea {...register("description")} className="w-full min-h-[100px] rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
                                    </div>

                                    {/* Pricing + Currency */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
                                            <input type="number" {...register("price")} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                                            <select {...register("currency")} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
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
                                                <input type="text" {...register("location.street")} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                                                <input type="text" {...register("location.city")} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                                                <input type="text" {...register("location.state")} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Postal Code</label>
                                                <input type="text" {...register("location.postal_code")} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                                        <select {...register("status", { required: true })} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                            {editData.status === "Review"
                                                ? <option value="Send for Review">Send for Review</option>
                                                : statusList.map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                        <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50">Cancel</button>
                                        <button type="submit" className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">Save Changes</button>
                                    </div>
                                </form>}
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
