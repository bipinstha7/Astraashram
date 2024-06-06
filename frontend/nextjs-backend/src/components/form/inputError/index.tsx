import styles from './inputError.module.scss';

interface iInputError {
  text: string;

  /**
   * margin: top right bottom left
   */
  margin?: string;
}

export default function InputError({ text, margin }: iInputError) {
  return (
    <small
      className={styles.input_error}
      style={{ '--error-margin': margin } as React.CSSProperties}
    >
      {text}
    </small>
  );
}
