'use client';

import React, { useState } from 'react';
// Ensure all these icons are correctly imported from @heroicons/react/24/outline
import { AcademicCapIcon, MagnifyingGlassIcon, PlusCircleIcon, CalendarIcon, XMarkIcon, ExclamationCircleIcon, BookOpenIcon } from '@heroicons/react/24/outline';

// Sample Data Structures
interface Course {
  code: string;
  title: string;
  credits: number;
  availableSeats: number;
  time: string;
  prerequisites: string[];
}

const availableCourses: Course[] = [
  { code: 'CS 320', title: 'Database Systems', credits: 3, availableSeats: 15, time: 'MW 10:00 AM', prerequisites: ['CS 210'] },
  { code: 'MATH 305', title: 'Linear Algebra', credits: 4, availableSeats: 5, time: 'TR 1:00 PM', prerequisites: ['MATH 102'] },
  { code: 'CS 401', title: 'Operating Systems', credits: 3, availableSeats: 25, time: 'F 9:00 AM', prerequisites: ['CS 102', 'CS 205'] },
  { code: 'HIST 350', title: 'Modern American History', credits: 3, availableSeats: 40, time: 'TR 11:30 AM', prerequisites: [] },
  { code: 'LANG 201', title: 'Spanish II', credits: 3, availableSeats: 0, time: 'MW 2:00 PM', prerequisites: ['LANG 101'] },
];

// This array simulates the courses the student has already passed
const studentCompletedCourses = ['CS 101', 'CS 102', 'MATH 101', 'MATH 102', 'CS 205', 'LANG 101'];

const CourseRegistrationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSchedule, setCurrentSchedule] = useState<Course[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [prereqStatus, setPrereqStatus] = useState<string[]>([]);
  const [totalCredits, setTotalCredits] = useState(0);

  // --- Utility Functions ---

  const checkPrerequisites = (course: Course): string[] => {
    return course.prerequisites.filter(prereq => !studentCompletedCourses.includes(prereq));
  };

  const handleAddCourse = (course: Course) => {
    const missingPrereqs = checkPrerequisites(course);
    setSelectedCourse(course);
    setPrereqStatus(missingPrereqs);
    setModalOpen(true);
  };

  const confirmAdd = () => {
    if (selectedCourse && prereqStatus.length === 0 && !currentSchedule.some(c => c.code === selectedCourse.code)) {
      setCurrentSchedule(prev => [...prev, selectedCourse]);
      setTotalCredits(prev => prev + selectedCourse.credits);
    }
    setModalOpen(false);
    setSelectedCourse(null);
  };

  const handleDropCourse = (courseCode: string) => {
    const courseToDrop = currentSchedule.find(c => c.code === courseCode);
    if (courseToDrop) {
      setCurrentSchedule(prev => prev.filter(c => c.code !== courseCode));
      setTotalCredits(prev => prev - courseToDrop.credits);
    }
  };

  // --- Filtering Available Courses ---

  const filteredCourses = availableCourses.filter(course => {
    const term = searchTerm.toLowerCase();
    return (
      course.title.toLowerCase().includes(term) ||
      course.code.toLowerCase().includes(term)
    );
  });

  // --- Components ---

  const CourseRow: React.FC<{ course: Course, isScheduled: boolean }> = ({ course, isScheduled }) => {
    const missingPrereqs = checkPrerequisites(course);
    const isFull = course.availableSeats <= 0;
    const canRegister = !isScheduled && missingPrereqs.length === 0 && !isFull;

    return (
      <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-150">
        <div>
          <p className="font-bold text-gray-900">{course.code}: {course.title}</p>
          <p className="text-sm text-gray-600 flex items-center space-x-2 mt-1">
            <span>{course.credits} Credits</span>
            <span className="text-gray-400">|</span>
            <CalendarIcon className="h-4 w-4 inline text-gray-500" />
            <span>{course.time}</span>
          </p>
        </div>
        
        {isScheduled ? (
          <button
            onClick={() => handleDropCourse(course.code)}
            className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg text-sm hover:bg-red-600 transition duration-150 flex items-center"
          >
            <XMarkIcon className="h-4 w-4 mr-1" />
            Drop
          </button>
        ) : (
          <button
            onClick={() => handleAddCourse(course)}
            disabled={!canRegister || isFull}
            className={`py-2 px-4 text-white font-semibold rounded-lg text-sm transition duration-150 flex items-center ${
              canRegister ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isFull ? 'Full' : 'Add Course'}
            {!isFull && <PlusCircleIcon className="h-4 w-4 ml-1" />}
          </button>
        )}
      </li>
    );
  };

  // --- Main Render ---
  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <AcademicCapIcon className="h-10 w-10 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Course Registration - Spring 2026</h1>
      </div>

      {/* Current Schedule Summary */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex justify-between items-center">
        <div>
            <p className="text-sm font-medium text-gray-500">Total Credits Selected</p>
            <p className="text-3xl font-bold text-gray-900">{totalCredits}</p>
        </div>
        <button className="py-3 px-6 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-150 shadow-md" disabled={totalCredits === 0}>
            Finalize Enrollment
        </button>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1 & 2: Available Courses */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Available Courses</h2>
          
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search by course code or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-inner text-gray-900" 
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          <ul className="space-y-3">
            {filteredCourses.map(course => (
              <CourseRow key={course.code} course={course} isScheduled={currentSchedule.some(c => c.code === course.code)} />
            ))}
            {filteredCourses.length === 0 && (
              // ✅ Accessibility Fix: Wrap the content in an <li> tag
              <li className="text-gray-500 p-4 bg-white rounded-lg">
                <p>No available courses match your search criteria.</p>
              </li>
            )}
          </ul>
        </div>

        {/* Column 3: Current Schedule */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Current Schedule ({currentSchedule.length})</h2>
          
          <div className="bg-white p-4 rounded-xl shadow-lg h-auto min-h-[300px] border border-gray-100">
            {currentSchedule.length > 0 ? (
              <ul className="space-y-3">
                {currentSchedule.map(course => (
                  <CourseRow key={course.code} course={course} isScheduled={true} />
                ))}
              </ul>
            ) : (
              <div className="text-center p-8">
                <CalendarIcon className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Your schedule is empty. Add courses from the list.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Prerequisite Modal (Overlay) --- */}
      {modalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {prereqStatus.length > 0 ? 'Prerequisite Check Failed' : 'Confirm Registration'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close dialog"
                title="Close"
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6 border border-gray-200">
                <BookOpenIcon className="h-6 w-6 text-blue-600 flex-shrink-0" />
                <div>
                    <p className="font-semibold text-gray-900">{selectedCourse.code}: {selectedCourse.title}</p>
                    <p className="text-sm text-gray-600">{selectedCourse.credits} Credits | {selectedCourse.time}</p>
                </div>
            </div>

            {prereqStatus.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                    <ExclamationCircleIcon className="h-6 w-6 mr-3" />
                    <p className="font-medium">You cannot register for this course due to missing prerequisites:</p>
                </div>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                  {prereqStatus.map(prereq => (
                    <li key={prereq} className="font-medium text-red-700">{prereq} (Required)</li>
                  ))}
                </ul>
                <button 
                    onClick={() => setModalOpen(false)}
                    className="w-full py-3 mt-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition duration-150"
                >
                    Close
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">You meet all prerequisites. Would you like to add this course to your schedule?</p>
                <div className="flex justify-end space-x-3 mt-6">
                  <button 
                    onClick={() => setModalOpen(false)}
                    className="py-2 px-5 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition duration-150"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmAdd}
                    className="py-2 px-5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150"
                  >
                    Add to Schedule
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default CourseRegistrationPage;