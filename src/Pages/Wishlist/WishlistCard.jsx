import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const WishlistCard = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col justify-center items-center bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full">
                <img src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606" alt="Mountain" className="w-full h-64 object-cover" />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Blog title Name</h2>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Category Name</h2>
                    <p className="text-gray-700 leading-tight mb-4">
                        Short Description Here, consectetur adipiscing elit. Aliquam eu sapien porttitor, blandit velit ac,
                        vehicula elit. Nunc et ex at turpis rutrum viverra.
                    </p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={user?.photoURL} alt="Avatar" className="w-8 h-8 rounded-full mr-2 object-cover" />
                            <span className="text-gray-800 font-semibold"> {user?.displayName} </span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="block w-1/2 select-none rounded-lg bg-blue-600 hover:bg-green-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white hover:text-black transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                Remove
                            </button>
                            <Link
                                className="block w-1/2 select-none rounded-lg bg-blue-600 hover:bg-green-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white hover:text-black transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistCard;