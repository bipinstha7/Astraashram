'use client';

import { useState } from 'react';

import TextInput from '@/components/ui/form/textInput';
import styles from '../add.module.scss';
import SelectInput from '@/components/ui/form/select';

const paymentMethodOptions = [
  { name: 'Card', value: 'card' },
  { name: 'Esewa', value: 'esewa' },
  { name: 'Khalti', value: 'khalti' },
  { name: 'Paypal', value: 'paypal' },
];

const paymentProvienceOptions = [
  { name: 'Madhesh Pradesh', value: 'madhes' },
  { name: 'Bagmati', value: 'bagmati' },
  { name: 'Gandaki', value: 'gandaki' },
  { name: 'Lumbini', value: 'lumbini' },
  { name: 'Karnali', value: 'karnali' },
  { name: 'Sudurpaschim', value: 'sudurpaschim' },
];

export default function PaymentDetails() {
  const [paymentProvience, setPaymentProvience] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  return (
    <section>
      <h4>Payment Details</h4>
      <div className={styles.input_wrapper}>
        <TextInput label="Rental amount for the selected period, USD" name="rentalAmount" />
        <TextInput
          name="commission"
          label="Administrator commission, 10%"
          // value="Calculated automatically"
        />
        <TextInput name="deposit" label="Deposit, USD" />
        <TextInput name="cleaning" label="Cleaning, USD" />
        <SelectInput
          showValueAndPlaceholder
          selected={paymentMethod}
          onSelect={setPaymentMethod}
          placeholder="Payment Method"
          options={paymentMethodOptions}
          triggerStyles={{
            '--width': '100%',
            '--background-color': '#F5F5F5',
          }}
        />
        <SelectInput
          showValueAndPlaceholder
          selected={paymentProvience}
          onSelect={setPaymentProvience}
          placeholder="Payment Provience"
          options={paymentProvienceOptions}
          triggerStyles={{ '--width': '100%', '--background-color': '#F5F5F5' }}
        />
      </div>
    </section>
  );
}
