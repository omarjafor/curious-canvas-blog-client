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
        queryFn: async () => await fetch('http://localhost:5000/featuredblog').then(
            res => res.json(),
        ),
    })

    if (isLoading) return <div className="mx-auto items-center text-center">
        <Skeleton count={10} />
        <span className="loading loading-spinner loading-lg text-info"></span>
        <span className="loading loading-bars loading-lg text-info"></span>
        <span className="loading loading-dots loading-lg text-info"></span>
        <Skeleton count={10} />
    </div>;

    const simplifiedBlogs = featuredBlogs.map((blog, index) => ({
        id: index + 1,
        profile: blog.ownerPhoto,
        name: blog.name,
        title: blog.blogTitle
    }))
    console.log(simplifiedBlogs);

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