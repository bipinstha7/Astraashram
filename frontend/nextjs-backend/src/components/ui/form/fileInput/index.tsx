import Image from 'next/image';
import InputError from '../inputError';
import styles from './fileInput.module.scss';
import { CSSProperties } from 'react';

import fileIcon from '/public/icons/file.svg';

interface iTextInput {
  name: string;
  type?: string;
  label?: string;
  icon?: string;
  error?: string;
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

export default function FileInput(props: iTextInput) {
  const {
    name,
    error,
    validation,
    className = '',
    handleIconClick,
    inputStyles = {},
    label = 'Attach File',
  } = props;
  return (
    <div className={styles.file_input}>
      <div className={styles.input_wrapper}>
        <div className={styles.icon} onClick={handleIconClick}>
          <Image src={fileIcon} alt="icon" width={24} height={24} />
        </div>
        <input
          id={name}
          name={name}
          type="file"
          {...validation}
          className={error ? styles.input_error : ''}
        />
        <label htmlFor={name}>{label}</label>
      </div>
      {error ? <InputError text={error} /> : null}
    </div>
  );
}
