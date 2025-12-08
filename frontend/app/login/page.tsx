// frontend/app/login/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserIcon, LockClosedIcon, BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

// FIX: Correctly import Navbar. We removed the incorrect AdminLayout import.
import Navbar from '../../components/Navbar'; 

// Import necessary functions and data structures from the centralized data file
// New (CORRECT) line for login/page.tsx:
import { getAdminCredentials, getStudents, Student } from '../../../lib/data';

// Define the allowed roles
type Role = 'student' | 'admin';

// --- MOCK CREDENTIAL DATA (Fetched from lib/data.ts) ---
const mockAdminCredentials = getAdminCredentials();
const mockStudentCredentials = getStudents();
// ----------------------------


const LoginPage: React.FC = () => {
    const router = useRouter(); 
    
    // State variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>('student'); // Default role selection
    const [error, setError] = useState('');
    
    // --- Authentication Function ---
    const authenticateUser = (user: string, pass: string, userRole: Role): { success: boolean, redirectId?: string, actualRole: Role } => {
        
        // 1. Check for HARDCODED ADMIN credentials (Highest priority)
        const isAdminLogin = user === mockAdminCredentials.username && pass === mockAdminCredentials.password;
        if (isAdminLogin) {
            return { success: true, actualRole: 'admin' };
        }

        // 2. Check Student Credentials (ID/Password)
        const student = mockStudentCredentials.find(s => s.id === user);
        const isStudentLogin = !!student && student.password === pass;

        if (isStudentLogin) {
            // If the user is a student, we check the selected role:
            if (userRole === 'admin') {
                // Scenario: Admin wants to view a student's data using the student's credentials.
                return { success: true, redirectId: user, actualRole: 'student' };
            } else if (userRole === 'student') {
                // Scenario: Standard student login.
                 return { success: true, redirectId: user, actualRole: 'student' };
            }
        }
        
        // 3. Login Failed
        return { success: false, actualRole: userRole };
    };
    // ------------------------------------

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const result = authenticateUser(username, password, role);

        if (result.success) {
            if (result.actualRole === 'admin') {
                // Redirect to the Admin Hub
                router.push('/admin/hub'); 
            } else {
                // Redirect to the Student Dashboard/Profile, using the user ID
                router.push(`/dashboard/profile?id=${result.redirectId || username}`); 
            }
        } else {
            // Determine the appropriate error hint based on the selected role
            let hint = '';
            if (role === 'admin') {
                hint = `Try admin login: ${mockAdminCredentials.username} / ${mockAdminCredentials.password}. Or, try a student ID and password to access their data.`;
            } else {
                // Use a valid student ID for the hint
                hint = `Try Student ID: ${mockStudentCredentials[0].id} / ${mockStudentCredentials[0].password}`;
            }
                
            setError(`Invalid username or password for ${role} role. ${hint}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            
            <Navbar />

            <div className="flex justify-center items-center flex-grow py-12"> 
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl border-t-4 border-indigo-600">
                    <h2 className="text-3xl font-bold text-center text-gray-900">Portal Login</h2>
                    <p className="text-center text-gray-500">Sign in to access your dashboard.</p>

                    {error && <p className="p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center">{error}</p>}
                    
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        
                        {/* Role Selector */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Login Role</label>
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setRole('student')}
                                    className={`flex items-center justify-center flex-1 p-3 border rounded-lg transition-all ${
                                        role === 'student' ? 'bg-indigo-100 border-indigo-500 text-indigo-700 shadow-inner' : 'bg-gray-50 border-gray-300 text-gray-500 hover:bg-gray-100'
                                    }`}
                                >
                                    <AcademicCapIcon className="h-5 w-5 mr-2" /> **Student**
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('admin')}
                                    className={`flex items-center justify-center flex-1 p-3 border rounded-lg transition-all ${
                                        role === 'admin' ? 'bg-indigo-100 border-indigo-500 text-indigo-700 shadow-inner' : 'bg-gray-50 border-gray-300 text-gray-500 hover:bg-gray-100'
                                    }`}
                                >
                                    <BriefcaseIcon className="h-5 w-5 mr-2" /> **Administrator**
                                </button>
                            </div>
                        </div>

                        {/* Username Input */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                {role === 'student' ? 'Student ID' : 'Username/ID'}
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900" 
                                    placeholder={`Enter ${role === 'student' ? 'Student ID (e.g., 1001)' : 'username (admin)'}`}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                        >
                            Sign In as {role === 'admin' ? 'Admin' : 'Student'}
                        </button>
                    </form>
                </div>
            </div>

            <footer className="text-center p-3 text-sm text-gray-500 border-t border-gray-200">
                &copy; {new Date().getFullYear()} University Portal. All rights reserved. 
            </footer>

        </div>
    );
};

export default LoginPage;