import Card from '@/components/ui/card';
import styles from './dashboard.module.scss';
import PDFReports from '@/components/pdfReports';
import IntervalFilter from '@/components/intervalFilter';
import arrowDownIcon from '/public/icons/arrow-down.svg';
import DashboardChart from '@/components/dashboardChart';

export default function Dashboard() {
  return (
    <main className={styles.dashboard_main}>
      <IntervalFilter />
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
        <DashboardChart />
      </section>
      <section>
        <PDFReports />
      </section>
    </main>
  );
}
