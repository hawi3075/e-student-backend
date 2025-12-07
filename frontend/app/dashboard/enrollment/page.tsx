// frontend/app/dashboard/enrollment/page.tsx

'use client';

import React, { useState } from 'react';
import { BookOpenIcon, CheckCircleIcon, ClockIcon, MagnifyingGlassIcon, ListBulletIcon } from '@heroicons/react/24/outline';

// --- Interface for Enrollment Data ---
interface Course {
  semester: string;
  courseCode: string;
  courseTitle: string;
  credits: number;
  grade: string;
  status: 'Completed' | 'In Progress' | 'Planned';
}

// MODIFIED: Cleared sample data.
const enrollmentData: Course[] = [
  // { semester: 'Fall 2024', courseCode: 'CS 301', courseTitle: 'Data Structures', credits: 3, grade: 'A', status: 'Completed' },
  // { semester: 'Fall 2024', courseCode: 'MATH 201', courseTitle: 'Calculus III', credits: 4, grade: 'B+', status: 'Completed' },
  // { semester: 'Fall 2024', courseCode: 'ENG 101', courseTitle: 'Academic Writing', credits: 3, grade: 'A-', status: 'Completed' },
  // { semester: 'Spring 2025', courseCode: 'CS 302', courseTitle: 'Algorithms', credits: 3, grade: 'IP', status: 'In Progress' },
];

const EnrollmentRecordPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('All Semesters');

  // --- Calculations for Summary Cards ---
  const totalAttemptedCredits = enrollmentData.reduce((sum, course) => sum + course.credits, 0);
  const completedCoursesCount = enrollmentData.filter(course => course.status === 'Completed').length;
  const inProgressCoursesCount = enrollmentData.filter(course => course.status === 'In Progress').length;
  
  // Helper to get unique semesters for the filter dropdown
  const uniqueSemesters = ['All Semesters', ...new Set(enrollmentData.map(course => course.semester))];

  // --- Filtering Logic ---
  const filteredCourses = enrollmentData.filter(course => {
    const matchesSearch = course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = selectedSemester === 'All Semesters' || course.semester === selectedSemester;
    return matchesSearch && matchesSemester;
  });

  // --- Component for Summary Cards ---
  const SummaryCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
    <div className={`flex items-center space-x-4 p-5 bg-white rounded-xl shadow-lg border-l-4 ${color}`}>
      <div className={`p-3 rounded-full ${color.replace('border-l-4', '').replace('border-', 'bg-').replace('600', '100').replace('500', '100')} text-blue-600`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
  
  // --- Main Render ---

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <ListBulletIcon className="h-10 w-10 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Enrollment Record</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Attempted Credits"
          value={totalAttemptedCredits}
          icon={<BookOpenIcon className="h-6 w-6" />}
          color="border-blue-600"
        />
        <SummaryCard
          title="Completed Courses"
          value={completedCoursesCount}
          icon={<CheckCircleIcon className="h-6 w-6" />}
          color="border-green-600"
        />
        <SummaryCard
          title="Courses In Progress"
          value={inProgressCoursesCount}
          icon={<ClockIcon className="h-6 w-6" />}
          color="border-yellow-600"
        />
      </div>

      {/* Controls Section (Search & Filter) */}
      <div className="flex justify-between items-center space-x-4">
        
        {/* Search Bar */}
        <div className="relative flex-grow max-w-xl">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search by course title or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-500"
          />
        </div>
        
        {/* Semester Filter */}
        <div className="relative">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {uniqueSemesters.map(semester => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Enrollment Table / Empty State */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {filteredCourses.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['SEMESTER', 'COURSE CODE', 'COURSE TITLE', 'CREDITS', 'GRADE', 'STATUS'].map(header => (
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
              {filteredCourses.map((course, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.semester}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.courseCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.courseTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.credits}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">{course.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        course.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        course.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          /* EMPTY STATE MESSAGE */
          <div className="p-10 text-center">
            <BookOpenIcon className="h-16 w-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">No Enrollment Records Found</h3>
            <p className="mt-2 text-gray-600">
              Your enrollment history and current courses will appear here once your records are updated by the administrator.
            </p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default EnrollmentRecordPage;