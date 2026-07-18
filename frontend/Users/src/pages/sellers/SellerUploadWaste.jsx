import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const SellerUploadWaste = () => {
    const wasteCategories = ["Construction", "Metals", "Wood"]
    const units = ["kg", "tons", "lbs", "units", "m3"]
    const currencyList = ["LKR", "$"]
    const statusList = ["Active", "Pending", "Draft"]

    const [data, setData] = useState({})
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState("")
    const [currentStep, setCurrentStep] = useState("step1")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm({
        values: {
            image: image || "",
            title: data.title,
            category: data.category,
            quantity: data.quantity,
            unit: data.unit,
            colour: data.colour,
            description: data.description,
            price: data.price,
            currency: data.currency,
            location: {
                street: "street",
                city: "city",
                state: "state",
                postal_code: "postal_code"
            },
            status: "Active"
        }
    })

    function handleChange(e) {
        setCurrentStep("step1")
        setImage(e.target.files[0])
        const imageURL = URL.createObjectURL(e.target.files[0])
        setImagePreview(imageURL)
    }

    async function handleClick() {
        setCurrentStep("step1")
        const imageData = new FormData()
        imageData.append("image", image)

        try {
            setLoading(true)
            const response = await fetch(import.meta.env.VITE_SELLER_UPLOAD_WASTE_URL, {
                method: "POST",
                body: imageData,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            const result = await response.json();
            const updatedDescription = result?.description.map(item => {
                return `- ${item}\n`
            }).join("")
            setData({ ...result, description: updatedDescription })
            setCurrentStep("step2")
            setLoading(false)
        } catch (err) {
            console.error("Error:", err);
        }
    }

    async function onSubmit(data) {
        const saveFormData = new FormData()
        saveFormData.append("image", image)
        saveFormData.append("title", data.title)
        saveFormData.append("category", data.category)
        saveFormData.append("quantity", data.quantity)
        saveFormData.append("unit", data.unit)
        saveFormData.append("colour", data.colour)
        saveFormData.append("description", data.description)
        saveFormData.append("price", data.price)
        saveFormData.append("currency", data.currency)
        saveFormData.append("street", data.location?.street)
        saveFormData.append("city", data.location?.city)
        saveFormData.append("state", data.location?.state)
        saveFormData.append("postal_code", data.location?.postal_code)
        saveFormData.append("status", data.status)

        try {
            setLoading(true)
            const response = await fetch(import.meta.env.VITE_SELLER_UPLOAD_WASTE_SAVE_URL, {
                method: "POST",
                body: saveFormData,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            await response.json();
            setLoading(false)
            navigate("/seller/my-listings")
        } catch (err) {
            console.error("Error:", err);
        }
    }

    if (loading) return <Loading />

    return (
        <>
            {/* <!-- UPLOAD WASTE PAGE --> */}
            <main className="flex-1 px-8 pt-8 pb-15 bg-slate-50 min-h-screen">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Upload Waste</h1>
                    <p className="text-sm text-slate-500 mt-1">List a new waste material for buyers to discover</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* <!-- Form --> */}
                    <form className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 space-y-6">
                        {/* <!-- Image upload --> */}
                        <div>
                            <label htmlFor="image">
                                <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-2">Waste
                                    Image</label>
                                <div
                                    className="min-h-80 border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-center overflow-hidden cursor-pointer">
                                    {!imagePreview
                                        ? <div className="flex flex-col justify-center items-center py-12 px-6">
                                            <svg className="w-10 h-10 text-slate-400 mb-3" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <p className="text-sm font-medium text-slate-600">Drag and drop images
                                                here</p>
                                            <p className="text-xs text-slate-400 mt-1">or click to browse (PNG, JPG up
                                                to 10MB)</p>
                                        </div>
                                        : <img src={imagePreview} alt="" className="w-full " />}
                                </div>
                            </label>
                            <input type="file" id="image" hidden onChange={handleChange} />
                        </div>
                        <button type="button"
                            className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
                            onClick={handleClick}>Submit
                        </button>

                        {currentStep === "step2" && <>

                            {/* <!-- Title --> */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Waste Title</label>
                                <input type="text" placeholder="e.g. Shredded HDPE Plastic Pellets"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("title")} />
                            </div>

                            {/* <!-- Category + Quantity/Unit --> */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Waste
                                        Category</label>
                                    <select
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("category")}>
                                        {wasteCategories.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
                                    <input type="number" placeholder="e.g. 500"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("quantity")} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Unit</label>
                                    <select
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("unit")}>
                                        {units.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* <!-- Colour --> */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Waste Colour</label>
                                <input type="text" placeholder="e.g. Shredded HDPE Plastic Pellets"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("colour")} />
                            </div>

                            {/* <!-- Description --> */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                                <textarea
                                    placeholder="Describe the material condition, contamination level, packaging, etc."
                                    className="w-full min-h-50 rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("description")}></textarea>
                            </div>

                            {/* <!-- Pricing + Currency --> */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
                                    <input type="number" placeholder="e.g. 500"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("price")} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                                    <select
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("currency")}>
                                        {currencyList.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <hr />

                            {/* <!-- Location --> */}
                            <div className="flex flex-col gap-2">
                                <label className="block text-md font-medium text-slate-700">Pickup Location,</label>
                                {/* <input type="text" placeholder="e.g. 1200 Industrial Way, Newark, NJ" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" /> */}
                                <div className="flex justify-start items-center gap-3">
                                    <label className="block text-sm font-medium text-slate-700">Street</label>
                                    <input type="text"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("location.street")} />
                                </div>
                                <div className="flex justify-start items-center gap-3">
                                    <label className="block text-sm font-medium text-slate-700">City</label>
                                    <input type="text"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("location.city")} />
                                </div>
                                <div className="flex justify-start items-center gap-3">
                                    <label className="block text-sm font-medium text-slate-700">State</label>
                                    <input type="text"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("location.state")} />
                                </div>
                                <div className="flex justify-start items-center gap-3 w-full">
                                    <label className="block min-w-19 text-sm font-medium text-slate-700">Postal
                                        Code</label>
                                    <input type="text"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("location.postal_code")} />
                                </div>
                            </div>

                            {/* <!-- Status --> */}
                            <div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                                    <select
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("status")}>
                                        {statusList.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button"
                                    className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
                                    onClick={handleSubmit(onSubmit)}>Submit Listing
                                </button>
                            </div>
                        </>}
                    </form>

                    {/* <!-- AI classNameification sidebar panel --> */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 h-fit">
                        <h2 className="text-sm font-semibold text-slate-900 mb-4">Waste Category Confidence Score</h2>
                        {data.confidence_score &&
                            <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <span
                                        className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path
                                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        {data.category}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 mb-1">Confidence Score</p>
                                <div className="w-full bg-white rounded-full h-2 mb-1 border border-emerald-100">
                                    <div className="bg-emerald-500 h-2 rounded-full"
                                        style={{ width: data.confidence_score }}></div>
                                </div>
                                <p className="text-xs font-semibold text-emerald-700">{data.confidence_score} confidence</p>
                            </div>}
                        <p className="text-xs text-slate-400 mt-4">This will update automatically after
                            you upload an image. You can override the category manually above if needed.</p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SellerUploadWaste
