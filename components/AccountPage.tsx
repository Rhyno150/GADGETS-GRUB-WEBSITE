
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Booking, Status } from '../types';

const statusStyles: { [key in Status]: string } = {
    Received: "bg-blue-100 text-blue-800",
    Diagnosing: "bg-yellow-100 text-yellow-800",
    Repairing: "bg-indigo-100 text-indigo-800",
    Ready: "bg-green-100 text-green-800",
    Completed: "bg-gray-200 text-gray-800",
};

const AccountPage: React.FC = () => {
    const { currentUser } = useContext(AuthContext);
    const [myBookings, setMyBookings] = useState<Booking[]>([]);

    useEffect(() => {
        if (currentUser) {
            const allBookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
            const userBookings = allBookings
                .filter(b => b.userId === currentUser.id)
                .sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());
            setMyBookings(userBookings);
        }
    }, [currentUser]);

    if (!currentUser) {
        return null; // Or a loading spinner, or a redirect component
    }

    return (
        <div className="bg-gray-50 py-16 sm:py-24 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">My Account</h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Welcome back, <span className="font-semibold text-orange-600">{currentUser.name}</span>!
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">My Repair History</h2>
                        <div className="mt-6 flow-root">
                            {myBookings.length > 0 ? (
                                <ul className="-my-5 divide-y divide-gray-200">
                                    {myBookings.map(booking => (
                                        <li key={booking.id} className="py-5">
                                            <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                                <div className="flex justify-between items-start">
                                                     <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-semibold text-gray-900">{booking.device} {booking.model}</p>
                                                        <p className="text-sm text-gray-500 mt-1">Repair ID: <span className="font-mono">{booking.repairId}</span></p>
                                                         <p className="text-sm text-gray-500">Booked on: {new Date(booking.submissionDate).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="flex-shrink-0 ml-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[booking.status]}`}>
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                 <div className="mt-3 bg-gray-50 p-3 rounded-md">
                                                     <p className="text-sm text-gray-700">
                                                        <span className="font-semibold">{booking.repairType}:</span> {booking.description || 'No description provided.'}
                                                     </p>
                                                 </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500 py-8">
                                    You have not booked any repairs yet.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;