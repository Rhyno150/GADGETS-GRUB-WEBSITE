
import React, { useState } from 'react';
import { Page, Service, Testimonial } from '../types';
import { ScreenRepairIcon, BatteryIcon, WaterDamageIcon, CheckCircleIcon, StarIcon, TruckIcon } from './icons';

interface HomePageProps {
    setActivePage: (page: Page) => void;
}

const services: Service[] = [
    { icon: ScreenRepairIcon, title: 'Screen Repair', description: 'Cracked or shattered screen? We replace it with high-quality parts to make it look brand new.' },
    { icon: BatteryIcon, title: 'Battery Replacement', description: 'Phone dying too fast? We can swap out your old battery for a new one, restoring its life.' },
    { icon: WaterDamageIcon, title: 'Water Damage', description: 'Accidents happen. Our experts can diagnose and treat water-damaged devices to save your data.' },
];

const testimonials: Testimonial[] = [
    { quote: "My iPhone screen was shattered, and they fixed it in under an hour. It looks perfect! Highly recommend Gadgets & Grub.", author: "Jessica M.", location: "Bloemfontein" },
    { quote: "Amazing service and fair prices. They replaced my Samsung's battery, and now it lasts all day again. Thank you!", author: "David R.", location: "Bloemfontein" },
    { quote: "I thought my water-damaged phone was a goner, but this team worked their magic and saved all my photos. Lifesavers!", author: "Sarah L.", location: "Bloemfontein" }
];

const HomePage: React.FC<HomePageProps> = ({ setActivePage }) => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative py-20 sm:py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tighter">
                        Your <span className="text-orange-500">Gadgets</span>, Revived.
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
                        Fast, reliable, and expert repairs for all your smartphones and tablets. From "iPhone screen repair" to "Android battery replacement," we've got you covered.
                    </p>
                    <div className="mt-8 flex justify-center items-center gap-4">
                        <button
                            onClick={() => setActivePage(Page.Booking)}
                            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            Book a Repair
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="py-16 sm:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Core Services</h2>
                        <p className="mt-2 text-lg text-gray-600">We handle all types of smartphone, laptops and tablet issues.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center border border-gray-200 hover:border-orange-500 hover:shadow-xl transition-all">
                                <div className="flex justify-center items-center mb-4">
                                    <service.icon className="h-12 w-12 text-orange-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                                <p className="mt-2 text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <button onClick={() => setActivePage(Page.Services)} className="text-orange-500 hover:text-orange-600 font-semibold">
                            View All Services &rarr;
                        </button>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 sm:py-24 bg-white">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why Trust Gadgets & Grub?</h2>
                        <p className="mt-4 text-lg text-gray-600">We are committed to providing the highest quality repairs with transparency and speed.</p>
                        <ul className="mt-6 space-y-4">
                            <li className="flex items-start">
                                <TruckIcon className="flex-shrink-0 h-6 w-6 text-orange-500 mt-1" />
                                <span className="ml-3 text-gray-600"><span className="font-semibold text-gray-900">Collection & Delivery:</span> We come to you! We'll pick up your device and deliver it back, fully repaired.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-orange-500 mt-1" />
                                <span className="ml-3 text-gray-600"><span className="font-semibold text-gray-900">Expert Technicians:</span> Certified professionals with years of experience.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-orange-500 mt-1" />
                                <span className="ml-3 text-gray-600"><span className="font-semibold text-gray-900">Premium Quality Parts:</span> We use only the best replacement parts for lasting repairs.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-orange-500 mt-1" />
                                <span className="ml-3 text-gray-600"><span className="font-semibold text-gray-900">Fast Turnaround Time:</span> Most common repairs are done the same day.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img src="https://picsum.photos/400/300?random=10" alt="Technician repairing a phone" className="rounded-lg shadow-lg" />
                        <img src="https://picsum.photos/400/300?random=11" alt="Organized repair workspace" className="rounded-lg shadow-lg mt-8" />
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 sm:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
                         <div className="flex justify-center items-center mt-2">
                             <span className="text-orange-400 flex">
                                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                            </span>
                            <p className="ml-2 text-gray-600">Based on 200+ Google Reviews</p>
                         </div>
                    </div>
                    <div className="mt-12 relative">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-3xl mx-auto border border-gray-200">
                            <p className="text-lg italic text-gray-700">"{testimonials[currentTestimonial].quote}"</p>
                            <p className="mt-4 font-bold text-gray-900">{testimonials[currentTestimonial].author}</p>
                            <p className="text-sm text-gray-500">{testimonials[currentTestimonial].location}</p>
                        </div>
                        <button onClick={prevTestimonial} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-orange-500 hover:text-white transition-colors hidden sm:block">&lt;</button>
                        <button onClick={nextTestimonial} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-orange-500 hover:text-white transition-colors hidden sm:block">&gt;</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
