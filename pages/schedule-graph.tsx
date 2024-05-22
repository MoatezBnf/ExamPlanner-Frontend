import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@roketid/windmill-react-ui";
import Layout from "example/containers/Layout";
import PageTitle from "example/components/Typography/PageTitle";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ThemeContext } from "context/ThemeContext";

interface Period {
  start: string;
  end: string;
}
interface Class {
  className: string;
  speciality: string;
  level: string;
  groupName: string;
}

interface Exam {
  id: number;
  name: string;
  room: string;
  color: string;
  date: string;
  period: Period;
}
interface Schedule {
  name: string;
  scholarYear: string;
  semester: number; // 1 or 2
  duration: { start: Date; end: Date };
  exams: Exam[];
  class: Class;
}

interface PeriodData extends Period {
  exams: Exam[];
}

interface Day {
  date: string;
  periods: PeriodData[];
}

const periods = [
  { start: "8:30", end: "10:00" },
  { start: "11:00", end: "12:30" },
  { start: "13:00", end: "14:30" },
  { start: "15:30", end: "17:00" },
];

function getColorFromId(id: number) {
  const colors = [
    "#F97357",
    "#4293D3",
    "#4EBA58",
    "#ff6666",
    "#FFD700",
    "#FFA500",
    "#3366ff",
    "#9370DB",
    "#00CED1",
    "#FF1493",
    "#FF6347",
    "#00FF00",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
    "#8A2BE2",
    "#FF7F50",
    "#40E0D0",
    "#FF4500",
    "#ADFF2F",
  ];
  return colors[id % colors.length];
}

const mockExams = [
  {
    id: 1,
    name: "Data Structures",
    room: "101",
    color: getColorFromId(1),
    date: "2022-12-01",
    period: { start: "8:30", end: "10:00" },
    className: "Class 1",
    speciality: "Computer Science",
    level: "Level 1",
    groupName: "Group 1",
  },
  {
    id: 2,
    name: "Algorithms",
    room: "102",
    color: getColorFromId(2),
    date: "2022-12-01",
    period: { start: "11:00", end: "12:30" },
    className: "Class 2",
    speciality: "Computer Science",
    level: "Level 2",
    groupName: "Group 2",
  },
  {
    id: 3,
    name: "Operating Systems",
    room: "103",
    color: getColorFromId(3),
    date: "2022-12-02",
    period: { start: "13:00", end: "14:30" },
    className: "Class 3",
    speciality: "Computer Science",
    level: "Level 3",
    groupName: "Group 3",
  },
  {
    id: 4,
    name: "Database Systems",
    room: "104",
    color: getColorFromId(4),
    date: "2022-12-02",
    period: { start: "15:30", end: "17:00" },
    className: "Class 4",
    speciality: "Computer Science",
    level: "Level 4",
    groupName: "Group 4",
  },
  {
    id: 5,
    name: "Programming Languages",
    room: "105",
    color: getColorFromId(5),
    date: "2022-12-03",
    period: { start: "8:30", end: "10:00" },
    className: "Class 5",
    speciality: "Computer Science",
    level: "Level 5",
    groupName: "Group 5",
  },
  {
    id: 6,
    name: "Software Engineering",
    room: "106",
    color: getColorFromId(6),
    date: "2022-12-03",
    period: { start: "11:00", end: "12:30" },
    className: "Class 6",
    speciality: "Computer Science",
    level: "Level 6",
    groupName: "Group 6",
  },
  {
    id: 7,
    name: "Computer Networks",
    room: "107",
    color: getColorFromId(7),
    date: "2022-12-05",
    period: { start: "13:00", end: "14:30" },
    className: "Class 7",
    speciality: "Computer Science",
    level: "Level 7",
    groupName: "Group 7",
  },
  {
    id: 8,
    name: "Artificial Intelligence",
    room: "108",
    color: getColorFromId(8),
    date: "2022-12-05",
    period: { start: "15:30", end: "17:00" },
    className: "Class 8",
    speciality: "Computer Science",
    level: "Level 8",
    groupName: "Group 8",
  },
  {
    id: 9,
    name: "Computer Graphics",
    room: "109",
    color: getColorFromId(9),
    date: "2022-12-05",
    period: { start: "8:30", end: "10:00" },
    className: "Class 9",
    speciality: "Computer Science",
    level: "Level 9",
    groupName: "Group 9",
  },
  {
    id: 10,
    name: "Software Testing",
    room: "110",
    color: getColorFromId(10),
    date: "2022-12-05",
    period: { start: "11:00", end: "12:30" },
    className: "Class 10",
    speciality: "Computer Science",
    level: "Level 10",
    groupName: "Group 10",
  },
  {
    id: 11,
    name: "Web Development",
    room: "111",
    color: getColorFromId(11),
    date: "2022-12-06",
    period: { start: "13:00", end: "14:30" },
    className: "Class 11",
    speciality: "Computer Science",
    level: "Level 11",
    groupName: "Group 11",
  },
  {
    id: 12,
    name: "Mobile App Development",
    room: "112",
    color: getColorFromId(12),
    date: "2022-12-06",
    period: { start: "15:30", end: "17:00" },
    className: "Class 12",
    speciality: "Computer Science",
    level: "Level 12",
    groupName: "Group 12",
  },
  {
    id: 13,
    name: "Cybersecurity",
    room: "113",
    color: getColorFromId(13),
    date: "2022-12-07",
    period: { start: "8:30", end: "10:00" },
    className: "Class 13",
    speciality: "Computer Science",
    level: "Level 13",
    groupName: "Group 13",
  },
  {
    id: 14,
    name: "Data Science",
    room: "114",
    color: getColorFromId(14),
    date: "2022-12-07",
    period: { start: "11:00", end: "12:30" },
    className: "Class 14",
    speciality: "Computer Science",
    level: "Level 14",
    groupName: "Group 14",
  },
];

function ScheduleGraph() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [exams, setExams] = useState(mockExams);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentExams, setCurrentExams] = useState<Exam[]>([]);
  const resultsPerPage = 10;
  const totalResults = exams.length;
  const [currentSchedule, setCurrentSchedule] = useState<Schedule>({
    name: "Schedule 1",
    scholarYear: "2022-2023",
    semester: 1,
    duration: { start: new Date("2022-01-01"), end: new Date("2022-06-30") },
    exams: mockExams,
    class: {
      className: "Class A",
      speciality: "Computer Science",
      level: "Second Year",
      groupName: "Group 1",
    },
  });

  const mapExamsToPeriods = (exams: Exam[]): Day[] => {
    // Sort the exams by date
    const sortedExams = [...exams].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    // Get the earliest and latest dates
    const earliestDate = new Date(sortedExams[0].date);
    const latestDate = new Date(sortedExams[sortedExams.length - 1].date);
    // Generate an array of dates between the earliest and latest dates
    const dates = [];
    for (
      let d = new Date(earliestDate);
      d <= latestDate;
      d.setDate(d.getDate() + 1)
    ) {
      dates.push(new Date(d));
    }
    // Map the exams to the periods for each date
    const mappedData = dates.map((date) => {
      const dateString = date.toISOString().split("T")[0];
      const periodsData = periods.map((period) => {
        const examsInPeriod = exams.filter(
          (exam) =>
            exam.date === dateString && exam.period.start === period.start
        );
        return { ...period, exams: examsInPeriod };
      });
      return { date: dateString, periods: periodsData };
    });
    return mappedData;
  };

  const generateTimetable = (mappedData: Day[]): Day[] => {
    // Generate the timetable based on the mapped data
    return mappedData;
  };

  const mappedData = mapExamsToPeriods(exams);
  const timetable = generateTimetable(mappedData);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentExams(
      exams.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
      )
    );
  }, [currentPage, exams]);

  const printTimetable = () => {
    const timetableElement = document.getElementById("timetable");
    if (timetableElement) {
      // Save the current theme
      const currentTheme = theme;
      // Switch to light mode
      if (theme !== "light") {
        toggleTheme();
      }
      html2canvas(timetableElement, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape"); // Set orientation to landscape
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        const headerText = `${currentSchedule.name} - Semester ${currentSchedule.semester} - ${currentSchedule.scholarYear}`;
        pdf.text(headerText, pdfWidth / 2, 10, { align: "center" });
        // Add class details
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        const classDetails = ` Speciality: ${currentSchedule.class.speciality}, Level: ${currentSchedule.class.level},Class: ${currentSchedule.class.className}, Group: ${currentSchedule.class.groupName}`;
        pdf.setFont("helvetica", "bold");
        pdf.text(classDetails, 10, 20);
        const margin = 10; // Set the margin
        const lineHeight = 1.15 * 10; // Line height is 1.15 times the font size
        const classDetailsLines = classDetails.split("\n").length; // Number of lines in the class details
        const classDetailsHeight = classDetailsLines * lineHeight; // Height of the class details
        const imageTopMargin = 20 + classDetailsHeight; // Y-position where the image should be added

        pdf.addImage(
          imgData,
          "PNG",
          margin,
          imageTopMargin, // Use the calculated y-position
          pdfWidth - margin * 2,
          pdfHeight
        );
        pdf.save("timetable.pdf");
        // Switch back to the original theme
        if (currentTheme !== theme) {
          toggleTheme();
        }
      });
    }
  };

  return (
    <Layout>
      <PageTitle>{`${currentSchedule.name} - Semester ${currentSchedule.semester} - ${currentSchedule.scholarYear}`}</PageTitle>
      <p>
        <strong>{`Speciality: ${currentSchedule.class.speciality}, 
      Level: ${currentSchedule.class.level}, Class: ${currentSchedule.class.className}, Group: ${currentSchedule.class.groupName}`}</strong>
      </p>
      <div className="mb-2 mt-2">
        <Button onClick={printTimetable}>Print Timetable</Button>
      </div>
      <TableContainer id="timetable" className="mb-8">
        <Table style={{ borderCollapse: "collapse" }}>
          <TableHeader>
            <tr>
              <TableCell style={{ border: "1px solid black" }}>Date</TableCell>
              {periods.map((period, index) => (
                <TableCell
                  key={index}
                  style={{ border: "1px solid black" }}
                >{`${period.start} - ${period.end}`}</TableCell>
              ))}
            </tr>
          </TableHeader>
          <TableBody>
            {timetable.map((day) => (
              <TableRow key={day.date}>
                <TableCell style={{ border: "1px solid black" }}>
                  <p className="font-semibold">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </p>
                  <p className="text-xs">{day.date}</p>
                </TableCell>
                {day.periods.map((period) => (
                  <TableCell
                    key={period.start}
                    style={{ border: "1px solid black" }}
                  >
                    {period.exams.map((exam) => (
                      <div
                        key={exam.id}
                        style={{
                          backgroundColor: exam.color,
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        <p style={{ margin: "0", color: "black" }}>
                          {exam.name}
                        </p>
                        <p style={{ margin: "0", color: "black" }}>
                          {exam.room}
                        </p>
                      </div>
                    ))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChange}
            label="Table navigation"
          />
        </TableFooter> */}
      </TableContainer>
    </Layout>
  );
}

export default ScheduleGraph;
