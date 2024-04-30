import React, { useState, useEffect } from "react";
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

interface Period {
  start: string;
  end: string;
}

interface Exam {
  id: number;
  name: string;
  room: string;
  color: string;
  date: string;
  period: Period;
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
    "#830318" /* more colors as needed */,
  ];
  return colors[id % colors.length];
}

const mockExams = [
  {
    id: 1,
    name: "Math",
    room: "101",
    color: getColorFromId(1),
    date: "2022-12-01",
    period: { start: "8:30", end: "10:00" },
  },
  {
    id: 2,
    name: "English",
    room: "102",
    color: getColorFromId(2),
    date: "2022-12-01",
    period: { start: "11:00", end: "12:30" },
  },
  {
    id: 3,
    name: "Science",
    room: "103",
    color: getColorFromId(3),
    date: "2022-12-02",
    period: { start: "13:00", end: "14:30" },
  },
  {
    id: 4,
    name: "History",
    room: "104",
    color: getColorFromId(4),
    date: "2022-12-02",
    period: { start: "15:30", end: "17:00" },
  },
];

function ScheduleGraph() {
  const [exams, setExams] = useState(mockExams);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentExams, setCurrentExams] = useState<Exam[]>([]);
  const resultsPerPage = 10;
  const totalResults = exams.length;

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
      html2canvas(timetableElement, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        // Customize the font style and size of the header
        pdf.setFont("helvetica", "bold"); // Set the font and style. Default is 'times' and 'normal'
        pdf.setFontSize(14); // Set the font size. Default is 16
        // Add a header to the page
        pdf.text("Timetable Header", pdfWidth / 2, 10, { align: "center" });
        // Add the image to the first page with a margin at the top
        pdf.addImage(imgData, "PNG", 0, 20, pdfWidth, pdfHeight);
        pdf.save("timetable.pdf");
      });
    }
  };

  return (
    <Layout>
      <PageTitle>Schedule</PageTitle>
      <Button onClick={printTimetable}>Print Timetable</Button>
      <TableContainer id="timetable" className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Date</TableCell>
              {periods.map((period, index) => (
                <TableCell
                  key={index}
                >{`${period.start} - ${period.end}`}</TableCell>
              ))}
            </tr>
          </TableHeader>
          <TableBody>
            {timetable.map((day) => (
              <TableRow key={day.date}>
                <TableCell>
                  <p className="font-semibold">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </p>
                  <p className="text-xs">{day.date}</p>
                </TableCell>
                {day.periods.map((period) => (
                  <TableCell key={period.start}>
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
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </Layout>
  );
}

export default ScheduleGraph;
