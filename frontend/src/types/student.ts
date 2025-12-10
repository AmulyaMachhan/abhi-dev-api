import type { Gender } from "./gender";

export interface Student {
  _id: string;
  name: string;
  email: string;
  gender: Gender;
  mobile: string;
  country: string;
  state: string;
  district: string;
}

export interface useStudentStore {
  students: Student;
  loading: boolean;
  error: string;

  listStudents: () => Promise<void>;
  addStudent: (data: {
    name: string;
    email: string;
    gender: Gender;
    mobile: string;
    country: string;
    state: string;
    district: string;
  }) => Promise<void>;
  updateStudent: (
    id: string,
    data: {
      name: string;
      email: string;
      gender: Gender;
      mobile: string;
      country: string;
      state: string;
      district: string;
    }
  ) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
}
