import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { BsSearch } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
import useBlogs from '../../Hooks/useBlogs';
import Skeleton from 'react-loading-skeleton';


const AllBlogs = () => {
    const { allBlogs, isLoading } = useBlogs();
    const [category, setCategory] = useState('');
    const [searchTitle, setSearchTitle] = useState('');

    useEffect(() => {

        AOS.refresh();
        AOS.init({
            offset: 120,
            duration: 3000,
        });

    }, [])

    if (isLoading) return <div className="mx-auto items-center text-center">
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

    const filteredData = allBlogs.filter((item) => {
        const categoryMatch = category ? item.blogCategory == category : true;
        const titleMatch = searchTitle ? item.blogTitle.toLowerCase().includes(searchTitle.toLowerCase()) : true;
        return categoryMatch && titleMatch;
    });
    
    return (
        <div className="">
            <Helmet>
                <title>Curious Canvas | All Blogs</title>
            </Helmet>
            <div className="flex flex-col w-full items-center pt-4 gap-4 bg-gradient-to-b from-blue-600 via-blue-300 to-blue-100" data-aos="zoom-in-up">
                <p className="text-4xl md:text-6xl font-extrabold text-white">Search By Blog Title</p>
                <form action="" className="max-w-[480px] w-full px-4">
                    <div className="relative mb-3">
                        <input type="text" name="search" className="relative w-full border h-12 shadow p-4 rounded-full placeholder:ml-4 cu" placeholder="Search Blog by Title" value={searchTitle} onChange={e => setSearchTitle(e.target.value)}/>
                            <p type="submit" className="absolute right-4 top-4">
                                <BsSearch></BsSearch>
                            </p>
                    </div>
                </form>
            </div>
            <div className="flex justify-end my-3" data-aos="zoom-in-up">
                <div className="form-control md:w-1/3 ml-4">
                    <label className="label">
                        <span className="font-bold text-lg text-purple-600">Blog Category</span>
                    </label>
                    <select className="select select-info w-full max-w-xs" name="category" value={category} onChange={ e => setCategory(e.target.value)}>
                        <option value=''>All Category</option>
                        <option>Fashion and Lifestyle</option>
                        <option>Travel Guides</option>
                        <option>Food and Cooking</option>
                        <option>Tech and Gadgets</option>
                        <option>Finance and Money</option>
                        <option>Fitness and Wellness</option>
                        <option>Book Reviews</option>
                        <option>Photography</option>
                        <option>Music and Entertainment</option>
                        <option>Product Reviews</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8" data-aos="zoom-in-up">
                {
                    filteredData?.map(blog => <BlogCard
                    blog={blog}
                    key={blog._id}
                    ></BlogCard>)
                }
            </div>
        </div>
    );
};

export default AllBlogs;