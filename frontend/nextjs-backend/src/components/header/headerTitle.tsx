'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import styles from './header.module.scss';
import arrowLeftIcon from '/public/icons/arrow-left.svg';
import { RESERVATIONS_ROUTE } from '@/lib/constants';

const childPages = ['add', 'edit'];
export default function HeaderTitle() {
  const pathname = usePathname();

  const route = pathname.split('/');
  const routeName = route[route.length - 1];

  let isChildRoute = false;
  let capitalizeRouteName = routeName[0].toUpperCase() + routeName.substring(1);

  if (childPages.includes(routeName)) {
    isChildRoute = true;
    let parentRoute = route[route.length - 2];
    if (parentRoute.endsWith('s')) {
      parentRoute = parentRoute.slice(0, -1);
    }

    const capitalizeParentRouteName = parentRoute[0].toUpperCase() + parentRoute.substring(1);

    capitalizeRouteName = capitalizeRouteName + ' ' + capitalizeParentRouteName;
  }

  return (
    <div className={styles.header_title}>
      {isChildRoute && (
        <Link href={RESERVATIONS_ROUTE}>
          <Image src={arrowLeftIcon} alt="arrow-left-icon" className={styles.arrow_icon} />
        </Link>
      )}
      {capitalizeRouteName}
    </div>
  );
}
