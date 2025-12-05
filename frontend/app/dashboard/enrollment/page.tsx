// frontend/app/dashboard/enrollment/page.tsx

'use client';

import React, { useState } from 'react';
import { BookOpenIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

// Sample Data Structure
const enrollmentData = [
  { semester: 'Fall 2024', code: 'CS 301', title: 'Data Structures', credits: 3, grade: 'A', status: 'Completed' },
  { semester: 'Fall 2024', code: 'MATH 201', title: 'Calculus III', credits: 4, grade: 'B+', status: 'Completed' },
  { semester: 'Fall 2024', code: 'ENG 101', title: 'Academic Writing', credits: 3, grade: 'A-', status: 'Completed' },
  { semester: 'Spring 2025', code: 'CS 302', title: 'Algorithms', credits: 3, grade: 'IP', status: 'In Progress' },
  { semester: 'Spring 2025', code: 'PHYS 101', title: 'Physics I', credits: 4, grade: 'IP', status: 'In Progress' },
  { semester: 'Spring 2025', code: 'PHIL 101', title: 'Ethics', credits: 3, grade: 'IP', status: 'In Progress' },
  { semester: 'Summer 2025', code: 'HIST 101', title: 'World History', credits: 3, grade: 'W', status: 'Withdrawn' },
];

const semesters = ['All Semesters', 'Fall 2024', 'Spring 2025', 'Summer 2025'];

const EnrollmentRecordPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('All Semesters');

  const filteredData = enrollmentData.filter(course => {
    const term = searchTerm.toLowerCase();
    const semesterMatch = selectedSemester === 'All Semesters' || course.semester === selectedSemester;
    
    const searchMatch = 
      course.title.toLowerCase().includes(term) ||
      course.code.toLowerCase().includes(term);

    return semesterMatch && searchMatch;
  });

  // Calculate total attempted credits
  const totalCredits = enrollmentData.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <BookOpenIcon className="h-10 w-10 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Enrollment Record</h1>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-600">
          <p className="text-sm font-medium text-gray-500">Total Attempted Credits</p>
          <p className="text-2xl font-bold text-gray-900">{totalCredits}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600">
          <p className="text-sm font-medium text-gray-500">Completed Courses</p>
          <p className="text-2xl font-bold text-gray-900">{enrollmentData.filter(c => c.status === 'Completed').length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-600">
          <p className="text-sm font-medium text-gray-500">Courses In Progress</p>
          <p className="text-2xl font-bold text-gray-900">{enrollmentData.filter(c => c.status === 'In Progress').length}</p>
        </div>
      </div>

      {/* Search and Filter Row */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by course title or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-gray-900" 
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        
        {/* Semester Filter */}
        <div className="relative w-full md:w-56">
          <AdjustmentsHorizontalIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
          <label htmlFor="semester-select" className="sr-only">Filter by semester</label>
          <select
            id="semester-select"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-white cursor-pointer"
          >
            {semesters.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      {/* Enrollment Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((course, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.semester}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.code}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{course.credits}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-center">
                    <span className={course.grade === 'IP' || course.grade === 'W' ? 'text-gray-500' : 'text-green-700'}>
                        {course.grade}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    course.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    course.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                  No courses found for the selected criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollmentRecordPage;