// frontend/app/dashboard/dormitory/page.tsx

'use client';

import React, { useState } from 'react';
import { HomeModernIcon, UserIcon, MapPinIcon, CalendarDaysIcon, PhoneIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

// Sample Housing Data
const studentHousingData = {
  status: 'Assigned', // or 'Pending', 'Waitlist', 'Cleared'
  dormName: 'Centennial Hall',
  roomNumber: '4B',
  floor: 4,
  roomType: 'Double Occupancy',
  roommateName: 'Alex Johnson',
  roommateContact: 'alex.j@uni.edu',
  checkInDate: '2026-08-20',
  contractStatus: 'Active',
};

const DormitoryPage: React.FC = () => {
  const [currentStatus, setCurrentStatus] = useState(studentHousingData.status);

  // --- Utility Functions ---

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Assigned': return 'bg-green-100 text-green-800 border-green-300';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Waitlist': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // --- Main Render ---

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <HomeModernIcon className="h-10 w-10 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Dormitory & Housing Information</h1>
      </div>

      {/* Overall Status Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500">
        <p className="text-sm font-medium text-gray-500">Current Housing Status</p>
        <div className="flex justify-between items-center mt-2">
            <p className="text-4xl font-bold text-gray-900">
                {studentHousingData.dormName || 'No Assignment Yet'}
            </p>
            <span className={`px-4 py-2 inline-flex text-lg leading-5 font-bold rounded-full border ${getStatusStyle(currentStatus)}`}>
                {currentStatus.toUpperCase()}
            </span>
        </div>
        
        {currentStatus === 'Assigned' && (
            <p className="mt-3 text-gray-600">Your current housing assignment for the Fall 2026 term.</p>
        )}
      </div>

      {/* Assignment Details Grid */}
      {currentStatus === 'Assigned' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Room Details */}
            <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 space-y-3">
                <MapPinIcon className="h-6 w-6 text-indigo-500" />
                <h3 className="text-xl font-semibold text-gray-900">Room Details</h3>
                <p><strong>Building:</strong> {studentHousingData.dormName}</p>
                <p><strong>Room Number:</strong> <span className="text-blue-600 font-bold">{studentHousingData.roomNumber}</span></p>
                <p><strong>Room Type:</strong> {studentHousingData.roomType}</p>
            </div>

            {/* Roommate Details */}
            <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 space-y-3">
                <UserIcon className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Roommate</h3>
                <p><strong>Name:</strong> {studentHousingData.roommateName}</p>
                <p><strong>Contact:</strong> <a href={`mailto:${studentHousingData.roommateContact}`} className="text-blue-600 hover:text-blue-800">{studentHousingData.roommateContact}</a></p>
                <p className="text-sm text-gray-500">Please reach out to coordinate move-in.</p>
            </div>

            {/* Key Dates */}
            <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 space-y-3">
                <CalendarDaysIcon className="h-6 w-6 text-red-500" />
                <h3 className="text-xl font-semibold text-gray-900">Important Dates</h3>
                <p><strong>Official Check-In:</strong> {studentHousingData.checkInDate}</p>
                <p><strong>Contract Status:</strong> {studentHousingData.contractStatus}</p>
                <p className="text-sm text-gray-500">Contact Housing for early/late check-in.</p>
            </div>
        </div>
      )}

      {/* Action/Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        {/* Housing Office Contact */}
        <div className="p-6 bg-gray-100 rounded-xl shadow-inner space-y-3">
            <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <PhoneIcon className="h-6 w-6 text-gray-600" />
                <span>Housing Office</span>
            </h3>
            <p className="text-gray-600">For all changes, maintenance requests, or contract questions.</p>
            <p><strong>Email:</strong> <a href="mailto:housing@uni.edu" className="text-blue-600 hover:text-blue-800">housing@uni.edu</a></p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
        </div>

        {/* Policies and Guidelines */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 space-y-3">
            <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-600" />
                <span>Residential Policies</span>
            </h3>
            <p className="text-gray-600">Review the official Student Housing Handbook before moving in.</p>
            <a href="#" className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold transition duration-150">
                View Housing Handbook (PDF)
            </a>
        </div>
      </div>
      
    </div>
  );
};

export default DormitoryPage;