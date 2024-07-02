'use client';

import {
  Title,
  Legend,
  Tooltip,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from 'chart.js';
import Image from 'next/image';

import CustomChart from '../chart';
import passIcon from '/public/icons/pass.svg';
import styles from './dashboardChart.module.scss';

interface iChart {
  title: string;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardChart({ title }: iChart) {
  const labels = [
    '01.12.23',
    '02.12.23',
    '03.12.23',
    '04.12.23',
    '05.12.23',
    '06.12.23',
    '07.12.23',
    null,
  ];

  const data = {
    labels,
    datasets: [
      {
        yAxisID: 'y',
        label: 'Sales',
        borderWidth: 1,
        borderColor: '#EB5757',
        data: [200, 250, 600, 550, 650, 500, 500],
      },
      {
        yAxisID: 'y',
        borderWidth: 1,
        label: 'Expenses',
        borderColor: '#44AF9C',
        data: [400, 900, 1050, 750, 1000, 1600, 1000],
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <section className={styles.chart_title}>{title}</section>
      <section className={styles.chart_labels}>
        <div>
          <div>
            <Image src={passIcon} alt="pass-icon" />
          </div>
          Sales
        </div>
        <div className={styles.expenses}>
          <div>
            <Image src={passIcon} alt="pass-icon" />
          </div>
          Expenses
        </div>
      </section>
      <section className={styles.custom_chart}>
        <CustomChart data={data} />
      </section>
    </div>
  );
}
