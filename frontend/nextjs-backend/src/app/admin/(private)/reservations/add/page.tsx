import Button from '@/components/ui/button';
import styles from './addReservation.module.scss';
import Expenses from '@/components/reservations/add/expenses';
import BasicInfo from '@/components/reservations/add/basicInfo';
import TenantDetails from '@/components/reservations/add/tenantDetails';
import Documentation from '@/components/reservations/add/documentation';
import PaymentDetails from '@/components/reservations/add/paymentDetails';

export default function AddReservation() {
  return (
    <div className={styles.add_reservation_section}>
      <BasicInfo />
      <TenantDetails />
      <Documentation />
      <PaymentDetails />
      <Expenses />
      <Button text="Save" className={styles.save_button} />
    </div>
  );
}
