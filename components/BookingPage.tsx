
import React, { useState } from 'react';
import { Booking } from '../types';

const getNextRepairId = (): string => {
    const lastIdNumber = parseInt(localStorage.getItem('lastRepairIdNumber') || '1000');
    const nextIdNumber = lastIdNumber + 1;
    localStorage.setItem('lastRepairIdNumber', nextIdNumber.toString());
    return `GG-${nextIdNumber}`;
};

const BookingPage: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const [newRepairId, setNewRepairId] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        device: 'iPhone',
        model: '',
        repairType: 'Screen Repair',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const repairId = getNextRepairId();
        setNewRepairId(repairId);

        const newBooking: Booking = {
            id: `ts-${Date.now()}`,
            repairId: repairId,
            submissionDate: new Date().toISOString(),
            status: 'Received',
            ...formData,
        };

        const existingBookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
        localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));
        
        console.log('Booking submitted:', newBooking);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-white py-16 sm:py-24 animate-fade-in">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Thank You!</h1>
                    <p className="mt-4 text-lg text-gray-600">Your repair request has been submitted. We will contact you shortly to confirm.</p>
                    <div className="mt-8 bg-orange-50 border-l-4 border-orange-500 p-4 text-left">
                        <p className="font-semibold text-gray-800">Please save your Repair ID:</p>
                        <p className="text-2xl font-bold text-orange-600 tracking-wider my-2">{newRepairId}</p>
                        <p className="text-gray-700">You can use this ID on our "Track My Repair" page to check the status of your service.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-16 sm:py-24 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Book Your Repair</h1>
                        <p className="mt-4 text-lg text-gray-600">Fill out the form below and we'll get back to you to confirm your appointment.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="device" className="block text-sm font-medium text-gray-700">Device Type</label>
                                <select id="device" name="device" value={formData.device} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                    <option>iPhone</option>
                                    <option>Samsung Galaxy</option>
                                    <option>Google Pixel</option>
                                    <option>iPad</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model (e.g., iPhone 13 Pro)</label>
                                <input type="text" name="model" id="model" required value={formData.model} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="repairType" className="block text-sm font-medium text-gray-700">Type of Repair</label>
                            <select id="repairType" name="repairType" value={formData.repairType} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                <option>Screen Repair</option>
                                <option>Battery Replacement</option>
                                <option>Charging Port Repair</option>
                                <option>Water Damage</option>
                                <option>Software Issue</option>
                                <option>Nano Screen Protector</option>
                                <option>Diagnostic</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Problem Description</label>
                            <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-transform transform hover:scale-105">
                                Submit Repair Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
