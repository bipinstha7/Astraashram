import styles from './pricing.module.scss';
import TabsList from '@/components/ui/tabs';
import TrendContent from '@/components/pricingTab/trendContent';
import RealStateContent from '@/components/pricingTab/realStateContent';

const propertyOptions = [
  { name: 'Any', value: 'any' },
  { name: 'Property 1', value: 'Property 1' },
  { name: 'Property 2', value: 'Property 2' },
  { name: 'Property 3', value: 'Property 3' },
];

export default function Pricing() {
  const tabListData = [
    {
      name: 'Trend',
      content: <TrendContent propertyOptions={propertyOptions} />,
    },
    {
      name: 'By real estate',
      content: <RealStateContent propertyOptions={propertyOptions} />,
    },
  ];

  return (
    <main className={styles.pricing_main}>
      <TabsList data={tabListData} />
    </main>
  );
}
