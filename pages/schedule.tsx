import React, { useState, useEffect } from "react";
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
} from "@roketid/windmill-react-ui";
import { EditIcon, TrashIcon, ViewIcon } from "icons";
import Layout from "example/containers/Layout";
import PageTitle from "example/components/Typography/PageTitle";

interface Exam {
  name: string;
  date: Date;
  speciality: string;
  level: string;
}

interface Schedule {
  name: string;
  scholarYear: string;
  semester: number; // 1 or 2
  duration: { start: Date; end: Date };
  exams: Exam[];
}

function generateFakeData(count: number): Exam[] {
  // Generate fake Exam data
  const exams: Exam[] = [];
  for (let i = 0; i < count; i++) {
    exams.push({
      name: `Exam ${i}`,
      date: new Date(),
      speciality: `Speciality ${i}`,
      level: `Level ${i}`,
    });
  }
  return exams;
}

function generateFakeScheduleData(count: number): Schedule[] {
  const schedules: Schedule[] = [];
  for (let i = 0; i < count; i++) {
    const startDate = new Date(2022 + i, 0, Math.floor(Math.random() * 28) + 1); // Start date: Random day in January
    const endDate = new Date(
      startDate.getTime() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000
    ); // End date: Start date + up to 7 days
    const schedule: Schedule = {
      name: `Schedule ${i}`,
      scholarYear: `${2022 + i}-${2023 + i}`,
      semester: i % 2 === 0 ? 1 : 2,
      duration: { start: startDate, end: endDate },
      exams: generateFakeData(Math.floor(Math.random() * 10) + 1),
    };
    schedules.push(schedule);
  }
  return schedules;
}
function formatDate(date: Date): string {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

function Schedule() {
  const [fakeScheduleData, setFakeScheduleData] = useState<Schedule[]>([]);
  const [pageTable, setPageTable] = useState(1);
  const [dataTable, setDataTable] = useState(fakeScheduleData);
  const [scholarYearFilter, setScholarYearFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [scheduleName, setScheduleName] = useState("");
  const [scholarYear, setScholarYear] = useState("");
  const [semester, setSemester] = useState("");
  const [durationStart, setDurationStart] = useState("");
  const [durationEnd, setDurationEnd] = useState("");

  useEffect(() => {
    // Generate the fake data only on the client side
    setFakeScheduleData(generateFakeScheduleData(5));
  }, []);

  const resultsPerPage = 10;
  const totalResults = fakeScheduleData.length;

  function onPageChangeTable(p: number) {
    setPageTable(p);
  }
  const resetFilters = () => {
    setScholarYearFilter("");
    setSemesterFilter("");
    setDurationFilter("");
    setPageTable(1);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  const [isEditScheduleModalOpen, setIsEditScheduleModalOpen] = useState(false);
  const [editSchedule, setEditSchedule] = useState<Schedule | null>(null);
  const openEditScheduleModal = (schedule: Schedule) => {
    setEditSchedule(schedule);
    setIsEditScheduleModalOpen(true);
  };

  const closeEditScheduleModal = () => {
    setEditSchedule(null);
    setIsEditScheduleModalOpen(false);
  };
  const [isDeleteScheduleModalOpen, setIsDeleteScheduleModalOpen] =
    useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<Schedule | null>(
    null
  );
  const openDeleteScheduleModal = (schedule: Schedule) => {
    setScheduleToDelete(schedule);
    setIsDeleteScheduleModalOpen(true);
  };
  const closeDeleteScheduleModal = () => {
    setScheduleToDelete(null);
    setIsDeleteScheduleModalOpen(false);
  };
  const deleteSchedule = () => {
    closeDeleteScheduleModal();
  };

  useEffect(() => {
    const filteredData = fakeScheduleData
      .filter(
        (schedule) =>
          scholarYearFilter === "" ||
          schedule.scholarYear.includes(scholarYearFilter)
      )
      .filter(
        (schedule) =>
          semesterFilter === "" || schedule.semester === Number(semesterFilter)
      )
      .filter((schedule) => {
        if (durationFilter === "") {
          return true;
        } else {
          const [startStr, endStr] = durationFilter.split(" - ");
          const start = new Date(startStr);
          const end = new Date(endStr);
          return (
            schedule.duration.start >= start && schedule.duration.end <= end
          );
        }
      })
      .slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage);

    setDataTable(filteredData);
  }, [
    pageTable,
    scholarYearFilter,
    semesterFilter,
    durationFilter,
    fakeScheduleData,
  ]);

  const uniqueScholarYears = Array.from(
    new Set(fakeScheduleData.map((schedule) => schedule.scholarYear))
  ).sort();
  const uniqueSemesters = Array.from(
    new Set(fakeScheduleData.map((schedule) => schedule.semester))
  ).sort();
  const uniqueDurations = Array.from(
    new Set(
      fakeScheduleData.map(
        (schedule) =>
          `${schedule.duration.start.toLocaleDateString()} - ${schedule.duration.end.toLocaleDateString()}`
      )
    )
  ).sort((a, b) => {
    const [startA, endA] = a.split(" - ").map((dateStr) => new Date(dateStr));
    const [startB, endB] = b.split(" - ").map((dateStr) => new Date(dateStr));

    // Compare the start dates first
    if (startA < startB) return -1;
    if (startA > startB) return 1;

    // If the start dates are equal, compare the end dates
    if (endA < endB) return -1;
    if (endA > endB) return 1;

    return 0; // Equal durations
  });

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <PageTitle>Exam Schedules</PageTitle>
        <div className="flex items-center justify-end space-x-4">
          <Button onClick={openModal}>Generate An Exam Schedule</Button>
          <Button onClick={resetFilters}>Reset Filters</Button>
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        <Select
          value={scholarYearFilter}
          onChange={(e) => setScholarYearFilter(e.target.value)}
        >
          <option value="">All Scholar Years</option>
          {uniqueScholarYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>

        <Select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
        >
          <option value="">All Semesters</option>
          {uniqueSemesters.map((semester) => (
            <option key={semester} value={semester}>
              {semester}
            </option>
          ))}
        </Select>

        <Select
          value={durationFilter}
          onChange={(e) => setDurationFilter(e.target.value)}
        >
          <option value="">All Durations</option>
          {uniqueDurations.map((duration) => (
            <option key={duration} value={duration}>
              {duration}
            </option>
          ))}
        </Select>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Generate a New Schedule</ModalHeader>
        <ModalBody>
          <div className="mb-4">
            <Label>
              <span>Schedule Name</span>
              <Input
                className="mt-1"
                type="text"
                value={scheduleName}
                onChange={(e) => setScheduleName(e.target.value)}
              />
            </Label>
          </div>
          <div className="mb-4">
            <Label>
              <span>Scholar Year</span>
              <Input
                className="mt-1"
                type="text"
                value={scholarYear}
                onChange={(e) => setScholarYear(e.target.value)}
              />
            </Label>
          </div>
          <div className="mb-4">
            <Label>
              <span>Semester</span>
              <Select
                className="mt-1"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </Select>
            </Label>
          </div>
          <div className="mb-4">
            <Label>
              <span>Duration Start</span>
              <Input
                className="mt-1"
                type="date"
                value={durationStart}
                onChange={(e) => setDurationStart(e.target.value)}
              />
            </Label>
          </div>
          <div className="mb-4">
            <Label>
              <span>Duration End</span>
              <Input
                className="mt-1"
                type="date"
                value={durationEnd}
                onChange={(e) => setDurationEnd(e.target.value)}
              />
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button>Generate</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Generate
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      <Modal isOpen={isEditScheduleModalOpen} onClose={closeEditScheduleModal}>
        <ModalHeader>Edit Schedule</ModalHeader>
        <ModalBody>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Schedule Name</label>
            <Input
              type="text"
              value={editSchedule?.name || ""}
              onChange={(e) => {
                if (editSchedule) {
                  setEditSchedule({ ...editSchedule, name: e.target.value });
                }
              }}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Scholar Year</label>
            <Input
              type="text"
              value={editSchedule?.scholarYear || ""}
              onChange={(e) => {
                if (editSchedule) {
                  setEditSchedule({
                    ...editSchedule,
                    scholarYear: e.target.value,
                  });
                }
              }}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Semester</label>
            <Select
              className="mt-1"
              value={editSchedule?.semester || ""}
              onChange={(e) => {
                if (editSchedule) {
                  setEditSchedule({
                    ...editSchedule,
                    semester: Number(e.target.value),
                  });
                }
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </Select>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">
              Duration Start
            </label>
            <Input
              className="mt-1"
              type="date"
              value={
                editSchedule ? formatDate(editSchedule.duration.start) : ""
              }
              onChange={(e) => {
                if (editSchedule) {
                  const newDate = new Date(e.target.value);
                  setEditSchedule({
                    ...editSchedule,
                    duration: { ...editSchedule.duration, start: newDate },
                  });
                }
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Duration End</label>
            <Input
              className="mt-1"
              type="date"
              value={editSchedule ? formatDate(editSchedule.duration.end) : ""}
              onChange={(e) => {
                if (editSchedule) {
                  const newDate = new Date(e.target.value);
                  setEditSchedule({
                    ...editSchedule,
                    duration: {
                      ...editSchedule.duration,
                      end: newDate,
                    },
                  });
                }
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeEditScheduleModal}>Cancel</Button>
          <Button>Update</Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={isDeleteScheduleModalOpen}
        onClose={closeDeleteScheduleModal}
      >
        <ModalHeader>Delete Schedule</ModalHeader>
        <ModalBody>
          Are you sure you want to delete schedule {scheduleToDelete?.name}?
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeDeleteScheduleModal}>Cancel</Button>
          <Button onClick={deleteSchedule} color="red">
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Schedule</TableCell>
              <TableCell>Scholar Year</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((schedule, i) => (
              <TableRow key={i}>
                <TableCell>
                  <p className="font-semibold">{schedule.name}</p>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{schedule.scholarYear}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{`Semester ${schedule.semester}`}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{`${schedule.duration.start.toLocaleDateString()} - ${schedule.duration.end.toLocaleDateString()}`}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="small" aria-label="View">
                      <ViewIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Edit"
                      onClick={() => openEditScheduleModal(schedule)}
                    >
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Delete"
                      onClick={() => openDeleteScheduleModal(schedule)}
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
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </Layout>
  );
}

export default Schedule;
