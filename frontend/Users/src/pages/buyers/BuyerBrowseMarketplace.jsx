import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const BuyerBrowseMarketplace = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [minQty, setMinQty] = useState('');
    const [maxQty, setMaxQty] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('Sort: Most Relevant');

    const fetchListings = async (queryParams) => {
        try {
            const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_GET_ALL_ACTIVE_WASTELISTINGS_URL, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
                params: queryParams
            })
            setData(res.data)
        } catch (err) {
            if (err.message === "Request failed with status code 429") {
                toast.error("Too many requests, please try again later.")
            } else {
                toast.error('Something went wrong! Please try again later.')
            }
        }
    }

    useEffect(() => {
        fetchListings({ search, category, minQty, maxQty, minPrice, maxPrice, sort });
    }, [sort])

    const handleApplyFilters = () => {
        fetchListings({ search, category, minQty, maxQty, minPrice, maxPrice, sort });
    }

    const handleClearAll = () => {
        setSearch('');
        setCategory('All Categories');
        setMinQty('');
        setMaxQty('');
        setMinPrice('');
        setMaxPrice('');
        setSort('Sort: Most Relevant');
        fetchListings({
            search: '', category: 'All Categories', minQty: '', maxQty: '', minPrice: '', maxPrice: '', sort: 'Sort: Most Relevant'
        });
    }

    return (
        <>
            {/* <!-- BROWSE / SEARCH MARKETPLACE PAGE --> */}
            <main className="flex-1 bg-slate-50 min-h-screen flex">
                {/* <!-- Filter sidebar --> */}
                <div className="w-72 bg-white border-r border-slate-200 p-6 space-y-6 shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Filters</h2>
                        <input type="text" placeholder="Search listings..."
                            value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Waste Type</label>
                        <select
                            value={category} onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="All Categories">All Categories</option>
                            <option value="Construction">Construction</option>
                            <option value="Metals">Metals</option>
                            <option value="Wood">Wood</option>
                        </select>
                    </div>

                    {/* <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                        <input type="text" placeholder="City, State or ZIP"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div> */}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Quantity Range (kg)</label>
                        <div className="flex items-center gap-2">
                            <input type="number" placeholder="Min"
                                value={minQty} onChange={(e) => setMinQty(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <span className="text-slate-400 text-sm">–</span>
                            <input type="number" placeholder="Max"
                                value={maxQty} onChange={(e) => setMaxQty(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Price Range ($)</label>
                        <div className="flex items-center gap-2">
                            <input type="number" placeholder="Min"
                                value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <span className="text-slate-400 text-sm">–</span>
                            <input type="number" placeholder="Max"
                                value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <button
                        onClick={handleApplyFilters}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg">Apply
                        Filters
                    </button>
                    <button
                        onClick={handleClearAll}
                        className="w-full border border-slate-300 text-slate-600 text-sm font-medium py-2.5 rounded-lg hover:bg-slate-50">Clear
                        All
                    </button>
                </div>

                {/* <!-- Listings grid --> */}
                <div className="flex-1 p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Browse Marketplace</h1>
                            <p className="text-sm text-slate-500 mt-1">{data.length} listings found</p>
                        </div>
                        <select
                            value={sort} onChange={(e) => setSort(e.target.value)}
                            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Sort: Most Relevant</option>
                            <option>Sort: Newest First</option>
                            <option>Sort: Price Low to High</option>
                            <option>Sort: Price High to Low</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                        {data.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                <img src={import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_WASTELISTING_IMAGES_ACCESSING_URL + item.image}
                                    className="w-full h-40 object-cover"
                                    alt="Shredded HDPE Pellets" />
                                <div className="p-4">
                                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.title}</h3>
                                    <p className="text-xs text-slate-500 mb-1">{item.quantity} {item.unit} &middot; {item.category}</p>
                                    <Link to={`/buyer/listing-detail/${item._id}`}>
                                        <button
                                            className="w-full text-xs font-medium border border-slate-300 text-slate-700
                                        rounded-lg py-2 hover:bg-slate-50">View
                                            Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default BuyerBrowseMarketplace
