'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserIcon, LockClosedIcon, BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

import Navbar from '../../components/Navbar'; 
// --- FIXED: Removed direct import of Prisma functions to prevent runtime error ---
// The following line is DELETED: 
// import { getAdminCredentials, getStudents, Student } from '@/backend/lib/prisma';

// Import the safe Server Actions instead
import { fetchAdminCredentialsAction, fetchStudentsAction } from '../actions';

// Define the allowed roles
type Role = 'student' | 'admin';

// Define the shape of the data returned by the actions (matching the action.ts types)
type AdminCredential = {
    username: string;
    
     email: string;
    password: string;
};
// We assume Student type is used correctly inside the actions.ts file.


const LoginPage: React.FC = () => {
    const router = useRouter(); 
    
    // State variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>('student'); // Default role selection
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    
    // --- Authentication Function ---
    // NOTE: This function now receives the data after it's been fetched asynchronously.
    const authenticateUser = (
        user: string, 
        pass: string, 
        userRole: Role, 
        adminCreds: AdminCredential[], 
        studentCreds: any[] // Use 'any[]' for simplicity, or define the specific fields needed
    ): { success: boolean, redirectId?: string, actualRole: Role } => {
        
        // 1. Check Admin Credentials (Highest priority)
        const matchedAdmin = adminCreds.find(a => a.username === user);
        // TODO: Use bcrypt.compare(pass, matchedAdmin.password) in production for security!
        const isAdminLogin = !!matchedAdmin && matchedAdmin.password === pass; 

        if (isAdminLogin) {
            return { success: true, actualRole: 'admin' };
        }

        // 2. Check Student Credentials (ID/Password)
        const student = studentCreds.find(s => s.id === user);
        const isStudentLogin = !!student && student.password === pass; // Again, use hash comparison in production

        if (isStudentLogin) {
            // Logic for admin viewing student data OR standard student login
            if (userRole === 'admin' || userRole === 'student') {
                return { success: true, redirectId: user, actualRole: 'student' };
            }
        }
        
        // 3. Login Failed
        return { success: false, actualRole: userRole };
    };
    // ------------------------------------

    const handleSubmit = async (e: React.FormEvent) => { // ADD async HERE
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // --- ASYNCHRONOUS DATA FETCHING via Server Actions ---
            // These calls execute the Prisma queries safely on the server
            const adminCreds = await fetchAdminCredentialsAction();
            const studentCreds = await fetchStudentsAction();
            // ----------------------------------------------------

            const result = authenticateUser(username, password, role, adminCreds, studentCreds);

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
                    // Use the first admin user for a hint if the array is not empty
                    const adminHint = adminCreds[0] ? `${adminCreds[0].username} / ${adminCreds[0].password}` : 'Check your database for an admin user.';
                    hint = `Try admin login: ${adminHint}. Or, try a student ID and password to access their data.`;
                } else {
                    // Use a valid student ID for the hint
                    const studentHint = studentCreds[0] ? `${studentCreds[0].id} / ${studentCreds[0].password}` : 'Check your database for a student user.';
                    hint = `Try Student ID: ${studentHint}`;
                }
                    
                setError(`Invalid username or password for ${role} role. ${hint}`);
            }
        } catch (err) {
            console.error("Login Handler Error:", err);
            setError("Could not connect to the server. Please check your network or server status.");
        } finally {
            setIsLoading(false);
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
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : `Sign In as ${role === 'admin' ? 'Admin' : 'Student'}`}
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