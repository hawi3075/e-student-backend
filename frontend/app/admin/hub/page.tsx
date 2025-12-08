// frontend/app/admin/hub/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { UsersIcon, AcademicCapIcon, BriefcaseIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// ✅ CORRECT: Import the comprehensive layout that includes Navbar, Sidebar, and background
import AdminLayout from '../../../components/AdminLayout'; 

// ❌ REMOVED: import RootLayout from '../../layout'; 
// This line caused the error/conflict.

const AdminHubPage: React.FC = () => {
    
    // Define the available administration roles/sections
    const adminRoles = [
        {
            title: 'Registration Office Portal',
            description: 'Manage student enrollment, course registration, and student profiles.',
            icon: UsersIcon,
            link: '/admin/registration-office' 
        },
        {
            title: 'Faculty/Teacher Portal',
            description: 'Manage course listings, input grades, and view teaching schedules.',
            icon: AcademicCapIcon,
            link: '/admin/faculty-portal' 
        },
        {
            title: 'System Administrator (IT)',
            description: 'Manage user accounts, system settings, and technical configurations.',
            icon: BriefcaseIcon,
            link: '/admin/system-settings' 
        },
    ];

    const RoleCard: React.FC<{ role: typeof adminRoles[0] }> = ({ role }) => (
        <Link href={role.link}>
            <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl hover:border-indigo-400 transition duration-300 transform hover:scale-[1.02] cursor-pointer h-full">
                <role.icon className="h-8 w-8 text-indigo-600 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                <div className="flex items-center text-indigo-600 font-semibold text-sm">
                    Select Portal
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                </div>
            </div>
        </Link>
    );

    return (
        // Wrapping content in AdminLayout
        <AdminLayout>
            <div className="space-y-10 max-w-5xl mx-auto p-8 py-12">
                <header className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900">Admin Access Hub</h1>
                    <p className="text-lg text-gray-600 mt-2">Please select the portal relevant to your current administrative role.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {adminRoles.map((role) => (
                        <RoleCard key={role.title} role={role} />
                    ))}
                </div>

                {/* This footer is for internal spacing; the Copyright Footer is handled by AdminLayout */}
                <footer className="text-center text-sm text-gray-400 pt-8 mt-10 border-t border-gray-100">
                    <p>Ensure you select the correct administrative role before proceeding.</p>
                </footer>
            </div>
        </AdminLayout>
    );
};

export default AdminHubPage;