import {  useQuery } from "@tanstack/react-query";
import ReactStars from 'react-stars';
import { Helmet } from "react-helmet-async";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Comments from "./Comments";
import useAuth from "../../Hooks/useAuth";


const BlogDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();

    const { data: blog, isLoading } = useQuery({
        queryKey: ['blogDetails', id],
        queryFn: async () => await fetch(`http://localhost:5000/blogs/${id}`).then(
            (res) => res.json(),
        ),
    })

    if (isLoading) return <div className="mx-auto items-center text-center">
        <Skeleton count={10} />
        <span className="loading loading-spinner loading-lg text-info"></span>
        <span className="loading loading-bars loading-lg text-info"></span>
        <span className="loading loading-dots loading-lg text-info"></span>
        <Skeleton count={10} />
    </div>;

    const { _id, blogTitle, blogCategory, longDescription, shortDescription, rating, photo, email } = blog || {} ;

    return (
        <div className="dark:bg-gray-900">
            <Helmet>
                <title>Curious Canvas | Blog Details</title>
            </Helmet>
            <div className="mx-auto py-12 w-5/6 grid gap-10 grid-cols-1 lg:grid-cols-2 justify-items-center">
                <div className="mb-12 flex flex-col overflow-hidden rounded-xl shadow-md">
                    <img
                        alt="details"
                        className="h-[700px] w-full object-cover object-center"
                        src={photo}
                    />
                </div>
                <div className="text-left">
                    <div className="flex mb-4">
                        <img src="https://i.ibb.co/1rd2fW3/bookmark.png" alt="bookmark" className="h-8 w-8" />
                        <h4 className="text-2xl font-semibold dark:text-white"> Featured Blog </h4>
                    </div>
                    <h2 className="mb-6 block text-4xl font-bold leading-[1.3] tracking-normal text-[#0B0B0B] dark:text-white antialiased">
                        {blogTitle}
                    </h2>
                    <div className="flex mb-5">
                        <div className="flex items-center p-4 mr-2 w-1/3 rounded-md bg-gray-200">
                            <img src="https://i.ibb.co/p3g8n8W/category.png" alt="" className="h-8 w-8" />
                            <div className="ml-4">
                                <h4 className="font-bold text-[#878787] text-base">Blog Category</h4>
                                <h2 className="font-bold text-sm lg:text-lg uppercase"> {blogCategory} </h2>
                            </div>
                        </div>
                        <div className="flex items-center p-4 mr-2 w-1/3 rounded-md bg-gray-200">
                            <img src="https://i.ibb.co/TYZ7pLK/quality.png" alt="" className="h-8 w-8" />
                            <div className="ml-4">
                                <h4 className="font-bold text-[#878787] text-base"> Blog Quality</h4>
                                <h2 className="font-bold text-sm lg:text-lg uppercase">  Original and Unique </h2>
                            </div>
                        </div>
                        <div className="flex items-center p-4 w-1/3 rounded-md bg-gray-200">
                            <img src="https://i.ibb.co/qN4Lkrc/type.png" alt="" className="h-8 w-8" />
                            <div className="ml-4">
                                <h4 className="font-bold text-[#878787] text-base">Blog Type</h4>
                                <h2 className="font-bold text-sm lg:text-lg uppercase"> {blogCategory} </h2>
                            </div>
                        </div>
                    </div>
                    <p className="block text-xl font-semibold text-justify leading-8 text-gray-900 dark:text-white antialiased">
                        {shortDescription}
                    </p>
                    <p className="block text-lg font-normal text-justify leading-8 text-gray-900 dark:text-white antialiased">
                        {longDescription} Stay informed with the latest news, indulge in the world of entertainment, and so much more. With each visit, you embark on a unique adventure, whether you&apos;re a seasoned explorer or just getting started. Our blogs are your window to the world&apos;s wonders, your source of inspiration, and your opportunity to engage with a vibrant community of like-minded individuals.
                    </p>
                    <div className="flex items-center p-2 w-2/4 lg:w-1/3 my-4 rounded-md bg-green-400 hover:bg-blue-400">
                        <img src="https://i.ibb.co/nLy6sYf/ratings.png" alt="" className="h-8 w-8" />
                        <div className="ml-3">
                            <h4 className="font-bold text-black hover:text-white text-base">Blog Ratings</h4>
                            <ReactStars
                                count={5}
                                value={Number(rating)}
                                size={24}
                                color2={'#ffd700'} />
                        </div>
                    </div>
                    {
                        user?.email == email && <Link to={`/updateblog/${_id}`}
                            className="px-5 py-2 my-3 rounded-lg font-bold btn btn-wide bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 hover:bg-green-500 text-white hover:text-black">
                            Update Blog
                        </Link>
                    }
                </div>
            </div>
            <Comments 
            id={_id}
                email={email}
            ></Comments>
        </div>
    );
};

export default BlogDetails;