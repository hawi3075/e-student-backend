// frontend/app/dashboard/academics/curriculum/page.tsx

'use client';

import React from 'react';
import { BookOpenIcon, ChevronDownIcon, ChevronUpIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

// --- Data Structure with Empty Course Arrays (Now includes Fifth Year) ---
const curriculumData = [
    {
        year: 'First Year (Foundational Requirements)',
        description: 'Focus on foundational science and core liberal arts requirements.',
        semesters: [
            {
                name: 'Fall Semester',
                courses: [], 
            },
            {
                name: 'Spring Semester',
                courses: [], 
            },
        ],
    },
    {
        year: 'Second Year (Core Major Requirements)',
        description: 'Deeper focus on core disciplinary subjects.',
        semesters: [
             {
                name: 'Fall Semester',
                courses: [],
            },
        ],
    },
    {
        year: 'Third Year (Advanced Studies)',
        description: 'Specialization and advanced topics within the major.',
        semesters: [
             {
                name: 'Fall Semester',
                courses: [],
            },
        ],
    },
    {
        year: 'Fourth Year (Capstone & Electives)',
        description: 'Final projects, internships, and elective completion.',
        semesters: [
             {
                name: 'Fall Semester',
                courses: [],
            },
        ],
    },
    // NEW: Fifth Year added
    {
        year: 'Fifth Year (Extended Program/Master\'s Prerequisites)',
        description: 'Designed for students in five-year programs or those completing prerequisites for advanced studies.',
        semesters: [
             {
                name: 'Fall Semester',
                courses: [],
            },
             {
                name: 'Spring Semester',
                courses: [],
            },
        ],
    },
];

const totalCreditsRequired = '---';

interface Course {
    code: string;
    title: string;
    credit: number;
    prerequisite: string;
}

interface Semester {
    name: string;
    courses: Course[];
}

interface YearData {
    year: string;
    description: string;
    semesters: Semester[];
}

// Component for displaying a list of courses
const CourseTable: React.FC<{ courses: Course[] }> = ({ courses }) => (
    <div className="overflow-x-auto shadow-inner rounded-lg border border-gray-100 mt-4">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Hour</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prerequisite(s)</th>
                </tr>
            </thead>
            {/* The tbody is empty, showing only the header */}
            <tbody className="bg-white divide-y divide-gray-100">
                {courses.map((course) => (
                    <tr key={course.code}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{course.code}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{course.title}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{course.credit}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{course.prerequisite}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        {/* If the courses array is empty, display a gentle message */}
        {courses.length === 0 && (
             <div className="text-center py-4 text-gray-400 text-sm">
                No courses added for this semester yet.
            </div>
        )}
    </div>
);

// Main Curriculum Page Component
const CurriculumPage: React.FC = () => {
    
    // State to manage which year/section is open (opening the first year by default)
    const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
        'First Year (Foundational Requirements)': true 
    });

    const toggleSection = (year: string) => {
        setOpenSections(prev => ({
            ...prev,
            [year]: !prev[year]
        }));
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <BookOpenIcon className="h-10 w-10 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Curriculum</h1> 
                </div>
                <button 
                    onClick={() => console.log("View Degree Progress clicked")}
                    className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 shadow-md"
                >
                    View Degree Progress
                </button>
            </div>

            {/* Total Credits Summary Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                <p className="text-sm font-medium text-gray-500">Total Credits Required</p>
                <p className="text-3xl font-bold text-gray-900">{totalCreditsRequired}</p>
            </div>

            {/* Curriculum Sections (Accordion) */}
            {curriculumData.map((yearData) => {
                const isOpen = openSections[yearData.year];
                return (
                    <div key={yearData.year} className="bg-white rounded-xl shadow-lg border border-gray-100">
                        {/* Header/Toggle Button */}
                        <button
                            className="w-full flex justify-between items-center p-6 text-left"
                            onClick={() => toggleSection(yearData.year)}
                        >
                            <h2 className="text-xl font-semibold text-gray-900">{yearData.year}</h2>
                            {isOpen ? <ChevronUpIcon className="h-6 w-6 text-gray-500" /> : <ChevronDownIcon className="h-6 w-6 text-gray-500" />}
                        </button>

                        {/* Content Area */}
                        {isOpen && (
                            <div className="p-6 pt-0 border-t border-gray-100">
                                <p className="text-sm text-gray-600 mb-4">{yearData.description}</p>
                                
                                {yearData.semesters.length > 0 ? (
                                    <div className="space-y-6">
                                        {yearData.semesters.map((semester: Semester) => (
                                            <div key={semester.name} className="space-y-2">
                                                <h3 className="text-lg font-medium text-blue-700">{semester.name}</h3>
                                                <CourseTable courses={semester.courses} /> 
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic py-4">No semesters defined for this academic year yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Copyright Footer */}
            <div className="text-center text-sm text-gray-500 pt-8 mt-10 border-t border-gray-200">
                <p>&copy; {new Date().getFullYear()} Your University Name. All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default CurriculumPage;