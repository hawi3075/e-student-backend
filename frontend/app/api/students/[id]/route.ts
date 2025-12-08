// frontend/app/api/students/[id]/route.ts

import { NextResponse } from 'next/server';
import { getStudentById, updateStudent, Student } from '../../../../../lib/data'; // Adjust path as needed

// GET request handler: Fetches a single student by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const student = getStudentById(id);
        if (student) {
            return NextResponse.json(student);
        }
        return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    } catch (error) {
        console.error(`Error fetching student ${id}:`, error);
        return NextResponse.json({ message: 'Failed to fetch student' }, { status: 500 });
    }
}

// PUT request handler: Updates an existing student (Edit/Registration update)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const body: Student = await request.json();
        
        // Ensure the ID in the body matches the URL ID
        if (body.id !== id) {
            return NextResponse.json({ message: 'ID mismatch' }, { status: 400 });
        }

        const success = updateStudent(body);
        
        if (success) {
            return NextResponse.json({ message: `Student ${id} updated successfully` });
        }
        
        return NextResponse.json({ message: 'Student not found or failed to update' }, { status: 404 });
    } catch (error) {
        console.error(`Error updating student ${id}:`, error);
        return NextResponse.json({ message: 'Failed to update student' }, { status: 500 });
    }
}