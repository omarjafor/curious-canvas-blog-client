import { useEffect, useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import logo from './../../../public/logo.png'
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {

    const [mode, setMode] = useState('light');
    const [scrollvalue, setScrollvalue] = useState(0)
    const { user, logOut } = useAuth();

    const changeTheme = () => {
        const html = document.documentElement;
        if (mode === 'light') {
            html.classList.remove('light')
            html.classList.add('dark')
            setMode('dark')
            localStorage.setItem('mode', 'dark')
        } else {
            html.classList.remove('dark')
            html.classList.add('light')
            setMode('light')
            localStorage.setItem('mode', 'light')
        }
    }


    useEffect(() => {
        const currentMode = localStorage.getItem('mode') || 'light';
        document.documentElement.classList.add(currentMode);
        setMode(currentMode);
    }, [])

    const listenScrollEvent = () => {
        setScrollvalue(window.scrollY)
    }

    useEffect(() => {
        const scroll = window.addEventListener("scroll", listenScrollEvent);
        return () => scroll;
    }, [])

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }

    const navLink =
        <>
            <li><NavLink to='/'
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-green-300 text-xl font-bold underline outline-offset-8" : "font-bold lg:text-white text-lg"}
            >Home</NavLink></li>
            <li><NavLink to='/addproduct'
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-green-300 text-xl font-bold underline outline-offset-8" : "font-bold lg:text-white text-lg"}
            >Add Product</NavLink></li>
            <li><NavLink to='/mybookings'
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-green-300 text-xl font-bold underline outline-offset-8" : "font-bold lg:text-white text-lg"}
            >My Booking</NavLink></li>
            {
                user?.email &&
                <li><NavLink to='/profile'
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-green-300 text-xl font-bold underline outline-offset-8" : "font-bold lg:text-white text-lg"}
                >Profile</NavLink></li>
            }
        </>
    
    return (
        <nav className={scrollvalue > 10 ? "navbar px-24 sticky top-0 z-20 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 dark:from-gray-700 dark:via-gray-900 dark:to-black" : "navbar px-24 sticky top-0 z-20 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 dark:from-gray-700 dark:via-gray-900 dark:to-black"}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] pt-2 shadow bg-base-100 rounded-box w-52">
                        {navLink}
                    </ul>
                </div>
                <Link to='/'><img src={logo} alt="" className="h-28" /></Link>
            </div>



            {/* avatar part  */}
            <div className="navbar-end">
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 mt-3">
                        {navLink}
                    </ul>
                </div>
                {
                    user?.email ?
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-square avatar">
                                <div className="w-10 rounded-lg">
                                    <img src={user.photoURL} alt={user.displayName} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button className="">{user.displayName}</button>
                                </li>
                                <li>
                                    <button className="">{user.email}</button>
                                </li>
                                <li>
                                    <button className="btn btn-sm  btn-ghost"
                                        onClick={handleLogOut}
                                    >Logout</button>

                                </li>
                            </ul>
                        </div>
                        :
                        <NavLink to='/login' className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "text-green-300 text-xl mt-3 font-bold underline outline-offset-8" : "font-bold text-white mt-3 text-lg"}>Login
                        </NavLink>
                }
                <label className="swap swap-rotate ml-4">
                    <input type="checkbox" onChange={changeTheme} />
                    <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                    <svg className="swap-off fill-current w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                </label>
            </div>
        </nav>
    );
};

export default Navbar;