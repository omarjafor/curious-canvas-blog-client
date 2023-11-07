import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";


const UpdateBlog = () => {
    const axiosSecure = useAxios();
    const { id } = useParams();
    const queryClient = useQueryClient()

    const { data: blog, isLoading } = useQuery({
        queryKey: ['blogUpdate', id],
        queryFn: async () => await fetch(`http://localhost:5000/blogs/${id}`).then(
            (res) => res.json(),
        ),
    })

    const { blogTitle, blogCategory, longDescription, shortDescription, rating, photo, email } = blog || {};

    const { mutateAsync } = useMutation({
        mutationFn: async (updateblog) => await axiosSecure.put(`/blogs/${id}`, updateblog),
        onSuccess: () => {
            queryClient.invalidateQueries(['blogUpdate'])
        },
    })

    if (isLoading) return <div className="mx-auto items-center text-center">
        <Skeleton count={10} />
        <span className="loading loading-spinner loading-lg text-info"></span>
        <span className="loading loading-bars loading-lg text-info"></span>
        <span className="loading loading-dots loading-lg text-info"></span>
        <Skeleton count={10} />
    </div>;

    const handleUpdateBlog = async e => {

        e.preventDefault();
        const blogTitle = e.target.name.value;
        const blogCategory = e.target.category.value;
        const longDescription = e.target.longDescription.value;
        const shortDescription = e.target.shortDescription.value;
        const rating = e.target.rating.value;
        const photo = e.target.photo.value;
        const timeStamp = Date.now();

        const updateblog = { blogTitle, blogCategory, longDescription, shortDescription, rating, photo, timeStamp, email }

        try {
            await mutateAsync(updateblog)
            toast.success('Blog Updated Successful');
        } catch (err) {
            console.log(err);
            toast.error('You Cannot Update Blog');
        }
    }

    return (
        <div className="p-24 dark:bg-gray-900">
            <Helmet>
                <title>Curious Canvas | Update Blog</title>
            </Helmet>
            <h2 className="text-3xl text-center font-extrabold mb-3 drop-shadow-[-1px_3px_1px_rgba(17,131,6,0.6)] bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">Update {blogTitle} </h2>
            <p className="text-2xl text-center font-bold mb-10 drop-shadow-[-1px_3px_1px_rgba(17,131,6,0.6)] bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">You Can Update {blogTitle} Details Here</p>
            <form onSubmit={handleUpdateBlog} >
                {/* form name and quantity row */}
                <div className="md:flex mb-8 md:justify-center md:justify-items-center">
                    <div className="form-control md:w-1/3">
                        <label className="label">
                            <span className="font-bold text-lg text-purple-600">Blog Title</span>
                        </label>
                        <label className="input-group" key={blogTitle}>
                            <input type="text" name="name" placeholder="Blog Name" className="input input-bordered w-full" defaultValue={blogTitle} />
                        </label>
                    </div>
                    <div className="form-control md:w-1/3 ml-4" key={blogCategory}>
                        <label className="label">
                            <span className="font-bold text-lg text-purple-600">Blog Category</span>
                        </label>
                        <select className="select select-info w-full max-w-xs" name="category" defaultValue={blogCategory}>
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
                        <label className="input-group" key={longDescription}>
                            <input type="text" name="longDescription" placeholder="Long Description" className="input input-bordered w-full" defaultValue={longDescription} />
                        </label>
                    </div>
                    <div className="form-control md:w-1/3 ml-4">
                        <label className="label">
                            <span className="font-bold text-lg text-purple-600">Photo URL</span>
                        </label>
                        <label className="input-group" key={photo}>
                            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full" defaultValue={photo} />
                        </label>
                    </div>
                </div>
                {/* form category and details row */}
                <div className="md:flex mb-8 md:justify-center md:justify-items-center">
                    <div className="form-control md:w-1/3">
                        <label className="label">
                            <span className="font-bold text-lg text-purple-600">Short Description</span>
                        </label>
                        <label className="input-group" key={shortDescription}>
                            <input type="text" name="shortDescription" placeholder="Short Description" className="input input-bordered w-full" defaultValue={shortDescription} />
                        </label>
                    </div>
                    <div className="form-control md:w-1/3 ml-4">
                        <label className="label">
                            <span className="font-bold text-lg text-purple-600">Ratings</span>
                        </label>
                        <label className="input-group" key={rating}>
                            <input type="text" name="rating" placeholder="Ratings" className="input input-bordered w-full" defaultValue={rating} />
                        </label>
                    </div>
                </div>
                {/* form submit button row */}
                <div className="mx-auto text-center">
                    <input type="submit" value="Update Your Blog" className="btn btn-block bg-purple-500 hover:bg-green-500 text-white hover:text-black md:w-1/4" />
                </div>
            </form>
        </div>
    );
};

export default UpdateBlog;