import { Link } from "react-router-dom";
import ReactStars from 'react-stars';

const PostCard = ({ blog }) => {

    const { _id, blogTitle, blogCategory, shortDescription, photo, rating  } = blog || {};

    return (
        <section className="py-8 dark:bg-gray-900">
            <div className="relative flex w-96 flex-col rounded-xl bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 dark:from-gray-700 dark:via-gray-900 dark:to-black hover:bg-green-400 bg-clip-border text-gray-700 shadow-md">
                <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white  bg-clip-border text-gray-700">
                    <img
                        src={photo}
                        className="h-full w-full object-cover"
                    />
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
                    <Link to={`/updateProduct/${_id}`}
                        className="block w-1/2 select-none rounded-lg bg-blue-600 hover:bg-green-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white hover:text-black transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        Wishlist
                    </Link>
                    <Link to={`/productdetails/${_id}`}
                        className="block w-1/2 select-none rounded-lg bg-blue-600 hover:bg-green-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white hover:text-black transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PostCard;