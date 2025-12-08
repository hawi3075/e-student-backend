// frontend/lib/data-service.ts

// NOTE: This structure simulates the database. In production, this array
// would be replaced by asynchronous functions (e.g., fetch, axios) calling a
// real backend server (Node.js, Python, etc.) connected to a database (SQL, MongoDB).

export interface StudentProfile {
    id: string;
    password: string;
    name: string;
    email: string;
    program: string;
    joinDate: string;
    enrollmentStatus: string;
    major: string;
    advisor: string;
}

const studentDatabase: StudentProfile[] = [];

/**
 * Mocks the API function to create a new student profile.
 * @param data - The profile data submitted from the Admin form.
 * @returns The newly created student profile object.
 */
export function createStudentProfile(data: Omit<StudentProfile, 'id' | 'password' | 'joinDate' | 'enrollmentStatus' | 'major' | 'advisor'> & { program: string }): StudentProfile {
    
    // 1. Generate ID and Password
    const studentId = `S${Math.floor(Math.random() * 900000) + 100000}`; // SXXXXXX
    const temporaryPassword = Math.random().toString(36).slice(-8); // Random 8-char string

    // 2. Create the final profile object
    const newStudent: StudentProfile = {
        id: studentId,
        password: temporaryPassword,
        name: data.name,
        email: data.email,
        program: data.program,
        joinDate: new Date().toLocaleDateString('en-US'),
        enrollmentStatus: 'Active',
        major: data.program,
        advisor: 'Dr. Placeholder',
    };

    // 3. Simulate Database Insertion
    studentDatabase.push(newStudent);
    console.log('--- Database Update ---', newStudent);
    console.log('Total Students:', studentDatabase.length);

    return newStudent;
}

/**
 * Mocks the API function to retrieve the current student's profile.
 * In this mock, we always retrieve the last created student.
 * @returns The most recently added student profile, or a default profile.
 */
export function getStudentProfile(): StudentProfile {
    if (studentDatabase.length === 0) {
        return {
            id: 'N/A', 
            password: 'N/A', 
            name: 'Guest Student (Please Add Profile via Admin Portal)', 
            email: 'guest@portal.edu', 
            program: 'Undefined', 
            joinDate: '2025-01-01', 
            enrollmentStatus: 'Inactive', 
            major: 'General Studies', 
            advisor: 'N/A'
        };
    }
    // Return the last (most recently created) student
    return studentDatabase[studentDatabase.length - 1];
}