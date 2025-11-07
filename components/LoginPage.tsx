
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Page } from '../types';

interface LoginPageProps {
    setActivePage: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setActivePage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            setActivePage(Page.Account); // Redirect to account page on success
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 py-16 sm:py-24 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Login</h1>
                        <p className="mt-2 text-gray-600">Access your account and repair history.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                        {error && <p className="text-red-500 bg-red-50 p-3 rounded-md text-center">{error}</p>}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" name="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" name="password" id="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                        <div>
                            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 transition-colors">
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button onClick={() => setActivePage(Page.SignUp)} className="font-medium text-orange-600 hover:text-orange-500">
                                Sign up here
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;