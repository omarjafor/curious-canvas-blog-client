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
        queryFn: async () => await fetch(` http://localhost:5000/comments/${id}`).then(
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
        <span className="loading loading-spinner loading-lg text-info"></span>
        <span className="loading loading-bars loading-lg text-info"></span>
        <span className="loading loading-dots loading-lg text-info"></span>
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