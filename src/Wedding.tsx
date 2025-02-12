import React from "react"
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Wedding = () => {
    const navigate = useNavigate();

    const handleRSVPClick = () => {
        navigate('/rsvp');
    };

    return (
        <div 
            className='min-h-screen w-full font-sofia bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center'
            style={{
                backgroundImage: "url('/images/IMG_4345.jpg')",
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
        >
            <div className="container mx-auto px-8 py-12 bg-[#F8F4EC] bg-opacity-90 rounded-lg">
                <div className="flex flex-row justify-between items-center">
                    <div className="text-left">
                        <h1 className="text-[6rem] mb-4">Josh & Yami</h1>
                        <p className="text-2xl mb-8">Are getting married!</p>
                        <p className="text-xl mb-12">June 13, 2025</p>
                    </div>
                    
                    <div 
                        onClick={handleRSVPClick}
                        className="cursor-pointer transition-all duration-300 hover:transform hover:scale-105 w-1/3 h-[50vh] flex items-center justify-center"
                    >
                        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 h-full w-full flex flex-col items-center justify-center">
                            <p className="text-5xl">Click here to RSVP</p>
                            <svg 
                                className="w-12 h-12 mt-4" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Wedding