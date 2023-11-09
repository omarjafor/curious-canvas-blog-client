import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import Skeleton from "react-loading-skeleton";
import WishlistCard from "./WishlistCard";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useAxios from "../../Hooks/useAxios";


const Wishlist = () => {
    const { user, loading } = useAuth();
    const [ wishlistBlog, setWishlistBlog ] = useState()
    const name = user?.displayName;
    const email = user?.email;
    
    const axiosSecure = useAxios();

    const url = `/wishlist?email=${user?.email}`;

    useEffect(() => {
        axiosSecure.get(url)
            .then(res => setWishlistBlog(res.data))
    }, [axiosSecure, url])

    if (loading) return <div className="mx-auto items-center text-center">
        <Skeleton count={10} />
        <div className="animate-pulse block-item shadow-md max-w-xl mx-auto mt-20">
            <div className="bg-gradient-to-t from-rose-400 via-fuchsia-500 to-indigo-500 h-6 rounded-t-3xl"></div>
            <div className="py-4 px-6">
                <div className="flex items-center space-x-2">
                    <div className="h-7 w-7 bg-gradient-to-t from-rose-400 via-fuchsia-500 to-indigo-500 rounded-full"></div>
                    <div className="h-3 bg-gradient-to-t from-rose-400 via-fuchsia-500 to-indigo-500 rounded-full w-1/3"></div>
                </div>
                <div className="my-6">
                    <div className="h-5 bg-gradient-to-t from-rose-400 via-fuchsia-500 to-indigo-500 rounded-full w-3/4"></div>
                    <div className="my-4">
                        <div className="h-3 my-2 bg-gradient-to-t from-rose-400 via-fuchsia-500 to-indigo-500 rounded-full w-full"></div>
                        <div className="h-3 my-2 bg-gradient-to-t from-rose-400 via-fuchsia-500 to-indigo-500 rounded-full w-5/6"></div>
                        <div className="h-3 my-2 bg-gradient-to-t from-rose-400 via-fuchsia-500 to-indigo-500 rounded-full w-4/6"></div>
                        <div className="h-3 my-2 bg-gradient-to-t from-rose-400 via-fuchsia-500 to-indigo-500 rounded-full w-5/6"></div>
                        <div className="h-3 my-2 bg-gradient-to-t from-rose-400 via-fuchsia-500 to-indigo-500 rounded-full w-3/6"></div>
                        <div className="h-3 my-2 bg-gradient-to-t from-rose-400 via-fuchsia-500 to-indigo-500 rounded-full w-2/6"></div>
                    </div>
                </div>
                <div className="my-4">
                    <div className="h-11 bg-gradient-to-t from-rose-400 via-fuchsia-500 to-indigo-500 rounded-lg w-full"></div>
                    <div className="h-3 my-4 mx-auto bg-gradient-to-t from-rose-400 via-fuchsia-500 to-indigo-500 rounded-full w-1/2"></div>
                </div>
            </div>
        </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-12 lg:mx-24 pb-12 justify-items-center">
                {
                    wishlistBlog?.map(blog => <WishlistCard
                        wishlistBlog={wishlistBlog}
                        setWishlistBlog={setWishlistBlog}
                    blog={blog}
                    key={blog?._id}
                    ></WishlistCard>)
                }
            </div>
            {wishlistBlog?.length == 0 &&
                <div className="flex justify-center text-center justify-items-center items-center mx-10">
                    <div className="my-4">
                        <img src="https://i.ibb.co/gm0NJvs/wishlist.webp" alt="" className='h-[450px]' />
                        <h2 className="text-black font-bold text-3xl my-3 drop-shadow-[-1px_3px_1px_rgba(17,131,6,0.6)] bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">Your Wishlist Blog is Empty! Browse Blogs!</h2>
                        <Link to='/'
                            className="block w-3/5 select-none rounded-lg bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 hover:bg-green-500 py-3 px-3 font-bold uppercase text-white hover:text-black transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mx-auto"
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