import Image from 'next/image';

import styles from './sidebar.module.scss';

import menuIcon from '/public/icons/menu.svg';
import cardIcon from '/public/icons/card.svg';
import userIcon from '/public/icons/user.svg';
import usersIcon from '/public/icons/users.svg';
import houseIcon from '/public/icons/house.svg';
import peopleIcon from '/public/icons/people.svg';
import walletIcon from '/public/icons/wallet.svg';
import logo from '/public/images/logo-black.png';
import statusUpIcon from '/public/icons/status-up.svg';
import Badge from '../badge';

export default function Sidebar() {
  return (
    <section className={styles.aside}>
      <Image src={logo} alt="Website logo" width={300} className={styles.logo} />

      <div className={styles.sidebar_list}>
        <ul>
          <li className={styles.active}>
            <Image src={menuIcon} alt="home-icon" /> Home
          </li>
          <li>
            <Image src={statusUpIcon} alt="pricing-icon" /> Pricing
          </li>
          <li>
            <Image src={cardIcon} alt="reservations-icon" /> Reservations
          </li>
          <li>
            <Image src={walletIcon} alt="expenses-icon" /> Expenses
          </li>
          <li>
            <Image src={usersIcon} alt="owners-icon" /> Owners
          </li>
          <li>
            <Image src={houseIcon} alt="objects-icon" /> Objects
          </li>
          <li>
            <Image src={peopleIcon} alt="users-icon" /> Users
          </li>
        </ul>
        <span className={styles.profile}>
          <Image src={userIcon} alt="my-profile-icon" /> My profile
        </span>

        <section className={styles.currency_badge}>
          <Badge text="NPR" />
          <Badge text="USD" />
        </section>
      </div>
    </section>
  );
}
