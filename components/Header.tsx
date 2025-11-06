
import React, { useState } from 'react';
import { Page } from '../types';
import { LogoIcon, MenuIcon, CloseIcon } from './icons';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const navItems = [
  Page.Home,
  Page.Services,
  Page.TrackRepair,
  Page.Contact,
  Page.FAQ,
  Page.Blog,
];

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLink: React.FC<{ page: Page }> = ({ page }) => (
    <button
      onClick={() => {
        setActivePage(page);
        setIsMenuOpen(false);
      }}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        activePage === page
          ? 'text-orange-600 font-semibold'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {page}
    </button>
  );

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button onClick={() => setActivePage(Page.Home)} className="flex items-center space-x-2 text-gray-800">
              <LogoIcon className="h-8 w-auto text-orange-500" />
              <span className="text-xl font-bold tracking-tight">GADGETS & GRUB</span>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <NavLink key={item} page={item} />
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <button 
              onClick={() => setActivePage(Page.Booking)}
              className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-transform transform hover:scale-105"
            >
              Book Repair Online
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <CloseIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink key={item} page={item} />
            ))}
             <button 
              onClick={() => {
                setActivePage(Page.Booking);
                setIsMenuOpen(false);
              }}
              className="w-full text-left mt-2 px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Book Repair Online
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
