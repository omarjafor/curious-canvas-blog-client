import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';


const useWishlist = () => {
    const { user } = useAuth();
    
    const { data: wishlistBlog, isLoading } = useQuery({
        queryKey: ['wishlist', user.email],
        queryFn: async () => await fetch(` http://localhost:5000/wishlist?email=${user?.email}`).then(
            (res) => res.json(),
        ),
    })

    return { isLoading, wishlistBlog };
};

export default useWishlist;