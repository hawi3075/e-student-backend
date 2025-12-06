// frontend/app/dashboard/requests/withdrawal/page.tsx

'use client';

import React, { useState } from 'react';
import { ArchiveBoxIcon, MinusCircleIcon, CalendarDaysIcon, ExclamationTriangleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// Sample Data
const currentTerm = 'Spring 2026';
const withdrawalDeadline = '2026-04-01';

const WithdrawalPage: React.FC = () => {
  const [reason, setReason] = useState<string>('');
  const [acknowledgement, setAcknowledgement] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Utility Function ---

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason || !acknowledgement) {
      alert('Please provide a reason and acknowledge the consequences before submitting.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Term Withdrawal request for ${currentTerm} submitted for review. You will be contacted by an advisor.`);
      setIsSubmitting(false);
      setReason('');
      setAcknowledgement(false);
    }, 2500);
  };

  // --- Main Render ---

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <ArchiveBoxIcon className="h-10 w-10 text-red-700" />
        <h1 className="text-3xl font-bold text-gray-900">Official Term Withdrawal</h1>
      </div>

      {/* Warning and Deadline Summary */}
      <div className="bg-red-50 p-6 rounded-xl shadow-lg border-l-4 border-red-500">
        <h2 className="text-xl font-bold text-red-800 flex items-center space-x-2 mb-3">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <span>ATTENTION: Major Consequences</span>
        </h2>
        <ul className="list-disc list-inside space-y-2 text-red-700 text-sm">
            <li>You will receive a **"W" (Withdrawal)** grade for **ALL** courses in the **{currentTerm}** term.</li>
            <li>This action may impact your **financial aid** eligibility and may result in **tuition forfeiture**.</li>
            <li>Deadline to withdraw without academic penalty: **{withdrawalDeadline}**.</li>
        </ul>
      </div>

      {/* Withdrawal Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <MinusCircleIcon className="h-6 w-6 text-red-600" />
            <span>Request for {currentTerm} Withdrawal</span>
        </h2>
        
        <form onSubmit={handleWithdrawalSubmit} className="space-y-6 max-w-2xl">
          
          {/* Reason Input */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Detailed Reason for Term Withdrawal</label>
            <textarea
              id="reason"
              required
              rows={6}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="E.g., Due to a sudden medical emergency, I must pause my studies for the remainder of the term."
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
            />
            <p className="mt-2 text-sm text-gray-500">Your advisor will review this statement as part of the approval process.</p>
          </div>

          {/* Acknowledgement Checkbox */}
          <div className="relative flex items-start pt-4 border-t border-gray-200">
            <div className="flex items-center h-5">
              <input
                id="acknowledgement"
                name="acknowledgement"
                type="checkbox"
                checked={acknowledgement}
                onChange={(e) => setAcknowledgement(e.target.checked)}
                required
                className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="acknowledgement" className="font-medium text-gray-700">
                I understand and acknowledge the academic and financial consequences of submitting this term withdrawal request.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !acknowledgement}
            className={`w-full py-3 px-4 font-semibold rounded-lg transition duration-150 flex items-center justify-center space-x-2 ${
              isSubmitting || !acknowledgement
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Submitting Request...</span>
              </>
            ) : (
              <>
                <span>Submit Official Term Withdrawal</span>
                <ArrowRightIcon className="h-5 w-5 ml-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalPage;