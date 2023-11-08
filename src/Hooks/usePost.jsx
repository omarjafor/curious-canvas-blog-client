import { useQuery } from '@tanstack/react-query'

const usePost = () => {

    const { isPending, data } = useQuery({
        queryKey: ['blogData'],
        queryFn: () => fetch('   https://blog-website-server-blue.vercel.app/blogs').then(
            (res) => res.json(),
        ),
    })

    return { isPending, data } ;
};

export default usePost;