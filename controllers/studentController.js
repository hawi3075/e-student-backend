import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({ include: { course: true } });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
      include: { course: true },
    });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createStudent = async (req, res) => {
  const { name, email, courseId } = req.body;
  try {
    const student = await prisma.student.create({
      data: { name, email, courseId },
      include: { course: true },
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, courseId } = req.body;
  try {
    const student = await prisma.student.update({
      where: { id: parseInt(id) },
      data: { name, email, courseId },
      include: { course: true },
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Student deleted", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
