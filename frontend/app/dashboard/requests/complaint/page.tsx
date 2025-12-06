// frontend/app/dashboard/requests/complaint/page.tsx

'use client';

import React, { useState } from 'react';
import { MegaphoneIcon, ChevronDownIcon, CalendarDaysIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const ComplaintRequestPage: React.FC = () => {
  const [complaintType, setComplaintType] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Utility Functions ---

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!complaintType || !subject || !details) {
      alert('Please fill out all required fields: Complaint Type, Subject, and Details.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Complaint regarding "${subject}" submitted successfully. Your reference ID is 87942.`);
      setIsSubmitting(false);
      setComplaintType('');
      setSubject('');
      setDetails('');
      setIsAnonymous(false);
    }, 2500);
  };

  // --- Main Render ---

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <MegaphoneIcon className="h-10 w-10 text-orange-600" />
        <h1 className="text-3xl font-bold text-gray-900">Formal Complaint Submission</h1>
      </div>

      {/* Instructions Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
        <p className="text-sm font-medium text-gray-500 mb-2">Purpose</p>
        <p className="text-gray-700">
            Use this form to report issues concerning **staff conduct, facilities, campus services, or general administrative matters**. For academic appeals or grade disputes, please contact the Registrar's office.
        </p>
      </div>

      {/* Complaint Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Complaint Details</h2>
        
        <form onSubmit={handleComplaintSubmit} className="space-y-6 max-w-3xl">
          
          {/* Complaint Type Selector */}
          <div>
            <label htmlFor="complaint-type" className="block text-sm font-medium text-gray-700">Type of Complaint</label>
            <select
              id="complaint-type"
              required
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
              className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">-- Select Category --</option>
              <option value="staff">Staff/Personnel Conduct</option>
              <option value="facility">Facility/Maintenance Issue</option>
              <option value="service">Administrative Service (e.g., Bursar, Housing)</option>
              <option value="harassment">Harassment/Discrimination</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          {/* Subject Line Input */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject / Incident Summary</label>
            <input
              type="text"
              id="subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength={100}
              placeholder="Briefly summarize the issue (e.g., Unsafe conditions in Lab 304, Rude staff member at check-in)"
              className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Detailed Description */}
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700">Detailed Description of Incident (Include dates/times)</label>
            <textarea
              id="details"
              required
              rows={8}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide a detailed, factual account of what happened, when, and who was involved."
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Anonymous Checkbox */}
          <div className="relative flex items-start pt-4 border-t border-gray-200">
            <div className="flex items-center h-5">
              <input
                id="anonymous"
                name="anonymous"
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="anonymous" className="font-medium text-gray-700 flex items-center space-x-2">
                <UserIcon className="h-5 w-5 text-gray-500" />
                <span>Submit Anonymously (Will limit follow-up contact)</span>
              </label>
              <p className="text-gray-500">Note: Your identity is usually required for a formal investigation.</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 font-semibold rounded-lg transition duration-150 flex items-center justify-center space-x-2 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Submitting Complaint...</span>
              </>
            ) : (
              <>
                <span>Submit Complaint</span>
                <ArrowRightIcon className="h-5 w-5 ml-1" />
              </>
            )}
          </button>
        </form>
      </div>
      
      {/* Processing Timeline */}
      <div className="p-4 bg-gray-50 border-l-4 border-gray-300 text-gray-800 rounded-lg text-sm">
        <p className="font-semibold mb-2 flex items-center space-x-2">
            <CalendarDaysIcon className="h-5 w-5" />
            <span>Complaint Processing Timeline:</span>
        </p>
        <ol className="list-decimal list-inside ml-4 space-y-1">
            <li>**Initial Acknowledgment:** Within 2 business days.</li>
            <li>**Assignment to Investigator:** Within 5 business days.</li>
            <li>**Final Resolution/Action:** May take 15 to 30 business days, depending on complexity.</li>
        </ol>
      </div>
    </div>
  );
};

export default ComplaintRequestPage;