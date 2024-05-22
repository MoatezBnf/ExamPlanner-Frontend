import React, { useState, useEffect } from "react";
import PageTitle from "example/components/Typography/PageTitle";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
  Select,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@roketid/windmill-react-ui";
import { EditIcon, TrashIcon } from "icons";
import Layout from "example/containers/Layout";

interface IDepartment {
  DepartmentId: number;
  Name: string;
}

interface ISpeciality {
  SpecialityId: number;
  Name: string;
  DepartmentId: number;
  Department: IDepartment;
}

interface ILevel {
  LevelId: number;
  Name: string;
}

interface ISpecialityLevel {
  SpecialityId: number;
  LevelId: number;
  Speciality: ISpeciality;
  Level: ILevel;
}

interface IClass {
  ClassId: number;
  Name: string;
  LevelId: number;
  SpecialityId: number;
  SpecialityLevel: ISpecialityLevel;
}

interface IGroup {
  GroupId: number;
  Name: string;
  ClassId: number;
  RoomId: number;
}

interface IStudent {
  StudentId: number;
  Name: string;
  Email: string;
  Group: IGroup;
  Class: IClass;
}
interface EditStudentFormProps {
  student: IStudent | null;
}

const students: IStudent[] = [
  {
    StudentId: 1,
    Name: "Student 1",
    Email: "student1@example.com",
    Group: { GroupId: 1, Name: "Group 1", ClassId: 1, RoomId: 1 },
    Class: {
      ClassId: 1,
      Name: "Class A",
      LevelId: 1,
      SpecialityId: 1,
      SpecialityLevel: {
        SpecialityId: 1,
        LevelId: 1,
        Speciality: {
          SpecialityId: 1,
          Name: "Computer Science",
          DepartmentId: 1,
          Department: { DepartmentId: 1, Name: "Digital" },
        },
        Level: { LevelId: 1, Name: "First Year" },
      },
    },
  },
  {
    StudentId: 2,
    Name: "Student 2",
    Email: "student2@example.com",
    Group: { GroupId: 1, Name: "Group 1", ClassId: 1, RoomId: 1 },
    Class: {
      ClassId: 1,
      Name: "Class A",
      LevelId: 1,
      SpecialityId: 1,
      SpecialityLevel: {
        SpecialityId: 1,
        LevelId: 1,
        Speciality: {
          SpecialityId: 1,
          Name: "Computer Science",
          DepartmentId: 1,
          Department: { DepartmentId: 1, Name: "Digital" },
        },
        Level: { LevelId: 1, Name: "First Year" },
      },
    },
  },
  {
    StudentId: 3,
    Name: "Student 3",
    Email: "student3@example.com",
    Group: { GroupId: 1, Name: "Group 1", ClassId: 1, RoomId: 1 },
    Class: {
      ClassId: 1,
      Name: "Class A",
      LevelId: 1,
      SpecialityId: 1,
      SpecialityLevel: {
        SpecialityId: 1,
        LevelId: 1,
        Speciality: {
          SpecialityId: 1,
          Name: "Computer Science",
          DepartmentId: 1,
          Department: { DepartmentId: 1, Name: "Digital" },
        },
        Level: { LevelId: 1, Name: "First Year" },
      },
    },
  },
  {
    StudentId: 4,
    Name: "Student 4",
    Email: "student4@example.com",
    Group: { GroupId: 1, Name: "Group 1", ClassId: 1, RoomId: 1 },
    Class: {
      ClassId: 1,
      Name: "Class A",
      LevelId: 1,
      SpecialityId: 1,
      SpecialityLevel: {
        SpecialityId: 1,
        LevelId: 1,
        Speciality: {
          SpecialityId: 1,
          Name: "Computer Science",
          DepartmentId: 1,
          Department: { DepartmentId: 1, Name: "Digital" },
        },
        Level: { LevelId: 1, Name: "First Year" },
      },
    },
  },
  {
    StudentId: 5,
    Name: "Student 5",
    Email: "student5@example.com",
    Group: { GroupId: 1, Name: "Group 1", ClassId: 1, RoomId: 1 },
    Class: {
      ClassId: 1,
      Name: "Class A",
      LevelId: 1,
      SpecialityId: 1,
      SpecialityLevel: {
        SpecialityId: 1,
        LevelId: 1,
        Speciality: {
          SpecialityId: 1,
          Name: "Computer Science",
          DepartmentId: 1,
          Department: { DepartmentId: 1, Name: "Digital" },
        },
        Level: { LevelId: 1, Name: "First Year" },
      },
    },
  },
  {
    StudentId: 6,
    Name: "Student 6",
    Email: "student6@example.com",
    Group: { GroupId: 1, Name: "Group 1", ClassId: 1, RoomId: 1 },
    Class: {
      ClassId: 1,
      Name: "Class A",
      LevelId: 1,
      SpecialityId: 1,
      SpecialityLevel: {
        SpecialityId: 1,
        LevelId: 1,
        Speciality: {
          SpecialityId: 1,
          Name: "Computer Science",
          DepartmentId: 1,
          Department: { DepartmentId: 1, Name: "Digital" },
        },
        Level: { LevelId: 1, Name: "First Year" },
      },
    },
  },
  {
    StudentId: 7,
    Name: "Student 7",
    Email: "student7@example.com",
    Group: { GroupId: 1, Name: "Group 1", ClassId: 1, RoomId: 1 },
    Class: {
      ClassId: 1,
      Name: "Class A",
      LevelId: 1,
      SpecialityId: 1,
      SpecialityLevel: {
        SpecialityId: 1,
        LevelId: 1,
        Speciality: {
          SpecialityId: 1,
          Name: "Computer Science",
          DepartmentId: 1,
          Department: { DepartmentId: 1, Name: "Digital" },
        },
        Level: { LevelId: 1, Name: "First Year" },
      },
    },
  },
  {
    StudentId: 8,
    Name: "Student 8",
    Email: "student8@example.com",
    Group: { GroupId: 1, Name: "Group 1", ClassId: 1, RoomId: 1 },
    Class: {
      ClassId: 1,
      Name: "Class A",
      LevelId: 1,
      SpecialityId: 1,
      SpecialityLevel: {
        SpecialityId: 1,
        LevelId: 1,
        Speciality: {
          SpecialityId: 1,
          Name: "Computer Science",
          DepartmentId: 1,
          Department: { DepartmentId: 1, Name: "Digital" },
        },
        Level: { LevelId: 1, Name: "First Year" },
      },
    },
  },
  {
    StudentId: 9,
    Name: "Student 9",
    Email: "student9@example.com",
    Group: { GroupId: 1, Name: "Group 1", ClassId: 1, RoomId: 1 },
    Class: {
      ClassId: 1,
      Name: "Class A",
      LevelId: 1,
      SpecialityId: 1,
      SpecialityLevel: {
        SpecialityId: 1,
        LevelId: 1,
        Speciality: {
          SpecialityId: 1,
          Name: "Computer Science",
          DepartmentId: 1,
          Department: { DepartmentId: 1, Name: "Digital" },
        },
        Level: { LevelId: 1, Name: "First Year" },
      },
    },
  },
  {
    StudentId: 10,
    Name: "Student 10",
    Email: "student10@example.com",
    Group: { GroupId: 1, Name: "Group 1", ClassId: 1, RoomId: 1 },
    Class: {
      ClassId: 1,
      Name: "Class A",
      LevelId: 1,
      SpecialityId: 1,
      SpecialityLevel: {
        SpecialityId: 1,
        LevelId: 1,
        Speciality: {
          SpecialityId: 1,
          Name: "Computer Science",
          DepartmentId: 1,
          Department: { DepartmentId: 1, Name: "Digital" },
        },
        Level: { LevelId: 1, Name: "First Year" },
      },
    },
  },
  {
    StudentId: 11,
    Name: "Student 11",
    Email: "student11@example.com",
    Group: { GroupId: 2, Name: "Group 2", ClassId: 2, RoomId: 2 },
    Class: {
      ClassId: 2,
      Name: "Class B",
      LevelId: 2,
      SpecialityId: 2,
      SpecialityLevel: {
        SpecialityId: 2,
        LevelId: 2,
        Speciality: {
          SpecialityId: 2,
          Name: "Business Administration",
          DepartmentId: 2,
          Department: { DepartmentId: 2, Name: "Business" },
        },
        Level: { LevelId: 2, Name: "Second Year" },
      },
    },
  },
  {
    StudentId: 12,
    Name: "Student 12",
    Email: "student12@example.com",
    Group: { GroupId: 1, Name: "Group 1", ClassId: 3, RoomId: 3 },
    Class: {
      ClassId: 3,
      Name: "Class C",
      LevelId: 3,
      SpecialityId: 3,
      SpecialityLevel: {
        SpecialityId: 3,
        LevelId: 3,
        Speciality: {
          SpecialityId: 3,
          Name: "Polytechnic Engineering",
          DepartmentId: 3,
          Department: { DepartmentId: 3, Name: "Polytechnic" },
        },
        Level: { LevelId: 3, Name: "Third Year" },
      },
    },
  },
  {
    StudentId: 13,
    Name: "Student 13",
    Email: "student13@example.com",
    Group: { GroupId: 2, Name: "Group 2", ClassId: 1, RoomId: 1 },
    Class: {
      ClassId: 1,
      Name: "Class A",
      LevelId: 1,
      SpecialityId: 1,
      SpecialityLevel: {
        SpecialityId: 1,
        LevelId: 1,
        Speciality: {
          SpecialityId: 1,
          Name: "Computer Science",
          DepartmentId: 1,
          Department: { DepartmentId: 1, Name: "Digital" },
        },
        Level: { LevelId: 1, Name: "First Year" },
      },
    },
  },
  {
    StudentId: 14,
    Name: "Student 14",
    Email: "student14@example.com",
    Group: { GroupId: 1, Name: "Group 1", ClassId: 2, RoomId: 2 },
    Class: {
      ClassId: 2,
      Name: "Class B",
      LevelId: 2,
      SpecialityId: 2,
      SpecialityLevel: {
        SpecialityId: 2,
        LevelId: 2,
        Speciality: {
          SpecialityId: 2,
          Name: "Business Administration",
          DepartmentId: 2,
          Department: { DepartmentId: 2, Name: "Business" },
        },
        Level: { LevelId: 2, Name: "Second Year" },
      },
    },
  },
  {
    StudentId: 15,
    Name: "Student 15",
    Email: "student15@example.com",
    Group: { GroupId: 2, Name: "Group 2", ClassId: 3, RoomId: 3 },
    Class: {
      ClassId: 3,
      Name: "Class C",
      LevelId: 3,
      SpecialityId: 3,
      SpecialityLevel: {
        SpecialityId: 3,
        LevelId: 3,
        Speciality: {
          SpecialityId: 3,
          Name: "Polytechnic Engineering",
          DepartmentId: 3,
          Department: { DepartmentId: 3, Name: "Polytechnic" },
        },
        Level: { LevelId: 3, Name: "Third Year" },
      },
    },
  },
  {
    StudentId: 16,
    Name: "Student 16",
    Email: "student16@example.com",
    Group: { GroupId: 1, Name: "Group 1", ClassId: 1, RoomId: 1 },
    Class: {
      ClassId: 1,
      Name: "Class A",
      LevelId: 1,
      SpecialityId: 1,
      SpecialityLevel: {
        SpecialityId: 1,
        LevelId: 1,
        Speciality: {
          SpecialityId: 1,
          Name: "Computer Science",
          DepartmentId: 1,
          Department: { DepartmentId: 1, Name: "Digital" },
        },
        Level: { LevelId: 1, Name: "First Year" },
      },
    },
  },
  {
    StudentId: 17,
    Name: "Student 17",
    Email: "student17@example.com",
    Group: { GroupId: 2, Name: "Group 2", ClassId: 2, RoomId: 2 },
    Class: {
      ClassId: 2,
      Name: "Class B",
      LevelId: 2,
      SpecialityId: 2,
      SpecialityLevel: {
        SpecialityId: 2,
        LevelId: 2,
        Speciality: {
          SpecialityId: 2,
          Name: "Business Administration",
          DepartmentId: 2,
          Department: { DepartmentId: 2, Name: "Business" },
        },
        Level: { LevelId: 2, Name: "Second Year" },
      },
    },
  },
  {
    StudentId: 18,
    Name: "Student 18",
    Email: "student18@example.com",
    Group: { GroupId: 1, Name: "Group 1", ClassId: 3, RoomId: 3 },
    Class: {
      ClassId: 3,
      Name: "Class C",
      LevelId: 3,
      SpecialityId: 3,
      SpecialityLevel: {
        SpecialityId: 3,
        LevelId: 3,
        Speciality: {
          SpecialityId: 3,
          Name: "Polytechnic Engineering",
          DepartmentId: 3,
          Department: { DepartmentId: 3, Name: "Polytechnic" },
        },
        Level: { LevelId: 3, Name: "Third Year" },
      },
    },
  },
  {
    StudentId: 19,
    Name: "Student 19",
    Email: "student19@example.com",
    Group: { GroupId: 2, Name: "Group 2", ClassId: 1, RoomId: 1 },
    Class: {
      ClassId: 1,
      Name: "Class A",
      LevelId: 1,
      SpecialityId: 1,
      SpecialityLevel: {
        SpecialityId: 1,
        LevelId: 1,
        Speciality: {
          SpecialityId: 1,
          Name: "Computer Science",
          DepartmentId: 1,
          Department: { DepartmentId: 1, Name: "Digital" },
        },
        Level: { LevelId: 1, Name: "First Year" },
      },
    },
  },
  {
    StudentId: 20,
    Name: "Student 20",
    Email: "student20@example.com",
    Group: { GroupId: 1, Name: "Group 1", ClassId: 2, RoomId: 2 },
    Class: {
      ClassId: 2,
      Name: "Class B",
      LevelId: 2,
      SpecialityId: 2,
      SpecialityLevel: {
        SpecialityId: 2,
        LevelId: 2,
        Speciality: {
          SpecialityId: 2,
          Name: "Business Administration",
          DepartmentId: 2,
          Department: { DepartmentId: 2, Name: "Business" },
        },
        Level: { LevelId: 2, Name: "Second Year" },
      },
    },
  },
  {
    StudentId: 21,
    Name: "Student 21",
    Email: "student21@example.com",
    Group: { GroupId: 2, Name: "Group 2", ClassId: 3, RoomId: 3 },
    Class: {
      ClassId: 3,
      Name: "Class C",
      LevelId: 3,
      SpecialityId: 3,
      SpecialityLevel: {
        SpecialityId: 3,
        LevelId: 3,
        Speciality: {
          SpecialityId: 3,
          Name: "Polytechnic Engineering",
          DepartmentId: 3,
          Department: { DepartmentId: 3, Name: "Polytechnic" },
        },
        Level: { LevelId: 3, Name: "Third Year" },
      },
    },
  },
];
const groups = Array.from(
  new Set(students.map((student) => student.Group.Name))
);
const classes = Array.from(
  new Set(students.map((student) => student.Class.Name))
);
const specialities = Array.from(
  new Set(
    students.map((student) => student.Class.SpecialityLevel.Speciality.Name)
  )
);
const levels = Array.from(
  new Set(students.map((student) => student.Class.SpecialityLevel.Level.Name))
);
const departments = Array.from(
  new Set(
    students.map(
      (student) => student.Class.SpecialityLevel.Speciality.Department.Name
    )
  )
);
function AddStudentForm() {
  return (
    <>
      <Label>
        <span>Student ID</span>
        <Input className="mt-1" placeholder="Enter Student ID" />
      </Label>
      <Label className="mt-4">
        <span>Name</span>
        <Input className="mt-1" placeholder="Enter Name" />
      </Label>
      <Label className="mt-4">
        <span>Email</span>
        <Input className="mt-1" placeholder="Enter Email" />
      </Label>
      <Label className="mt-4">
        <span>Group ID</span>
        <Input className="mt-1" placeholder="Enter Group ID" />
      </Label>
    </>
  );
}
function EditStudentForm({ student }: EditStudentFormProps) {
  const [studentId, setStudentId] = useState(student ? student.StudentId : "");
  const [name, setName] = useState(student ? student.Name : "");
  const [email, setEmail] = useState(student ? student.Email : "");
  const [groupId, setGroupId] = useState(student ? student.Group.GroupId : "");
  const [classId, setClassId] = useState(student ? student.Class.ClassId : "");
  const [speciality, setSpeciality] = useState(
    student ? student.Class.SpecialityLevel.Speciality.Name : ""
  );
  const [year, setYear] = useState(
    student ? student.Class.SpecialityLevel.Level.Name : ""
  );
  const [department, setDepartment] = useState(
    student ? student.Class.SpecialityLevel.Speciality.Department.Name : ""
  );

  return (
    <>
      <Label className="mt-4">
        <span>Name</span>
        <Input
          className="mt-1"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Label>
      <Label className="mt-4">
        <span>Email</span>
        <Input
          className="mt-1"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Label>
      <Label className="mt-4">
        <span>Class</span>
        <Select
          className="mt-1"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </Select>
      </Label>
      <Label className="mt-4">
        <span>Speciality</span>
        <Input
          className="mt-1"
          placeholder="Enter Speciality"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
        />
      </Label>
      <Label className="mt-4">
        <span>Year</span>
        <Input
          className="mt-1"
          placeholder="Enter Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </Label>
      <Label className="mt-4">
        <span>Department</span>
        <Input
          className="mt-1"
          placeholder="Enter Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </Label>
    </>
  );
}

function Students() {
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

  function openAddStudentModal() {
    setIsAddStudentModalOpen(true);
  }

  function closeAddStudentModal() {
    setIsAddStudentModalOpen(false);
  }
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<IStudent | null>(null);

  function openEditStudentModal(student: IStudent) {
    setEditingStudent(student);
    setIsEditStudentModalOpen(true);
  }

  function closeEditStudentModal() {
    setIsEditStudentModalOpen(false);
  }
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<IStudent | null>(null);

  const openDeleteModal = (student: IStudent) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setStudentToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const deleteStudent = () => {
    closeDeleteModal();
  };
  const [page, setPage] = useState(1);
  const [data, setData] = useState<IStudent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [specialityFilter, setSpecialityFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [totalResults, setTotalResults] = useState(students.length);

  const resultsPerPage = 10;

  function onPageChange(p: number) {
    setPage(p);
  }

  const resetFilters = () => {
    setSearchTerm("");
    setGroupFilter("");
    setClassFilter("");
    setSpecialityFilter("");
    setLevelFilter("");
    setDepartmentFilter("");
    setPage(1);
  };

  useEffect(() => {
    let filteredStudents = students.filter(
      (student) =>
        student.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.Email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (groupFilter)
      filteredStudents = filteredStudents.filter(
        (student) => student.Group.Name === groupFilter
      );
    if (classFilter)
      filteredStudents = filteredStudents.filter(
        (student) => student.Class.Name === classFilter
      );
    if (specialityFilter)
      filteredStudents = filteredStudents.filter(
        (student) =>
          student.Class.SpecialityLevel.Speciality.Name === specialityFilter
      );
    if (levelFilter)
      filteredStudents = filteredStudents.filter(
        (student) => student.Class.SpecialityLevel.Level.Name === levelFilter
      );
    if (departmentFilter)
      filteredStudents = filteredStudents.filter(
        (student) =>
          student.Class.SpecialityLevel.Speciality.Department.Name ===
          departmentFilter
      );
    setTotalResults(filteredStudents.length);
    setData(
      filteredStudents.slice((page - 1) * resultsPerPage, page * resultsPerPage)
    );
    console.log((page - 1) * resultsPerPage, page * resultsPerPage);
  }, [
    page,
    searchTerm,
    groupFilter,
    classFilter,
    specialityFilter,
    levelFilter,
    departmentFilter,
  ]);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <PageTitle>Students</PageTitle>
        <div className="flex items-center justify-end space-x-4">
          <Button onClick={openAddStudentModal}>Add Student</Button>
          <Modal isOpen={isAddStudentModalOpen} onClose={closeAddStudentModal}>
            <ModalHeader>Add Student</ModalHeader>
            <ModalBody>
              <AddStudentForm />
            </ModalBody>
            <ModalFooter>
              <Button layout="outline" onClick={closeAddStudentModal}>
                Cancel
              </Button>
              <Button>Add</Button>
            </ModalFooter>
          </Modal>
          <Input
            type="text"
            placeholder="Search students"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-3 py-2 border rounded-md"
          />
          <Button onClick={resetFilters}>Reset Filters</Button>
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        <Select
          value={groupFilter}
          onChange={(e) => {
            setGroupFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Groups</option>
          {groups.map((group, i) => (
            <option key={i} value={group}>
              {group}
            </option>
          ))}
        </Select>
        <Select
          value={classFilter}
          onChange={(e) => {
            setClassFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Classes</option>
          {classes.map((classItem, i) => (
            <option key={i} value={classItem}>
              {classItem}
            </option>
          ))}
        </Select>
        <Select
          value={specialityFilter}
          onChange={(e) => {
            setSpecialityFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Specialities</option>
          {specialities.map((speciality, i) => (
            <option key={i} value={speciality}>
              {speciality}
            </option>
          ))}
        </Select>
        <Select
          value={levelFilter}
          onChange={(e) => {
            setLevelFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Levels</option>
          {levels.map((level, i) => (
            <option key={i} value={level}>
              {level}
            </option>
          ))}
        </Select>
        <Select
          value={departmentFilter}
          onChange={(e) => {
            setDepartmentFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Departments</option>
          {departments.map((department, i) => (
            <option key={i} value={department}>
              {department}
            </option>
          ))}
        </Select>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Speciality</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((student, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{student.Name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{student.Email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{student.Group.Name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{student.Class.Name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {student.Class.SpecialityLevel.Speciality.Name}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {student.Class.SpecialityLevel.Level.Name}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {student.Class.SpecialityLevel.Speciality.Department.Name}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Edit"
                      onClick={() => openEditStudentModal(student)}
                    >
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Delete"
                      onClick={() => openDeleteModal(student)}
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
      <Modal isOpen={isEditStudentModalOpen} onClose={closeEditStudentModal}>
        <ModalHeader>Edit Student</ModalHeader>
        <ModalBody>
          <EditStudentForm student={editingStudent} />
        </ModalBody>
        <ModalFooter>
          <Button layout="outline" onClick={closeEditStudentModal}>
            Cancel
          </Button>
          <Button>Save</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>Delete Student</ModalHeader>
        <ModalBody>
          Are you sure you want to delete {studentToDelete?.Name}?
        </ModalBody>
        <ModalFooter>
          <Button layout="outline" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button onClick={deleteStudent}>Delete</Button>
        </ModalFooter>
      </Modal>
    </Layout>
  );
}

export default Students;
