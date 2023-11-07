import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReactStars from 'react-stars';
import useAuth from "../../Hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const WishlistCard = ({ blog, wishlistBlog, setWishlistBlog }) => {
    const queryClient = useQueryClient()

    const { user } = useAuth();

    const { _id, blogTitle, blogCategory, shortDescription, photo, rating, blogId } = blog || {};

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => await fetch(`http://localhost:5000/wishlist/${id}`, {
            method: 'DELETE'
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(['wishlist'])
        },
    })

    const handleRemove = async id => {
        await Swal.fire({
            title: 'Are you sure?',
            text: "Blog Will Be Deleted From Wishlist",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sure, Delete it'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    mutateAsync(id)
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                Swal.fire(
                                    'Deleted!',
                                    'Your Wishlist Blog has been Deleted',
                                    'success'
                                )
                                const remaining = wishlistBlog.filter(blog => blog._id !== id);
                                setWishlistBlog(remaining);
                            }
                        })
                } catch (err) {
                    console.log(err);
                }
            }
        })
    }

    return (
        <div className="flex flex-col justify-center rounded-t-lg items-center bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full">
                <img src={photo} alt="Mountain" className="w-full h-64 object-cover" />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2"> {blogTitle} </h2>
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2"> {blogCategory} </h2>
                        <ReactStars
                            count={5}
                            value={Number(rating)}
                            size={24}
                            color2={'#ffd700'} />
                    </div>
                    <p className="text-gray-700 leading-tight mb-4">
                        {shortDescription}
                    </p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={user?.photoURL} alt="Avatar" className="w-8 h-8 rounded-full mr-2 object-cover" />
                            <span className="text-gray-800 font-semibold"> {user?.displayName} </span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleRemove(_id)}
                                className="block w-1/2 select-none rounded-lg bg-blue-600 hover:bg-green-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white hover:text-black transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                Remove
                            </button>
                            <Link to={`/blogdetails/${blogId}`}
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