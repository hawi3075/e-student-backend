// frontend/app/dashboard/layout.tsx

import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

// The function must be exported as default.
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <Header />

      <div className="flex pt-20">
        
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-grow ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; // <-- This MUST be present