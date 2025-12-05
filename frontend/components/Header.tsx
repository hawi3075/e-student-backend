import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-blue-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-start">
        
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12">
             <Image 
                src="/hs-logo.png" 
                alt="HS Logo" 
                width={48} 
                height={48}
                priority 
                style={{ borderRadius: '50%', objectFit: 'contain' }}
                unoptimized 
            />
          </div>
          <span className="text-2xl font-bold text-gray-800">Student Portal</span>
        </div>

        <div className="flex-grow">
        </div>
      </div>
    </header>
  );
};

export default Header;