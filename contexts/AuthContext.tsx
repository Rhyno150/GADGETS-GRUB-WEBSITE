
import React, { createContext, useState, useEffect } from 'react';
import { User, Page } from '../types';

interface AuthContextType {
  currentUser: User | null;
  signUp: (name: string, email: string, password: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signUp: async () => { throw new Error('signUp function not implemented'); },
  login: async () => { throw new Error('login function not implemented'); },
  logout: () => { throw new Error('logout function not implemented'); },
});

// A simple password "hashing" function for demonstration. 
// In a real app, use a library like bcrypt.
const encodePassword = (password: string) => btoa(password);
const getNextCustomerId = (): string => {
    const lastId = parseInt(localStorage.getItem('lastCustomerId') || '100');
    const nextId = lastId + 1;
    localStorage.setItem('lastCustomerId', nextId.toString());
    return `CUST-${nextId}`;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session storage on initial load to maintain login state across refreshes
    const storedUserId = sessionStorage.getItem('loggedInUserId');
    if (storedUserId) {
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.id === storedUserId);
        if(user) setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const signUp = async (name: string, email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // Simulate API call
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
          return reject(new Error('An account with this email already exists.'));
        }

        const newUser: User = {
          id: getNextCustomerId(),
          name,
          email,
          passwordHash: encodePassword(password),
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        sessionStorage.setItem('loggedInUserId', newUser.id);
        setCurrentUser(newUser);
        resolve(newUser);
      }, 500);
    });
  };

  const login = async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { // Simulate API call
            const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

            if (user && user.passwordHash === encodePassword(password)) {
                sessionStorage.setItem('loggedInUserId', user.id);
                setCurrentUser(user);
                resolve(user);
            } else {
                reject(new Error('Invalid email or password.'));
            }
        }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('loggedInUserId');
  };

  const value = {
    currentUser,
    signUp,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};