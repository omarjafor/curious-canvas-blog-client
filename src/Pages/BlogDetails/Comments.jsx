import CommentCard from "./CommentCard";


const Comments = () => {
    return (
        <div className="py-10 px-6 flex flex-col justify-evenly gap-6 lg:flex-row lg:mx-20">
            <div>
                {
                    <CommentCard></CommentCard>
                }
            </div>
            <div className="flex justify-center items-center mt-6 lg:mt-0">
                <div className="h-60 px-7 w-[700px] rounded-[12px] bg-white p-4 shadow-md border">
                    <p className="text-xl font-bold text-blue-900 cursor-pointer transition-all hover:text-black">
                        Add Comment
                    </p>
                    <textarea className="h-20 px-3 text-base py-1 mt-5 outline-none border-gray-300 w-full resize-none border rounded-lg placeholder:text-sm" placeholder="Add your comments here"></textarea>

                    <div className="flex justify-between mt-2">
                        <p className="text-base text-blue-900 ">Enter atleast 20 characters</p>
                        <button className="h-12 w-[150px] bg-blue-400 text-base text-black font-semibold rounded-lg transition-all cursor-pointer hover:bg-blue-600">
                            Submit comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;