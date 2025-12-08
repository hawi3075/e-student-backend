// frontend/components/AdminLayout.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { AcademicCapIcon, BriefcaseIcon, UsersIcon, CogIcon, ClipboardDocumentListIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

// --- 1. ADMIN SIDEBAR Component ---
const AdminSidebar = () => {
    // Define Admin Navigation Links
    const navItems = [
        { name: 'Admin Hub', icon: BriefcaseIcon, href: '/admin/hub' },
        { name: 'Registration Mgmt', icon: UsersIcon, href: '/admin/registration-office' },
        { name: 'Faculty Portal', icon: AcademicCapIcon, href: '/admin/faculty-portal' },
        { name: 'System Settings', icon: CogIcon, href: '/admin/system-settings' },
        { name: 'Reports & Audit', icon: ClipboardDocumentListIcon, href: '/admin/reports' },
    ];

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        // Sidebar container: fixed width, white background, shadow
        <div className="w-64 bg-white shadow-xl flex flex-col h-full border-r border-gray-200">
            {/* Logo/Header Area */}
            <div className="p-4 border-b border-gray-200">
                <Link href="/admin/hub" className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                    <AcademicCapIcon className="h-6 w-6 text-indigo-600" />
                    <span>Admin Portal</span>
                </Link>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex-grow p-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                            currentPath.startsWith(item.href)
                                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            {/* Sign Out/Footer link */}
            <div className="p-4 border-t border-gray-200">
                 <Link href="/login" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                    <span>Sign Out</span>
                </Link>
            </div>
        </div>
    );
};

// --- 2. ADMIN NAVBAR Component ---
const AdminNavbar = () => {
    return (
        // Blue Navbar (from image_547fd3.png)
        <nav className="bg-indigo-600 p-4 shadow-md text-white sticky top-0 z-10">
            <div className="max-w-full flex justify-between items-center px-4">
                <Link href="/admin/hub" className="flex items-center space-x-3">
                    <AcademicCapIcon className="h-7 w-7 text-white" />
                    <span className="text-xl font-semibold tracking-wide">University Student Portal</span>
                </Link>
                {/* Placeholder for user info/notifications */}
                <div className="text-sm">
                    {/* (User Avatar/Name Here) */}
                </div>
            </div>
        </nav>
    );
};


// --- 3. MAIN ADMIN LAYOUT Component ---
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        // Overall container with the light gray background (bg-gray-100)
        <div className="min-h-screen bg-gray-100 flex flex-col">
            
            {/* Top Navbar */}
            <AdminNavbar />

            {/* Main Flex Container for Sidebar + Content */}
            <div className="flex flex-grow">
                
                {/* Left Sidebar */}
                <AdminSidebar />
                
                {/* Right Content Area: Main scrolling body */}
                <main className="flex flex-col flex-grow overflow-y-auto">
                    <div className="flex-grow">
                         {children} {/* This inserts the content of admin/hub/page.tsx */}
                    </div>
                   
                    {/* Copyright Footer */}
                    <footer className="text-center p-3 text-sm text-gray-500 border-t border-gray-200 bg-white">
                        &copy; {new Date().getFullYear()} University Portal. All rights reserved. 
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;