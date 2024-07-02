import Image from 'next/image';

import Card from '@/components/card';
import pdfIcon from '/public/icons/pdf.svg';
import styles from './dashboard.module.scss';
import PDFReports from '@/components/pdfReports';
import IntervalFilter from '@/components/intervalFilter';
import arrowDownIcon from '/public/icons/arrow-down.svg';
import DashboardChart from '@/components/dashboardChart';

export default function Dashboard() {
  return (
    <main className={styles.dashboard_main}>
      <section className={styles.dashboard_intervals_section}>
        <IntervalFilter />
        <a href="" className={styles.download_pdf}>
          <Image src={pdfIcon} alt="pdf-icon" />
          <span>Dowload PDF</span>
        </a>
      </section>
      <section className={styles.financial_data}>
        <Card header="Total sales" body="$ 12 678" footer="+ 1 005" />
        <Card header="General Expenses" body="$ 5 578" footer="+ 1 005" />
        <Card
          body="123"
          footer="- 10%"
          icon={arrowDownIcon}
          header="Number of sales"
          footerStyles={{ '--footer-color': '#EB5757' }}
        />
      </section>
      <section>
        <DashboardChart title="Sales statistics" />
      </section>
      <section>
        <PDFReports />
      </section>
    </main>
  );
}
