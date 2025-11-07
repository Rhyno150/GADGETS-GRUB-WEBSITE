
import React, { useContext } from 'react';
import { Page } from '../types';
import { LogoIcon, FacebookIcon, TwitterIcon, InstagramIcon } from './icons';
import { AuthContext } from '../contexts/AuthContext';

interface FooterProps {
  setActivePage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const { currentUser } = useContext(AuthContext);
  const baseQuickLinks = [Page.Home, Page.Services, Page.Accessories, Page.Booking, Page.TrackRepair];
  const quickLinks = currentUser ? [...baseQuickLinks, Page.Account] : baseQuickLinks;
  const companyLinks = [Page.FAQ, Page.Blog, Page.Contact];

  const FooterLink: React.FC<{ page: Page }> = ({ page }) => (
    <li>
      <button onClick={() => setActivePage(page)} className="text-gray-600 hover:text-orange-500 transition-colors">
        {page}
      </button>
    </li>
  );

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Social */}
          <div className="space-y-4">
            <button onClick={() => setActivePage(Page.Home)} className="flex items-center space-x-2">
              <LogoIcon className="h-8 w-auto text-orange-500" />
              <span className="text-xl font-bold text-gray-900">GADGETS & GRUB</span>
            </button>
            <p className="text-gray-600 text-sm">Your trusted partner for all cellphone and tablet repairs. Fast, reliable, and professional service.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-orange-500"><FacebookIcon className="h-6 w-6" /></a>
              <a href="#" className="text-gray-500 hover:text-orange-500"><TwitterIcon className="h-6 w-6" /></a>
              <a href="#" className="text-gray-500 hover:text-orange-500"><InstagramIcon className="h-6 w-6" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map(link => <FooterLink key={link} page={link} />)}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map(link => <FooterLink key={link} page={link} />)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-gray-600 text-sm">
              <li>Victoria Road, Willows, Bloemfontein</li>
              <li>Email: support@gadgetsgrub.com</li>
              <li>Phone: 074 674 2501</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Gadgets & Grub. All rights reserved.
            <button onClick={() => setActivePage(Page.Admin)} className="ml-2 underline hover:text-orange-500">Admin</button>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;