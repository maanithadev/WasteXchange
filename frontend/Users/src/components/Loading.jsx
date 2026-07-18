const Loading = () => {
    return (
        <main className="flex-1 p-8 bg-slate-50 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading...</p>
            </div>
        </main>
    )
}
export default Loading
