import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import RecentPost from "./RecentPost/RecentPost";
import Newsletter from "./Newsletter/Newsletter";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Curious Canvas | Home</title>
            </Helmet>
            <Banner></Banner>
            <RecentPost></RecentPost>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;