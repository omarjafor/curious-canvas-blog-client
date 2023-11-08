import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { useMutation } from "@tanstack/react-query";
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const BlogCard = ({ blog }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const email = user?.email;

    const { _id, blogTitle, blogCategory, longDescription, shortDescription, photo, rating } = blog || {};
    const blogId = _id;

    useEffect(() => {

        AOS.refresh();

        AOS.init({
            offset: 120,
            duration: 3000,
        });


    }, [])

    const { mutateAsync } = useMutation({
        mutationFn: async (wishlistBlog) => await fetch('https://blog-website-server-blue.vercel.app/wishlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(wishlistBlog)
        })
    })

    if (loading) return <div className="mx-auto items-center text-center">
        <Skeleton count={10} />
        <span className="loading loading-spinner loading-lg text-info"></span>
        <span className="loading loading-bars loading-lg text-info"></span>
        <span className="loading loading-dots loading-lg text-info"></span>
        <Skeleton count={10} />
    </div>;

    const handlewishlist = async e => {
        e.preventDefault();
        if (!user?.email) {
            return navigate('/login')
        }
        const wishlistBlog = { blogTitle, blogCategory, shortDescription, longDescription, photo, rating, email, blogId }

        try {
            await mutateAsync(wishlistBlog)
            toast.success('Added To Wishlist Successful');
        } catch (err) {
            toast.error('Something went wrong! Try Again😒')
            console.log(err);
        }
    }

    return (
        <PhotoProvider>
            <div data-aos="zoom-in-up">
                <div className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                    <div className="order-1 sm:ml-6 xl:ml-0 w-full">
                        <h3 className="mb-1 text-slate-900 font-semibold dark:text-slate-200">
                            <span className="mb-1 block text-sm leading-6 text-indigo-500"> {blogCategory} </span> {blogTitle} </h3>
                        <div className="prose prose-slate prose-sm text-slate-600 dark:prose-dark">
                            <p>{shortDescription} </p>
                        </div>
                        <div className="flex gap-5 mt-4 sm:w-2/4">
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
                    </div>
                    <PhotoView src={photo}>
                        <img src={photo} alt="" className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" width="1216" height="640" style={{ objectFit: 'cover' }} />
                    </PhotoView>
                </div>
            </div>
        </PhotoProvider>
    );
};

export default BlogCard;