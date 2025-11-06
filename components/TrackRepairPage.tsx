
import React, { useState } from 'react';
import { Booking, Status } from '../types';

const statusDescriptions: { [key in Status]: string } = {
    Received: "We've received your device at our workshop and it is in the queue.",
    Diagnosing: "Our technicians are running diagnostics to identify the issue.",
    Repairing: "Your device is currently being repaired by one of our experts.",
    Ready: "Good news! Your device is repaired and ready for collection or delivery.",
    Completed: "Your device has been repaired and delivered/collected. Thank you!",
};

const allSteps: Status[] = ['Received', 'Diagnosing', 'Repairing', 'Ready', 'Completed'];

const TrackRepairPage: React.FC = () => {
    const [repairIdInput, setRepairIdInput] = useState('');
    const [trackedBooking, setTrackedBooking] = useState<Booking | null>(null);
    const [error, setError] = useState('');

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setTrackedBooking(null);
        const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
        const foundBooking = bookings.find(b => b.repairId.toUpperCase() === repairIdInput.trim().toUpperCase());
        
        if (foundBooking) {
            setTrackedBooking(foundBooking);
        } else {
            setError('Repair ID not found. Please check the ID and try again.');
        }
    };

    return (
        <div className="bg-white py-16 sm:py-24 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Track Your Repair</h1>
                        <p className="mt-4 text-lg text-gray-600">Enter your Repair ID to see the live status of your device.</p>
                    </div>
                    <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={repairIdInput}
                            onChange={(e) => setRepairIdInput(e.target.value)}
                            placeholder="Enter your Repair ID (e.g., GG-1001)"
                            className="flex-grow bg-gray-100 border border-gray-300 rounded-md shadow-sm py-3 px-4 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            Track
                        </button>
                    </form>

                    {error && <p className="mt-4 text-center text-red-500">{error}</p>}

                    {trackedBooking && (
                        <div className="mt-12 bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Repair Status for ID: {trackedBooking.repairId}</h2>
                            <ol className="relative border-l border-gray-300">
                                {allSteps.map((step) => {
                                    const currentIndex = allSteps.indexOf(trackedBooking.status);
                                    const stepIndex = allSteps.indexOf(step);
                                    const isActive = stepIndex <= currentIndex;
                                    const isCurrent = stepIndex === currentIndex;

                                    return (
                                        <li key={step} className="mb-10 ml-6">
                                            <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-gray-50 ${isActive ? 'bg-orange-500' : 'bg-gray-400'}`}>
                                                {isCurrent && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>}
                                            </span>
                                            <h3 className={`font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{step}</h3>
                                            {isActive && <p className="text-sm text-gray-600">{statusDescriptions[step]}</p>}
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrackRepairPage;
