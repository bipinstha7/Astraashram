import Image from 'next/image';
import * as Select from '@radix-ui/react-select';

import styles from './select.module.scss';
import caretIcon from '/public/icons/caret.svg';

interface iOptions {
  name: string | number;
  value: string;
}
[];

interface iSelectInput {
  options: iOptions[];
  placeholder?: string;
  selected: string;
  showValueAndPlaceholder?: Boolean;
  onSelect: (value: string) => void;
  hideBorder?: Boolean;
  triggerStyles?: {
    '--width'?: string;
    '--height'?: string;
    '--padding'?: string;
    '--background-color'?: string;
  };
  contentStyles?: {
    '--content-padding'?: string;
    '--content-item-padding'?: string;
  };
}

export default function SelectInput(props: iSelectInput) {
  const {
    options,
    placeholder,
    showValueAndPlaceholder,
    selected,
    onSelect,
    hideBorder,
    triggerStyles = {},
    contentStyles = {},
  } = props;

  let triggerStylesData = { ...triggerStyles } as React.CSSProperties;
  let contentStylesData = { ...contentStyles } as React.CSSProperties;

  if (hideBorder) {
    triggerStylesData = { ...triggerStyles, '--box-shadow': 'none' } as React.CSSProperties;
  }

  contentStylesData = {
    ...contentStyles,
  } as React.CSSProperties;

  return (
    <Select.Root value={selected} onValueChange={onSelect}>
      <Select.Trigger className={styles.select_trigger} style={triggerStylesData}>
        <Select.Value placeholder={placeholder}>
          {showValueAndPlaceholder ? (
            <div className={styles.show_placeholder_and_value}>
              <span className={styles.show_placeholder}>{placeholder}</span>{' '}
              <span>{options.find(option => option.value === selected)?.name}</span>
            </div>
          ) : (
            options.find(option => option.value === selected)?.name
          )}
        </Select.Value>
        <Select.Icon className={styles.select_icon}>
          <Image src={caretIcon} alt="caret-icon" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={styles.select_content}
          position="popper"
          style={contentStylesData}
        >
          <Select.ScrollUpButton>
            <Image src={caretIcon} alt="caret-icon" />
          </Select.ScrollUpButton>
          <Select.Viewport className={styles.select_view_port}>
            {options.map(option => (
              <Select.Item key={option.value} value={option.value} className={styles.select_item}>
                <Select.ItemText>{option.name}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
