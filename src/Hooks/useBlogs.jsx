import { useQuery } from '@tanstack/react-query'

const useBlogs = () => {

    const { data: allBlogs, isLoading } = useQuery({
        queryKey: ['blogData'],
        queryFn: () => fetch('https://blog-website-server-blue.vercel.app/allblogs').then(
            (res) => res.json(),
        ),
    })

    return { allBlogs, isLoading };
};

export default useBlogs;