// frontend/app/dashboard/academics/payment/page.tsx

'use client';

import React, { useState } from 'react';
import { AcademicCapIcon, BanknotesIcon, CreditCardIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// Sample Data Structures
interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number; // Positive for payment, negative for charges/fees
  type: 'Payment' | 'Fee' | 'Refund';
  status: 'Completed' | 'Pending' | 'Failed';
}

const financialData = {
  totalFees: 5500.00,
  paidAmount: 3200.00,
  currentBalance: 2300.00,
  dueDate: '2026-03-15',
};

const transactionHistory: Transaction[] = [
  { id: 104, date: '2026-01-05', description: 'Spring 2026 Tuition Fee', amount: -5500.00, type: 'Fee', status: 'Completed' },
  { id: 103, date: '2026-01-15', description: 'Partial Tuition Payment', amount: 3000.00, type: 'Payment', status: 'Completed' },
  { id: 102, date: '2026-01-15', description: 'Tech Fee', amount: -200.00, type: 'Fee', status: 'Completed' },
  { id: 101, date: '2026-01-20', description: 'Housing Deposit', amount: 200.00, type: 'Payment', status: 'Completed' },
];

const PaymentPage: React.FC = () => {
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Utility Functions ---

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(paymentAmount);
    
    if (isNaN(amount) || amount <= 0 || amount > financialData.currentBalance) {
      alert(`Please enter a valid amount (Max: ${formatCurrency(financialData.currentBalance)})`);
      return;
    }

    setIsProcessing(true);
    // Simulate API call delay
    setTimeout(() => {
      alert(`Processing payment of ${formatCurrency(amount)} via ${paymentMethod}... (Simulation Complete)`);
      setIsProcessing(false);
      // In a real app, this would update financialData and transactionHistory state
    }, 2000);
  };

  // --- Components ---

  const getStatusStyle = (status: Transaction['status']) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <BanknotesIcon className="h-10 w-10 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Tuition & Financial Services</h1>
      </div>
      
      {/* --- Section 1: Balance Summary --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Current Balance Card */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
          <p className="text-sm font-medium text-gray-500">Current Outstanding Balance</p>
          <p className="text-4xl font-bold text-gray-900 mt-1">
            {formatCurrency(financialData.currentBalance)}
          </p>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600 flex items-center space-x-2">
                <ClockIcon className="h-5 w-5 text-red-500" />
                <span>Due Date: **{financialData.dueDate}**</span>
            </div>
            <span className="text-sm font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-full">
                ACTION REQUIRED
            </span>
          </div>
        </div>

        {/* Paid and Fee Summary */}
        <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl shadow-md">
                <p className="text-sm font-medium text-gray-500">Total Fees Charged</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(financialData.totalFees)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl shadow-md">
                <p className="text-sm font-medium text-gray-500">Total Paid to Date</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(financialData.paidAmount)}</p>
            </div>
        </div>

      </div>
      
      <hr />

      {/* --- Section 2: Make a Payment --- */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <CreditCardIcon className="h-6 w-6 text-blue-600" />
            <span>Make a Payment</span>
        </h2>
        
        <form onSubmit={handlePaymentSubmit} className="space-y-4 max-w-lg">
          
          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Payment Amount (Max: {formatCurrency(financialData.currentBalance)})</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="amount"
                id="amount"
                min="0.01"
                step="0.01"
                max={financialData.currentBalance.toFixed(2)}
                required
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              id="method"
              name="method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="credit_card">Credit/Debit Card</option>
              <option value="bank_transfer">Bank Transfer (ACH)</option>
            </select>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing || financialData.currentBalance <= 0}
            className={`w-full py-3 px-4 font-semibold rounded-lg transition duration-150 flex items-center justify-center space-x-2 ${
              isProcessing || financialData.currentBalance <= 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Pay Now</span>
                <ArrowRightIcon className="h-5 w-5 ml-1" />
              </>
            )}
          </button>
        </form>
      </div>

      <hr />

      {/* --- Section 3: Transaction History --- */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <ClockIcon className="h-6 w-6 text-gray-500" />
            <span>Transaction History</span>
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Date', 'Description', 'Type', 'Amount', 'Status'].map(header => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {transactionHistory.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.type === 'Payment' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(Math.abs(transaction.amount))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;