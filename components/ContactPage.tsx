
import React, { useState } from 'react';
import { MailIcon, PhoneIcon, MapPinIcon } from './icons';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white py-16 sm:py-24 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Contact Us</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Have questions? We're here to help. Reach out to us or visit our shop.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-center"><MapPinIcon className="w-5 h-5 mr-3 text-orange-500" />Victoria Road, Willows, Bloemfontein, 9301</p>
              <p className="flex items-center"><PhoneIcon className="w-5 h-5 mr-3 text-orange-500" />074 674 2501</p>
              <p className="flex items-center"><MailIcon className="w-5 h-5 mr-3 text-orange-500" />support@gadgetsgrub.com</p>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">Opening Hours</h3>
              <p className="text-gray-700">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-700">Sat - Sun: Closed</p>
            </div>
            <div className="mt-6 rounded-lg overflow-hidden">
                <a href="https://www.google.com/maps/search/?api=1&query=Victoria+Road,Willows,Bloemfontein" target="_blank" rel="noopener noreferrer">
                    <img src="https://picsum.photos/600/400?grayscale" alt="Map to our location" className="w-full h-auto object-cover hover:opacity-80 transition-opacity" />
                </a>
            </div>
          </div>
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <h2 className="text-2xl font-bold text-gray-900">Thank You!</h2>
                <p className="mt-2 text-gray-600">Your message has been sent. We'll get back to you soon.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="contact-name" required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="contact-email" required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="contact-message" rows={5} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"></textarea>
                  </div>
                  <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                      Send Message
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
