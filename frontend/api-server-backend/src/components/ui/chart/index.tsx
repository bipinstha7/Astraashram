'use client';

import {
  Point,
  Title,
  Legend,
  Tooltip,
  ChartData,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

interface iChart {
  data: ChartData<'line', (number | Point | null)[], unknown>;
  width?: number;
  height?: number;
  stepSize?: number;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function CustomChart({ data, width, height, stepSize }: iChart) {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,

        ticks: {
          // beginAtZero: true,
          stepSize: stepSize || 500,
        },
        border: {
          dash: [10, 10],
        },
      },
      x: {
        grid: {
          display: true,
          color: '#C2CFE0', // Color of vertical grid lines
        },
      },
    },
  };

  return <Line options={options} data={data} width={width || 100} height={height || 222} />;
}
