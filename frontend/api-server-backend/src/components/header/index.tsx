import Image from 'next/image';

import Badge from '../ui/badge';
import HeaderTitle from './headerTitle';
import styles from './header.module.scss';
import logoutIcon from '/public/icons/logout.svg';

export default function Header({ gridClassName }: { gridClassName: string }) {
  return (
    <header className={`${styles.header} ${gridClassName}`}>
      <span className={styles.page_title}>
        <HeaderTitle />
      </span>

      <div className={styles.header_right}>
        <section className={styles.currency_badge}>
          <Badge text="NPR" />
          <Badge text="USD" />
        </section>
        <section className={styles.user_title}>
          <div>Bipin Shrestha</div>
          <span>Admin</span>
        </section>
        <Image src={logoutIcon} alt="icon" className={styles.logout} />
      </div>
    </header>
  );
}
