import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useWishlist from "../../Hooks/useWishlist";
import toast from "react-hot-toast";


const BlogCard = ({ blog }) => {
    const { user } = useAuth();
    const { mutateAsync } = useWishlist();
    const navigate = useNavigate();
    const email = user?.email;

    const { _id, blogTitle, blogCategory, longDescription, shortDescription, photo, rating } = blog || {};
    const blogId = _id;

    const handlewishlist = async e => {
        e.preventDefault();
        if (!user?.email) {
            return navigate('/login')
        }
        const wishlistBlog = { blogTitle, blogCategory, shortDescription, longDescription, photo, rating, email, blogId }
        console.log(wishlistBlog);

        try {
            await mutateAsync(wishlistBlog)
            toast.success('Added To Wishlist Successful');
        } catch (err) {
            toast.error('Something went wrong! Try Again😒')
            console.log(err);
        }
    }

    return (
        <div>
            <ul>
                <li className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                    <div className="order-1 sm:ml-6 xl:ml-0">
                        <h3 className="mb-1 text-slate-900 font-semibold dark:text-slate-200">
                            <span className="mb-1 block text-sm leading-6 text-indigo-500">Blog Category</span>Blog Title</h3>
                        <div className="prose prose-slate prose-sm text-slate-600 dark:prose-dark">
                            <p>Blog Short Description</p>
                        </div>
                        <div className="flex gap-5 p-6 pt-0">
                            <button onClick={handlewishlist}
                                className="block w-1/2 select-none rounded-lg bg-blue-600 hover:bg-green-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white hover:text-black transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                Wishlist
                            </button>
                            <Link to={`/blogdetails/${_id}`}
                                className="block w-1/2 select-none rounded-lg bg-blue-600 hover:bg-green-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white hover:text-black transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                Details
                            </Link>
                        </div>
                    </div><img src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg" alt="" className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" width="1216" height="640" />
                </li>
            </ul>
        </div>
    );
};

export default BlogCard;