'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import styles from './sidebar.module.scss';

interface iRouteLink {
  route: string;
  routeName: string;
  jsx?: Boolean;
  icon: string | JSX.Element;
}

export default function RouteLink({ route, icon, routeName, jsx }: iRouteLink) {
  const pathname = usePathname();

  const isActive = pathname === route;

  return (
    <Link href={route} className={isActive ? styles.active : ''}>
      {jsx ? icon : <Image src={icon as string} alt={`${routeName}-icon`} />}
      {routeName}
    </Link>
  );
}
