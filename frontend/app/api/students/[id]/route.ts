import { NextResponse } from 'next/server';
// Ensure all required functions and types are imported from your data layer
import { getStudentById, updateStudent, Student } from '@/backend/lib/prisma'; 

// GET request handler: Fetches a single student by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    
    try {
        // Use 'await' as getStudentById is an asynchronous database operation
        const student = await getStudentById(id); 
        
        if (!student) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }
        
        return NextResponse.json(student);
    } catch (error) {
        console.error(`GET Student Error for ID ${id}:`, error); 
        // Return a 500 error, which means the database query or connection failed.
        return NextResponse.json({ message: "Internal Server Error - Failed to fetch student data." }, { status: 500 });
    }
}

// PUT request handler: Updates an existing student (Edit/Registration update)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    
    try {
        // 1. Get the JSON body of the request
        const body: Student = await request.json(); 
        
        // 2. Data validation: Ensure the ID in the body matches the URL ID
        if (body.id !== id) {
            return NextResponse.json({ message: 'ID mismatch between URL and request body.' }, { status: 400 });
        }

        // 3. Call the update function, using 'await'
        // Note: The updateStudent function in prisma.ts must be designed to accept a single 'Student' object 
        // or separated arguments (id, data). We assume it takes the object 'body'.
         const updatedStudent = await updateStudent(id, body);
        
        // OLD: Causes the TypeScript Error
         if (updatedStudent) {
           return NextResponse.json({
                message: `Student ${id} updated successfully`,
                       data: updatedStudent // Optional: Include the updated student object
                         });

        }
        
        // If the update function returns null/undefined, treat it as not found
        return NextResponse.json({ message: 'Student not found or failed to update.' }, { status: 404 });

    } catch (error) {
        console.error(`Error updating student ${id}:`, error);
        return NextResponse.json({ message: 'Failed to update student due to a server error.' }, { status: 500 });
    }
}