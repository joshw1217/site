import React, { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Wedding = () => {
    const navigate = useNavigate();

    const handleRSVPClick = () => {
        navigate('/rsvp');
    };

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const weddingDate = new Date('2025-06-13T17:30:00'); // Set to your ceremony time (4:30 PM)

        const timer = setInterval(() => {
            const now = new Date();
            const difference = weddingDate.getTime() - now.getTime();

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, []);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        '/images/rees003288-r1-073-35 2.jpg',
        '/images/rees003288-r1-009-3.jpg',
        '/images/rees003288-r1-019-8.jpg',
        '/images/rees003288-r1-053-25.jpg',
        '/images/rees003288-r1-073-35 2.jpg',
    ];

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 0.1) % 80);  // Adjusted for 5 images (100 * 5/6)
        }, 30);

        return () => clearInterval(slideInterval);
    }, []);

    return (
        <div className="w-full font-sofia">
            {/* Hero Section*/}
            <section className='h-screen w-full relative overflow-hidden'>
                {/* Sliding background */}
                <div 
                    className="absolute inset-0 flex"
                    style={{ 
                        transform: `translateX(-${currentImageIndex}%)`,
                        width: `500%`
                    }}
                >
                    {[...images, images[0]].map((image, index) => (
                        <div
                            key={index}
                            className='w-full h-full bg-cover bg-center bg-no-repeat'
                            style={{
                                backgroundImage: `url('${image}')`,
                                width: '20%',
                                flexShrink: 0
                            }}
                        />
                    ))}
                </div>

                {/* Static overlay content */}
                <div className="absolute inset-0 p-6">
                    <div className="flex justify-between items-start">
                        <img src="/images/y-jlogo.png" alt="Logo" className="w-1/12" />
                        <button 
                            onClick={handleRSVPClick}
                            className="bg-white px-6 py-2 rounded-md text-gray-800 hover:bg-opacity-90 transition-all duration-300 self-center"
                        >
                            RSVP
                        </button>
                    </div>
                </div>
            </section>

            <div className="bg-white py-12 border-t">
                <div className="container mx-auto px-8">
                    <h2 className="text-[4rem] mb-8 text-center font-seasons">Let the countdown begin</h2>
                    <div className="flex justify-center gap-8 font-lemonMilk">
                        <div className="text-center">
                            <p className="text-5xl font-bold mb-2 font-quentin">{timeLeft.days}</p>
                            <p className="text-xl">Days</p>
                        </div>
                        <div className="text-center">
                            <p className="text-5xl font-bold mb-2 font-quentin">{timeLeft.hours}</p>
                            <p className="text-xl">Hours</p>
                        </div>
                        <div className="text-center">
                            <p className="text-5xl font-bold mb-2 font-quentin">{timeLeft.minutes}</p>
                            <p className="text-xl">Minutes</p>
                        </div>
                        <div className="text-center">
                            <p className="text-5xl font-bold mb-2 font-quentin">{timeLeft.seconds}</p>
                            <p className="text-xl">Seconds</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <button 
                        onClick={handleRSVPClick}
                        className="bg-brown px-6 py-2 text-white hover:bg-opacity-90 transition-all duration-300 self-center"
                    >
                        RSVP HERE
                    </button>
                </div>
            </div>

            {/* Schedule Section */}
            <section className="min-h-full bg-white py-20">
                <div className="container mx-auto px-8">
                    <h2 className="text-[4rem] mb-12 text-center font-quentin">Schedule</h2>
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-full md:w-1/2 flex flex-col justify-center">
                                <h3 className="text-3xl mb-4 text-center font-santaCatalina">Wedding Ceremony</h3>
                                <p className="text-2xl mb-4">4:30 - Ceremony</p>
                                <p className="text-2xl mb-4">5:30 - Cocktail Hour</p>
                                <p className="text-2xl mb-4">6:30 - Dinner</p>
                                <h3 className="text-3xl mb-4 text-center font-santaCatalina">Reception</h3>
                                <p className="text-2xl mb-8">7:30 - Doors open</p>
                                <p className="text-2xl mb-8">8:00 - Dancing, Gelato Bar, and more!</p>
                                <p className="text-2xl mb-8">9:30 - Evening ends</p>
                            </div>
                            <div className="w-full md:w-1/2 aspect-video bg-gray-200">
                                <img src="/images/IMG_4345.jpg" alt="Venue" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="min-h-full bg-white py-20">
                <div className="container mx-auto px-8">
                    <div className="flex justify-center space-x-4">
                    <p className="text-[4rem] mb-12 text-center font-brittanySignature">the</p>
                    <p className="text-[4rem] mb-12 text-center font-seasons">Details</p>
                    </div>
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-full md:w-1/2 aspect-video bg-gray-200">
                                <img src="/images/IMG_4345.jpg" alt="Venue" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col justify-center">
                                <h3 className="text-3xl mb-4 text-center font-santaCatalina">Wedding Ceremony</h3>
                                <p className="text-2xl mb-4">4:30 - Ceremony</p>
                                <p className="text-2xl mb-4">5:30 - Cocktail Hour</p>
                                <p className="text-2xl mb-4">6:30 - Dinner</p>
                                <h3 className="text-3xl mb-4 text-center font-santaCatalina">Reception</h3>
                                <p className="text-2xl mb-8">7:30 - Doors open</p>
                                <p className="text-2xl mb-8">8:00 - Dancing, Gelato Bar, and more!</p>
                                <p className="text-2xl mb-8">9:30 - Evening ends</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registry Section */}
            <section className="min-h-full bg-white py-20">
                <div className="container mx-auto px-8">
                    <h2 className="text-[4rem] mb-12 text-center font-quentin">Registry</h2>
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-full md:w-1/2 flex flex-col justify-center">
                                <h3 className="text-3xl mb-4 text-center font-santaCatalina">Wedding Ceremony</h3>
                                <p className="text-2xl mb-4">4:30 - Ceremony</p>
                                <p className="text-2xl mb-4">5:30 - Cocktail Hour</p>
                                <p className="text-2xl mb-4">6:30 - Dinner</p>
                                <h3 className="text-3xl mb-4 text-center font-santaCatalina">Reception</h3>
                                <p className="text-2xl mb-8">7:30 - Doors open</p>
                                <p className="text-2xl mb-8">8:00 - Dancing, Gelato Bar, and more!</p>
                                <p className="text-2xl mb-8">9:30 - Evening ends</p>
                            </div>
                            <div className="w-full md:w-1/2 aspect-video bg-gray-200">
                                <img src="/images/IMG_4345.jpg" alt="Venue" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Outlet />
        </div>
    )
}

export default Wedding