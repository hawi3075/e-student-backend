// frontend/app/dashboard/academics/course-audit/page.tsx

'use client';

import React, { useState } from 'react';
import { ClipboardDocumentCheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

// Define the required table headers
const tableHeaders = ['Course Code', 'Course Title', 'Credit Hour', 'Prerequisite(s)'];

// Define the five academic years for the degree audit
const academicYears = [
  'First Year (Foundation)',
  'Second Year (Core Major)',
  'Third Year (Advanced Studies)',
  'Fourth Year (Capstone & Electives)',
  'Fifth Year (Internship & Thesis)',
];

// NOTE: This array is empty to fulfill the requirement that the tables start with no data.
// In a real application, this would be fetched from a database based on the student's progress.
const dummyAuditData: any[] = []; 

const CourseAuditPage: React.FC = () => {
  // State to control which year's accordion is open
  const [openYear, setOpenYear] = useState<string>(academicYears[0]);

  const toggleYear = (year: string) => {
    setOpenYear(openYear === year ? '' : year);
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <ClipboardDocumentCheckIcon className="h-10 w-10 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-900">Academic Course Audit</h1>
      </div>

      {/* Audit Summary Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600">
        <p className="text-sm font-medium text-gray-500">Program: B.S. in Computer Science</p>
        <p className="text-2xl font-bold text-gray-900">Degree Requirements Tracker</p>
        <p className="text-sm text-gray-600 mt-2">
            This report lists all courses required for your degree. Statuses are filled dynamically based on registration and completion data.
        </p>
      </div>

      {/* Audit Accordion (5 Years) */}
      <div className="space-y-4">
        {academicYears.map((year, index) => (
          <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
            
            {/* Accordion Header */}
            <button
              onClick={() => toggleYear(year)}
              className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition duration-150"
            >
              <span className="text-xl font-bold text-gray-800">{year} Requirements</span>
              <ChevronDownIcon 
                className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${openYear === year ? 'transform rotate-180' : ''}`}
              />
            </button>

            {/* Accordion Content - The Empty Table Structure */}
            {openYear === year && (
              <div className="p-5 border-t border-gray-200 bg-gray-50">
                <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        {tableHeaders.map(header => (
                          <th key={header} className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {/* Displays the empty row required when no data is fetched */}
                      {dummyAuditData.length === 0 ? (
                        <tr>
                          <td colSpan={tableHeaders.length} className="px-6 py-10 text-center text-gray-500 italic">
                            No courses registered or completed for this year yet.
                          </td>
                        </tr>
                      ) : (
                        // This section is a placeholder for when data is fetched (e.g., mapping over a data source)
                        dummyAuditData.map((course, courseIndex) => (
                          <tr key={courseIndex} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.code}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{course.credits}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.prereqs}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseAuditPage;