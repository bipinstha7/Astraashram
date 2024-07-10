import FileInput from '@/components/ui/form/fileInput';
import styles from './documentation.module.scss';

export default function Documentation() {
  return (
    <section>
      <h4>Documentation</h4>
      <div className={styles.booking}>
        <p>Booking Confirmation</p>
        <FileInput name="bookingConfirmation" />
      </div>
      <div className={styles.booking}>
        <p>DTCM Registration</p>
        <FileInput name="dtcmRegistration" />
      </div>
      <p className={styles.add_doc}>
        <div>
          <span>&#43;</span>
        </div>
        Add a document
      </p>
    </section>
  );
}
