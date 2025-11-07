
import React, { useContext } from 'react';
import { Page, User } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import AccessoriesPage from './components/AccessoriesPage';
import BookingPage from './components/BookingPage';
import TrackRepairPage from './components/TrackRepairPage';
import ContactPage from './components/ContactPage';
import FaqPage from './components/FaqPage';
import BlogPage from './components/BlogPage';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import AccountPage from './components/AccountPage';
import { WhatsAppIcon } from './components/icons';
import { AuthContext } from './contexts/AuthContext';

const App: React.FC = () => {
  const [activePage, setActivePage] = React.useState<Page>(Page.Home);
  const { currentUser } = useContext(AuthContext);

  const renderPage = () => {
    switch (activePage) {
      case Page.Home:
        return <HomePage setActivePage={setActivePage} />;
      case Page.Services:
        return <ServicesPage />;
      case Page.Accessories:
        return <AccessoriesPage />;
      case Page.Booking:
        return <BookingPage setActivePage={setActivePage} />;
      case Page.TrackRepair:
        return <TrackRepairPage />;
      case Page.Contact:
        return <ContactPage />;
      case Page.FAQ:
        return <FaqPage />;
      case Page.Blog:
        return <BlogPage />;
      case Page.Admin:
        return <AdminPage />;
      case Page.Login:
        return <LoginPage setActivePage={setActivePage} />;
      case Page.SignUp:
        return <SignUpPage setActivePage={setActivePage} />;
      case Page.Account:
        // Protect the Account page
        return currentUser ? <AccountPage /> : <LoginPage setActivePage={setActivePage} />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setActivePage={setActivePage} />
      
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/27746742501"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 z-50"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8" />
      </a>
    </div>
  );
};

export default App;