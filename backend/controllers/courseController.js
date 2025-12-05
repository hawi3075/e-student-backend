import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({ include: { students: true } });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
      include: { students: true },
    });
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCourse = async (req, res) => {
  const { name } = req.body;
  try {
    const course = await prisma.course.create({ data: { name } });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const course = await prisma.course.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Course deleted", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
