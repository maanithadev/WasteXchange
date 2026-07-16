import { useEffect, useState } from "react"
import axios from "axios"

const AdminListingModeration = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get("http://localhost:3000/api/wastelistings/get-all-wastelistings", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            setData(res.data)
        }
        fetchData()
    }, [])
    console.log(data)

    return (
        <>
            {/* <!-- LISTING MODERATION PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-slate-900">Listing Moderation</h1>
                    <p class="text-sm text-slate-500 mt-1">Review listings pending approval or flagged by users</p>
                </div>

                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-slate-50 border-b border-slate-200">
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Listing</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Seller</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Price</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Submitted</th>
                                    <th class="text-right font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td class="px-6 py-3.5">
                                            <div class="flex items-center gap-3">
                                                <img src={`http://localhost:3000/images/${item.image}`} class="w-10 h-10 rounded-lg object-cover" alt="Industrial Solvent Drums" />
                                                <div>
                                                    <p class="font-medium text-slate-800">{item.title}</p>
                                                    <p class="text-xs text-slate-400">{item.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-3.5 text-slate-600">{item.seller_id?.company_name}</td>
                                        <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-green-200 text-red-700 px-2 py-0.5 rounded-full">{item.currency === "LKR" ? "RS." : "$"}{item.price}</span></td>
                                        <td class="px-6 py-3.5 text-slate-500">{item.created_at}</td>
                                        <td class="px-6 py-3.5 text-right space-x-1 whitespace-nowrap">
                                            {/* <button class="text-xs font-medium bg-emerald-600 text-white rounded-md px-2.5 py-1 hover:bg-emerald-700">Approve</button> */}
                                            <button class="text-xs font-medium bg-red-600 text-white rounded-md px-2.5 py-1 hover:bg-red-700">Reject</button>
                                            <button class="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminListingModeration
