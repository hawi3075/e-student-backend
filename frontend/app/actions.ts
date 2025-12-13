// frontend/app/actions.ts (FULL CODE)

'use server'; // CRITICAL: This directive ensures this code ONLY runs on the server.

import { 
    getAdminCredentials, 
    getStudents,
    getStudentById, // Import the single-student function
    // Student, // No longer needed if not used directly
    StudentPublicData,
    AdminCredential // Using the type from prisma.ts
} from '../../backend/lib/prisma'; // Make sure this path is correct

// Use the AdminCredential type from prisma.ts to define the action return type
export type AdminCredentialData = AdminCredential;


/**
 * Server Action: Fetches admin credentials (email/password only) for login validation.
 */
export async function fetchAdminCredentialsAction(): Promise<AdminCredentialData[]> {
    const adminData = await getAdminCredentials();
    return adminData as AdminCredentialData[];
}


/**
 * Server Action: Fetches public student data (all students) from the database.
 * FIX: Calls getStudents() with ZERO arguments. This fixes your reported error.
 */
export async function fetchStudentsAction(): Promise<StudentPublicData[]> {
    return getStudents(); 
}


/**
 * Server Action: Fetches a single student's public data by ID.
 * FIX: Calls getStudentById(id) with ONE argument.
 */
export async function fetchStudentByIdAction(id: string): Promise<StudentPublicData | null> {
    const student = await getStudentById(id); 
    return student; 
}