'use client';
import {
  Row,
  Body,
  Cell,
  Header,
  HeaderRow,
  HeaderCell,
} from '@table-library/react-table-library/table';
import Image from 'next/image';
import { useState } from 'react';

import CustomTable from '../ui/table';
import ChartWrapper from '../chartWrapper';
import SelectInput from '../ui/form/select';
import { pricingData } from '@/lib/mockData';
import styles from './pricingTab.module.scss';
import IntervalFilter from '../intervalFilter';
import grid3Icon from '/public/icons/grid3.svg';
import apartment from '/public/images/apartment.png';
import PricingIcon from '../../../public/icons/pricing';

interface iTrendContent {
  propertyOptions: { name: string; value: string }[];
}

const labels = [
  '01.12.23',
  '02.12.23',
  '03.12.23',
  '04.12.23',
  '05.12.23',
  '06.12.23',
  '07.12.23',
  '08.12.23',
  '09.12.23',
  '10.12.23',
  '11.12.23',
  '12.12.23',
  // null,
];
const tableHeaders = [
  'Service',
  '01.01.23',
  '02.01.23',
  '03.01.23',
  '04.01.23',
  '05.01.23',
  '06.01.23',
  '07.01.23',
  '08.01.23',
  '09.01.23',
  '10.01.23',
  '11.01.23',
  '12.01.23',
];

interface iNodes {
  id: string | number;
  name: string;
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  six: number;
  seven: number;
  eight: number;
  nine: number;
  ten: number;
  eleven: number;
  twelve: number;
}

export default function RealStateContent({ propertyOptions }: iTrendContent) {
  const [property, setProperty] = useState('');
  const [showGraph, setShowGraph] = useState(false);

  const chartData = {
    labels,
    datasets: [
      {
        yAxisID: 'y',
        borderWidth: 1,
        label: 'AirBNB Avg',
        borderColor: '#EB5757',
        data: [100, 200, 300, 350, 100, 200, 500, 100, 200, 400, 200, 541],
      },
      {
        yAxisID: 'y',
        borderWidth: 1,
        label: 'AirBNB Smart',
        borderColor: '#28B0C3',
        data: [150, 250, 400, 650, 200, 450, 300, 50, 300, 500, 200, 430],
      },
      {
        yAxisID: 'y',
        borderWidth: 1,
        label: 'Booking.com',
        borderColor: '#ECC849',
        data: [250, 225, 525, 675, 500, 425, 50, 200, 400, 350, 300, 555],
      },
      {
        yAxisID: 'y',
        borderWidth: 1,
        label: 'Bayut',
        borderColor: '#28B16D',
        data: [300, 350, 400, 200, 100, 500, 600, 500, 200, 410, 400, 200],
      },
      {
        yAxisID: 'y',
        borderWidth: 1,
        label: 'Hotel 5',
        borderColor: '#6426B5',
        data: [375, 400, 150, 50, 500, 600, 420, 100, 400, 555, 120, 444],
      },
      {
        yAxisID: 'y',
        borderWidth: 1,
        label: 'HHr',
        borderColor: '#E1199D',
        data: [375, 400, 150, 50, 500, 600, 420, 100, 400, 555, 120, 444],
      },
      {
        yAxisID: 'y',
        borderWidth: 1,
        label: 'Our Price 10',
        borderColor: '#014745',
        data: [375, 400, 150, 50, 500, 600, 420, 100, 400, 555, 120, 444],
      },
      {
        yAxisID: 'y',
        borderWidth: 1,
        label: 'Our Price Daily',
        borderColor: '#AC9B6D',
        data: [375, 400, 150, 50, 500, 600, 420, 100, 400, 555, 120, 444],
      },
    ],
  };

  return (
    <div className={styles.tab_content}>
      <IntervalFilter hideDay />
      <div className={styles.pricing_table}>
        <div className={styles.pricing_table_header}>
          <div className={styles.pricing_graph}>
            <p>Price Dynamics </p>
            <div onClick={() => setShowGraph(show => !show)}>
              {showGraph ? (
                <>
                  <Image src={grid3Icon} alt="grid3-icon" /> <span>As a table</span>
                </>
              ) : (
                <>
                  <PricingIcon color="#014745" /> <span>As a graph</span>
                </>
              )}
            </div>
          </div>
          <SelectInput
            selected={property}
            onSelect={setProperty}
            showValueAndPlaceholder
            options={propertyOptions}
            placeholder="Select a property"
          />
        </div>

        <div className={styles.selected_property}>
          <Image src={apartment} alt="apartment" />
          <div className={styles.property_text_wrapper}>
            <div className={styles.property_name_owner}>
              <p className={styles.property_name}>
                Zada Tower 211 <span>ID 0001</span>
              </p>
              <p className={styles.owner}>
                Owner: <span className={styles.owner_name}>Bipin Shretha</span>
              </p>
            </div>
            <p>
              120 KB.M <span>(3 Bedrooms)</span>
            </p>
          </div>
        </div>
        {showGraph ? (
          <ChartWrapper height={382} data={chartData} stepSize={100} />
        ) : (
          <CustomTable
            fetchData={pricingData}
            tableData={(tableList: iNodes[]) => (
              <>
                <Header>
                  <HeaderRow>
                    {tableHeaders.map(header => (
                      <HeaderCell key={header}>{header}</HeaderCell>
                    ))}
                  </HeaderRow>
                </Header>

                <Body>
                  {tableList.map(item => (
                    <Row item={item} key={item.id}>
                      <Cell>{item.name}</Cell>
                      <Cell>{item.one}</Cell>
                      <Cell>{item.two}</Cell>
                      <Cell>{item.three}</Cell>
                      <Cell>{item.four}</Cell>
                      <Cell>{item.five}</Cell>
                      <Cell>{item.six}</Cell>
                      <Cell>{item.seven}</Cell>
                      <Cell>{item.eight}</Cell>
                      <Cell>{item.nine}</Cell>
                      <Cell>{item.ten}</Cell>
                      <Cell>{item.eleven}</Cell>
                      <Cell>{item.twelve}</Cell>
                    </Row>
                  ))}
                </Body>
              </>
            )}
            tableStyles={{
              '--first-td-bg-color': '#EFF4F4',
              '--first-td-font-weight': 500,
              '--grid-template-columns':
                'minmax(140px, 1fr) minmax(85px, 1fr) minmax(85px, 1fr) minmax(85px, 1fr) minmax(85px, 1fr) minmax(85px, 1fr) minmax(85px, 1fr) minmax(85px, 1fr) minmax(85px, 1fr) minmax(85px, 1fr) minmax(85px, 1fr) minmax(85px, 1fr) minmax(85px, 1fr)',
            }}
          />
        )}
      </div>
    </div>
  );
}
