// frontend/app/login/page.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image'; 
import { useRouter } from 'next/navigation'; // <-- 1. Import useRouter
import { ArrowRightIcon, AcademicCapIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'; 

const LoginPage: React.FC = () => {
  const router = useRouter(); // <-- 2. Initialize router
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const currentYear = new Date().getFullYear();

  // --- Utility Functions ---

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would send credentials to an API here.
    
    if (activeTab === 'student') {
        // 3. STUDENT SUCCESS: Redirect to the Upcoming Events page
        alert('Student Login Successful! Redirecting...');
        router.push('/dashboard/events'); 
        
    } else if (activeTab === 'admin') {
        // ADMIN SUCCESS: Redirect to the Admin Dashboard (or a different page)
        alert('Admin Login Successful! Redirecting to Admin Dashboard...');
        router.push('/admin/dashboard'); // Assuming you'll create an admin dashboard route later
    }
  };

  const handleLogout = () => {
    // This is just for display on the login page navigation. 
    alert('Simulated Logout action. You are on the login page.');
  };

  // --- Main Render ---

  const primaryLabel = activeTab === 'student' ? 'Student ID / Email' : 'Staff ID / Email';
  const loginButtonText = activeTab === 'student' ? 'Student Login' : 'Admin Login';
  const emailPlaceholder = activeTab === 'student' ? 'Enter Student ID or Email' : 'Enter Staff ID or Email';

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      
      {/* --- Enhanced Navigation Bar / Header (FIXED/STICKY) --- */}
      <nav className="w-full bg-blue-100 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20"> 
            
            {/* Left Side: Logo and Portal Name */}
            <div className="flex-shrink-0 flex items-center space-x-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/hs-logo.png"
                  alt="Student Portal Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <span className="text-2xl font-bold text-gray-800">Student Portal</span>
            </div>
            
            {/* Right Side: Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 p-2 rounded-lg text-gray-700 hover:bg-blue-200 transition duration-150"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6" /> 
              <span className="font-medium hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- Login Form Centered Content --- */}
      <div className="flex items-center justify-center flex-grow p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl space-y-6">
          
          {/* Welcome Message */}
          <div className="text-center space-y-3">
            <AcademicCapIcon className="h-10 w-10 text-blue-600 mx-auto" />
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
            <p className="text-gray-500">Login to access your dashboard.</p>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex-1 py-3 text-lg font-semibold border-b-2 transition duration-200 ${
                activeTab === 'student'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-3 text-lg font-semibold border-b-2 transition duration-200 ${
                activeTab === 'admin'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Admin / Staff
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email / ID Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {primaryLabel}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={emailPlaceholder}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password" 
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot Password?
              </a>
              {activeTab === 'student' && (
                  <a href="#" className="font-medium text-gray-600 hover:text-gray-500">
                      Sign Up
                  </a>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
            >
              {loginButtonText}
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </button>
          </form>

          {/* Admin Specific Notes (Optional) */}
          {activeTab === 'admin' && (
              <p className="text-center text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
                  Admin login is restricted to university faculty and staff only.
              </p>
          )}
        </div>
      </div>

      {/* --- Copyright Footer --- */}
      <footer className="w-full py-4 text-center text-xs text-gray-500 bg-blue-50 border-t border-gray-200">
          <p>&copy; {currentYear} Student Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;