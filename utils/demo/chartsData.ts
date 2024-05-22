export interface ILegends{
  title: string
  color: string
}
export interface IDepartment {
  name: string;
  color: string;
}

export const departmentData: IDepartment[] = [
  { name: "Digital", color: "bg-blue-500" },
  { name: "Business", color: "bg-teal-600" },
  { name: "Polytechnic", color: "bg-purple-600" },
];

export const examsData = {
  data: {
    datasets: [
      {
        data: [32, 23, 17], // Number of exams passed in each department
        backgroundColor: ["#0694a2", "#1c64f2", "#7e3af2"],
        label: "Classes",
      },
    ],
    labels: ["Digital", "Business", "Polytechnic"],
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
  },
  legend: {
    display: false,
  },
};

export const usersData = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Users",
        backgroundColor: "#0694a2",
        borderColor: "#0694a2",
        data: [5, 10, 15, 12, 12, 10, 20], // Number of users over time
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Month",
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Users",
        },
      },
    },
  },
  legend: {
    display: false,
  },
};

export const studentsData = {
  data: {
    labels: ["Digital", "Business", "Polytechnic"],
    datasets: [
      {
        label: "Students",
        backgroundColor: ["#0694a2", "#1c64f2", "#7e3af2"],
        borderWidth: 1,
        data: [1200, 800, 500], // Number of students in each department
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
};


export const doughnutLegends: ILegends[] = [
  { title: 'Shirts', color: 'bg-blue-500' },
  { title: 'Shoes', color: 'bg-teal-600' },
  { title: 'Bags', color: 'bg-purple-600' },
]

export const lineLegends: ILegends[] = [
  { title: 'Organic', color: 'bg-teal-600' },
  { title: 'Paid', color: 'bg-purple-600' },
]

export const barLegends: ILegends[] = [
  { title: 'Shoes', color: 'bg-teal-600' },
  { title: 'Bags', color: 'bg-purple-600' },
]

export const doughnutOptions = {
  data: {
    datasets: [
      {
        data: [33, 33, 33],
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: ['#0694a2', '#1c64f2', '#7e3af2'],
        label: 'Dataset 1',
      },
    ],
    labels: ['Shoes', 'Shirts', 'Bags'],
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
  },
  legend: {
    display: false,
  },
}

export const lineOptions = {
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Organic',
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: '#0694a2',
        borderColor: '#0694a2',
        data: [43, 48, 40, 54, 67, 73, 70],
        fill: false,
      },
      {
        label: 'Paid',
        fill: false,
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: '#7e3af2',
        borderColor: '#7e3af2',
        data: [24, 50, 64, 74, 52, 51, 65],
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Month',
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value',
        },
      },
    },
  },
  legend: {
    display: false,
  },
}

export const barOptions = {
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Shoes',
        backgroundColor: '#0694a2',
        // borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [-3, 14, 52, 74, 33, 90, 70],
      },
      {
        label: 'Bags',
        backgroundColor: '#7e3af2',
        // borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: [66, 33, 43, 12, 54, 62, 84],
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
}

