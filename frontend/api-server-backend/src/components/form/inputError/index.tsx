import styles from './inputError.module.scss';

interface iInputError {
  text: string;

  /**
   * margin: top right bottom left
   */
  margin?: string;

  /**
   * data-testid: testid value to test the error
   */
  data_testid?: string;
}

export default function InputError({ text, margin, data_testid }: iInputError) {
  return (
    <small
      data-testid={data_testid}
      className={styles.input_error}
      style={{ '--error-margin': margin } as React.CSSProperties}
    >
      {text}
    </small>
  );
}
