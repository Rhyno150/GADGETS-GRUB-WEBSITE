
import React, { useState, useEffect } from 'react';
import { Booking } from '../types';

const AdminPage: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        // Sort by most recent first
        storedBookings.sort((a: Booking, b: Booking) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());
        setBookings(storedBookings);
    }, []);

    const handleClearBookings = () => {
        if (window.confirm('Are you sure you want to delete all bookings? This cannot be undone.')) {
            localStorage.removeItem('bookings');
            setBookings([]);
        }
    };

    return (
        <div className="bg-gray-50 py-16 sm:py-24 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Booking Admin Panel</h1>
                        <p className="mt-4 text-lg text-gray-600">
                            View all submitted customer repair requests.
                        </p>
                    </div>
                    {bookings.length > 0 && (
                         <button
                            onClick={handleClearBookings}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            Clear All Bookings
                        </button>
                    )}
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                    {bookings.length === 0 ? (
                        <p className="text-center text-gray-600">No bookings have been submitted yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repair Type</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.submissionDate).toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                                                <div className="text-sm text-gray-500">{booking.email}</div>
                                                <div className="text-sm text-gray-500">{booking.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{booking.device}</div>
                                                <div className="text-sm text-gray-500">{booking.model}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.repairType}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 max-w-sm break-words">{booking.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
