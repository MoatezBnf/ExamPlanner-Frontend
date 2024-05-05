export interface UserModel {
  id?: string;
  userName?: string;
  email?: string;
  roleId?: number;
  departmentIds?: number[];
}

export interface Role {
  roleId: number;
  name: string;
}

export interface Department {
  departmentId: number;
  name?: string;
  userDepartments?: UserDepartment[];
  specialities?: Speciality[];
}

export interface UserDepartment {
  userId?: string;
  user?: UserModel;
  departmentId: number;
  department?: Department;
}

export interface Speciality {
  specialityId?: number;
  name?: string;
  departmentId?: number;
  department?: Department;
  specialityLevels?: SpecialityLevel[];
}

export interface Level {
  levelId?: number;
  name?: string;
  specialityLevels?: SpecialityLevel[];
}

export interface SpecialityLevel {
  specialityId: number;
  speciality?: Speciality;
  levelId: number;
  level?: Level;
  classes?: Class[];
  exams?: Exam[];
}

export interface Class {
  classId: number;
  name?: string;
  specialityId: number;
  levelId: number;
  specialityLevel?: SpecialityLevel;
  groups?: Group[];
}

export interface Group {
  groupId: number;
  name?: string;
  classId: number;
  roomId: number;
  class?: Class;
  room?: Room;
  students?: Student[];
}

export interface Student {
  studentId?: number;
  name?: string;
  email?: string;
  groupId?: number;
  group?: Group;
}

export interface Room {
  roomId?: number;
  name?: string;
  groups?: Group[];
}

export interface Exam {
  examId: number;
  name?: string;
  date: Date;
  duration: number;
  specialityId: number;
  levelId: number;
  specialityLevel?: SpecialityLevel;
}

export const departments: Department[] = [
  {
    departmentId: 1,
    name: "SuperAdmin",
  },
  {
    departmentId: 2,
    name: "Digital",
  },
  {
    departmentId: 3,
    name: "Business",
  },
  {
    departmentId: 4,
    name: "Polytechnic",
  },
];
export const roles: Role[] = [
  {
    roleId: 1,
    name: "SuperAdmin",
  },
  {
    roleId: 2,
    name: "Director",
  },
  {
    roleId: 3,
    name: "StudentAffairsService",
  },
];

export const users: UserModel[] = [
  {
    id: "1",
    userName: "User1",
    email: "user1@example.com",
    roleId: 3,
    departmentIds: [2],
  },
  {
    id: "2",
    userName: "User2",
    email: "user2@example.com",
    roleId: 2,
    departmentIds: [2, 3],
  },
  {
    id: "3",
    userName: "User3",
    email: "user3@example.com",
    roleId: 3,
    departmentIds: [4],
  },
];
