// backend/lib/prisma.ts (FULL CODE)

import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

// NOTE: You must define StudentPublicData and Student types here 
// or import them from another types file if you haven't already.

export type StudentPublicData = {
    id: string;
    name: string;
    email: string;
    department: string | null;
    credits: number;
};

// Assuming AdminCredential is used internally for fetching login credentials
export type AdminCredential = {
    email: string; 
    password: string;
};


/**
 * Fetches ALL user records where the role is 'STUDENT'.
 * FIX: Takes ZERO arguments.
 */
export async function getStudents(): Promise<StudentPublicData[]> { 
    return prisma.user.findMany({
        where: { role: Role.STUDENT },
        select: {
            id: true,
            name: true,
            email: true,
            department: true,
            credits: true,
        },
    }) as unknown as StudentPublicData[];
}

/**
 * Fetches a single student record by ID.
 * FIX: Takes ONE argument (id: string).
 */
export async function getStudentById(id: string): Promise<StudentPublicData | null> {
    return prisma.user.findUnique({
        where: { id: id, role: Role.STUDENT },
        select: {
            id: true,
            name: true,
            email: true,
            department: true,
            credits: true,
        },
    }) as unknown as StudentPublicData | null;
}

/**
 * Fetches all admin credentials (email, password) for authentication.
 * FIX: Takes ZERO arguments.
 */
export async function getAdminCredentials(): Promise<AdminCredential[]> {
    return prisma.user.findMany({
        where: { role: Role.ADMIN },
        select: {
            email: true,
            password: true,
        },
    }) as unknown as AdminCredential[];
}

// NOTE: Add other necessary exports or database functions here.
// export default prisma;