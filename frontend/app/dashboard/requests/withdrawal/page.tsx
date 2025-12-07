// frontend/app/dashboard/requests/withdrawal/page.tsx

'use client';

import React, { useState } from 'react';
import { MinusCircleIcon, CalendarIcon, AcademicCapIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const OfficialTermWithdrawalPage: React.FC = () => {
    const [reason, setReason] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // FIX: Using a generic term name instead of explicit year
    const termName = "Spring Term"; 
    const withdrawalDeadline = "[Date]"; // Using a generic date placeholder

    const handleSubmitWithdrawal = (e: React.FormEvent) => {
        e.preventDefault();

        if (!reason || reason.length < 20) {
            alert('Please provide a detailed reason for your term withdrawal (at least 20 characters).');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            alert(`Official withdrawal request for the ${termName} submitted. It is pending review by the Registrar's Office.`);
            setIsSubmitting(false);
            setReason('');
        }, 3000);
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            
            {/* Page Header */}
            <div className="flex items-center space-x-4 mb-4">
                <MinusCircleIcon className="h-10 w-10 text-red-600" />
                <h1 className="text-3xl font-bold text-gray-900">Official Term Withdrawal</h1>
            </div>

            {/* ATTENTION: Major Consequences */}
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                    <div className="ml-3">
                        <h2 className="text-lg font-bold text-red-800">ATTENTION: Major Consequences</h2>
                        <ul className="list-disc list-inside mt-2 text-red-700 space-y-2">
                            {/* FIX: Removed explicit year */}
                            <li>You will receive a **"W" (Withdrawal)** grade for **ALL** courses in the **"{termName}"**.</li>
                            <li>This action may impact your **"financial aid"** eligibility and may result in **"tuition forfeiture"**.</li>
                            <li>
                                <div className="flex items-center space-x-1">
                                    <CalendarIcon className="h-4 w-4" />
                                    <span>Deadline to withdraw without academic penalty: **{withdrawalDeadline}**</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Request Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <AcademicCapIcon className="h-6 w-6 text-gray-500" />
                    <span>Request for {termName} Withdrawal</span>
                </h2>
                
                <form onSubmit={handleSubmitWithdrawal} className="space-y-6">
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">Detailed Reason for Term Withdrawal</label>
                        <textarea
                            id="reason"
                            required
                            rows={6}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="E.g., Due to a sudden medical emergency, I must pause my studies for the remainder of the term."
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
                        />
                        <p className="mt-2 text-sm text-gray-500">A detailed reason is mandatory for review.</p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || reason.length < 20}
                        className={`w-full py-3 px-4 font-semibold rounded-lg transition duration-150 flex items-center justify-center space-x-2 ${
                            isSubmitting 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                    >
                        {isSubmitting ? 'Processing Request...' : `Confirm Withdrawal for ${termName}`}
                    </button>
                </form>
            </div>

            {/* Copyright Note */}
            <div className="text-center text-sm text-gray-500 pt-4">
                {/* FIX: Added Copyright Restriction */}
                <p className="text-xs text-gray-400">©  All Rights Reserved. Reproduction or distribution of this document is **copyright restricted**.</p>
            </div>

        </div>
    );
};

export default OfficialTermWithdrawalPage;