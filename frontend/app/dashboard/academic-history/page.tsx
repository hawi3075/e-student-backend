// frontend/app/dashboard/academic-history/page.tsx

'use client';

import React from 'react';
import { AcademicCapIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';

// Data Structure: GPA and quality points are necessary for history
const historyData = [
  { semester: 'Fall 2023', gpa: 3.50, qualityPoints: 42.0, creditsAttempted: 12, creditsEarned: 12,
    courses: [
      { code: 'CS 201', title: 'Intro to Programming', credits: 3, grade: 'A' },
      { code: 'MATH 101', title: 'Calculus I', credits: 4, grade: 'B+' },
      { code: 'ENG 101', title: 'Academic Writing', credits: 3, grade: 'A' },
      { code: 'PE 101', title: 'Fitness', credits: 2, grade: 'A' },
    ]
  },
  { semester: 'Spring 2024', gpa: 3.75, qualityPoints: 45.0, creditsAttempted: 12, creditsEarned: 12,
    courses: [
      { code: 'CS 202', title: 'Data Structures', credits: 3, grade: 'A-' },
      { code: 'MATH 102', title: 'Calculus II', credits: 4, grade: 'A' },
      { code: 'PHIL 201', title: 'Ethics', credits: 3, grade: 'B+' },
      { code: 'ART 100', title: 'Art History', credits: 2, grade: 'A' },
    ]
  },
  { semester: 'Fall 2024', gpa: 3.80, qualityPoints: 45.6, creditsAttempted: 12, creditsEarned: 12,
    courses: [
      { code: 'CS 301', title: 'Algorithms', credits: 3, grade: 'A' },
      { code: 'PHYS 101', title: 'Physics I', credits: 4, grade: 'A' },
      { code: 'HIST 101', title: 'World History', credits: 3, grade: 'A-' },
      { code: 'LANG 101', title: 'Spanish I', credits: 2, grade: 'A' },
    ]
  },
];

// Calculation Summary
const totalCreditsAttempted = historyData.reduce((sum, s) => sum + s.creditsAttempted, 0);
const totalQualityPoints = historyData.reduce((sum, s) => sum + s.qualityPoints, 0);
const cumulativeGPA = totalCreditsAttempted > 0 
  ? (totalQualityPoints / totalCreditsAttempted).toFixed(2) 
  : 'N/A';


const AcademicHistoryPage: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <DocumentChartBarIcon className="h-10 w-10 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Academic History (Transcript)</h1>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-600">
          <p className="text-sm font-medium text-gray-500">Cumulative GPA</p>
          <p className="text-3xl font-bold text-gray-900">{cumulativeGPA}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600">
          <p className="text-sm font-medium text-gray-500">Total Credits Earned</p>
          <p className="text-2xl font-bold text-gray-900">{totalCreditsAttempted}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-600">
          <p className="text-sm font-medium text-gray-500">Total Quality Points</p>
          <p className="text-2xl font-bold text-gray-900">{totalQualityPoints.toFixed(1)}</p>
        </div>
      </div>

      {/* Semester Breakdown */}
      <h2 className="text-2xl font-bold text-gray-900 pt-4">Semester Breakdown</h2>

      {historyData.map((semester, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Semester Header */}
          <div className="p-4 bg-gray-50 flex justify-between items-center border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">{semester.semester}</h3>
            <div className="flex space-x-6 text-sm">
                <p>GPA: <span className="font-bold text-blue-600">{semester.gpa.toFixed(2)}</span></p>
                <p>Credits Earned: <span className="font-bold">{semester.creditsEarned}</span></p>
            </div>
          </div>

          {/* Courses Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/5">Course Title</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Credits</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Grade</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {semester.courses.map((course, courseIndex) => (
                  <tr key={courseIndex} className="hover:bg-gray-50">
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700">{course.code}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{course.title}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-center text-gray-500">{course.credits}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-bold text-center text-green-700">{course.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      
      {/* Footer / Disclaimer */}
      <p className="text-xs text-gray-500 pt-4 text-center">
        This is an unofficial academic history report. Please refer to your official transcript for final records.
      </p>

    </div>
  );
};

export default AcademicHistoryPage;