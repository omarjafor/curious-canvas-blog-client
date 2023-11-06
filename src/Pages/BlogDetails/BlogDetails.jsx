import { useParams } from "react-router-dom";


const BlogDetails = () => {
    const { id } = useParams();

    return (
        <div>
            Blog Details Page is Here id: {id}
        </div>
    );
};

export default BlogDetails;