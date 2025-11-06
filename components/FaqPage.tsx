
import React, { useState } from 'react';
import { FaqItem } from '../types';

const faqData: FaqItem[] = [
    {
        question: 'How long do repairs usually take?',
        answer: 'Most common repairs, like screen replacements and battery swaps, are completed within the same day. More complex issues like water damage may take 1-3 business days.'
    },
    {
        question: 'Do you offer a warranty on your repairs?',
        answer: 'Yes! We offer a 90-day warranty on all parts and labor. This covers any defects in the replacement parts we use, but does not cover accidental damage.'
    },
    {
        question: 'What devices do you repair?',
        answer: 'We repair a wide range of devices including all models of iPhones, Samsung Galaxy phones, Google Pixels, iPads, and other Android tablets. Contact us if you have a specific device not listed.'
    },
    {
        question: 'Should I back up my data before the repair?',
        answer: 'We highly recommend you back up your data before we collect your device for repair. While we take the utmost care, we are not responsible for any data loss that may occur during the repair process.'
    },
    {
        question: 'Can you fix a water-damaged phone?',
        answer: 'We have a high success rate with water damage treatment, but it is not guaranteed. The sooner you book a repair after the incident, the better the chances of a successful repair.'
    }
];

const FaqAccordion: React.FC<{ item: FaqItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left flex justify-between items-center py-5"
            >
                <span className="font-semibold text-lg text-gray-800">{item.question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="text-gray-600 pb-5 pr-4">{item.answer}</p>
            </div>
        </div>
    );
};

const FaqPage: React.FC = () => {
    return (
        <div className="bg-white py-16 sm:py-24 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Frequently Asked Questions</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Find answers to common questions about our services.</p>
                </div>
                <div className="max-w-3xl mx-auto bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {faqData.map((item, index) => (
                        <FaqAccordion key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
