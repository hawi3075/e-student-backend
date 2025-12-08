// frontend/app/api/students/route.ts

import { NextResponse } from 'next/server';
import { getStudents, addStudent, Student } from '../../../../lib/data'; // Adjust path as needed

// GET request handler: Fetches all students
export async function GET() {
    try {
        const studentList = getStudents();
        return NextResponse.json(studentList);
    } catch (error) {
        console.error('Error fetching students:', error);
        return NextResponse.json({ message: 'Failed to fetch students' }, { status: 500 });
    }
}

// POST request handler: Adds a new student (Registration)
export async function POST(request: Request) {
    try {
        // We assume the body contains the student data without the ID
        const body: Omit<Student, 'id'> = await request.json();
        
        // Simple validation
        if (!body.name || !body.department || !body.password) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        
        const newStudent = addStudent(body);
        
        // Return the newly created student object
        return NextResponse.json(newStudent, { status: 201 });
    } catch (error) {
        console.error('Error adding student:', error);
        return NextResponse.json({ message: 'Failed to add student' }, { status: 500 });
    }
}