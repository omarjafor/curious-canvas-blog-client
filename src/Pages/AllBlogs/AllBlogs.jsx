import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { BsSearch } from "react-icons/bs";


const AllBlogs = () => {
    const [showBlog, setShowBlog] = useState([]);
    const [category, setCategory] = useState('');
    const [searchTitle, setSearchTitle] = useState('');

    useEffect( () => {
        fetch('http://localhost:5000/allblogs')
        .then(res => res.json())
        .then(data => setShowBlog(data))
    } , [])

    const filteredData = showBlog.filter((item) => {
        const categoryMatch = category ? item.blogCategory == category : true;
        const titleMatch = searchTitle ? item.blogTitle.toLowerCase().includes(searchTitle.toLowerCase()) : true;
        return categoryMatch && titleMatch;
    });
    
    return (
        <div className="">
            <div className="flex flex-col w-full items-center pt-4 gap-4 bg-gradient-to-b from-blue-600 via-blue-300 to-blue-100">
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
            <div className="flex justify-end my-3">
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
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
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