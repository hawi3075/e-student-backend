// frontend/app/dashboard/profile/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { UserCircleIcon, AcademicCapIcon, IdentificationIcon, ShieldCheckIcon, CalendarDaysIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { getStudentProfile, StudentProfile } from '@/lib/data-service'; // Import the mock backend logic

const StudentProfilePage: React.FC = () => {
    // Initialize state with a loading or default state
    const [profile, setProfile] = useState<StudentProfile | null>(null);

    useEffect(() => {
        // Simulate fetching data from the API/backend on component mount
        const fetchedProfile = getStudentProfile();
        setProfile(fetchedProfile);
    }, []);

    // Display a loading state while fetching (important for real APIs)
    if (!profile) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg text-gray-500">Loading student profile...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            
            {/* Page Header */}
            <div className="flex items-center space-x-4 border-b pb-4">
                <UserCircleIcon className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">Student Profile Dashboard</h1>
            </div>

            {/* Profile Overview */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500 space-y-6">
                <div className="flex items-center space-x-4">
                    <UserCircleIcon className="h-16 w-16 text-gray-400" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                        <p className="text-sm text-gray-500">{profile.major}</p>
                    </div>
                </div>

                {/* Credentials and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <IdentificationIcon className="h-6 w-6 text-blue-500" />
                        <div>
                            <p className="text-xs font-medium text-gray-500">Student ID</p>
                            <p className="font-semibold text-gray-900">{profile.id}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <ShieldCheckIcon className="h-6 w-6 text-red-500" />
                        <div>
                            <p className="text-xs font-medium text-gray-500">Temporary Password</p>
                            <p className="font-semibold text-red-700">{profile.password}</p> 
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <AcademicCapIcon className="h-6 w-6 text-green-500" />
                        <div>
                            <p className="text-xs font-medium text-gray-500">Enrollment Status</p>
                            <p className="font-semibold text-gray-900">{profile.enrollmentStatus}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <CalendarDaysIcon className="h-6 w-6 text-yellow-500" />
                        <div>
                            <p className="text-xs font-medium text-gray-500">Join Date</p>
                            <p className="font-semibold text-gray-900">{profile.joinDate}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact and Advisor */}
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Contact & Advisor Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                        <EnvelopeIcon className="h-6 w-6 text-gray-500" />
                        <p className="text-gray-700">{profile.email}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <UserCircleIcon className="h-6 w-6 text-gray-500" />
                        <p className="text-gray-700">Academic Advisor: {profile.advisor}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfilePage;