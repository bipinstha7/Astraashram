import Button from '../ui/button';
import Drawer from '../ui/drawer';
import styles from './mobileFilter.module.scss';
import filterIcon from '/public/icons/filter.svg';

interface iMobileFilter {
  children: React.ReactNode;
}

export default function MobileFilter({ children }: iMobileFilter) {
  return (
    <Drawer icon={filterIcon}>
      <div className={styles.filter_wrapper}>
        <h2>Filter</h2>
        <section className={styles.no_of_bedrooms}>
          <p>Number of bedrooms</p>
          <div>
            <div>
              <input type="checkbox" id="any" name="Any" />
              <label htmlFor="any">Any</label>
            </div>
            <div>
              <input type="checkbox" id="1" name="1" checked />
              <label htmlFor="1">1</label>
            </div>
            <div>
              <input type="checkbox" id="2" name="2" />
              <label htmlFor="2">2</label>
            </div>
            <div>
              <input type="checkbox" id="3" name="3" />
              <label htmlFor="3">3</label>
            </div>
          </div>
        </section>
        <div className={styles.children_data}>{children}</div>
        <Button text="Apply" />
        <p className={styles.reset_text}>Reset</p>
      </div>
    </Drawer>
  );
}
