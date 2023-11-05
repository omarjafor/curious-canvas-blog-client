import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';


const useWishlist = () => {
    const { user } = useAuth();
    
    const { isPending, data } = useQuery({
        queryKey: ['wishlist'],
        queryFn: () => fetch(`http://localhost:5000/wishlist?email=${user?.email}`).then(
            (res) => res.json(),
        ),
    })

    return { isPending, data };
};

export default useWishlist;