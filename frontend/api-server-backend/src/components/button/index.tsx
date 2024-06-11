import styles from './button.module.scss';

import Spinner from '../spinner';

interface iButton {
  text: string;
  isSubmitting?: boolean;
}

export default function Button(props: iButton) {
  return (
    <button
      type="submit"
      disabled={props.isSubmitting}
      className={`${styles.button} ${props.isSubmitting ? styles.submitting : ''}`}
    >
      {props.text}
      {props.isSubmitting ? <Spinner /> : null}
    </button>
  );
}
