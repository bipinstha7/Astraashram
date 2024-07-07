import Image from 'next/image';
import { ChartData, Point } from 'chart.js';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

import CustomChart from '../ui/chart';
import passIcon from '/public/icons/pass.svg';
import styles from './chartWrapper.module.scss';

interface iChartWrapper {
  title?: string | JSX.Element;
  data: ChartData<'line', (number | Point | null)[], unknown>;
  stepSize?: number;
  width?: number;
  height?: number;
}

export default function ChartWrapper({ title, data, stepSize, width, height }: iChartWrapper) {
  return (
    <div className={styles.chart}>
      <section className={styles.chart_title}>{title}</section>
      <section className={styles.chart_labels}>
        {data.datasets.map(dataset => (
          <div key={dataset.label}>
            <div
              style={
                { '--background-color': dataset.borderColor } as DetailedHTMLProps<
                  HTMLAttributes<HTMLDivElement>,
                  HTMLDivElement
                >
              }
            >
              <Image src={passIcon} alt="pass-icon" />
            </div>
            {dataset.label}
          </div>
        ))}
      </section>
      <section className={styles.custom_chart}>
        <CustomChart data={data} stepSize={stepSize} width={width} height={height} />
      </section>
    </div>
  );
}
