// frontend/app/dashboard/academics/course-audit/page.tsx

'use client';

import React, { useState } from 'react';
import { AcademicCapIcon, ClipboardDocumentCheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

// --- Data Interfaces (Placeholder structure) ---

interface CourseRequirement {
    courseCode: string;
    courseTitle: string;
    creditHour: number;
    prerequisites: string;
    status: 'Completed' | 'In Progress' | 'Required' | 'Waived';
}

interface RequirementSection {
    id: string;
    title: string;
    description: string;
    courses: CourseRequirement[];
}

// --- Initial Placeholder Data (Empty) ---

const auditData: CourseRequirement[] = [
    // This array is intentionally empty, awaiting admin input.
];

// List of all degree requirement sections with simplified titles
const groupedAuditData = [
    {
        id: 'year1',
        // FIX: Simplified title
        title: 'First Year Requirements',
        description: 'Courses designed to build a solid academic base.',
        courses: auditData, 
    },
    {
        id: 'year2',
        // FIX: Simplified title
        title: 'Second Year Requirements',
        description: 'Essential courses for the major field of study.',
        courses: auditData,
    },
    {
        id: 'year3',
        // FIX: Simplified title
        title: 'Third Year Requirements',
        description: 'In-depth courses and specialized topics.',
        courses: auditData,
    },
    {
        id: 'year4',
        // FIX: Simplified title
        title: 'Fourth Year Requirements',
        description: 'Advanced electives and the final capstone project.',
        courses: auditData,
    },
    {
        id: 'year5',
        // FIX: Simplified title
        title: 'Fifth Year Requirements',
        description: 'Practical experience and independent research.',
        courses: auditData,
    },
];

const CourseAuditPage: React.FC = () => {
    // Initialize the state to open the first section ('year1') for better UX
    const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
        const initialOpen: Record<string, boolean> = {};
        if (groupedAuditData.length > 0) {
            initialOpen[groupedAuditData[0].id] = true; 
        }
        return initialOpen;
    });

    // Toggle function for the accordion
    const toggleSection = (id: string) => {
        setOpenSections(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    
    // --- Utility Functions ---

    // Convert status to lowercase for safe matching
    const getStatusClasses = (status: CourseRequirement['status']) => {
        const lowerStatus = status.toLowerCase();

        switch (lowerStatus) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in progress': return 'bg-yellow-100 text-yellow-800';
            case 'waived': return 'bg-indigo-100 text-indigo-800';
            case 'required': 
            default: return 'bg-red-100 text-red-800';
        }
    };

    // --- Main Render ---

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            
            {/* Page Header */}
            <div className="flex items-center space-x-4">
                <AcademicCapIcon className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">Academic Course Audit</h1>
            </div>

            {/* Degree Tracker Summary Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                    <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-600" /> 
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Degree Requirements Tracker</h2>
                    </div>
                </div>
                <p className="mt-2 text-gray-600">
                    This report lists all courses required for your degree. Statuses are filled dynamically based on registration and completion data.
                </p>
            </div>
            
            {/* Audit Sections (Accordion) */}
            <div className="space-y-4">
                {groupedAuditData.map((section) => (
                    <div key={section.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                        
                        {/* Section Header */}
                        <button
                            type="button" 
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex justify-between items-center p-5 text-left transition duration-150 hover:bg-gray-50"
                            aria-expanded={openSections[section.id]}
                        >
                            <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                            {openSections[section.id] ? (
                                <ChevronUpIcon className="h-6 w-6 text-blue-600" />
                            ) : (
                                <ChevronDownIcon className="h-6 w-6 text-blue-600" />
                            )}
                        </button>

                        {/* Section Content */}
                        {openSections[section.id] && (
                            <div className="p-5 border-t border-gray-100">
                                <p className="text-sm text-gray-600 mb-4">{section.description}</p>
                                
                                {/* Check if courses exist for this section */}
                                {section.courses.length === 0 ? (
                                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                                        <p className="text-gray-500 font-medium">
                                            No courses registered or completed for this section yet. Awaiting admin input.
                                        </p>
                                    </div>
                                ) : (
                                    // --- Course Table (Hidden by empty data) ---
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-blue-50">
                                                <tr>
                                                    {['Course Code', 'Course Title', 'Credit Hour', 'Prerequisite(s)', 'Status'].map(header => (
                                                        <th
                                                            key={header}
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                                                        >
                                                            {header}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {section.courses.map((course, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">{course.courseCode}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.courseTitle}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.creditHour}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.prerequisites || 'None'}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span
                                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(course.status)}`}
                                                            >
                                                                {course.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Note & Copyright Restriction */}
            <div className="text-center text-sm text-gray-500 pt-4 space-y-1">
                <p>This course audit reflects the official degree requirements for the current academic catalog year.</p>
                {/* FIX: Added Copyright Restriction */}
                <p className="text-xs text-gray-400">© 2025 [University Name]. All Rights Reserved. Reproduction or distribution of this document is prohibited without written permission.</p>
            </div>

        </div>
    );
};

export default CourseAuditPage;