import { useQuery } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';
import { Helmet } from 'react-helmet-async';
import Skeleton from 'react-loading-skeleton';


const columns = [
    {
        name: 'Serial Number',
        selector: row => row.id,
        sortable: true
    },
    {
        name: 'Profile Photo',
        selector: row => <div className="avatar">
            <div className="w-16 rounded-3xl">
                <img src={row.profile} />
            </div>
        </div>,
        sortable: true
    },
    {
        name: 'Owner Name',
        selector: row => row.name,
        sortable: true
    },
    {
        name: 'Blog Title',
        selector: row => row.title,
        sortable: true
    },
];

const FeaturedBlogs = () => {

    const { data: featuredBlogs, isLoading } = useQuery({
        queryKey: ['featured', 'blog'],
        queryFn: async () => await fetch('   https://blog-website-server-blue.vercel.app/featuredblog').then(
            res => res.json(),
        ),
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

    const simplifiedBlogs = featuredBlogs.map((blog, index) => ({
        id: index + 1,
        profile: blog.ownerPhoto,
        name: blog.name,
        title: blog.blogTitle
    }))

    return (
        <div className='p-12 lg:px-24 lg:py-5'>
            <Helmet>
                <title>Curious Canvas | Featured Blogs</title>
            </Helmet>
            <DataTable
                title='Top Ten Featured Blogs'
                columns={columns}
                data={simplifiedBlogs}
                fixedHeader
                pagination
                highlightOnHover
            />
        </div>
    );
};

export default FeaturedBlogs;