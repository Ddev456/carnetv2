import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  TimeScale,
  Tooltip,
  Legend
);

const labels = ["Tomate", "Carotte"];

const data = {
  labels,
  datasets: [
    {
      label: "Semis",

      data: [["2021-02-06 23:39:30"], ["2021-03-07 01:00:28"]],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tooltip: "testttttt",
    },
    {
      label: "Récolte",

      data: [["2021-12-12 23:39:30"], ["2021-05-11 01:00:28"]],

      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      tooltip: "te5",
    },
  ],
};
// @ts-ignore: Unreachable code error
const label = (tooltipItem) => {
  // @ts-ignore: Unreachable code error
  return tooltipItem.dataset.tooltip;
};

const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: label,
      },
    },
  },
  legend: {
    onClick: () => {},
    position: "right" as const,
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "month",
        displayFormats: {
          month: "MMM",
        },
      },
      stacked: true,
    },
    // y: {
    //   stacked: true,
    // },
  },
};

export const CalendarDisplay = () => {
  // @ts-ignore: Unreachable code error
  return <Bar options={options} data={data} />;
};
