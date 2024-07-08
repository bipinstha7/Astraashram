import Image from 'next/image';
import InputError from '../inputError';
import styles from './textInput.module.scss';
import { CSSProperties } from 'react';

interface iTextInput {
  name: string;
  type?: string;
  label: string;
  icon?: string;
  error?: string;
  showIcon?: Boolean;
  validation?: object;
  iconPosition?: 'left' | 'right';
  handleIconClick?: React.MouseEventHandler<HTMLDivElement>;
  inputStyles?: {
    '--input-bg-color'?: string;
    '--border-color'?: string;
  };
}

export default function TextInput(props: iTextInput) {
  const {
    name,
    icon,
    label,
    error,
    showIcon,
    validation,
    type = 'text',
    handleIconClick,
    inputStyles = {},
    iconPosition = 'right',
  } = props;
  return (
    <>
      <div
        style={inputStyles as CSSProperties}
        className={`${styles.floating_label} ${showIcon ? styles.icon_input : ''}`}
        data-icon-position={iconPosition}
      >
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
