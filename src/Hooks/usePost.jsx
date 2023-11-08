import { useQuery } from '@tanstack/react-query'

const usePost = () => {

    const { isPending, data } = useQuery({
        queryKey: ['blogData'],
        queryFn: () => fetch(' http://localhost:5000/blogs').then(
            (res) => res.json(),
        ),
    })

    return { isPending, data } ;
};

export default usePost;