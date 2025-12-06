// frontend/app/dashboard/academics/curriculum/page.tsx

'use client';

import React, { useState } from 'react';
import { AcademicCapIcon, BookOpenIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

// Define the columns for the curriculum table
const tableHeaders = ['Course Code', 'Course Title', 'Credit Hour', 'Prerequisite(s)'];

// Sample Data Structure extended to five years
const curriculumData = [
  {
    year: 'First Year (2024-2025)',
    description: 'Focus on foundational science and core liberal arts requirements.',
    semesters: [
      {
        name: 'Fall Semester',
        courses: [
          { code: 'CS 101', title: 'Introduction to Computer Science', credits: 3, prereqs: 'None' },
          { code: 'MATH 101', title: 'Calculus I', credits: 4, prereqs: 'Placement Exam/High School Math' },
        ],
      },
      {
        name: 'Spring Semester',
        courses: [
          { code: 'CS 102', title: 'Data Structures', credits: 3, prereqs: 'CS 101' },
          { code: 'MATH 102', title: 'Calculus II', credits: 4, prereqs: 'MATH 101' },
        ],
      },
    ],
  },
  {
    year: 'Second Year (2025-2026)',
    description: 'Introduction to major-specific theory and advanced mathematics.',
    semesters: [
      {
        name: 'Fall Semester',
        courses: [
          { code: 'CS 205', title: 'Discrete Mathematics', credits: 3, prereqs: 'MATH 102' },
          { code: 'CS 210', title: 'Object-Oriented Programming', credits: 4, prereqs: 'CS 102' },
        ],
      },
      {
        name: 'Spring Semester',
        courses: [
          { code: 'CS 320', title: 'Database Systems', credits: 3, prereqs: 'CS 210' },
          { code: 'STAT 201', title: 'Statistics', credits: 3, prereqs: 'MATH 102' },
        ],
      },
    ],
  },
  {
    year: 'Third Year (2026-2027)',
    description: 'Deep dive into core computer science principles and algorithms.',
    semesters: [
      {
        name: 'Fall Semester',
        courses: [
          { code: 'CS 301', title: 'Algorithms & Complexity', credits: 4, prereqs: 'CS 205, CS 210' },
          { code: 'PHYS 201', title: 'University Physics I', credits: 4, prereqs: 'MATH 102' },
        ],
      },
      {
        name: 'Spring Semester',
        courses: [
          { code: 'CS 315', title: 'Computer Architecture', credits: 3, prereqs: 'CS 210' },
          { code: 'PHIL 301', title: 'Ethics in Technology', credits: 3, prereqs: 'ENG 101' },
        ],
      },
    ],
  },
  {
    year: 'Fourth Year (2027-2028)',
    description: 'Focus on specialized electives and preparation for the Capstone project.',
    semesters: [
      {
        name: 'Fall Semester',
        courses: [
          { code: 'CS 450', title: 'Operating Systems', credits: 3, prereqs: 'CS 301' },
          { code: 'CS 460', title: 'Web Development (Elective)', credits: 3, prereqs: 'CS 320' },
        ],
      },
      {
        name: 'Spring Semester',
        courses: [
          { code: 'CS 490', title: 'Capstone Project I', credits: 3, prereqs: 'Senior Standing' },
          { code: 'ART 100', title: 'Introduction to Art (Elective)', credits: 3, prereqs: 'None' },
        ],
      },
    ],
  },
  {
    year: 'Fifth Year (2028-2029)',
    description: 'Completion of the degree with Capstone II and required internship.',
    semesters: [
      {
        name: 'Fall Semester',
        courses: [
          { code: 'CS 491', title: 'Capstone Project II', credits: 3, prereqs: 'CS 490' },
          { code: 'CS 499', title: 'Internship/Co-op', credits: 3, prereqs: 'Department Approval' },
        ],
      },
      {
        name: 'Spring Semester',
        courses: [
          { code: 'CS 500', title: 'Advanced Topics Seminar', credits: 3, prereqs: 'CS 450' },
          { code: 'HUM 400', title: 'Professional Communication', credits: 3, prereqs: 'ENG 101' },
        ],
      },
    ],
  },
];


const CurriculumPage: React.FC = () => {
  const [openYear, setOpenYear] = useState<string>(curriculumData[0].year);

  const toggleYear = (year: string) => {
    setOpenYear(openYear === year ? '' : year);
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <AcademicCapIcon className="h-10 w-10 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Curriculum (B.S. Computer Science)</h1>
      </div>

      {/* Program Summary Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex justify-between items-center">
        <div>
            <p className="text-sm font-medium text-gray-500">Total Credits Required</p>
            <p className="text-2xl font-bold text-gray-900">140 Credits</p>
        </div>
        <button className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-150">
            View Degree Progress
        </button>
      </div>

      {/* Curriculum Accordion (5 Years) */}
      <div className="space-y-4">
        {curriculumData.map((yearData) => (
          <div key={yearData.year} className="border border-gray-200 rounded-xl overflow-hidden">
            
            {/* Accordion Header */}
            <button
              onClick={() => toggleYear(yearData.year)}
              className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition duration-150"
            >
              <span className="text-xl font-bold text-gray-800">{yearData.year}</span>
              <ChevronDownIcon 
                className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${openYear === yearData.year ? 'transform rotate-180' : ''}`}
              />
            </button>

            {/* Accordion Content */}
            {openYear === yearData.year && (
              <div className="p-5 border-t border-gray-200 bg-gray-50">
                <p className="text-gray-600 mb-6">{yearData.description}</p>
                
                {yearData.semesters.map((semester, semIndex) => (
                  <div key={semIndex} className="mb-6 last:mb-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                        <BookOpenIcon className="h-5 w-5 text-blue-600"/>
                        <span>{semester.name}</span>
                    </h3>
                    
                    {/* Course Table */}
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
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
                          {semester.courses.map((course, courseIndex) => (
                            <tr key={courseIndex} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.code}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.title}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{course.credits}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.prereqs}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurriculumPage;