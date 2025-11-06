
import React, { useState, useEffect } from 'react';
import { Booking, Status } from '../types';

const allStatuses: Status[] = ['Received', 'Diagnosing', 'Repairing', 'Ready', 'Completed'];

const AdminPage: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        storedBookings.sort((a: Booking, b: Booking) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());
        setBookings(storedBookings);
    }, []);

    const handleStatusChange = (bookingId: string, newStatus: Status) => {
        const updatedBookings = bookings.map(b => 
            b.id === bookingId ? { ...b, status: newStatus } : b
        );
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    };

    const handleClearBookings = () => {
        if (window.confirm('Are you sure you want to delete all bookings? This cannot be undone.')) {
            localStorage.removeItem('bookings');
            localStorage.removeItem('lastRepairIdNumber'); // Also reset the counter
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
                            View and manage customer repair requests.
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

                <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                    {bookings.length === 0 ? (
                        <p className="text-center text-gray-600 p-8">No bookings have been submitted yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repair ID</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-gray-900">{booking.repairId}</div>
                                                <div className="text-xs text-gray-500">{new Date(booking.submissionDate).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                                                <div className="text-sm text-gray-500">{booking.email}</div>
                                                <div className="text-sm text-gray-500">{booking.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{booking.device}</div>
                                                <div className="text-sm text-gray-500">{booking.model}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 max-w-xs break-words">
                                                <div className="font-semibold">{booking.repairType}</div>
                                                <div>{booking.description}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <select
                                                    value={booking.status}
                                                    onChange={(e) => handleStatusChange(booking.id, e.target.value as Status)}
                                                    className="block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm py-2 px-2 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                                >
                                                    {allStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                                                </select>
                                            </td>
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
