// frontend/app/dashboard/requests/add-drop/page.tsx

'use client';

import React, { useState } from 'react';
import { DocumentCheckIcon, PlusCircleIcon, MinusCircleIcon, AcademicCapIcon, CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// Sample Data Structures
const availableCourses = [
  { code: 'CS 410', title: 'Machine Learning', credits: 3, prereqs: ['CS 301'], currentEnrollment: 90, capacity: 100 },
  { code: 'HUMN 350', title: 'Philosophy of Mind', credits: 3, prereqs: [], currentEnrollment: 15, capacity: 25 },
  { code: 'FIN 201', title: 'Financial Accounting', credits: 4, prereqs: ['MATH 101'], currentEnrollment: 105, capacity: 100 }, // Over Capacity
];

const currentSchedule = [
  { code: 'MATH 305', title: 'Linear Algebra', credits: 4, status: 'Registered' },
  { code: 'CS 320', title: 'Database Systems', credits: 3, status: 'Registered' },
  { code: 'ENG 101', title: 'Academic Writing', credits: 3, status: 'Completed' },
];

const AddDropRequestPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'add' | 'drop'>('add');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Utility Functions ---

  const getCourseDetails = (code: string) => {
    return availableCourses.find(c => c.code === code) || currentSchedule.find(c => c.code === code);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourse || !reason) {
      alert('Please select a course and provide a reason.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Request to ${activeTab} course ${selectedCourse} submitted for approval. Reason: ${reason}`);
      setIsSubmitting(false);
      setSelectedCourse('');
      setReason('');
    }, 2000);
  };

  // --- Form Content Components ---

  const AddCourseForm = () => {
    const details = getCourseDetails(selectedCourse) as typeof availableCourses[0] | undefined;
    const isFull = details && details.currentEnrollment >= details.capacity;
    
    return (
      <form onSubmit={handleRequestSubmit} className="space-y-6">
        
        {/* Course Selection */}
        <div>
          <label htmlFor="add-course" className="block text-sm font-medium text-gray-700">Select Course to Add (Requires Dean's Approval)</label>
          <select
            id="add-course"
            required
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Select an Available Course --</option>
            {availableCourses.map((course) => (
              <option key={course.code} value={course.code}>
                {course.code}: {course.title} ({course.credits} Credits) {course.currentEnrollment >= course.capacity ? ' - FULL' : ''}
              </option>
            ))}
          </select>
        </div>
        
        {/* Course Details Preview */}
        {details && (
          <div className={`p-4 rounded-lg border ${isFull ? 'bg-red-50 border-red-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="font-semibold text-gray-800 mb-1">{details.title}</p>
            <p className="text-sm text-gray-600">Prerequisites: **{details.prereqs.join(', ') || 'None'}**</p>
            <p className="text-sm text-gray-600">
                Enrollment: {details.currentEnrollment}/{details.capacity}
                {isFull && <span className="text-red-600 font-bold ml-2"> (Course is Full - Exception Required)</span>}
            </p>
          </div>
        )}

        {/* Reason Input */}
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Late Add Request</label>
          <textarea
            id="reason"
            required
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="E.g., I was waiting for my prerequisite grade to be posted."
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isFull}
          className={`w-full py-3 px-4 font-semibold rounded-lg transition duration-150 flex items-center justify-center space-x-2 ${
            isSubmitting || isFull ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Add Request'}
          <ArrowRightIcon className="h-5 w-5 ml-1" />
        </button>
      </form>
    );
  };

  const DropCourseForm = () => {
    return (
      <form onSubmit={handleRequestSubmit} className="space-y-6">
        
        {/* Course Selection */}
        <div>
          <label htmlFor="drop-course" className="block text-sm font-medium text-gray-700">Select Course to Drop (Requires Advisor's Approval)</label>
          <select
            id="drop-course"
            required
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          >
            <option value="">-- Select a Currently Registered Course --</option>
            {currentSchedule
              .filter(course => course.status === 'Registered')
              .map((course) => (
                <option key={course.code} value={course.code}>
                  {course.code}: {course.title}
                </option>
              ))}
          </select>
        </div>
        
        {/* Reason Input */}
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Drop Request (After Deadline)</label>
          <textarea
            id="reason"
            required
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="E.g., Due to unforeseen work commitment, I can no longer attend the class time."
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Warning Note */}
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded-lg">
            <p className="font-semibold">⚠️ Warning:</p>
            <p className="text-sm">Dropping after the official deadline may result in a "W" (Withdrawal) grade and loss of tuition fees for this course.</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 font-semibold rounded-lg transition duration-150 flex items-center justify-center space-x-2 ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Drop Request'}
          <ArrowRightIcon className="h-5 w-5 ml-1" />
        </button>
      </form>
    );
  };

  // --- Main Render ---

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <DocumentCheckIcon className="h-10 w-10 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Add/Drop Course Request</h1>
      </div>

      {/* Instructions Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-500 mb-2">Request Process</p>
        <p className="text-gray-700">
            Use this form to request changes to your schedule **after** the official registration deadline. All requests are subject to approval by the academic department or advisor.
        </p>
      </div>

      {/* Tab Interface */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => { setActiveTab('add'); setSelectedCourse(''); setReason(''); }}
            className={`
              ${activeTab === 'add' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg flex items-center space-x-2 transition duration-150
            `}
          >
            <PlusCircleIcon className="h-6 w-6" />
            <span>Late Add Course</span>
          </button>
          <button
            onClick={() => { setActiveTab('drop'); setSelectedCourse(''); setReason(''); }}
            className={`
              ${activeTab === 'drop' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg flex items-center space-x-2 transition duration-150
            `}
          >
            <MinusCircleIcon className="h-6 w-6" />
            <span>Late Drop Course</span>
          </button>
        </nav>
      </div>

      {/* Form Content */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        {activeTab === 'add' ? <AddCourseForm /> : <DropCourseForm />}
      </div>
    </div>
  );
};

export default AddDropRequestPage;