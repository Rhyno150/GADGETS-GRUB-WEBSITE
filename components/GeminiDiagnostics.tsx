
import React, { useState } from 'react';
import { GeminiDiagnosis } from '../types';
import { diagnoseProblem } from '../services/geminiService';
import { LightBulbIcon } from './icons';

const GeminiDiagnostics: React.FC = () => {
    const [description, setDescription] = useState('');
    const [diagnosis, setDiagnosis] = useState<GeminiDiagnosis | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDiagnose = async () => {
        if (!description.trim()) {
            setError("Please describe your phone's problem.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setDiagnosis(null);
        try {
            const result = await diagnoseProblem(description);
            if (result) {
                setDiagnosis(result);
            } else {
                setError("Sorry, the AI diagnosis failed. Please try again or contact us directly.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please check your connection or try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 border border-blue-500/30">
                <div className="text-center">
                    <LightBulbIcon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">AI-Powered Diagnosis</h2>
                    <p className="mt-2 text-lg text-gray-300">
                        Describe your phone's issue, and our AI will suggest a possible cause.
                    </p>
                </div>
                <div className="mt-8">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 'My iPhone 12 screen is black but I can still hear notifications' or 'My Samsung phone gets really hot and the battery dies in 2 hours.'"
                    />
                    <button
                        onClick={handleDiagnose}
                        disabled={isLoading}
                        className="mt-4 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 transition-all transform hover:scale-105"
                    >
                        {isLoading ? (
                             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Diagnose My Issue'}
                    </button>
                    {error && <p className="mt-2 text-center text-red-400">{error}</p>}
                </div>
                {diagnosis && (
                    <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700 animate-fade-in">
                        <h3 className="text-xl font-bold text-blue-400">AI Analysis Complete</h3>
                        <div className="mt-4 space-y-3 text-gray-300">
                            <p><strong className="text-white">Possible Issue:</strong> {diagnosis.possibleIssue}</p>
                            <p><strong className="text-white">Recommended Service:</strong> {diagnosis.recommendedService}</p>
                            <p><strong className="text-white">Explanation:</strong> {diagnosis.explanation}</p>
                            <p className="text-sm text-gray-400 italic mt-4">{diagnosis.disclaimer}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeminiDiagnostics;
