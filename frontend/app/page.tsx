'use client'; 

import React, { useState } from 'react';
import InputField from '../components/InputField'; 
import AuthTabs from '../components/AuthTabs';    
import SocialLogin from '../components/SocialLogin'; 
import Header from '../components/Header';
import { AcademicCapIcon } from '@heroicons/react/24/solid'; 

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt...');
  };

  return (
    <div className="min-h-screen bg-gray-100"> 
      
      <Header /> 

      <main className="flex items-start justify-center pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl"> 
          
          <div className="flex flex-col items-center mb-8">
            <AcademicCapIcon className="h-12 w-12 text-blue-600 mb-4 bg-blue-100 p-2 rounded-full" />
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome Back!</h1>
            <p className="text-gray-600 text-center">Login to access your student dashboard.</p>
          </div>

          <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {activeTab === 'login' && (
            <form onSubmit={handleSubmit}>
              <InputField label="Student ID / Email" type="email" placeholder="Enter your student ID or email" />
              <InputField label="Password" isPassword placeholder="Enter your password" />
              
              <div className="flex justify-end mb-6">
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-blue-700 transition duration-200"
              >
                Login
              </button>
              
              <SocialLogin />
            </form>
          )}

          {activeTab === 'signup' && (
            <div className="text-center p-8 border border-gray-200 rounded-xl">
              <h2 className="text-xl font-semibold mb-3">Create an Account</h2>
              <p className="text-gray-600">The sign up form structure goes here, reusing the InputField components.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoginPage;