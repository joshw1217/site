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

    const [openQuestions, setOpenQuestions] = useState<number[]>([]);

    const toggleQuestion = (index) => {
        setOpenQuestions((prevOpenQuestions) =>
            prevOpenQuestions.includes(index)
                ? prevOpenQuestions.filter((i) => i !== index)
                : [...prevOpenQuestions, index]
        );
    };

    const faqs = [
        { question: "WHAT TIME SHOULD I ARRIVE?", answer: "THE CEREMONY WILL BEGIN PUNCTUALLY AT 5:30 PM. PLEASE ARRIVE NO LATER THAN 5:15 PM." },
        { question: "WHAT IS THE DRESS CODE?", answer: "WE'D LOVE TO SEE OUR FAMILY AND FRIENDS DRESS UP WITH US! WE KINDLY REQUEST FORMAL ATTIRE FOR BOTH THE CEREMONY AND RECEPTION. OUR WEDDING DAY WILL BE OUTDOORS IN A GRASSY AREA. LADIES, PLEASE TAKE INTO ACCOUNT WHEN CHOOSING YOUR HEELS! FOR MEN, A SUIT OR TUXEDO IS RECOMMENDED. FOR WOMEN, AN ELEGANT DRESS OR EVENING GOWN WOULD BE PERFECT." },
        { question: "WILL THE WEDDING BE INDOORS OR OUTDOORS?", answer: "WE WILL BE HOSTING OUR ENTIRE WEDDING DAY OUTDOORS IN A LOVELY BACKYARD. LADIES, PLEASE KEEP THIS IN MIND WHEN CHOOSING YOUR HEELS FOR THE NIGHT!" },
        { question: "ARE CHILDREN WELCOME TO THE WEDDING?", answer: "WHILE WE ADORE YOUR LITTLE ONES, OUR WEDDING CEREMONY AND DINNER WILL BE AN ADULTS ONLY CELEBRATION. WE MORE THAN WELCOME YOUR LITTLE ONES BACK ONCE IT'S TIME FOR OUR RECEPTION." },
        { question: "WHERE SHOULD I PARK?", answer: "OUR WEDDING DAY WILL BE IN A RESIDENTIAL BACKYARD. PLEASE PARK AT THE CHURCH BUILDING LOCATED ACROSS FROM THE BACKYARD" },
        { question: "CAN I BRING A PLUS-ONE?", answer: "IF YOUR INVITATION INCLUDES A PLUS-ONE, WE'D BE DELIGHTED FOR THEM TO JOIN! KINDLY CONFIRM THEIR ATTENDANCE WHEN YOU RSVP SO WE CAN PLAN ACCORDINGLY." },
        // Add more questions and answers as needed
    ];

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
                    <h3 className="text-[3rem] mb-8 text-center font-seasons">June 13 2025</h3>
                    <h2 className="text-[4rem] mb-8 text-center font-seasons">The Countdown</h2>
                    <div className="flex md:justify-center md:gap-8 justify-between font-lemonMilk">
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
            {/* <section className="min-h-full bg-white py-20">
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
            </section> */}

            {/* Location Section */}
            <section className="min-h-full bg-white pt-20 pb-24">
                <div className="container mx-auto px-4 md:px-16">
                    <div className="flex justify-center space-x-4">
                    <p className="text-[4rem] mb-12 text-center font-brittanySignature">the</p>
                    <p className="text-[4rem] mb-12 text-center font-seasons">Details</p>
                    </div>
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex flex-col md:flex-row w-full md:w-[65%]">
                                <div className="w-full md:w-[65%] flex flex-col justify-center text-center font-lemonMilk">
                                    <p className="text-2xl mb-4 font-extralight">June 13 2025</p>
                                    <h2 className="text-4xl mb-4 text-center font-seasons font-bold">CEREMONY</h2>
                                    <p className="text-2xl mb-4">4:30 PM</p>
                                    <p className="text-2xl mb-4">PLEASE ARRIVE 15 MINUTES PRIOR </p>
                                    <p className="text-2xl mb-8">FORMAL ATTIRE</p>
                                    <p className="text-2xl mb-2">595 S 400 E</p>
                                    <p className="text-2xl mb-2">OREM UT, 84097</p>
                                    <a href="https://g.co/kgs/Z7YPdiJ" target="_blank"><h1 className="bg-[#908277] w-[30%] text-white px-4 py-2 mb-8 hover:bg-opacity-90 transition-all duration-300 mx-auto">DIRECTIONS</h1></a>
                                    <h2 className="my-4 text-xl">following</h2>
                                    <h2 className="text-[4rem] font-brittanySignature">cocktail hour</h2>
                                </div>
                                <div className="w-full md:w-[35%] flex items-start justify-center pt-12">
                                    <img src="/images/bow.svg" alt="bow" />
                                </div>
                            </div>
                            <div className="w-full md:w-[35%] aspect-video bg-gray-200">
                                <img src="/images/rees003288-r1-073-35.jpg" alt="Venue" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dinner Section */}
            <section className="min-h-full bg-white">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex flex-col md:flex-row mx-4 items-start">
                            <div className="w-full md:w-[15%] flex items-start justify-center">
                                <img src="/images/candle.svg" alt="bow" />
                            </div>
                            <div className="w-full md:w-[65%] flex flex-col justify-center text-center font-lemonMilk">
                                <h1 className="text-[4rem] font-seasons">Dinner</h1>
                                <p className="text-xl mb-4">6:45 PM</p>
                            </div>
                        </div>
                        <div className="w-full md:w-[45%] aspect-video bg-gray-200">
                        </div>
                    </div>
                </div>
            </section>

            {/* Reception Section*/}
            <section className="min-h-full bg-white pb-8">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-[65%] flex flex-col justify-center text-center font-lemonMilk">
                                    <h2 className="text-4xl mb-4 text-center font-seasons font-bold">Reception</h2>
                                    <p className="text-2xl mb-4">8:00 PM</p>
                                    <p className="text-2xl mb-4">BRING COMFY SHOES!</p>
                                    <p className="text-2xl">WATCH THE COUPLE CUT SOME CAKE </p>
                                    <p className="text-2xl">+</p>
                                    <p className="text-2xl mb-2">DANCE THE NIGHT AWAY WITH US</p>
                                    <a href="https://g.co/kgs/Z7YPdiJ" target="_blank"><h1 className="bg-[#908277] w-[30%] text-white px-4 py-2 mb-8 hover:bg-opacity-90 transition-all duration-300 mx-auto">DIRECTIONS</h1></a>
                                    <h2 className="my-4 text-xl">following</h2>
                                    <h2 className="text-[4rem] font-brittanySignature">cocktail hour</h2>
                                </div>
                                <div className="w-full md:w-[35%] flex items-start justify-center pt-12">
                                    <img src="/images/disco.svg" alt="bow" />
                                </div>
                            </div>
                            <div className="w-full md:w-[45%] aspect-video bg-gray-200">
                                <img src="/images/rees003299-r1-e005.jpg" alt="Venue" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Send Off Section */}
            <section className="min-h-full bg-white">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex flex-col md:flex-row mx-4 items-start">
                            <div className="w-full md:w-[15%] flex items-start justify-center">
                                <img src="/images/ribbon.svg" alt="bow" />
                            </div>
                            <div className="w-full md:w-[65%] flex flex-col justify-center text-center font-lemonMilk">
                                <h1 className="text-[4rem] font-seasons">Send Off</h1>
                                <p className="text-xl mb-4">AROUND 9:45 PM</p>
                                <p className="text-xl mb-4">SEND OFF THE NEWLYWEDS!</p>
                            </div>
                        </div>
                        <div className="w-full md:w-[45%] aspect-video bg-gray-200">
                        </div>
                    </div>
                </div>
            </section>

            <section className="min-h-full bg-white py-20">
                <div className="container mx-auto px-20">
                    <div className="flex flex-col gap-16">
                        {/* Registry List */}
                        <div className="w-full">
                            <h2 className="text-[3rem] mb-4 text-center font-seasons font-bold">Registry</h2>
                            <p className="text-2xl mb-12 text-center leading-relaxed">Your presence is the greatest gift of all. However, for those who wish to contribute items for our new home or to our honeymoon fund, we are registered at the following places</p>
                            <a href="https://www.amazon.com/wedding/share/yamilikesjosh" target="_blank"><h1 className="bg-[#908277] w-[40%] md:w-[20%] text-center text-white px-4 py-2 mb-8 hover:bg-opacity-90 transition-all duration-300 mx-auto">AMAZON</h1></a>
                            <a href="https://www.amazon.com/wedding/share/yamilikesjosh" target="_blank"><h1 className="bg-[#908277] w-[40%] md:w-[20%] text-center text-white px-4 py-2 mb-8 hover:bg-opacity-90 transition-all duration-300 mx-auto">IKEA</h1></a>
                            <a href="https://venmo.com/u/yamidiaz" target="_blank"><h1 className="bg-[#908277] w-[70%] md:w-[20%] text-center text-white px-4 py-2 mb-8 hover:bg-opacity-90 transition-all duration-300 mx-auto">VENMO@YAMIDIAZ</h1></a>

                        </div>
                        {/* FAQ */}
                        <div className="w-full">
                            <h2 className="text-[3rem] mb-2 text-center font-seasons font-bold">FREQUENTLY</h2>
                            <h2 className="text-[3rem] mb-2 text-center font-seasons font-bold">ASKED</h2>
                            <h2 className="text-[3rem] mb-12 text-center font-seasons font-bold">QUESTIONS</h2>
                            {faqs.map((faq, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleQuestion(index)}>
                                        <h3 className="text-2xl font-bold">{faq.question}</h3>
                                        <span className="text-2xl font-bold">{openQuestions.includes(index) ? '-' : '+'}</span>
                                    </div>
                                    {openQuestions.includes(index) && (
                                        <p className="text-xl mt-2">{faq.answer}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Outlet />
        </div>
    )
}

export default Wedding