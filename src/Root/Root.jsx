import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ScrollToTop from "../Components/Scroll/ScrollToTop";


const Root = () => {
    return (
        <div className="dark:bg-gray-900">
            <ScrollToTop></ScrollToTop>
            <Navbar></Navbar>
            <Outlet className="overflow-x-hidden"></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;