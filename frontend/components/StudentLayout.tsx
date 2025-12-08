// frontend/components/StudentLayout.tsx

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { UserCircleIcon, BookOpenIcon, ClockIcon, CurrencyDollarIcon, ArrowLeftEndOnRectangleIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

interface StudentLayoutProps {
    children: ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* --- Student Sidebar --- */}
            <nav className="w-64 bg-white shadow-xl flex flex-col p-4 border-r border-gray-200">
                <div className="text-xl font-bold text-indigo-700 mb-6 flex items-center">
                    <AcademicCapIcon className="h-6 w-6 mr-2" />
                    Student Portal
                </div>
                
                {/* Main Navigation */}
                <div className="flex-grow space-y-2">
                    {/* Note: Linking back to self for now to keep the profile active */}
                    <Link href="/dashboard/profile?id=1001" className="flex items-center p-3 text-indigo-600 bg-indigo-50 rounded-lg font-medium hover:bg-indigo-100 transition">
                         <UserCircleIcon className="h-5 w-5 mr-3" />
                         Student Profile
                    </Link>
                    <Link href="#" className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                         <BookOpenIcon className="h-5 w-5 mr-3" />
                         Enrollment Record
                    </Link>
                    <Link href="#" className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                         <ClockIcon className="h-5 w-5 mr-3" />
                         Academic History
                    </Link>
                    <Link href="#" className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                         <CurrencyDollarIcon className="h-5 w-5 mr-3" />
                         Payment
                    </Link>
                </div>
                
                {/* Footer/Sign Out */}
                <div className="mt-6 border-t pt-4">
                    <Link href="/login" className="flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition font-medium">
                        <ArrowLeftEndOnRectangleIcon className="h-5 w-5 mr-3" />
                        Sign Out
                    </Link>
                </div>
            </nav>

            {/* --- Main Content --- */}
            <main className="flex-grow overflow-y-auto">
                {/* Fixed Header Bar (Replacing the old Admin/Student Portal title) */}
                <div className="w-full bg-white shadow p-4 border-b border-gray-200">
                    <h1 className="text-lg font-semibold text-gray-800">University Student Portal</h1>
                </div>
                <div className="p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default StudentLayout;