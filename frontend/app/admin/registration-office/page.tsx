// frontend/app/admin/registration-office/page.tsx

'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { CheckCircleIcon, XCircleIcon, ClockIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import AdminLayout from '../../../components/AdminLayout'; // Ensure this path is correct

// --- 1. Types and Status Styles ---
interface Student {
    id: string; 
    name: string;
    department: string;
    status: 'Registered' | 'Pending' | 'On Hold';
    credits: number;
}

const initialStudentData: Student[] = [
    { id: '1001', name: 'Abebe Kebede', department: 'Computer Science', status: 'Registered', credits: 18 },
    { id: '1002', name: 'Tigist Alemayehu', department: 'Mechanical Engineering', status: 'Pending', credits: 15 },
    { id: '1003', name: 'Samuel Desta', department: 'Civil Engineering', status: 'On Hold', credits: 0 },
    { id: '1004', name: 'Chaltu Merga', department: 'Electrical Engineering', status: 'Registered', credits: 17 },
    { id: '1005', name: 'Getu Fikadu', department: 'Business Management', status: 'Pending', credits: 12 },
];
// --------------------

// Status Indicator Component (reusable)
const getStatusIndicator = (status: Student['status']) => {
    switch (status) {
        case 'Registered':
            return (
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    {status}
                </span>
            );
        case 'Pending':
            return (
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {status}
                </span>
            );
        case 'On Hold':
            return (
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    <XCircleIcon className="w-4 h-4 mr-1" />
                    {status}
                </span>
            );
        default:
            return status;
    }
};


// --- SEPARATE MODAL COMPONENT (FIXES FOCUS ISSUE) ---
interface ModalProps {
    editingStudent: Student;
    onSave: (student: Student) => void;
    onClose: () => void;
    isNew: boolean;
}

const StudentModalComponent: React.FC<ModalProps> = React.memo(({ editingStudent: initialStudent, onSave, onClose, isNew }) => {
    // We use internal state for the form fields to ensure inputs don't lose focus
    const [formData, setFormData] = useState<Student>(initialStudent);

    // Update internal form data when the prop changes (e.g., opening a new edit)
    React.useEffect(() => {
        setFormData(initialStudent);
    }, [initialStudent]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? (parseInt(value) || 0) : value
        }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.department) {
            alert("Name and Department are required fields.");
            return;
        }
        onSave(formData);
    };

    return (
        // Backdrop
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            
            {/* Modal Container */}
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                    {isNew ? 'Add New Student' : `Edit Student ID: ${initialStudent.id}`}
                </h2>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    
                    {/* 1. Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name" // IMPORTANT: Use name attribute for generic handler
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-gray-900"
                        />
                    </div>

                    {/* 2. Department Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <input
                            type="text"
                            name="department" // IMPORTANT: Use name attribute
                            value={formData.department}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-gray-900"
                        />
                    </div>

                    {/* 3. Credits Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Credits Enrolled</label>
                        <input
                            type="number"
                            name="credits" // IMPORTANT: Use name attribute
                            min="0"
                            max="30"
                            value={formData.credits}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-gray-900"
                        />
                    </div>
                    
                    {/* 4. Status Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Registration Status</label>
                        <select
                            name="status" // IMPORTANT: Use name attribute
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-gray-900"
                        >
                            <option value="Registered">Registered</option>
                            <option value="Pending">Pending</option>
                            <option value="On Hold">On Hold</option>
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
                        >
                            {isNew ? 'Add Student' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
});

StudentModalComponent.displayName = 'StudentModalComponent';
// --- END SEPARATE MODAL COMPONENT ---


const RegistrationOfficePage: React.FC = () => {
    const [students, setStudents] = useState<Student[]>(initialStudentData);
    const [searchTerm, setSearchTerm] = useState('');
    
    // State to hold the data of the student being edited/added
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);

    // --- Action Handlers ---

    const handleDelete = (studentId: string) => {
        if (window.confirm(`Are you sure you want to delete student ID ${studentId}? This action is permanent.`)) {
            const updatedStudents = students.filter(s => s.id !== studentId);
            setStudents(updatedStudents);
        }
    };

    const handleEdit = (student: Student) => {
        // We pass the student object to the state
        setEditingStudent(student); 
    };

    const handleAddNew = () => {
        // Create a temporary ID that clearly indicates a NEW record
        const tempId = `NEW-${Date.now()}`;
        const newStudentTemplate: Student = {
            id: tempId, 
            name: '',
            department: '',
            status: 'Pending',
            credits: 0
        };
        setEditingStudent(newStudentTemplate);
    };
    
    // Function passed to the Modal to handle save logic
    const handleSave = useCallback((studentData: Student) => {
        const isNewRecord = studentData.id.startsWith('NEW-');

        if (isNewRecord) {
            // ADD NEW STUDENT: Generate final ID
            const maxId = Math.max(...students.map(s => parseInt(s.id)).filter(id => !isNaN(id)), 1000);
            const finalId = (maxId + 1).toString();
            
            setStudents(prevStudents => [...prevStudents, {...studentData, id: finalId}]);
        } else {
            // EDIT EXISTING STUDENT
            setStudents(prevStudents => prevStudents.map(s => 
                s.id === studentData.id ? studentData : s
            ));
        }
        
        // Close the modal
        setEditingStudent(null);
    }, [students]); // Dependency on students ensures we get the latest list for ID generation

    const handleClose = useCallback(() => {
        setEditingStudent(null);
    }, []);

    // --- Filtering ---
    const filteredStudents = useMemo(() => students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.includes(searchTerm) ||
        student.department.toLowerCase().includes(searchTerm.toLowerCase())
    ), [students, searchTerm]);


    // Determine if the currently open modal is for a new record
    const isEditingNew = editingStudent?.id.startsWith('NEW-') || false;


    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto p-8 py-12">
                {/* ... (Header and Search/Action buttons) ... */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Registration Management</h1>
                    <p className="text-gray-600">View and manage student registration status and details.</p>
                </header>

                {/* Search and Actions */}
                <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <input
                        type="text"
                        placeholder="Search by ID, Name, or Department..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md w-1/3 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    />
                    <button
                        onClick={handleAddNew}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-150 flex items-center"
                    >
                        <PlusCircleIcon className="w-5 h-5 mr-1" />
                        Add New Student
                    </button>
                </div>
                
                {/* Student Registration Table */}
                <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits Enrolled</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.department}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusIndicator(student.status)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.credits}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button 
                                                onClick={() => handleEdit(student)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4 flex items-center justify-end"
                                            >
                                                <PencilSquareIcon className="w-4 h-4 mr-1"/> Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(student.id)}
                                                className="text-red-600 hover:text-red-900 flex items-center justify-end"
                                            >
                                                <TrashIcon className="w-4 h-4 mr-1"/> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No students found matching your search criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Showing {filteredStudents.length} of {initialStudentData.length} records.
                </div>
            </div>
            
            {/* Render the SEPARATE Modal Component when editingStudent state is set */}
            {editingStudent && (
                <StudentModalComponent
                    editingStudent={editingStudent}
                    onSave={handleSave}
                    onClose={handleClose}
                    isNew={isEditingNew}
                />
            )}
        </AdminLayout>
    );
};

export default RegistrationOfficePage;