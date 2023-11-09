import Skeleton from "react-loading-skeleton";
import usePost from "../../../Hooks/usePost";
import PostCard from "./PostCard";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const RecentPost = () => {
    const { isPending, data } = usePost();

    useEffect(() => {

        AOS.refresh();

        AOS.init({
            offset: 120,
            duration: 3000,
        });


    }, [])

    if (isPending) return <div className="mx-auto items-center text-center">
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

    const sortData = data?.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));

    return (
        <div className="px-2 lg:px-10 pt-10 dark:bg-gray-900" data-aos="zoom-in-up">
            <h1 className="text-4xl leading-[50px] font-bold text-center drop-shadow-[-1px_3px_1px_rgba(17,131,6,0.6)] bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent" data-aos="zoom-in-up">Recent Blog Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-24 my-5 justify-items-center" data-aos="zoom-in-up">
                {
                    sortData?.map(blog => <PostCard
                    key={blog._id}
                    blog={blog}
                    ></PostCard>)
                }
            </div>
        </div>
    );
};

export default RecentPost;