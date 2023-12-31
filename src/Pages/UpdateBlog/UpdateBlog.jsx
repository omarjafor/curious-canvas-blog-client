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
        queryFn: async () => await fetch(`   https://blog-website-server-blue.vercel.app/blogs/${id}`).then(
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
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        toast.success('Blog Updated Successful');
                    }else{
                        toast.error('You Cannot Update Blog');
                    }
                })
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