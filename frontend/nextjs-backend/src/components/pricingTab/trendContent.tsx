'use client';

import { useState } from 'react';

import MobileFilter from './mobileFilter';
import ChartWrapper from '../chartWrapper';
import SelectInput from '../ui/form/select';
import styles from './pricingTab.module.scss';
import IntervalFilter from '../intervalFilter';

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

const sleepingPeopleOptions = [
  { name: 'Any', value: 'any' },
  { name: '1', value: '1' },
  { name: '2', value: '2' },
  { name: '3', value: '3' },
];

const districtOptions = [
  { name: 'Any', value: 'any' },
  { name: 'District 1', value: 'District 1' },
  { name: 'District 2', value: 'District 2' },
  { name: 'District 3', value: 'District 3' },
];

interface iTrendContent {
  propertyOptions: { name: string; value: string }[];
}

export default function TrendContent({ propertyOptions }: iTrendContent) {
  const [sleepingPeople, setSleepingPeople] = useState('');
  const [district, setDistrict] = useState('');
  const [property, setProperty] = useState('');

  const chartData = {
    labels,
    datasets: [
      {
        yAxisID: 'y',
        borderWidth: 1,
        label: 'Apartment 1',
        borderColor: '#EB5757',
        data: [100, 200, 300, 350, 100, 200, 500, 100, 200, 400, 200, 541],
      },
      {
        yAxisID: 'y',
        borderWidth: 1,
        label: 'Apartment 2',
        borderColor: '#28B0C3',
        data: [150, 250, 400, 650, 200, 450, 300, 50, 300, 500, 200, 430],
      },
      {
        yAxisID: 'y',
        borderWidth: 1,
        label: 'Apartment 3',
        borderColor: '#ECC849',
        data: [250, 225, 525, 675, 500, 425, 50, 200, 400, 350, 300, 555],
      },
      {
        yAxisID: 'y',
        borderWidth: 1,
        label: 'Apartment 4',
        borderColor: '#28B16D',
        data: [300, 350, 400, 200, 100, 500, 600, 500, 200, 410, 400, 200],
      },
      {
        yAxisID: 'y',
        borderWidth: 1,
        label: 'Apartment 5',
        borderColor: '#1976E1',
        data: [375, 400, 150, 50, 500, 600, 420, 100, 400, 555, 120, 444],
      },
    ],
  };
  return (
    <div className={styles.tab_content}>
      <IntervalFilter hideDay />
      <ChartWrapper
        height={345}
        title={
          <>
            Price Dynamics (Trend)
            <div className={styles.chart_filter}>
              <SelectInput
                showValueAndPlaceholder
                selected={sleepingPeople}
                onSelect={setSleepingPeople}
                options={sleepingPeopleOptions}
                placeholder="No. of bedrooms"
              />
              <SelectInput
                selected={district}
                onSelect={setDistrict}
                placeholder="District"
                showValueAndPlaceholder
                options={districtOptions}
              />
              <SelectInput
                selected={property}
                onSelect={setProperty}
                showValueAndPlaceholder
                options={propertyOptions}
                placeholder="Select a property"
              />
            </div>
            <div className={styles.mobile_chart_filter}>
              <MobileFilter>
                <SelectInput
                  selected={district}
                  onSelect={setDistrict}
                  placeholder="District"
                  showValueAndPlaceholder
                  options={districtOptions}
                  triggerStyles={{ '--width': '100%' }}
                />
                <SelectInput
                  selected={property}
                  onSelect={setProperty}
                  showValueAndPlaceholder
                  options={propertyOptions}
                  placeholder="Select a property"
                  triggerStyles={{ '--width': '100%' }}
                />
              </MobileFilter>
            </div>
          </>
        }
        data={chartData}
        stepSize={100}
      />
    </div>
  );
}
