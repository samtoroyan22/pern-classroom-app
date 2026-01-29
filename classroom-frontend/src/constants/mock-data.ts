import { TSubject } from "@/types";
import { DEPARTMENTS } from ".";

export const MOCK_SUBJECTS: TSubject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: DEPARTMENTS[0], // CsS
    description: "Basics of programming, algorithms, and computer systems.",
    createdAt: new Date("2024-01-10").toISOString(),
  },
  {
    id: 2,
    code: "MATH201",
    name: "Linear Algebra",
    department: DEPARTMENTS[1], // Math
    description: "Vectors, matrices, and linear transformations.",
    createdAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: 3,
    code: "PHYS150",
    name: "Classical Mechanics",
    department: DEPARTMENTS[2], // Physics
    description: "Motion, forces, energy, and Newtonian mechanics.",
    createdAt: new Date("2024-02-01").toISOString(),
  },
  {
    id: 4,
    code: "ENG101",
    name: "Academic English",
    department: DEPARTMENTS[3], // English
    description: "Reading, writing, and speaking skills for academic purposes.",
    createdAt: new Date("2024-02-10").toISOString(),
  },
  {
    id: 5,
    code: "CS202",
    name: "Web Development",
    department: DEPARTMENTS[0], // CS
    description: "Frontend and backend web technologies.",
    createdAt: new Date("2024-02-20").toISOString(),
  },
];
