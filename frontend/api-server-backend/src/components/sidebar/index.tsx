import Image from 'next/image';

import styles from './sidebar.module.scss';

import {
  USERS_ROUTE,
  OWNERS_ROUTE,
  PRICING_ROUTE,
  PROFILE_ROUTE,
  EXPENSES_ROUTE,
  PROPERTY_ROUTE,
  DASHBOARD_ROUTE,
  RESERVATIONS_ROUTE,
} from '@/lib/constants';
import Badge from '../ui/badge';
import RouteLink from './routeLink';
import menuIcon from '/public/icons/menu.svg';
import cardIcon from '/public/icons/card.svg';
import userIcon from '/public/icons/user.svg';
import usersIcon from '/public/icons/users.svg';
import houseIcon from '/public/icons/house.svg';
import logo from '/public/images/logo-black.png';
import peopleIcon from '/public/icons/people.svg';
import walletIcon from '/public/icons/wallet.svg';
import PricingIcon from '../../../public/icons/pricing';

export default function Sidebar() {
  return (
    <section className={styles.aside}>
      <Image src={logo} alt="Website logo" width={300} className={styles.logo} />

      <div className={styles.sidebar_list}>
        <div className={styles.link_wrapper}>
          <RouteLink route={DASHBOARD_ROUTE} icon={menuIcon} routeName="Home" />

          <RouteLink route={PRICING_ROUTE} icon={<PricingIcon />} routeName="Pricing" jsx />

          <RouteLink route={RESERVATIONS_ROUTE} icon={cardIcon} routeName="Reservations" />

          <RouteLink route={EXPENSES_ROUTE} icon={walletIcon} routeName="Expenses" />

          <RouteLink route={OWNERS_ROUTE} icon={usersIcon} routeName="Owners" />

          <RouteLink route={PROPERTY_ROUTE} icon={houseIcon} routeName="Property" />

          <RouteLink route={USERS_ROUTE} icon={peopleIcon} routeName="Users" />
        </div>
        <span className={styles.profile}>
          <RouteLink route={PROFILE_ROUTE} icon={userIcon} routeName="My profile" />
        </span>

        <section className={styles.currency_badge}>
          <Badge text="NPR" />
          <Badge text="USD" />
        </section>
      </div>
    </section>
  );
}
