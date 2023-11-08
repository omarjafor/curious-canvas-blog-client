import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { motion } from 'framer-motion';


const Card = ({ item, selectedId, setSelectedId }) => {

    useEffect(() => {

        AOS.refresh();

        AOS.init({
            offset: 120,
            duration: 3000,
        });


    }, [])

    return (
        <motion.div data-aos="zoom-in-up" className={`card relative rounded overflow-hidden shadow-lg flex flex-col transform transition-transform duration-500 hover:scale-105 ${selectedId === item.id ? 'card-selected' : ''
            }`}
            layoutId={`card-container-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            key={item.id}
            initial={{ scale: 1 }}
            animate={{ scale: selectedId === item.id ? 1.1 : 1 }} // Increase scale on selected card
            transition={{ duration: 0.3 }}>
            <div className="relative" data-aos="zoom-in-up">
                <motion.img className="w-full"
                    src={item.image}
                    alt="Sunset in the mountains" />
                    <div
                        className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                    </div>
                    <div
                        className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                        {item.category}
                    </div>
            </div>
            <div className="px-6 py-4 mb-auto bg-slate-100 dark:bg-gray-900 dark:text-white" data-aos="zoom-in-up">
                <motion.h2
                    className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2"> {item.title} </motion.h2>
                <motion.p className="text-gray-500 text-sm">
                    {item.shortDes}
                </motion.p>
            </div>
            <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                    
                    <motion.span className="ml-1"> {item.time} </motion.span>
                </span>

                <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                    
                    <motion.span className="ml-1"> {item.comment} Comments</motion.span>
                </span>
            </div>
        </motion.div>
    );
};

export default Card;