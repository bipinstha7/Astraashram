import Button from '../ui/button';
import Drawer from '../ui/drawer';
import styles from './mobileFilter.module.scss';
import filterIcon from '/public/icons/filter.svg';

interface iMobileFilter {
  children: React.ReactNode;
}

export default function MobileFilter({ children }: iMobileFilter) {
  return (
    <Drawer icon={filterIcon} title="Filter">
      <div className={styles.filter_wrapper}>
        <h2>Filter</h2>

        <div className={styles.children_data}>{children}</div>
        <Button text="Apply" />
        <p className={styles.reset_text}>Reset</p>
      </div>
    </Drawer>
  );
}
