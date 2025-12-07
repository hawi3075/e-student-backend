// frontend/app/dashboard/dormitory/page.tsx

'use client';

import React from 'react';
import { HomeModernIcon, KeyIcon, UsersIcon, ShieldCheckIcon, QuestionMarkCircleIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

// --- Data Placeholder (Generic) ---

const studentDormData = {
    // Using generic placeholders
    dormitoryName: '[Assigned Dorm Name]',
    block: '[Block Letter]', 
    roomNumber: '[Room Number]',
    bedSpace: '[Bed Space]',
    residentAdvisor: '[RA Name]',
    checkInDate: '[Date]',
    status: 'Confirmed', // Set to Confirmed to display the table by default
};

const rulesAndRegulations = [
    "Quiet hours are enforced from 10:00 PM to 8:00 AM daily.",
    "Cooking is only permitted in designated kitchen areas.",
    "Guests must be signed in at the front desk and depart by 11:00 PM.",
    "Smoking is strictly prohibited inside the building.",
    "Maintain the cleanliness and order of common areas.",
];


const DormitoryPage: React.FC = () => {
    
    // Determine the status class for the card
    const getStatusClasses = (status: string) => {
        return status === 'Confirmed' 
            ? 'bg-green-100 text-green-800 border-green-500' 
            : 'bg-yellow-100 text-yellow-800 border-yellow-500';
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            
            {/* Page Header */}
            <div className="flex items-center space-x-4">
                <HomeModernIcon className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">Dormitory & Housing Portal</h1>
            </div>

            {/* Dormitory Name Banner */}
             <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center space-x-3">
                <BuildingLibraryIcon className="h-7 w-7 text-blue-500"/>
                <p className="text-xl font-bold text-gray-900">Dormitory: {studentDormData.dormitoryName}</p>
            </div>


            {/* Assignment Summary Card (Table Focus: Block, Room, Bed) */}
            <div className={`p-6 rounded-xl shadow-lg border-l-4 ${getStatusClasses(studentDormData.status)}`}>
                <h2 className="text-xl font-bold mb-3 flex items-center space-x-2">
                    {studentDormData.status === 'Confirmed' ? <KeyIcon className="h-6 w-6" /> : <QuestionMarkCircleIcon className="h-6 w-6" />}
                    <span>Current Assignment Details ({studentDormData.status})</span>
                </h2>
                
                {studentDormData.status === 'Confirmed' ? (
                    // --- Assignment Table (Focus: Block, Room, Bed) ---
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-white">
                                <tr>
                                    {/* FIX: Simplified headers */}
                                    {['Block', 'Room Number', 'Bed Space', 'Check-In Date'].map(header => (
                                        <th
                                            key={header}
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                <tr>
                                    {/* FIX: Simplified data display */}
                                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                                        {studentDormData.block}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {studentDormData.roomNumber}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {studentDormData.bedSpace}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {studentDormData.checkInDate}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-4 bg-yellow-50 rounded-lg text-yellow-800">
                        <p className="font-semibold">Assignment Pending:</p>
                        <p className="text-sm">Your housing assignment is not yet confirmed. Please check back after {studentDormData.checkInDate}.</p>
                    </div>
                )}
            </div>

            {/* Resident Advisor & Contact Info */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <UsersIcon className="h-6 w-6 text-indigo-600" />
                    <span>Housing Staff & Support</span>
                </h2>
                <div className="space-y-2">
                    <p className="text-gray-700"><strong>Resident Advisor:</strong> {studentDormData.residentAdvisor}</p>
                    <p className="text-gray-500 text-sm">
                        Contact the RA through the official **Housing Management System** or visit the Residence Life Office during business hours.
                    </p>
                </div>
            </div>

            {/* Rules and Regulations */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <ShieldCheckIcon className="h-6 w-6 text-red-600" />
                    <span>Dormitory Rules & Regulations</span>
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {rulesAndRegulations.map((rule, index) => (
                        <li key={index}>{rule}</li>
                    ))}
                </ul>
            </div>

            {/* Copyright Note */}
            <div className="text-center text-sm text-gray-500 pt-4">
                <p className="text-xs text-gray-400">© [Year] [University Name]. All Rights Reserved. All housing documents and assignments are **copyright restricted**.</p>
            </div>

        </div>
    );
};

export default DormitoryPage;