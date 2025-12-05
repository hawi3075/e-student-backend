// frontend/app/dashboard/profile/page.tsx

'use client';

import React from 'react';
import { UserCircleIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { AcademicCapIcon } from '@heroicons/react/24/solid';

// Sample data for demonstration
const studentData = {
  name: "Sarah J. Connor",
  studentId: "STU123456",
  major: "Computer Science",
  enrollmentStatus: "Full-Time",
  year: "3rd Year",
  birthDate: "1998-05-20",
  email: "sarah.connor@university.edu",
  phone: "(555) 123-4567",
  address: "101 University Residence Hall, Cityville, CA 90210",
  gpa: 3.85,
};

// Reusable component for displaying a single detail item
const ProfileDetail: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
  <div className="mb-4">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-lg font-semibold text-gray-900">{value}</p>
  </div>
);

const StudentProfilePage: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <UserCircleIcon className="h-10 w-10 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
      </div>

      {/* Main Profile Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1 & 2: Main Academic & Personal Info */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Academic Overview Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
                <AcademicCapIcon className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">Academic Overview</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
              <ProfileDetail label="Student ID" value={studentData.studentId} />
              <ProfileDetail label="Major" value={studentData.major} />
              <ProfileDetail label="Enrollment Status" value={studentData.enrollmentStatus} />
              <ProfileDetail label="Current Year" value={studentData.year} />
              <ProfileDetail label="Cumulative GPA" value={studentData.gpa} />
              <ProfileDetail label="Date of Birth" value={studentData.birthDate} />
            </div>
          </div>
          
          {/* Personal Details Card (Placeholder) */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Details</h2>
            <p className="text-gray-500">More personal information fields will go here, such as emergency contacts or nationality.</p>
          </div>

        </div>

        {/* Column 3: Contact Information */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h2>
            
            <div className="space-y-4">
                <div className="flex items-start space-x-3">
                    <EnvelopeIcon className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Email Address</p>
                        <p className="text-md text-blue-600 font-semibold">{studentData.email}</p>
                    </div>
                </div>

                <div className="flex items-start space-x-3">
                    <PhoneIcon className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Phone Number</p>
                        <p className="text-md text-gray-800 font-semibold">{studentData.phone}</p>
                    </div>
                </div>

                <div className="flex items-start space-x-3">
                    <MapPinIcon className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Mailing Address</p>
                        <p className="text-md text-gray-800 font-semibold">{studentData.address}</p>
                    </div>
                </div>
            </div>

            <button className="mt-6 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150">
                Edit Profile
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;