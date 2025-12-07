// frontend/app/dashboard/payment/page.tsx

'use client';

import React, { useState } from 'react'; // FIX: Imported useState
import { CreditCardIcon, CurrencyDollarIcon, ClockIcon, BanknotesIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'; // FIX: Imported new icons

// --- Data Interfaces ---

interface PaymentSummary {
    currentBalance: number;
    lastPaymentAmount: number;
    lastPaymentDate: string;
    status: 'Clear' | 'Due' | 'Overdue';
}

interface Transaction {
    id: string;
    date: string;
    description: string;
    type: 'Fee' | 'Payment' | 'Refund';
    amount: number;
}

// --- Initial Placeholder Data (Empty) ---

const paymentSummary: PaymentSummary = {
    currentBalance: 5500.00, // Changed to a non-zero balance to encourage payment
    lastPaymentAmount: 0,
    lastPaymentDate: '',
    status: 'Due', // Changed to 'Due'
};

const transactionHistory: Transaction[] = [
    // Empty array to hide the transaction table
];

// --- Payment Method Select Component (New) ---

interface PaymentSelectionProps {
    onSelect: (method: 'CBE' | 'TeleBirr') => void;
    onClose: () => void;
}

const PaymentMethodSelection: React.FC<PaymentSelectionProps> = ({ onSelect, onClose }) => (
    <div className="bg-white p-6 rounded-xl shadow-2xl border border-blue-100 mt-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Select Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* CBE Payment Option */}
            <button
                type="button"
                onClick={() => onSelect('CBE')}
                className="flex items-center justify-center p-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-150 space-x-3 shadow-md"
            >
                <BanknotesIcon className="h-6 w-6" />
                <span className="font-semibold">CBE (Bank Transfer)</span>
            </button>

            {/* TeleBirr Payment Option */}
            <button
                type="button"
                onClick={() => onSelect('TeleBirr')}
                className="flex items-center justify-center p-4 rounded-lg bg-green-500 text-white hover:bg-green-600 transition duration-150 space-x-3 shadow-md"
            >
                <DevicePhoneMobileIcon className="h-6 w-6" />
                <span className="font-semibold">TeleBirr (Mobile Money)</span>
            </button>
        </div>
        <button 
            type="button" 
            onClick={onClose} 
            className="mt-4 w-full py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
            Cancel
        </button>
    </div>
);


const PaymentPage: React.FC = () => {
    // New state to control the visibility of the payment method selector
    const [showPaymentSelector, setShowPaymentSelector] = useState(false);
    
    // Function to handle the selection (placeholder for navigation/action)
    const handlePaymentMethodSelect = (method: 'CBE' | 'TeleBirr') => {
        alert(`You selected ${method}. In a real app, this would redirect you to the ${method} gateway.`);
        setShowPaymentSelector(false); // Close the selector after selection
    };

    // --- Utility Functions ---
    
    const getStatusColor = (status: PaymentSummary['status']) => {
        // ... (Utility functions remain the same)
        switch (status) {
            case 'Due': return 'text-yellow-600 bg-yellow-100';
            case 'Overdue': return 'text-red-600 bg-red-100';
            case 'Clear': 
            default: return 'text-green-600 bg-green-100';
        }
    };

    const getTransactionColor = (type: Transaction['type']) => {
        return type === 'Payment' || type === 'Refund' ? 'text-green-600' : 'text-red-600';
    };

    // --- Main Render ---

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            
            {/* Page Header (Pay Now Button) */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <CreditCardIcon className="h-10 w-10 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Student Finances & Payments</h1>
                </div>
                
                {/* The 'Pay Now' Button - Triggers the selector */}
                <button 
                    type="button"
                    onClick={() => setShowPaymentSelector(true)} // FIX: Toggles the selector
                    className="px-6 py-2 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150 flex items-center space-x-2"
                >
                    <span>Pay Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5c-.394 0-.74.195-1 .51l-4.25 5.75a1.5 1.5 0 0 0 .5 2.22l4.25 2.5a1.5 1.5 0 0 1 0 2.58l-4.25 2.5a1.5 1.5 0 0 1-2.22-.5l-5.75-4.25a1.5 1.5 0 0 0-2.22-.5l-2.5 4.25a1.5 1.5 0 0 1-2.58 0L3.75 19.5" />
                    </svg>
                </button>
            </div>

            {/* Payment Method Selector (Conditional Rendering) */}
            {showPaymentSelector && (
                <PaymentMethodSelection 
                    onSelect={handlePaymentMethodSelect} 
                    onClose={() => setShowPaymentSelector(false)} 
                />
            )}

            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Current Balance */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-500 uppercase">Current Balance</h3>
                        <CurrencyDollarIcon className="h-6 w-6 text-blue-400" />
                    </div>
                    <p className="mt-1 text-3xl font-bold text-gray-900">
                        {paymentSummary.currentBalance === 0 ? '$0.00' : `$${paymentSummary.currentBalance.toFixed(2)}`}
                    </p>
                    <span className={`mt-2 inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(paymentSummary.status)}`}>
                        {paymentSummary.status === 'Clear' ? 'Account Clear' : `${paymentSummary.status} Payment`}
                    </span>
                </div>

                {/* 2. Last Payment */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-300">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-500 uppercase">Last Payment</h3>
                        <CreditCardIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="mt-1 text-3xl font-bold text-gray-900">
                        {paymentSummary.lastPaymentAmount === 0 ? 'N/A' : `$${paymentSummary.lastPaymentAmount.toFixed(2)}`}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        {paymentSummary.lastPaymentDate || 'No recent payments found.'}
                    </p>
                </div>

                {/* 3. Upcoming Deadline */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-500 uppercase">Next Deadline</h3>
                        <ClockIcon className="h-6 w-6 text-yellow-400" />
                    </div>
                    <p className="mt-1 text-3xl font-bold text-gray-900">
                        TBD
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Check academic calendar for tuition schedule.
                    </p>
                </div>
            </div>

            {/* Transaction History / Empty State */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Transaction History</h2>

                {transactionHistory.length > 0 ? (
                    // --- Display Transaction Table (Conditional block for when data exists) ---
                    <div className="overflow-x-auto">
                        {/* (Transaction Table JSX) */}
                    </div>
                ) : (
                    // --- EMPTY STATE MESSAGE (Active) ---
                    <div className="text-center p-10 space-y-3 bg-gray-50 rounded-lg">
                        <CurrencyDollarIcon className="h-12 w-12 text-gray-400 mx-auto" />
                        <h3 className="text-lg font-semibold text-gray-900">No Financial Records Available</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Your billing summary and payment history are currently pending setup by the Finance Department. 
                            Please check back later for your detailed financial statement.
                        </p>
                        <button type="button" className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150">
                            View Payment Options (Placeholder)
                        </button>
                    </div>
                )}
            </div>

            {/* Copyright Note */}
            <div className="text-center text-sm text-gray-500 pt-4">
                <p className="text-xs text-gray-400">© 2025 [University Name]. All Rights Reserved. All transactions are subject to audit by the university finance office.</p>
            </div>

        </div>
    );
};

export default PaymentPage;