import { Navigate, useLocation } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useAuth();

    if (loading) return <div className="mx-auto items-center text-center">
        <Skeleton count={10} />
        <Skeleton />
        <span className="loading loading-spinner loading-lg text-info"></span>
        <span className="loading loading-bars loading-lg text-info"></span>
        <span className="loading loading-dots loading-lg text-info"></span>
        <Skeleton />
        <Skeleton count={10} />
    </div> ;

    if (!user?.email) {
        return <Navigate state={location} to='/login'></Navigate>
    }

    return children;
};

export default PrivateRoute;