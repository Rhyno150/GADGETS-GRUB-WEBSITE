
export enum Page {
  Home = 'Home',
  About = 'About Us',
  Services = 'Services',
  Booking = 'Book Repair Online',
  TrackRepair = 'Track My Repair',
  Contact = 'Contact Us',
  FAQ = 'FAQ',
  Blog = 'Blog',
  Admin = 'Admin Panel',
}

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

export interface Booking {
  id: string;
  submissionDate: string;
  name: string;
  email: string;
  phone: string;
  device: string;
  model: string;
  repairType: string;
  description: string;
}

// FIX: Add GeminiDiagnosis interface to be used by the Gemini service and diagnostics component.
export interface GeminiDiagnosis {
  possibleIssue: string;
  recommendedService: string;
  explanation: string;
  disclaimer: string;
}
