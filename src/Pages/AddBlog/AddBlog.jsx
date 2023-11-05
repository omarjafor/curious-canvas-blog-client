import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const AddBlog = () => {
    const { user } = useAuth();
    
    const handleAddBlog = e => {
        e.preventDefault();
        const blogTitle = e.target.name.value;
        const blogCategory = e.target.category.value;
        const longDescription = e.target.longDescription.value;
        const shortDescription = e.target.shortDescription.value;
        const rating = e.target.rating.value;
        const photo = e.target.photo.value;
        const timeStamp = Date.now();
        const email = user.email;

        const blog = { blogTitle, blogCategory, longDescription, shortDescription, rating, photo, timeStamp, email }
        console.log(blog);

        fetch('http://localhost:5000/blogs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(blog)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Blog Added Successful');
                e.target.reset();
            })
    }

    return (
        <div className="p-24 dark:bg-gray-900">
            <Helmet>
                <title>Curious Canvas | Add Blog</title>
            </Helmet>
            <h2 className="text-3xl text-center font-extrabold mb-3 drop-shadow-[-1px_3px_1px_rgba(17,131,6,0.6)] bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">Add Your New Blog</h2>
            <p className="text-2xl text-center font-bold mb-10 drop-shadow-[-1px_3px_1px_rgba(17,131,6,0.6)] bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">Give Your Entire Blog Details Here</p>
            <form onSubmit={handleAddBlog} >
                {/* form name and quantity row */}
                <div className="md:flex mb-8 md:justify-center md:justify-items-center">
                    <div className="form-control md:w-1/3">
                        <label className="label">
                            <span className="font-bold text-lg text-purple-600">Blog Title</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="name" placeholder="Blog Name" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/3 ml-4">
                        <label className="label">
                            <span className="font-bold text-lg text-purple-600">Blog Category</span>
                        </label>
                        <select className="select select-info w-full max-w-xs" name="category">
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
                {/* form supplier row */}
                <div className="md:flex mb-8 md:justify-center md:justify-items-center">
                    <div className="form-control md:w-1/3">
                        <label className="label">
                            <span className="font-bold text-lg text-purple-600">Long Description</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="longDescription" placeholder="Long Description" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/3 ml-4">
                        <label className="label">
                            <span className="font-bold text-lg text-purple-600">Photo URL</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                {/* form category and details row */}
                <div className="md:flex mb-8 md:justify-center md:justify-items-center">
                    <div className="form-control md:w-1/3">
                        <label className="label">
                            <span className="font-bold text-lg text-purple-600">Short Description</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="shortDescription" placeholder="Short Description" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/3 ml-4">
                        <label className="label">
                            <span className="font-bold text-lg text-purple-600">Ratings</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="rating" placeholder="Ratings" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                {/* form submit button row */}
                <div className="mx-auto text-center">
                    <input type="submit" value="Submit Your Blog" className="btn btn-block bg-purple-500 hover:bg-green-500 text-white hover:text-black md:w-1/4" />
                </div>
            </form>
        </div>
    );
};

export default AddBlog;