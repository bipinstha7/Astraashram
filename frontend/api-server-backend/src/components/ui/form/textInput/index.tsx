import Image from 'next/image';
import { CSSProperties } from 'react';

import InputError from '../inputError';
import styles from './textInput.module.scss';

interface iTextInput {
  name: string;
  type?: string;
  label: string;
  icon?: string;
  error?: string;
  infoText?: string;
  className?: string;
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
    infoText,
    validation,
    className = '',
    type = 'text',
    handleIconClick,
    inputStyles = {},
    iconPosition = 'right',
  } = props;
  return (
    <>
      <div
        style={inputStyles as CSSProperties}
        className={`${styles.floating_label} ${className} ${showIcon ? styles.icon_input : ''}`}
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
        {infoText && (
          <div className={styles.icon}>
            <p className={styles.info_text}>{infoText}</p>
          </div>
        )}
      </div>
      {error ? <InputError text={error} /> : null}
    </>
  );
}
