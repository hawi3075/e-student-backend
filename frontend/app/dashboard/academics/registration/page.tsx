// frontend/app/dashboard/registration/page.tsx

'use client';

import React, { useState } from 'react';
import { CalendarDaysIcon, CheckCircleIcon, BookOpenIcon, XCircleIcon } from '@heroicons/react/24/outline';

// --- Interfaces for Registration Data ---
interface RegistrationStatus {
    isOpen: boolean;
    semester: string;
    deadline: string;
    formReleased: boolean;
    selectionType: 'semester' | 'course' | 'none'; 
}

interface AvailableCourse {
    courseCode: string;
    courseTitle: string;
    credits: number;
    type: 'Required' | 'Elective';
}

// --- Initial Placeholder Data ---
const registrationStatus: RegistrationStatus = {
    isOpen: false,
    semester: 'Fall 2026',
    deadline: '2026-09-01',
    formReleased: false,
    selectionType: 'none', // Default to 'none' (Closed State)
};

// FIX: This array is now completely empty, clearing all listed courses.
const availableCourses: AvailableCourse[] = [
    // Courses removed: CS 320, MATH 305, CS 401, HiST 350, LANG 201
];


const RegistrationPage: React.FC = () => {
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    
    // Simulating the submission process
    const handleSubmit = (type: 'semester' | 'course') => {
        if (type === 'semester') {
            alert(`Successfully registered for ${registrationStatus.semester}! Your next step may be course selection.`);
        } else if (type === 'course') {
            alert(`Submitted ${selectedCourses.length} course selections.`);
        }
    };
    
    // Toggle elective course selection
    const toggleCourseSelection = (courseCode: string) => {
        setSelectedCourses(prev => 
            prev.includes(courseCode)
                ? prev.filter(code => code !== courseCode)
                : [...prev, courseCode]
        );
    };

    // --- Conditional Renderers ---

    const renderCourseSelection = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h2 className="text-xl font-bold text-blue-800">
                    Course Selection Open for {registrationStatus.semester}
                </h2>
                <p className="text-sm text-blue-700">Deadline: {registrationStatus.deadline}</p>
            </div>

            {availableCourses.length === 0 ? (
                // This is the message that will display when the array is empty
                <div className="text-center p-8 border border-gray-200 rounded-xl">
                    <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-lg font-medium text-gray-600">No courses available for selection at this time.</p>
                    <p className="text-sm text-gray-500 mt-2">Courses will be listed here when the administrator releases the schedule.</p>
                </div>
            ) : (
                <>
                    <p className="text-gray-600">Select your **Elective Courses** below. Required courses are automatically registered.</p>
                    
                    <div className="space-y-3">
                        {availableCourses.map(course => (
                            <div 
                                key={course.courseCode}
                                className={`flex justify-between items-center p-4 rounded-lg shadow-sm cursor-pointer transition duration-150 border ${
                                    course.type === 'Elective'
                                        ? selectedCourses.includes(course.courseCode) ? 'bg-indigo-100 border-indigo-400' : 'bg-white hover:bg-gray-50 border-gray-200'
                                        : 'bg-green-50 border-green-200 cursor-default' 
                                }`}
                                onClick={() => course.type === 'Elective' && toggleCourseSelection(course.courseCode)}
                            >
                                <div>
                                    <p className="font-semibold text-gray-900">{course.courseTitle} ({course.courseCode})</p>
                                    <p className="text-sm text-gray-500">{course.credits} Credits</p>
                                </div>
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                    course.type === 'Elective'
                                        ? (selectedCourses.includes(course.courseCode) ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white')
                                        : 'bg-green-600 text-white'
                                }`}>
                                    {course.type === 'Elective' ? (selectedCourses.includes(course.courseCode) ? 'Selected' : 'Select Elective') : 'Required'}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => handleSubmit('course')}
                        disabled={selectedCourses.length === 0}
                        className={`w-full py-3 mt-4 text-lg font-bold rounded-lg transition duration-150 ${
                            selectedCourses.length > 0
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Submit Course Selections ({selectedCourses.length})
                    </button>
                </>
            )}
        </div>
    );
    
    // Renders when the status is 'semester' registration is needed
    const renderSemesterRegistration = () => (
        <div className="text-center p-10 space-y-4 bg-white rounded-xl shadow-lg border border-blue-300">
            <CalendarDaysIcon className="h-16 w-16 text-blue-600 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Semester Registration: {registrationStatus.semester}</h2>
            <p className="text-gray-600">Click below to register for the upcoming semester.</p>
            <p className="text-sm font-semibold text-red-600">Deadline: {registrationStatus.deadline}</p>
            
            <button
                onClick={() => handleSubmit('semester')}
                className="w-full max-w-xs py-3 mt-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150"
            >
                Register for Semester
            </button>
        </div>
    );

    // Renders when registration is closed or off-cycle (Empty State)
    const renderClosedState = () => (
        <div className="text-center p-10 space-y-4 bg-white rounded-xl shadow-lg border border-gray-200">
            <XCircleIcon className="h-16 w-16 text-red-400 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Registration Currently Closed</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
                The registration window for the **{registrationStatus.semester}** semester is not yet open or has closed. 
                When the administration releases the **registration form** or **course selection options**, you will find them here.
            </p>
        </div>
    );
    
    // --- Main Render Logic ---
    let content;
    
    if (registrationStatus.isOpen && registrationStatus.selectionType === 'semester') {
        content = renderSemesterRegistration();
    } else if (registrationStatus.isOpen && registrationStatus.selectionType === 'course') {
        content = renderCourseSelection();
    } else {
        content = renderClosedState();
    }

    return (
        <div className="space-y-8">
            
            {/* Page Header */}
            <div className="flex items-center space-x-4">
                <CalendarDaysIcon className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">Semester Registration</h1>
            </div>
            
            {/* Conditional Content */}
            {content}

            {/* Note */}
            <div className="text-center text-sm text-gray-500 pt-4">
                <p>Registration status is controlled by the university administration.</p>
            </div>
            
        </div>
    );
};

export default RegistrationPage;