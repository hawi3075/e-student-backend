// frontend/app/dashboard/profile/page.tsx (FINAL FIX)

'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { UserCircleIcon, AcademicCapIcon, BriefcaseIcon, CreditCardIcon, ExclamationCircleIcon, UserIcon } from '@heroicons/react/24/outline';

// ⚠️ FIX 1: Change to the correct layout for the student dashboard.
// This assumes you have a component named StudentLayout that wraps the student pages.
// If you don't have a dedicated StudentLayout, you MUST create one or use the AdminLayout
// and ensure its content dynamically changes based on the user's role/session.
import StudentLayout from '../../../components/StudentLayout'; 

// ⚠️ FIX 2: Correct the import path for the centralized data structure.
// /frontend/app/dashboard/profile/ -> /frontend/app/dashboard/ -> /frontend/app/ -> /frontend/ -> /lib/data
// This requires FOUR dots (../../../../lib/data)
import { Student } from '../../../../lib/data'; 

const StudentProfileDashboard: React.FC = () => {
    const searchParams = useSearchParams();
    const studentId = searchParams.get('id');

    const [studentData, setStudentData] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentData = async () => {
            if (!studentId) {
                setLoading(false);
                return;
            }
            try {
                // Call the API endpoint
                const response = await fetch(`/api/students/${studentId}`);
                
                if (!response.ok) {
                    // This is why "Profile Not Found" occurred if the API couldn't find the data.
                    throw new Error('Failed to fetch student data');
                }
                
                const data: Student = await response.json();
                setStudentData(data);
            } catch (error) {
                console.error('API Fetch Error:', error);
                setStudentData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [studentId]);

    const LayoutComponent = StudentLayout; // Use the dedicated student layout

    if (loading) {
        return (
            <LayoutComponent>
                <div className="flex justify-center items-center h-96">
                    <p className="text-lg text-indigo-600">Loading Student Profile...</p>
                </div>
            </LayoutComponent>
        );
    }
    
    // Renders the "Profile Not Found" message
    if (!studentData) {
        return (
            <LayoutComponent>
                <div className="flex justify-center items-center h-full p-10">
                    <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                        <ExclamationCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800">Profile Not Found</h2>
                        <p className="text-gray-600 mt-2">The requested student profile could not be loaded for ID: {studentId}. Ensure the student ID exists in the database.</p>
                        <a href="/login" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
                            Return to Login
                        </a>
                    </div>
                </div>
            </LayoutComponent>
        );
    }

    // Renders the Student Data
    return (
        <LayoutComponent>
            <div className="max-w-7xl mx-auto p-8 py-12">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                        <UserCircleIcon className="h-8 w-8 mr-3 text-indigo-600" />
                        Student Profile Dashboard
                    </h1>
                    <p className="text-gray-600 mt-1">Personal and Registration Information.</p>
                </header>
                
                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <UserIcon className="h-6 w-6 mr-3 text-gray-500" />
                        Personal Details
                    </h2>
                    
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-lg">
                        
                        {/* 1. Student ID */}
                        <div>
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <CreditCardIcon className="w-4 h-4 mr-2 text-indigo-500"/>
                                Student ID
                            </dt>
                            <dd className="mt-1 font-semibold text-gray-900">{studentData.id}</dd>
                        </div>
                        
                        {/* 2. Full Name */}
                        <div>
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <UserIcon className="w-4 h-4 mr-2 text-indigo-500"/>
                                Full Name
                            </dt>
                            <dd className="mt-1 font-semibold text-gray-900">{studentData.name}</dd>
                        </div>

                        {/* 3. Department */}
                        <div>
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <AcademicCapIcon className="w-4 h-4 mr-2 text-indigo-500"/>
                                Department
                            </dt>
                            <dd className="mt-1 font-semibold text-gray-900">{studentData.department}</dd>
                        </div>
                        
                        {/* 4. Registration Status */}
                        <div>
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <BriefcaseIcon className="w-4 h-4 mr-2 text-indigo-500"/>
                                Registration Status
                            </dt>
                            <dd className={`mt-1 font-semibold ${studentData.status === 'Registered' ? 'text-green-600' : 'text-yellow-600'}`}>
                                {studentData.status}
                            </dd>
                        </div>

                        {/* Additional Data (Credits) */}
                        <div className="md:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Credits Enrolled</dt>
                            <dd className="mt-1 font-semibold text-gray-900">{studentData.credits}</dd>
                        </div>

                    </dl>
                </div>
            </div>
        </LayoutComponent>
    );
};

export default StudentProfileDashboard;