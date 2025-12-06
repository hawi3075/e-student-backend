// frontend/app/dashboard/requests/clearance/page.tsx

'use client';

import React, { useState } from 'react';
import { DocumentCheckIcon, CheckCircleIcon, XCircleIcon, ClockIcon, BuildingLibraryIcon, BanknotesIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

// Sample Data Structure for Clearance Items
interface ClearanceItem {
  id: number;
  department: string;
  status: 'Cleared' | 'Pending' | 'Hold';
  description: string;
  contact: string;
}

const clearanceChecklist: ClearanceItem[] = [
  { id: 1, department: 'Library Services', status: 'Hold', description: 'Outstanding fee for late book return (ID: 9876).', contact: 'library@uni.edu' },
  { id: 2, department: 'Finance Department', status: 'Pending', description: 'Final tuition balance check for Spring 2026.', contact: 'billing@uni.edu' },
  { id: 3, department: 'IT Services', status: 'Cleared', description: 'All university equipment (laptop/tablet) returned.', contact: 'it-support@uni.edu' },
  { id: 4, department: 'Academic Advisor', status: 'Pending', description: 'Exit interview required with Dr. Chen.', contact: 'advisor.chen@uni.edu' },
  { id: 5, department: 'Career Services', status: 'Cleared', description: 'Graduation survey submitted.', contact: 'careers@uni.edu' },
];

const ClearancePage: React.FC = () => {
  // --- Utility Functions ---

  const getStatusStyle = (status: ClearanceItem['status']) => {
    switch (status) {
      case 'Cleared': return 'bg-green-100 text-green-800 border-green-300';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Hold': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: ClearanceItem['status']) => {
    switch (status) {
      case 'Cleared': return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'Pending': return <ClockIcon className="h-6 w-6 text-yellow-500" />;
      case 'Hold': return <XCircleIcon className="h-6 w-6 text-red-500" />;
      default: return <DocumentCheckIcon className="h-6 w-6 text-gray-500" />;
    }
  };
  
  // Calculate overall status
  const totalItems = clearanceChecklist.length;
  const clearedItems = clearanceChecklist.filter(item => item.status === 'Cleared').length;
  const isComplete = totalItems === clearedItems;
  const hasHold = clearanceChecklist.some(item => item.status === 'Hold');

  // --- Main Render ---

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <DocumentCheckIcon className="h-10 w-10 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">University Clearance Status</h1>
      </div>

      {/* Overall Status Card */}
      <div className={`p-6 rounded-xl shadow-lg border-l-4 ${hasHold ? 'border-red-500 bg-red-50' : isComplete ? 'border-green-500 bg-green-50' : 'border-yellow-500 bg-yellow-50'}`}>
        <p className="text-sm font-medium text-gray-500">Overall Clearance Progress</p>
        <p className="text-4xl font-bold text-gray-900 mt-1">
          {clearedItems} / {totalItems} Items Cleared
        </p>
        <div className="mt-4">
          {hasHold ? (
            <p className="font-semibold text-red-700 flex items-center space-x-2">
              <XCircleIcon className="h-5 w-5" />
              <span>CLEARANCE ON HOLD. Resolve all red-flagged items immediately.</span>
            </p>
          ) : isComplete ? (
            <p className="font-semibold text-green-700 flex items-center space-x-2">
              <CheckCircleIcon className="h-5 w-5" />
              <span>CLEARANCE COMPLETE. You are eligible to receive your official documents.</span>
            </p>
          ) : (
            <p className="font-semibold text-yellow-700 flex items-center space-x-2">
              <ClockIcon className="h-5 w-5" />
              <span>Clearance is Pending. Please complete all remaining items.</span>
            </p>
          )}
        </div>
      </div>

      {/* Clearance Checklist Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Clearance Items</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Department', 'Requirement', 'Status', 'Contact'].map(header => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {clearanceChecklist.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {/* Department */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center space-x-2">
                    {item.department === 'Finance Department' && <BanknotesIcon className="h-5 w-5 text-green-600" />}
                    {item.department === 'Library Services' && <BuildingLibraryIcon className="h-5 w-5 text-indigo-600" />}
                    {item.department === 'Academic Advisor' && <AcademicCapIcon className="h-5 w-5 text-blue-600" />}
                    {(item.department !== 'Finance Department' && item.department !== 'Library Services' && item.department !== 'Academic Advisor') && <DocumentCheckIcon className="h-5 w-5 text-gray-400" />}
                    <span>{item.department}</span>
                  </td>
                  
                  {/* Requirement Description */}
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">{item.description}</td>
                  
                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusStyle(item.status)} items-center space-x-1`}>
                      {getStatusIcon(item.status)}
                      <span>{item.status.toUpperCase()}</span>
                    </div>
                  </td>
                  
                  {/* Contact */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a href={`mailto:${item.contact}`} className="text-blue-600 hover:text-blue-800 transition duration-150">
                        {item.contact}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Action Note */}
      <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 text-indigo-800 rounded-lg text-sm">
        <p className="font-semibold">Note:</p>
        <p>If an item is marked **HOLD** or **PENDING**, please contact the listed department directly using the provided email address to resolve the issue.</p>
      </div>

    </div>
  );
};

export default ClearancePage;