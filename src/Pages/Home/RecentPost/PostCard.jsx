import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ReactStars from 'react-stars';
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';

const PostCard = ({ blog }) => {
    const { user } = useAuth();
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
        mutationFn: async (wishlistBlog) => await fetch('   https://blog-website-server-blue.vercel.app/wishlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(wishlistBlog)
        })
    })

    const handlewishlist = async e => {
        e.preventDefault();
        if(!user?.email){
            return navigate('/login')
        }
        const wishlistBlog = { blogTitle, blogCategory, shortDescription, longDescription, photo, rating, email, blogId }

        try{
            await mutateAsync(wishlistBlog)
            toast.success('Added To Wishlist Successful');
        } catch(err){
            toast.error('Something went wrong! Try Again😒')
            console.log(err);
        }
    }

    return (
        <PhotoProvider>
            <section className="py-8 dark:bg-gray-900" data-aos="zoom-in-up">
                <div data-aos="zoom-in-up" className="relative flex w-96 flex-col rounded-xl bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 dark:from-gray-700 dark:via-gray-900 dark:to-black hover:bg-green-400 bg-clip-border text-gray-700 shadow-md">
                    <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white  bg-clip-border text-gray-700">
                        <PhotoView src={photo}>
                            <img
                                src={photo}
                                className="h-full w-full object-cover"
                            />
                        </PhotoView>
                    </div>
                    <div className="p-6">
                        <div className="mb-2 text-center">
                            <p className="text-lg font-bold text-black dark:text-white antialiased">
                                {blogTitle}
                            </p>
                        </div>
                        <div className="">
                            <div>
                                <p className="text-base font-bold leading-relaxed text-left dark:text-white text-slate-800">
                                    {shortDescription}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold text-black dark:text-white antialiased">
                                    {blogCategory}
                                </p>
                                <ReactStars
                                    count={5}
                                    value={Number(rating)}
                                    size={24}
                                    color2={'#ffd700'} />
                            </div>
                        </div>
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
                </div>
            </section>
        </PhotoProvider>
    );
};

export default PostCard;