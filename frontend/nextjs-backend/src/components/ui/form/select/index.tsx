import Image from 'next/image';
import * as Select from '@radix-ui/react-select';

import styles from './select.module.scss';
import caretIcon from '/public/icons/caret.svg';

interface iOptions {
  name: string;
  value: string;
}
[];

interface iSelectInput {
  selected: string;
  options: iOptions[];
  placeholder: string;
  showValueAndPlaceholder?: Boolean;
  onSelect: (value: string) => void;
}

export default function SelectInput(props: iSelectInput) {
  const { options, placeholder, showValueAndPlaceholder, selected, onSelect } = props;

  return (
    <Select.Root value={selected} onValueChange={onSelect}>
      <Select.Trigger className={styles.select_trigger} aria-label="Food">
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
        <Select.Content className={styles.select_content} position="popper">
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
