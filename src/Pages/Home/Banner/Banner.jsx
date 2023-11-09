import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <div>
            <section
                className="relative bg-[url(https://images.unsplash.com/photo-1636955691064-c9ce3ba6f470?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat h-1/4 mx-auto"
            >
                <div className="flex flex-col lg:flex-row justify-evenly">
                    <div
                        className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:items-center"
                    >
                        <div className="max-w-xl ltr:sm:text-left rtl:sm:text-right drop-shadow-[3px_4px_1px_rgba(17,131,6,0.6)] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                            <h1 className="text-6xl font-extrabold sm:text-5xl">
                                Curious Canvas

                                <strong className="mt-4 block font-extrabold drop-shadow-[-1px_3px_1px_rgba(17,131,6,0.6)] bg-gradient-to-br from-rose-300 via-fuchsia-400 to-indigo-500 bg-clip-text text-transparent">
                                    Unveil Your Journey of Exploration
                                </strong>
                            </h1>

                            <p className="mt-4 max-w-lg sm:text-xl/relaxed text-black">
                                Welcome to Curious Canvas, The canvas of exploration. Unveil your journey with diverse stories, vibrant experiences, and endless discoveries.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4 text-center">
                                <a
                                    href="#"
                                    className="block w-full rounded btn-info px-12 py-3 text-sm font-medium text-white shadow hover:bg-gradient-to-br hover:from-green-400 hover:via-blue-600 hover:to-purple-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                                >
                                    Get Explore
                                </a>

                                <Link
                                    to='/allblogs'
                                    className="block w-full rounded btn-success px-12 py-3 text-sm font-medium hover:text-white shadow hover:bg-gradient-to-br hover:from-green-400 hover:via-blue-600 hover:to-purple-700 text-black focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                                >
                                    All Blogs
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 justify-center align-bottom lg:mt-28">
                        <img className="" src="https://i.ibb.co/gm0NJvs/wishlist.webp" alt="" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner;