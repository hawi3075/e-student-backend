// lib/data.ts

export interface Student {
    id: string; 
    name: string;
    department: string;
    status: 'Registered' | 'Pending' | 'On Hold';
    credits: number;
    password: string; // Used for login
}

// ⚠️ NOTE: In a real app, this array would be replaced by database access logic.
let students: Student[] = [
    { id: '1001', name: 'Abebe Kebede', department: 'Computer Science', status: 'Registered', credits: 18, password: 'pass1001' },
    { id: '1002', name: 'Tigist Alemayehu', department: 'Mechanical Engineering', status: 'Pending', credits: 15, password: 'pass1002' },
    { id: '1003', name: 'Samuel Desta', department: 'Civil Engineering', status: 'On Hold', credits: 0, password: 'pass1003' },
    { id: '1004', name: 'Chaltu Merga', department: 'Electrical Engineering', status: 'Registered', credits: 17, password: 'pass1004' },
    { id: '1005', name: 'Getu Fikadu', department: 'Business Management', status: 'Pending', credits: 12, password: 'pass1005' },
    { id: '1006', name: 'hawi', department: 'Undeclared', status: 'Pending', credits: 0, password: 'pass1006' },
    { id: '1007', name: 'sami', department: 'Undeclared', status: 'Pending', credits: 0, password: 'pass1007' },
];

export const getStudents = (): Student[] => {
    return students;
};

export const getStudentById = (id: string): Student | undefined => {
    return students.find(s => s.id === id);
};

export const updateStudent = (updatedStudent: Student): boolean => {
    const index = students.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
        students[index] = updatedStudent;
        return true;
    }
    return false;
};

export const addStudent = (newStudent: Omit<Student, 'id'>): Student => {
    // Simple ID generation for the mock data
    const lastId = students.length > 0 ? students[students.length - 1].id : '1000';
    const newId = (parseInt(lastId) + 1).toString();
    const studentWithId: Student = { ...newStudent, id: newId };
    students.push(studentWithId);
    return studentWithId;
};

export const getAdminCredentials = () => ({
    username: 'admin',
    password: 'admin123',
});