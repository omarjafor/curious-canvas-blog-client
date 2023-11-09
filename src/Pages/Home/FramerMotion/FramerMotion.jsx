import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './Card';

const FramerMotion = () => {

    useEffect(() => {

        AOS.refresh();

        AOS.init({
            offset: 120,
            duration: 3000,
        });


    }, [])

    const [selectedId, setSelectedId] = useState('');
    const items = [
        {
            id: '1',
            image: "https://i.ibb.co/wd97pgZ/Exploring-Paradise.jpg",
            category: "Travel",
            title: "Exploring Paradise The Latest Travel Trends",
            shortDes: "A journey through breathtaking landscapes travel guides, personal travel stories the beauty of nature like never before as.",
            longDes: "Experience the beauty of nature like never before as we journey through picturesque landscapes and hidden gems. Embark on thrilling adventures, explore new destinations, and gather travel inspiration. Discover hidden gems with our comprehensive travel guides, personal travel stories, and pro tips from globetrotters",
            time: "30 min ago",
            comment: 8
            
        },
        {
            id: '2',
            image: "https://i.ibb.co/qRbkd1T/Culinary-Delights.jpg",
            category: "Food&Cooking",
            title: "Exploring Culinary Delights Around the World",
            shortDes: "Savor the flavors of world cuisine cooking secrets, and food explorations from around the world our culinary experts and indulge.",
            longDes: "Embark on a culinary adventure and discover mouthwatering dishes from around the globe. Savor mouthwatering dishes, cooking secrets, and food explorations from around the world. Bon appétit! Dive into the world of gastronomy with our culinary experts and indulge in a symphony of flavors",
            time: "1 hour ago",
            comment: 12
        },
        {
            id: '3',
            image: "https://i.ibb.co/Vj52Q1c/Innovation-Unleashed.jpg",
            category: "Technology",
            title: "Innovation unleashed revolutionised services",
            shortDes: "Exploring the latest tech innovations insightful reviews. Stay tech-savvy with in-depth articles, gadget reviews",
            longDes: "Stay up to date with cutting-edge technology and innovations shaping our future. Delve into the world of technology with the latest gadgets, tech trends, and insightful reviews. Stay tech-savvy with in-depth articles, gadget reviews, and expert opinions on emerging tech.",
            time: "2 hours ago",
            comment: 5
        },
        {
            id: '4',
            image: "https://i.ibb.co/nMRQfrG/Snapinsta-fasion.jpg",
            category: "Fashion",
            title: "Trends and Styles Fashion week a runway show",
            shortDes: "Discover the latest fashion trends fashion trends and style inspirations for every season. Explore the latest fashion trends.",
            longDes: "Get a glimpse of the hottest fashion trends and style inspirations for every season. Explore the latest fashion trends, style guides, and beauty tips for a chic lifestyle. Stay stylish with our expert advice and curated collections from top designers around the world",
            time: "3 hours ago",
            comment: 10
        },
        {
            id: '5',
            image: "https://i.ibb.co/9T6NQd8/Technology-Gadgets.jpg",
            category: "Tech Gadgets",
            title: "Modern Technology Gadgets to Check",
            shortDes: "Catch the thrilling sports action gain profound insights into the ever-evolving tech landscape, tech giants the world of technology.",
            longDes: "Stay updated with the most exciting sports events and thrilling matches from around the world. Gain profound insights into the ever-evolving tech landscape, tech giants, and groundbreaking innovations. Stay ahead in the world of technology with comprehensive analysis and expert opinions.",
            time: "4 hours ago",
            comment: 15
        },
        {
            id: '6',
            image: "https://i.ibb.co/2k46rhF/frying-pan.jpg",
            category: "Food&Cooking",
            title: "Frying burning food fire inside is like Entertainment",
            shortDes: "Get the latest showbiz updates the hottest celebrity news and entertainment buzz from the world of showbiz.",
            longDes: "Stay in the loop with the hottest celebrity news and entertainment buzz from the world of showbiz. Experience a world of gourmet delights, culinary craftsmanship, and global cuisine exploration. Dive into the culinary arts with expert chefs and savor the finest flavors from diverse cultures.",
            time: "5 hours ago",
            comment: 7
        },
    ];

    return (
        <div className='my-10 lg:mx-24'>
            <div className="mx-14" data-aos="zoom-in-up">
                <h2 className="text-2xl text-indigo-500 font-semibold italic mb-3"> Our Trending Blogs</h2>
                <h2 className="text-4xl leading-[50px] font-bold drop-shadow-[-1px_3px_1px_rgba(17,131,6,0.6)] bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">Best Explorer Blogs</h2>
            </div>
            <motion.div className="flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 mx-5">
                    {items.map((item) => (
                        <Card 
                            key={item.id}
                            item={item}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                        ></Card>
                    ))}

                </div>

                <AnimatePresence>
                    {selectedId && (
                        <motion.div data-aos="zoom-in-up"
                            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {items.map((item) => (item.id === selectedId && (
                                <motion.div data-aos="zoom-in-up" className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 rounded-lg p-4 shadow-md max-w-lg mx-auto"
                                    layoutId={`card-container-${item.id}`}
                                    key={item.id}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.15 } }}>
                                    <motion.div className="relative" data-aos="zoom-in-up">
                                        <motion.img className="w-full"
                                            src={item.image}
                                            alt="Sunset in the mountains" />
                                        <div
                                            className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                                        </div>

                                        <motion.button
                                            className="absolute top-2 right-2 py-1 px-2 text-center text-white bg-indigo-500 rounded-full"
                                            onClick={() => setSelectedId('')}
                                        >
                                            X
                                        </motion.button>

                                    </motion.div>
                                    <div className="px-6 py-4 mb-auto bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
                                        <motion.h2
                                            className="font-bold text-xl inline-block text-black hover:text-indigo-600 transition duration-500 ease-in-out mb-2"> {item.title} </motion.h2>
                                        <motion.div
                                            className="text-md text-white"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >

                                            <p className='text-lg my-3 font-medium'> {item.category} </p>

                                            <p className='text-base text-white my-3 font-medium'> {item.shortDes} </p>
                                            {item.longDes}
                                        </motion.div>
                                    </div>
                                    <div className="px-6 py-3 lg:py-0 flex flex-row items-center justify-between bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
                                        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">

                                            <motion.span className="ml-1"> {item.time} </motion.span>
                                        </span>

                                        <span href="#" className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">

                                            <motion.span className="ml-1"> {item.comment} Comments</motion.span>
                                        </span>
                                    </div>
                                </motion.div>
                            )
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default FramerMotion;