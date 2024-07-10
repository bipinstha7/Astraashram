'use client';

import { useState } from 'react';

import Button from '@/components/ui/button';
import styles from './properties.module.scss';
import SelectInput from '@/components/ui/form/select';

const propertyOptions = [
  { name: 'All', value: 'all' },
  { name: 'Property 1', value: 'Property 1' },
  { name: 'Property 2', value: 'Property 2' },
  { name: 'Property 3', value: 'Property 3' },
];

export default function Properties() {
  const [property, setProperty] = useState('all');

  return (
    <section>
      <div className={styles.properties}>
        <h4>Owner&apos;s Properties</h4>
        <Button icon="&#43;" text="Add Property" className={styles.add_button} />
      </div>
      <SelectInput
        selected={property}
        onSelect={setProperty}
        showValueAndPlaceholder
        options={propertyOptions}
        triggerStyles={{ '--width': '100%' }}
        placeholder="Real estate properties"
      />
    </section>
  );
}
