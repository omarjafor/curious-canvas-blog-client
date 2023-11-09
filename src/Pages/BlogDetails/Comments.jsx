import toast from "react-hot-toast";
import CommentCard from "./CommentCard";
import useAuth from "../../Hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import useAxios from "../../Hooks/useAxios";


const Comments = ({ id, email }) => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const queryClient = useQueryClient();

    const { data: comments, isLoading } = useQuery({
        queryKey: ['blogComment', id],
        queryFn: async () => await fetch(`   https://blog-website-server-blue.vercel.app/comments/${id}`).then(
            (res) => res.json(),
        ),
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (fullComment) => await axiosSecure.post('/comments', fullComment),
        onSuccess: () => {
            queryClient.invalidateQueries(['blogComment'])
        },
    })

    if (isLoading) return <div className="mx-auto items-center text-center">
        <Skeleton count={5} />
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
        <Skeleton count={5} />
    </div>;

    // console.log(comments, isLoading);

    const handleComments = async e => {
        e.preventDefault();
        const comment = e.target.comment.value;
        const name = user.displayName
        const photo = user.photoURL
        const email = user.email
        const blogId = id;
        const fullComment = { name, email, photo, blogId, comment }
        console.log(fullComment, comment.length);
        if (comment.length < 20) {
            return toast.error('Please write atleast 20 characters');
        }
            try{
                await mutateAsync(fullComment)
                .then(res => {
                    console.log(res.data);
                    toast.success('Comment Added Successful');
                    e.target.reset();
                })
                
            } catch (err) {
                console.log(err);
            }
    }
    return (
        <div className="py-10 px-6 flex flex-col justify-evenly gap-6 lg:flex-row lg:mx-20">
            <div className="space-y-3">
                {
                    comments.map(com => <CommentCard
                    key={com._id}
                        com={com}
                    ></CommentCard>)
                }
            </div>
            <div className="flex justify-center items-center mt-6 lg:mt-0">
                <form action="" onSubmit={handleComments}>
                    <div className="h-60 px-7 max-w-[700px] rounded-[12px] bg-white p-4 shadow-md border">
                        {
                            user.email == email ? 
                            <div className="align-middle">
                                <p className="text-2xl text-center font-bold text-blue-900 transition-all hover:text-black">
                                    You cannot comment on your own blog
                                </p>
                            </div> 
                            : 
                            <div>
                                <p className="text-xl font-bold text-blue-900 cursor-pointer transition-all hover:text-black">
                                    Add Comment
                                </p>
                                <textarea className="h-20 px-3 text-base py-1 mt-5 outline-none border-gray-300 w-full resize-none border rounded-lg placeholder:text-sm" placeholder="Add your comments here" name="comment"></textarea>

                                <div className="flex justify-between gap-10 mt-2">
                                    <p className="text-base text-blue-900 ">Enter atleast 20 characters</p>
                                    <button className="h-12 ml-8 w-[150px] bg-blue-400 text-base text-black font-semibold rounded-lg transition-all cursor-pointer hover:bg-blue-600">
                                        Submit comment
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Comments;