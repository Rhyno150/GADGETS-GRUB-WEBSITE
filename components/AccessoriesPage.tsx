
import React from 'react';
import { Accessory } from '../types';
import { HeadphonesIcon, PowerIcon, PhoneIcon } from './icons';

const accessories: Accessory[] = [
    {
        name: 'Premium Wireless Earbuds',
        price: 'R 899.99',
        imageUrl: 'https://picsum.photos/400/400?random=30',
        description: 'Crystal-clear sound, long battery life, and a comfortable fit for all-day use.'
    },
    {
        name: 'Fast-Charging Power Brick (30W)',
        price: 'R 449.99',
        imageUrl: 'https://picsum.photos/400/400?random=31',
        description: 'Charge your devices at maximum speed with this powerful and compact USB-C charger.'
    },
    {
        name: 'Durable Braided USB-C Cable',
        price: 'R 249.99',
        imageUrl: 'https://picsum.photos/400/400?random=32',
        description: 'A 2-meter, tangle-free braided nylon cable built to last. Supports fast charging.'
    },
    {
        name: 'Slim Armor Phone Case',
        price: 'R 349.99',
        imageUrl: 'https://picsum.photos/400/400?random=33',
        description: 'Protect your phone from drops and scratches without adding bulk. Available for various models.'
    },
    {
        name: 'Magnetic Car Mount',
        price: 'R 299.99',
        imageUrl: 'https://picsum.photos/400/400?random=34',
        description: 'A strong and secure magnetic mount for your dashboard or air vent. Easy one-hand operation.'
    },
    {
        name: 'Portable Power Bank (10,000mAh)',
        price: 'R 699.99',
        imageUrl: 'https://picsum.photos/400/400?random=35',
        description: 'Charge your phone on the go with this slim and powerful portable battery.'
    }
];

const AccessoriesPage: React.FC = () => {
    return (
        <div className="bg-white py-16 sm:py-24 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Gadgets & Accessories</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        Top-quality accessories to complement and protect your devices.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {accessories.map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden flex flex-col group border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-orange-500">
                            <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover" />
                            <div className="p-6 flex-grow flex flex-col">
                                <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
                                <p className="mt-2 text-gray-600 flex-grow">{item.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <p className="text-lg font-semibold text-orange-600">{item.price}</p>
                                    <a
                                        href={`https://wa.me/27746742501?text=Hi, I'm interested in the ${item.name}.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform group-hover:scale-105"
                                    >
                                        Buy on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AccessoriesPage;
