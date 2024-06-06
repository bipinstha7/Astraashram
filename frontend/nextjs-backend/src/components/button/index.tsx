import styles from './button.module.scss';
import { useFormStatus } from 'react-dom';

import Spinner from '../spinner';

interface iButton {
  text: string;
  isSubmitting?: boolean;
  useFormStatusPending?: boolean;
}

export default function Button(props: iButton) {
  const { pending } = useFormStatus();

  let loading = props.isSubmitting;
  if (props.useFormStatusPending) loading = pending;

  return (
    <button
      type="submit"
      disabled={loading}
      className={`${styles.button} ${loading ? styles.submitting : ''}`}
    >
      {props.text}
      {loading ? <Spinner /> : null}
    </button>
  );
}
