
import React, { useState, useContext } from 'react';
import { Page } from '../types';
import { LogoIcon, MenuIcon, CloseIcon } from './icons';
import { AuthContext } from '../contexts/AuthContext';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const navItems = [
  Page.Home,
  Page.Services,
  Page.Accessories,
  Page.TrackRepair,
  Page.Contact,
];

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setActivePage(Page.Home);
    setIsMenuOpen(false);
  };

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
              {currentUser && <NavLink page={Page.Account} />}
            </div>
          </div>
          <div className="hidden md:block">
            {currentUser ? (
              <button 
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center">
                <button onClick={() => setActivePage(Page.Login)} className="text-gray-600 hover:text-orange-500 font-medium text-sm px-3 py-2">Login</button>
                <button 
                  onClick={() => setActivePage(Page.SignUp)}
                  className="ml-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-transform transform hover:scale-105"
                >
                  Sign Up
                </button>
              </div>
            )}
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
              <button key={item} onClick={() => { setActivePage(item); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                {item}
              </button>
            ))}
            {currentUser && (
               <button onClick={() => { setActivePage(Page.Account); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                My Account
              </button>
            )}
            <div className="border-t border-gray-200 my-2"></div>
             {currentUser ? (
                <button onClick={handleLogout} className="w-full text-left mt-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600">
                  Logout
                </button>
             ) : (
                <div className="flex flex-col space-y-2">
                   <button onClick={() => { setActivePage(Page.Login); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">
                    Login
                  </button>
                  <button onClick={() => { setActivePage(Page.SignUp); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600">
                    Sign Up
                  </button>
                </div>
             )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;