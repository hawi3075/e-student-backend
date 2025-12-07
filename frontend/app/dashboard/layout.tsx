// frontend/app/dashboard/layout.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // REQUIRED for active highlighting
import {
    UserCircleIcon,
    AcademicCapIcon,
    CalendarDaysIcon,
    ClipboardDocumentCheckIcon,
    CreditCardIcon, 
    DocumentTextIcon,
    ArrowLeftStartOnRectangleIcon,
    BookOpenIcon,
    DocumentMagnifyingGlassIcon,
    ClockIcon,
    HomeModernIcon, 
    ShieldCheckIcon,      // Clearance Status
    ClipboardDocumentListIcon, // Complaint Result
    DocumentCheckIcon,    // Course Exemption
} from '@heroicons/react/24/outline';

// --- FINAL VERIFIED NAVIGATION ARRAY ---
const navigation = [
    { name: 'Student Profile', href: '/dashboard/profile', icon: UserCircleIcon },
    { name: 'Enrollment Record', href: '/dashboard/enrollment', icon: DocumentTextIcon },
    { name: 'Academic History', href: '/dashboard/academic-history', icon: ClockIcon }, 
    { name: 'Upcoming Events', href: '/dashboard/events', icon: CalendarDaysIcon },
    
    // Academic Section (Payment is included here)
    { separator: true, label: 'ACADEMICS' },
    { name: 'Curriculum', href: '/dashboard/academics/curriculum', icon: BookOpenIcon },
    { name: 'Registration', href: '/dashboard/academics/registration', icon: AcademicCapIcon },
    { name: 'Course Audit', href: '/dashboard/academics/course-audit', icon: ClipboardDocumentCheckIcon },
    { name: 'Payment', href: '/dashboard/academics/payment', icon: CreditCardIcon }, 
    
    // Housing/Dormitory Section
    { separator: true, label: 'HOUSING' },
    { name: 'Dormitory Info', href: '/dashboard/dormitory', icon: HomeModernIcon }, 
    
    // Requests Section (Includes Clearance, Complaint, Exemption)
    { separator: true, label: 'REQUESTS & STATUS' },
    { name: 'Add/Drop Request', href: '/dashboard/requests/add-drop', icon: DocumentMagnifyingGlassIcon },
    { name: 'Term Withdrawal', href: '/dashboard/requests/withdrawal', icon: ArrowLeftStartOnRectangleIcon },
    
    // Request Statuses
    { name: 'Clearance Status', href: '/dashboard/requests/clearance', icon: ShieldCheckIcon }, 
    { name: 'Complaint Result', href: '/dashboard/requests/complaint', icon: ClipboardDocumentListIcon }, 
    { name: 'Course Exemption', href: '/dashboard/requests/course-exception', icon: DocumentCheckIcon },
];


interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    
    // 💡 Use the hook to accurately get the current path for active styling
    const currentPath = usePathname();

    return (
        <div className="flex h-screen bg-gray-100">
            
            {/* Sidebar */}
            <div className="flex flex-col w-64 bg-white border-r border-gray-200 shadow-xl">
                
                {/* Logo/Header Area */}
                <div className="flex items-center justify-center h-20 border-b border-gray-200 p-4">
                    <AcademicCapIcon className="h-8 w-8 text-blue-600 mr-2" />
                    <span className="text-xl font-bold text-gray-900">Student Portal</span>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navigation.map((item, index) => {
                        if (item.separator) {
                            return (
                                <div key={index} className="px-3 pt-4 pb-2">
                                    <span className="text-xs font-semibold uppercase text-gray-400">{item.label}</span>
                                </div>
                            );
                        }
                        
                        // Determine if the link is active
                        const isActive = currentPath === item.href;

                        return (
                            <Link key={item.name} href={item.href} className="block"> 
                                <div
                                    className={`
                                        flex items-center px-3 py-3 rounded-lg transition duration-150 space-x-3
                                        ${isActive 
                                            ? 'bg-blue-50 text-blue-700 font-semibold shadow-inner' // Active style
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' // Inactive/Hover style
                                        }
                                    `}
                                >
                                    <item.icon className="h-6 w-6" />
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
                

                

                {/* Logout/Profile Footer (Redirection to Login Page) */}
                <div className="border-t border-gray-200 p-4">
                    {/* FIX: Changed the href from "/" to "/login" to target app/login/page.tsx */}
                    <Link href="/login" className="block">
                        <div className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-red-600 transition duration-150 space-x-2">
                            <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                            <span>Sign Out</span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-10 pb-20"> 
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;