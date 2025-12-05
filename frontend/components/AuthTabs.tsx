import React from 'react';

interface AuthTabsProps {
  activeTab: 'login' | 'signup';
  setActiveTab: (tab: 'login' | 'signup') => void;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex bg-gray-100 rounded-full p-1 mb-8 shadow-inner">
      <button
        type="button"
        className={`flex-1 py-2 text-center rounded-full transition-colors duration-200 ${
          activeTab === 'login'
            ? 'bg-white text-blue-600 font-bold shadow-md'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => setActiveTab('login')}
      >
        Login
      </button>
      <button
        type="button"
        className={`flex-1 py-2 text-center rounded-full transition-colors duration-200 ${
          activeTab === 'signup'
            ? 'bg-white text-blue-600 font-bold shadow-md'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => setActiveTab('signup')}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthTabs;