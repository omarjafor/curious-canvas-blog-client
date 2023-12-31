import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import RecentPost from "./RecentPost/RecentPost";
import Newsletter from "./Newsletter/Newsletter";
import FramerMotion from "./FramerMotion/FramerMotion";
import Reviews from "./TopReview/Reviews";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Curious Canvas | Home</title>
            </Helmet>
            <Banner></Banner>
            <RecentPost></RecentPost>
            <Newsletter></Newsletter>
            <FramerMotion></FramerMotion>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;