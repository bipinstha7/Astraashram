import Image from 'next/image';
import InputError from '../inputError';
import styles from './textInput.module.scss';

interface iTextInput {
  name: string;
  type: string;
  label: string;
  icon?: string;
  error?: string;
  showIcon?: Boolean;
  validation?: object;
  handleIconClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function TextInput(props: iTextInput) {
  const { name, type = 'text', label, error, showIcon, icon, handleIconClick, validation } = props;
  return (
    <>
      <div className={`${styles.floating_label} ${showIcon ? styles.icon_input : ''}`}>
        <input
          id={name}
          name={name}
          type={type}
          placeholder=""
          {...validation}
          autoComplete="new-password" /* Autofill off */
          className={error ? styles.input_error : ''}
        />
        <label htmlFor={name}>{label}</label>
        {showIcon ? (
          <div className={styles.icon} onClick={handleIconClick}>
            <Image src={icon || '/images'} alt="icon" width={24} height={24} />
          </div>
        ) : null}
      </div>
      {error ? <InputError text={error} /> : null}
    </>
  );
}
