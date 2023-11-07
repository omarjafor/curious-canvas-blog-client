import BlogCard from "./BlogCard";


const AllBlogs = () => {
    
    return (
        <div >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                <BlogCard></BlogCard>
            </div>
        </div>
    );
};

export default AllBlogs;