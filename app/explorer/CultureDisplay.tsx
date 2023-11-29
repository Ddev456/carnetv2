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
import { addDays, format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  TimeScale,
  Tooltip,
  Legend
);

type Period = {
  name: string;
  nursery: number[];
  seedling: number[];
  plantation: number[];
  flowering: number[];
  harvest: number[];
};

type CultureDisplayProps = {
  period: Period;
};

export const CultureDisplay = ({ period }: CultureDisplayProps) => {
  const getDateOfWeek = (w: number, y: number) => {
    const d = 2 + (w - 1) * 7;
    return new Date(y, 0, d);
  };

  const chunk = (arr: number[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  const rangeNursery = chunk(period.nursery, 2);
  const rangeSeedling = chunk(period.seedling, 2);
  const rangePlantation = chunk(period.plantation, 2);
  const rangeFlowering = chunk(period.flowering, 2);
  const rangeHarvest = chunk(period.harvest, 2);

  // @ts-ignore: Unreachable code error
  const label = (tooltipItem) => {
    // @ts-ignore: Unreachable code error
    return `${format(
      getDateOfWeek(tooltipItem.raw[0], 2023),
      "dd-MM-yyyy"
    )} au ${format(getDateOfWeek(tooltipItem.raw[1], 2023), "dd-MM-yyyy")}`;
  };

  const options = {
    indexAxis: "y" as const,
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    // responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Périodes de culture",
      },
      tooltip: {
        callbacks: {
          label: label,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: (value: string) => {
            function getMonthLabel(weekNumber: number): string {
              const monthLabels = [
                "Janvier",
                "Février",
                "Mars",
                "Avril",
                "Mai",
                "Juin",
                "Juillet",
                "Août",
                "Septembre",
                "Octobre",
                "Novembre",
                "Décembre",
              ];

              const monthIndex = Math.floor((weekNumber - 1) / 4);
              return monthLabels[monthIndex];
            }

            function getMonthLabelByWeekNumber(weekNumber: number): string {
              if (weekNumber > 52) {
                return "";
              }

              return getMonthLabel(weekNumber);
            }

            return getMonthLabel(Number(value));
          },
        },
      },
    },
  };

  const data = {
    labels: [period.name],
    datasets: [
      {
        label: "Semis sous abri",
        data: [period.nursery],
        backgroundColor: ["rgba(255, 26, 104, 0.2)"],
        borderColor: ["rgba(255, 26, 104, 1)"],
        borderWidth: 1,
      },
      {
        label: "Semis",
        data: [period.seedling],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
      {
        label: "Plantation",
        data: [period.plantation],
        backgroundColor: ["rgba(255, 206, 86, 0.2)"],
        borderColor: [, "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
      {
        label: "Floraison",
        data: [period.flowering],
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
      {
        label: "Récolte",
        data: [period.harvest],
        backgroundColor: ["rgba(153, 102, 255, 0.2)"],
        borderColor: ["rgba(153, 102, 255, 1)", ,],
        borderWidth: 1,
      },
    ],
  };
  // const data = {
  //   labels: ["Semis sous abri", "Semis", "Plantation", "Floraison", "Récolte"],
  //   datasets: [
  //     {
  //       label: period.name,
  //       data: [
  //         period.nursery,
  //         period.seedling,
  //         period.plantation,
  //         period.flowering,
  //         period.harvest,
  //       ],
  //       // data: [
  //       //   [2, 14, 19],
  //       //   [3, 4],
  //       //   [4, 6],
  //       //   [7, 12],
  //       //   [8, 12],
  //       // ],
  //       backgroundColor: [
  //         "rgba(255, 26, 104, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //         "rgba(153, 102, 255, 0.2)",
  //         "rgba(255, 159, 64, 0.2)",
  //         "rgba(0, 0, 0, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 26, 104, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //         "rgba(0, 0, 0, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // @ts-ignore: Unreachable code error
  return <Bar options={options} data={data} />;
};
