// frontend/app/dashboard/profile/page.tsx

'use client';

import React, { useState } from 'react';
import { UserCircleIcon, PencilIcon, AcademicCapIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface StudentData {
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  program: string;
  level: string;
  currentAddress: string;
}

// Initial state with empty placeholders
const initialStudentData: StudentData = {
  studentId: 'N/A (Admin Input Required)',
  fullName: 'Student Name (e.g., John Doe)',
  email: 'Not Set (user@university.edu)',
  phone: 'Not Set',
  department: 'Pending',
  program: 'Pending',
  level: '1st Year',
  currentAddress: 'Not Set',
};

const StudentProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<StudentData>(initialStudentData);

  // Function to handle saving/updating profile data
  const handleSave = () => {
    // In a real application, you would send profileData to an API endpoint here.
    console.log('Saving profile data:', profileData);
    alert('Profile Updated Successfully!');
    setIsEditing(false); // Exit edit mode after saving
  };

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  // --- Data Display Utility ---

  const ProfileField: React.FC<{ label: string; value: string; icon: React.ReactNode; name: keyof StudentData }> = ({ label, value, icon, name }) => (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition duration-100">
      <div className="text-blue-500 flex-shrink-0">{icon}</div>
      <div className="flex-grow">
        <p className="text-xs font-medium uppercase text-gray-500">{label}</p>
        
        {isEditing ? (
          <input
            type={name.includes('email') ? 'email' : name.includes('phone') ? 'tel' : 'text'}
            name={name}
            value={value}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-md px-2 py-1 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Enter ${label}`}
          />
        ) : (
          <p className="text-base font-semibold text-gray-800">{value}</p>
        )}
      </div>
    </div>
  );

  // --- Main Render ---

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Page Header and Edit Button */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <UserCircleIcon className="h-10 w-10 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
        </div>
        
        {/* Edit Button */}
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition duration-150 ${
            isEditing
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <PencilIcon className="h-5 w-5" />
          <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        
        {/* Basic Info Header */}
        <div className="p-6 bg-blue-50 flex items-center space-x-6">
          <div className="h-20 w-20 rounded-full bg-blue-200 flex items-center justify-center text-blue-700">
            <UserCircleIcon className="h-16 w-16" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{profileData.fullName}</h2>
            <p className="text-sm text-gray-600">ID: {profileData.studentId}</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Contact & Academic Details</h3>
          
          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProfileField 
              label="Email Address" 
              value={profileData.email} 
              name="email"
              icon={<EnvelopeIcon className="h-5 w-5" />} 
            />
            <ProfileField 
              label="Phone Number" 
              value={profileData.phone} 
              name="phone"
              icon={<PhoneIcon className="h-5 w-5" />} 
            />
          </div>

          {/* Academic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProfileField 
              label="Department" 
              value={profileData.department} 
              name="department"
              icon={<AcademicCapIcon className="h-5 w-5" />} 
            />
            <ProfileField 
              label="Program/Major" 
              value={profileData.program} 
              name="program"
              icon={<AcademicCapIcon className="h-5 w-5" />} 
            />
            <ProfileField 
              label="Academic Level" 
              value={profileData.level} 
              name="level"
              icon={<AcademicCapIcon className="h-5 w-5" />} 
            />
            <ProfileField 
              label="Current Address" 
              value={profileData.currentAddress} 
              name="currentAddress"
              icon={<MapPinIcon className="h-5 w-5" />} 
            />
          </div>
          
        </div>
      </div>
      
      {/* Note for Admin */}
      <div className="text-center text-sm text-gray-500 pt-4">
        <p>Note: Core details like Student ID and Academic Program are managed by the administrator.</p>
      </div>

      {/* --- New Copyright Footer (Updated Text) --- */}
      <footer className="w-full py-4 text-center text-xs text-gray-500 bg-gray-100 border-t border-gray-200">
          <p>&copy; 2025 Student Portal. **Access is Restricted.**</p>
      </footer>
    </div>
  );
};

export default StudentProfilePage;