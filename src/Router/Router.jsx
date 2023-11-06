import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import ErrorPage from "../Components/Error/ErrorPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/Profile/Profile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AddBlog from "../Pages/AddBlog/AddBlog";
import AllBlogs from "../Pages/AllBlogs/AllBlogs";
import FeaturedBlogs from "../Pages/FeaturedBlogs/FeaturedBlogs";
import Wishlist from "../Pages/Wishlist/Wishlist";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";


const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '',
                element: <Home></Home>
            },
            {
                path: 'profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: 'addblog',
                element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>
            },
            {
                path: 'allblogs',
                element: <AllBlogs></AllBlogs>
            },
            {
                path: 'featuredblogs',
                element: <FeaturedBlogs></FeaturedBlogs>
            },
            {
                path: 'wishlist',
                element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
            },
            {
                path: 'blogdetails/:id',
                element: <PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    }
]);

export default Router;