// frontend/app/dashboard/academics/curriculum/page.tsx

'use client';

import React from 'react';
import { BookOpenIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

// Define the structure for a curriculum item
interface CurriculumItem {
    year: string;
    semester: string;
    courseCode: string;
    courseTitle: string;
    credits: number;
    required: boolean;
}

// FIX: This array must be completely empty for the placeholder message to display.
const curriculumData: CurriculumItem[] = [
    // Verify: This array is empty.
];


const CurriculumPage: React.FC = () => {
    // This will evaluate to false, triggering the EMPTY STATE message.
    const hasCurriculumData = curriculumData.length > 0;

    // --- Main Render ---

    return (
        <div className="space-y-8">
            
            {/* Page Header */}
            <div className="flex items-center space-x-4">
                <BookOpenIcon className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">Program Curriculum</h1>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-10">
                {hasCurriculumData ? (
                    // --- Display Table (This block will NOT run) ---
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Required Courses for [Program Name]</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {['Year', 'Semester', 'Code', 'Course Title', 'Credits', 'Type'].map(header => (
                                            <th
                                                key={header}
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {curriculumData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.year}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.semester}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">{item.courseCode}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.courseTitle}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.credits}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    item.required ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {item.required ? 'Required' : 'Elective'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    // --- EMPTY STATE MESSAGE (This block will run) ---
                    <div className="text-center p-8">
                        <DocumentTextIcon className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900">Curriculum Details Not Available</h3>
                        <p className="mt-2 text-gray-600 max-w-lg mx-auto">
                            The official academic curriculum for your program is currently pending setup. Please check back later.
                            This section will display all required and elective courses organized by academic year.
                        </p>
                    </div>
                )}
            </div>
            
            {/* Footer Note */}
            <div className="text-center text-sm text-gray-500 pt-4">
                <p>Curriculum information is managed by the Academic Affairs office.</p>
            </div>

        </div>
    );
};

export default CurriculumPage;