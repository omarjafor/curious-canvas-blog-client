import { Link } from "react-router-dom"; 
import Skeleton from "react-loading-skeleton";
import useWishlist from "../../Hooks/useWishlist";
import WishlistCard from "./WishlistCard";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";


const Wishlist = () => {
    const { user } = useAuth();
    const { isLoading, wishlistBlog } = useWishlist();
    const name = user?.displayName;
    const email = user?.email;
    

    if (isLoading) return <div className="mx-auto items-center text-center">
        <Skeleton count={10} />
        <span className="loading loading-spinner loading-lg text-info"></span>
        <span className="loading loading-bars loading-lg text-info"></span>
        <span className="loading loading-dots loading-lg text-info"></span>
        <Skeleton count={10} />
    </div>;
    
    return (
        <div className='lg:px-12 dark:bg-gray-900'>
            <Helmet>
                <title>Curious Canvas | Wishlist</title>
            </Helmet>
            <div className='py-16 text-center'>
                <h1 className='text-4xl font-bold drop-shadow-[-1px_3px_1px_rgba(17,131,6,0.6)] bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent'>Dear {name} Wishlist</h1>
                <p className='max-w-3xl mx-auto my-4 text-base text-indigo-600'> {email} </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-24 pb-12 justify-items-center">
                {
                    wishlistBlog?.map(blog => <WishlistCard
                    blog={blog}
                    key={blog?._id}
                    ></WishlistCard>)
                }
            </div>
            {wishlistBlog?.length == 0 &&
                <div className="flex justify-center text-center justify-items-center items-center mx-10">
                    <div className="my-6">
                        <img src="https://i.ibb.co/Qc5WQgQ/emptycart.png" alt="" className='h-[450px]' />
                        <h2 className="text-black font-bold text-3xl mb-3 drop-shadow-[-1px_3px_1px_rgba(17,131,6,0.6)] bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">Your Wishlist is Empty! Browse Our Blogs!</h2>
                        <Link to='/'
                            className="block w-3/5 select-none rounded-lg bg-blue-500 hover:bg-green-500 py-3 px-3 font-bold uppercase text-white hover:text-black transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mx-auto"
                            type="button"
                        >
                            Start Explor Blog
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
};

export default Wishlist;