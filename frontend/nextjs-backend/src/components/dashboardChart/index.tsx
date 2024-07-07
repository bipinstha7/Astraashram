import ChartWrapper from '../chartWrapper';

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
export default function DashboardChart() {
  const data = {
    labels,
    datasets: [
      {
        yAxisID: 'y',
        label: 'Sales',
        borderWidth: 1,
        borderColor: '#44AF9C',
        data: [200, 250, 600, 550, 650, 500, 500],
      },
      {
        yAxisID: 'y',
        borderWidth: 1,
        label: 'Expenses',
        borderColor: '#EB5757',
        data: [400, 900, 1050, 750, 1000, 1600, 1000],
      },
    ],
  };

  return <ChartWrapper title="Sales Statistics" data={data} />;
}
