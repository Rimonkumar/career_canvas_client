import React from 'react';
import { easeOut, motion } from "framer-motion";
import team1 from '../../assets/Photo/team1.jpg';
import team2 from '../../assets/Photo/team2.jpg';
import { Search } from 'lucide-react';

const Banner = () => {
    return (
        <div className="hero bg-base-200 min-h-96">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <motion.img
                        src={team1}
                        animate={{ y: [50, 100, 50] }}
                        transition={{duration: 10, repeat: Infinity}}
                        className="w-80 md:w-[450px] rounded-[40px] rounded-bl-none border-8 border-white shadow-2xl object-cover" />
                    <motion.img
                        src={team2}
                        animate={{ x: [100, 150, 100]  }}
                        transition={{duration: 10, delay: 2, repeat: Infinity}}
                        className="w-80 md:w-[450px] -mt-20 rounded-[40px] rounded-bl-none border-8 border-white shadow-2xl object-cover" />
                </div>
                <div className='flex-1'>
                    <motion.h1
                        animate={{ x: 50 }}
                        transition={{ duration: 2, delay: 1, ease: easeOut, repeat: Infinity }}
                        className="text-5xl font-bold">Latest <motion.span
                            animate={{ color: ['#ecff33', '#33ffe3', '#ff6133'] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >Jobs</motion.span> For You!</motion.h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    {/* Modern Search Bar */}
                    <div className="flex items-center bg-white p-2 rounded-full shadow-2xl border border-gray-100 max-w-md mx-auto lg:mx-0">
                        <div className="flex flex-1 items-center px-4">
                            <Search className="text-gray-400 mr-2" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search by job title..." 
                                className="w-full bg-transparent focus:outline-none text-gray-700 py-3" 
                            />
                        </div>
                        <button className="btn btn-primary rounded-full px-8 font-bold">Search</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Banner;