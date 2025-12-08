// frontend/components/Navbar.tsx

import React from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        // Light blue background matching the dashboard
        <nav className="bg-indigo-600 p-4 shadow-md text-white sticky top-0 z-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-3">
                    {/* Logo/Icon */}
                    <AcademicCapIcon className="h-7 w-7 text-white" />
                    {/* University Name/Portal Text */}
                    <span className="text-xl font-semibold tracking-wide">University Student Portal</span>
                </Link>
                {/* Right side navigation (e.g., Logout button, if applicable) */}
                <div className="text-sm">
                    {/* You can add a link here like 'About' or 'Help' */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;