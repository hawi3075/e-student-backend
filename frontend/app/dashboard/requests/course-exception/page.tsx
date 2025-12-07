// frontend/app/dashboard/requests/course-exception/page.tsx

'use client';

import React, { useState } from 'react';
import { AcademicCapIcon, DocumentMagnifyingGlassIcon, ArrowRightIcon, AdjustmentsHorizontalIcon, BookOpenIcon, UserCircleIcon } from '@heroicons/react/24/outline';

// Sample degree requirements for the dropdown
const degreeRequirements = [
  'MATH 305: Linear Algebra Requirement',
  'CS 401: Operating Systems Prerequisite (Needs CS 301)',
  'Humanities Elective Requirement',
  'Upper-Division Writing Requirement',
  'Foreign Language Proficiency Waiver',
];

const CourseExceptionPage: React.FC = () => {
  const [requirementToWaive, setRequirementToWaive] = useState<string>('');
  const [justification, setJustification] = useState<string>('');
  const [proposedCourse, setProposedCourse] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Utility Functions ---

  const handleExceptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!requirementToWaive || !justification) {
      alert('Please select the requirement and provide a detailed justification.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Course Exception request for "${requirementToWaive}" submitted successfully. Your advisor will be notified.`);
      setIsSubmitting(false);
      setRequirementToWaive('');
      setJustification('');
      setProposedCourse('');
    }, 2500);
  };

  // --- Main Render ---

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <AdjustmentsHorizontalIcon className="h-10 w-10 text-purple-600" />
        <h1 className="text-3xl font-bold text-gray-900">Course Exception Request</h1>
      </div>

      {/* Instructions Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
        <p className="text-sm font-medium text-gray-500 mb-2">Purpose</p>
        <p className="text-gray-700">
            This form is for requesting an exception to a published degree requirement (e.g., substitution of a course, waiver of a prerequisite, or acceptance of non-standard transfer credit).
            **Consult with your academic advisor before submitting.**
        </p>
      </div>

      {/* Exception Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <DocumentMagnifyingGlassIcon className="h-6 w-6 text-purple-600" />
            <span>Exception Details</span>
        </h2>
        
        <form onSubmit={handleExceptionSubmit} className="space-y-6 max-w-3xl">
          
          {/* Requirement Selector */}
          <div>
            <label htmlFor="requirement" className="block text-sm font-medium text-gray-700">Specific Requirement to Waive/Modify</label>
            <select
              id="requirement"
              required
              value={requirementToWaive}
              onChange={(e) => setRequirementToWaive(e.target.value)}
              className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">-- Select Degree Requirement --</option>
              {degreeRequirements.map((req) => (
                <option key={req} value={req}>
                  {req}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-gray-500">
                You must select the exact requirement as listed in the academic catalog.
            </p>
          </div>
          
          {/* Proposed Course (If Substitution) */}
          <div>
            <label htmlFor="proposed-course" className="block text-sm font-medium text-gray-700">Proposed Course/Credit to Meet Requirement (If applicable)</label>
            <input
              type="text"
              id="proposed-course"
              value={proposedCourse}
              onChange={(e) => setProposedCourse(e.target.value)}
              placeholder="e.g., MATH 399 (Advanced Topics), or Transfer Credit from City College"
              className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="mt-2 text-xs text-gray-500">
                Specify the course code, title, or credit source you propose be accepted as the exception.
            </p>
          </div>


          {/* Detailed Justification */}
          <div>
            <label htmlFor="justification" className="block text-sm font-medium text-gray-700">Detailed Justification</label>
            <textarea
              id="justification"
              required
              rows={8}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Explain why the standard requirement cannot be met, why your proposed substitution is equivalent or superior, and any prior discussion you had with your advisor."
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          {/* Review Note */}
          <div className="p-4 bg-purple-50 border-l-4 border-purple-500 text-purple-800 rounded-lg text-sm flex items-start space-x-3">
            <UserCircleIcon className="h-6 w-6 flex-shrink-0" />
            <div>
                <p className="font-semibold">Advisor Review:</p>
                <p>This request is automatically routed to your assigned Academic Advisor, who must provide initial approval before it is sent to the Department Head/Registrar for final decision.</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 font-semibold rounded-lg transition duration-150 flex items-center justify-center space-x-2 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Submitting Exception Request...</span>
              </>
            ) : (
              <>
                <span>Submit Course Exception</span>
                <ArrowRightIcon className="h-5 w-5 ml-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseExceptionPage;
