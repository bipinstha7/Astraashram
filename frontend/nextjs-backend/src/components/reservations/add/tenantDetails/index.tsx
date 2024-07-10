import styles from './tenantDetails.module.scss';
import FileInput from '@/components/ui/form/fileInput';
import TextInput from '@/components/ui/form/textInput';

export default function TenantDetails() {
  return (
    <section>
      <h4>Tenant Details</h4>
      <div className={styles.input_wrapper}>
        <TextInput label="Full Name" name="name" />
        <TextInput label="Telephone" name="phone" />
        <TextInput label="E-mail" name="email" type="email" />
        <TextInput label="Identity Document Number" name="idNumber" />
      </div>
      <div className={styles.document}>
        <p>Identity Document</p>
        <FileInput name="doc" />
      </div>
    </section>
  );
}
