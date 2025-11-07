
export enum Page {
  Home = 'Home',
  About = 'About Us',
  Services = 'Services',
  Accessories = 'Accessories',
  Booking = 'Book Repair Online',
  TrackRepair = 'Track My Repair',
  Contact = 'Contact Us',
  FAQ = 'FAQ',
  Blog = 'Blog',
  Admin = 'Admin Panel',
  Login = 'Login',
  SignUp = 'Sign Up',
  Account = 'My Account',
}

export type Status = 'Received' | 'Diagnosing' | 'Repairing' | 'Ready' | 'Completed';

export interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  date: string;
}

export interface User {
  id: string; // Unique customer ID, e.g., CUST-101
  name: string;
  email: string;
  passwordHash: string; // Store a hashed/encoded password, not plain text
}

export interface Booking {
  id: string; // Internal ID based on timestamp
  repairId: string; // Customer-facing sequential ID
  userId: string | null; // Link to the user who made the booking
  submissionDate: string;
  name: string;
  email: string;
  phone: string;
  device: string;
  model: string;
  repairType: string;
  description: string;
  status: Status;
}

export interface Accessory {
  name: string;
  price: string;
  imageUrl: string;
  description: string;
}

// FIX: Add GeminiDiagnosis interface to be used by the Gemini service and diagnostics component.
export interface GeminiDiagnosis {
  possibleIssue: string;
  recommendedService: string;
  explanation: string;
  disclaimer: string;
}