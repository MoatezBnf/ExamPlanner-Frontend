import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Pagination,
} from "@roketid/windmill-react-ui";
import PageTitle from "example/components/Typography/PageTitle";
import Layout from "example/containers/Layout";
import { EditIcon, TrashIcon } from "icons";

interface Exam {
  ExamId: number;
  Name: string;
  Date: Date;
  Duration: number;
  SpecialityId: number;
  LevelId: number;
  SpecialityLevel: SpecialityLevel;
}

interface SpecialityLevel {
  SpecialityId: number;
  Speciality: Speciality;
  LevelId: number;
  Level: Level;
}

interface Level {
  LevelId: number;
  Name: string;
}

interface Speciality {
  SpecialityId: number;
  Name: string;
  DepartmentId: number;
}

function generateFakeData(count: number): Exam[] {
  const exams: Exam[] = [];

  for (let i = 0; i < count; i++) {
    const exam: Exam = {
      ExamId: i,
      Name: `Exam ${i}`,
      Date: new Date(
        2022,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28)
      ),
      Duration: Math.floor(Math.random() * 180),
      SpecialityId: Math.floor(Math.random() * 10),
      LevelId: Math.floor(Math.random() * 10),
      SpecialityLevel: {
        SpecialityId: Math.floor(Math.random() * 10),
        Speciality: {
          SpecialityId: Math.floor(Math.random() * 10),
          Name: `Speciality ${Math.floor(Math.random() * 10)}`,
          DepartmentId: Math.floor(Math.random() * 10),
        },
        LevelId: Math.floor(Math.random() * 10),
        Level: {
          LevelId: Math.floor(Math.random() * 10),
          Name: `Level ${Math.floor(Math.random() * 10)}`,
        },
      },
    };

    exams.push(exam);
  }

  return exams;
}
// const fakeData = generateFakeData(50);
// console.log(fakeData);
// const uniqueLevels = Array.from(
//   new Set(fakeData.map((exam) => exam.SpecialityLevel.Level.Name))
// );
// const uniqueSpecialities = Array.from(
//   new Set(fakeData.map((exam) => exam.SpecialityLevel.Speciality.Name))
// );
// const uniqueDates = Array.from(
//   new Set(fakeData.map((exam) => exam.Date.toLocaleDateString()))
// );

function Exams() {
  const [fakeData, setFakeData] = useState<Exam[]>([]);
  const [uniqueLevels, setUniqueLevels] = useState<string[]>([]);
  const [uniqueSpecialities, setUniqueSpecialities] = useState<string[]>([]);
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);

  useEffect(() => {
    const data = generateFakeData(50);
    setFakeData(data);
  }, []);

  useEffect(() => {
    setUniqueLevels(
      Array.from(
        new Set(fakeData.map((exam) => exam.SpecialityLevel.Level.Name))
      ).sort()
    );
    setUniqueSpecialities(
      Array.from(
        new Set(fakeData.map((exam) => exam.SpecialityLevel.Speciality.Name))
      ).sort()
    );
    setUniqueDates(
      Array.from(
        new Set(fakeData.map((exam) => exam.Date.toLocaleDateString()))
      ).sort()
    );
  }, [fakeData]);
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);
  const openAddExamModal = () => setIsAddExamModalOpen(true);
  const closeAddExamModal = () => setIsAddExamModalOpen(false);

  const [editExam, setEditExam] = useState<Exam | null>(null);
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);
  const openEditExamModal = (exam: Exam) => {
    setEditExam(exam);
    setIsEditExamModalOpen(true);
  };
  const closeEditExamModal = () => {
    setEditExam(null);
    setIsEditExamModalOpen(false);
  };

  const [isDeleteExamModalOpen, setIsDeleteExamModalOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState<Exam | null>(null);
  const openDeleteExamModal = (exam: Exam) => {
    setExamToDelete(exam);
    setIsDeleteExamModalOpen(true);
  };
  const closeDeleteExamModal = () => {
    setExamToDelete(null);
    setIsDeleteExamModalOpen(false);
  };
  const deleteExam = () => {
    // TODO: Implement delete logic here
    closeDeleteExamModal();
  };

  const [page, setPage] = useState(1);
  const [data, setData] = useState<Exam[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [specialityFilter, setSpecialityFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examDuration, setExamDuration] = useState("");

  const resultsPerPage = 10;

  const onPageChange = (p: number) => setPage(p);

  const resetFilters = () => {
    setSearchTerm("");
    setDateFilter("");
    setSpecialityFilter("");
    setLevelFilter("");
    setPage(1);
  };
  useEffect(() => {
    let filteredExams = fakeData.filter(
      (exam) =>
        exam.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (dateFilter === "" || exam.Date.toLocaleDateString() === dateFilter) &&
        (specialityFilter === "" ||
          exam.SpecialityLevel.Speciality.Name.toLowerCase() ===
            specialityFilter.toLowerCase()) &&
        (levelFilter === "" ||
          exam.SpecialityLevel.Level.Name.toLowerCase() ===
            levelFilter.toLowerCase())
    );
    setData(
      filteredExams.slice((page - 1) * resultsPerPage, page * resultsPerPage)
    );
  }, [fakeData, page, searchTerm, dateFilter, specialityFilter, levelFilter]);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <PageTitle>Exams</PageTitle>
        <div className="flex items-center justify-end space-x-4">
          <Button onClick={openAddExamModal}>Add Exam</Button>
          <Input
            type="text"
            placeholder="Search Exams"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-3 py-2 border rounded-md"
          />
          <Button onClick={resetFilters}>Reset Filters</Button>
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        <Select
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Dates</option>
          {uniqueDates.map((date, index) => (
            <option key={index} value={date}>
              {date}
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
          {uniqueSpecialities.map((speciality) => (
            <option key={speciality} value={speciality}>
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
          {uniqueLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </Select>
      </div>
      {/* Add Exam Modal */}
      <Modal isOpen={isAddExamModalOpen} onClose={closeAddExamModal}>
        <ModalHeader>Add Exam</ModalHeader>
        <ModalBody>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Exam Name</label>
            <Input
              type="text"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Exam Date</label>
            <Input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Exam Duration</label>
            <Input
              type="number"
              min="1"
              value={examDuration}
              onChange={(e) => {
                if (e.target.valueAsNumber < 1) {
                  alert("Exam duration must be positive");
                  return;
                }
                setExamDuration(e.target.value);
              }}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          {/* Add more fields as needed */}
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeAddExamModal}>Cancel</Button>
          <Button>Add</Button>
        </ModalFooter>
      </Modal>

      {/* Edit Exam Modal */}
      <Modal isOpen={isEditExamModalOpen} onClose={closeEditExamModal}>
        <ModalHeader>Edit Exam</ModalHeader>
        <ModalBody>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Exam Name</label>
            <Input
              type="text"
              value={editExam ? editExam.Name : ""}
              onChange={(e) => {
                if (editExam) {
                  setEditExam({ ...editExam, Name: e.target.value });
                }
              }}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Exam Date</label>
            <Input
              type="date"
              value={editExam ? editExam.Date.toISOString().split("T")[0] : ""}
              onChange={(e) => {
                if (editExam) {
                  setEditExam({ ...editExam, Date: new Date(e.target.value) });
                }
              }}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Exam Duration</label>
            <Input
              type="number"
              min="1"
              value={editExam ? editExam.Duration : ""}
              onChange={(e) => {
                if (e.target.valueAsNumber < 1) {
                  alert("Exam duration must be positive");
                  return;
                }
                if (editExam) {
                  setEditExam({
                    ...editExam,
                    Duration: e.target.valueAsNumber,
                  });
                }
              }}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          {/* Add more fields as needed */}
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeEditExamModal}>Cancel</Button>
          <Button
            onClick={() => {
              // Add your update logic here
            }}
          >
            Update
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Exam Modal */}
      <Modal isOpen={isDeleteExamModalOpen} onClose={closeDeleteExamModal}>
        <ModalHeader>Delete User</ModalHeader>
        <ModalBody>
          Are you sure you want to delete user {examToDelete?.Name}?
        </ModalBody>
        <ModalFooter>
          <Button layout="outline" onClick={closeDeleteExamModal}>
            Cancel
          </Button>
          <Button onClick={deleteExam}>Delete</Button>
        </ModalFooter>
      </Modal>

      {/* Exams Table */}
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Speciality</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((exam, i) => (
              <TableRow key={i}>
                <TableCell>{exam.Name}</TableCell>
                <TableCell>{exam.Date.toLocaleDateString()}</TableCell>
                <TableCell>
                  {Math.floor(exam.Duration / 60)} hours {exam.Duration % 60}
                  minutes
                </TableCell>
                <TableCell>{exam.SpecialityLevel.Speciality.Name}</TableCell>
                <TableCell>{exam.SpecialityLevel.Level.Name}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Edit"
                      onClick={() => openEditExamModal(exam)}
                    >
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Delete"
                      onClick={() => openDeleteExamModal(exam)}
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
            totalResults={fakeData.length}
            resultsPerPage={10}
            onChange={onPageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </Layout>
  );
}

export default Exams;
