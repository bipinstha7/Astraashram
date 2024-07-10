import TextInput from '@/components/ui/form/textInput';
import styles from '../add.module.scss';

export default function Expenses() {
  return (
    <section>
      <h4>Communal expenses</h4>
      <div className={styles.input_wrapper}>
        <TextInput label="DEWA, USD" name="dewa" />
        <TextInput label="DU/Etisalat, USD" name="etisalat" />
        <TextInput label="Cooling, USD" name="cooling" />
        <TextInput label="GAZ, USD" name="gaz" />
        <TextInput label="Invest, USD" name="invest" />
        <TextInput label="Other expenses, USD" name="otherExpenses" />
        <TextInput
          label="Total expenses, USD"
          name="totalExpenses"
          // value='Calculated automatically'
        />
      </div>
    </section>
  );
}
