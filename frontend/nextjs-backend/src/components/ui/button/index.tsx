import styles from './button.module.scss';

import Spinner from '../spinner';

interface iButton {
  text: string;
  icon?: string;
  className?: string;
  isSubmitting?: boolean;
}

export default function Button(props: iButton) {
  return (
    <button
      type="submit"
      disabled={props.isSubmitting}
      className={`${styles.button} ${props.className || ''} ${
        props.isSubmitting ? styles.submitting : ''
      }`}
    >
      {props.icon && <span className={styles.icon}>{props.icon}</span>}
      {props.text}
      {props.isSubmitting ? <Spinner /> : null}
    </button>
  );
}
