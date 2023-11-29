import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  LabelItem,
  Chart,
  TooltipItem,
  ChartData,
} from "chart.js";

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

type ChartProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
};

export const ChartComponent: React.FC<ChartProps> = ({ data }) => {
  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          displayFormats: {
            month: "MMM",
          },
        },
        ticks: {
          source: "auto",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Plantes",
        },
      },
    },
  };
  // @ts-ignore: Unreachable code error
  return <Bar data={data} options={options} />;
};

const generateDatasets = (): {
  label: string;
  data: number[];
  backgroundColor: string;
}[] => {
  const plants = ["Betterave", "Radis", "Tomate"];
  const periods = ["Semis", "Plantation", "Récolte"];
  const datasets: { label: string; data: number[]; backgroundColor: string }[] =
    [];

  plants.forEach((plant) => {
    const plantData: number[] = [];
    periods.forEach(() => {
      const duration = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
      plantData.push(duration);
    });

    const backgroundColor = getRandomColor();
    datasets.push({ label: plant, data: plantData, backgroundColor });
  });

  return datasets;
};

const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const datasets = generateDatasets();

const data = {
  labels: ["Semis", "Plantation", "Récolte"],
  datasets,
};

export const Graph: React.FC = () => {
  return <ChartComponent data={data} />;
};
