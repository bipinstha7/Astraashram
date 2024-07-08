// 'use client';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import './date.scss';
import styles from './date.module.scss';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export default function Calendar({
  showOutsideDays = true,
  classNames = {},
  ...props
}: CalendarProps) {
  console.log({ classNames });
  return (
    <DayPicker
      data-mode={props.mode}
      showOutsideDays={showOutsideDays}
      className="astraashram_date_picker"
      classNames={{
        row: styles.date_picker_row,
        cell: styles.date_picker_cell,
        month: styles.date_picker_month,
        caption: styles.date_picker_caption,
        head_row: styles.date_picker_head_row,
        head_cell: styles.date_picker_head_cell,
        day_today: styles.date_picker_day_today,
        day_selected: styles.date_picker_day_selected,
        caption_label: styles.date_picker_caption_label,
        day_range_end: styles.date_picker_day_range_start,
        nav_button_next: styles.date_picker_nav_button_next,
        day_range_start: styles.date_picker_day_range_start,
        nav_button_previous: styles.date_picker_nav_button_previous,
        ...classNames,
      }}
      {...props}
    />
  );
}
