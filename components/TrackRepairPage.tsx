
import React, { useState } from 'react';

type Status = 'Received' | 'Diagnosing' | 'Repairing' | 'Ready' | 'Completed';

const repairStatuses: { [key: string]: Status[] } = {
    '12345': ['Received', 'Diagnosing', 'Repairing', 'Ready'],
    '67890': ['Received', 'Diagnosing', 'Completed'],
    '54321': ['Received', 'Diagnosing', 'Repairing'],
};

const statusDescriptions: { [key in Status]: string } = {
    Received: "We've received your device at our workshop.",
    Diagnosing: "Our technicians are running diagnostics to identify the issue.",
    Repairing: "Your device is currently being repaired by one of our experts.",
    Ready: "Good news! Your device is repaired and ready for pickup.",
    Completed: "Your device has been repaired and picked up.",
};

const TrackRepairPage: React.FC = () => {
    const [repairId, setRepairId] = useState('');
    const [statusHistory, setStatusHistory] = useState<Status[] | null>(null);
    const [error, setError] = useState('');

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        const foundStatus = repairStatuses[repairId.trim()];
        if (foundStatus) {
            setStatusHistory(foundStatus);
            setError('');
        } else {
            setStatusHistory(null);
            setError('Repair ID not found. Please check the number and try again.');
        }
    };
    
    const allSteps: Status[] = ['Received', 'Diagnosing', 'Repairing', 'Ready', 'Completed'];

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
                            value={repairId}
                            onChange={(e) => setRepairId(e.target.value)}
                            placeholder="Enter your Repair ID (e.g., 12345)"
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

                    {statusHistory && (
                        <div className="mt-12 bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Repair Status for ID: {repairId}</h2>
                            <ol className="relative border-l border-gray-300">
                                {allSteps.map((step, index) => {
                                    const isActive = statusHistory.includes(step);
                                    const isCurrent = statusHistory[statusHistory.length - 1] === step;
                                    return (
                                        <li key={index} className="mb-10 ml-6">
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
