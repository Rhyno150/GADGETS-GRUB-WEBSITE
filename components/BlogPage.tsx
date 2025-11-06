
import React from 'react';
import { BlogPost } from '../types';

const blogPosts: BlogPost[] = [
    {
        title: '5 Signs Your Smartphone Battery Needs Replacing',
        excerpt: 'Is your phone dying faster than usual? It might be time for a new battery. Learn the common signs and symptoms to look for...',
        imageUrl: 'https://picsum.photos/600/400?random=20',
        author: 'John Doe',
        date: 'October 26, 2023'
    },
    {
        title: 'DIY vs. Professional Screen Repair: What You Need to Know',
        excerpt: 'Tempted to fix that cracked screen yourself? We break down the pros and cons of DIY kits versus professional repair services.',
        imageUrl: 'https://picsum.photos/600/400?random=21',
        author: 'Jane Smith',
        date: 'October 15, 2023'
    },
    {
        title: 'How to Save a Water-Damaged Phone: First Aid Guide',
        excerpt: 'Accidentally dropped your phone in water? Act fast! Here are the crucial first steps to take to maximize its chances of survival.',
        imageUrl: 'https://picsum.photos/600/400?random=22',
        author: 'Admin',
        date: 'September 30, 2023'
    }
];

const BlogPage: React.FC = () => {
    return (
        <div className="bg-gray-50 py-16 sm:py-24 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Our Blog</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        Tips, tricks, and insights from our cellphone repair experts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group border border-gray-200">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-6 flex-grow flex flex-col">
                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{post.title}</h2>
                                <p className="mt-2 text-gray-600 flex-grow">{post.excerpt}</p>
                                <div className="mt-4 text-sm text-gray-500">
                                    <span>By {post.author}</span> &bull; <span>{post.date}</span>
                                </div>
                                <a href="#" className="mt-4 text-orange-500 hover:text-orange-600 font-semibold self-start">Read More &rarr;</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
