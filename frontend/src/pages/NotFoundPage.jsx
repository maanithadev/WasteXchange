import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="w-full h-[60vh] flex justify-center items-center text-2xl font-medium">
            <p>Page Not Found <Link to="/" className="underline">Go to Home</Link></p>
        </div>
    )
}
export default NotFoundPage
