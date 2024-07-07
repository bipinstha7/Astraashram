'use client';

import { usePathname } from 'next/navigation';

export default function HeaderTitle() {
  const pathname = usePathname();

  const route = pathname.split('/');
  const routeName = route[route.length - 1];
  const capitalizeRouteName = routeName[0].toUpperCase() + routeName.substring(1);

  return capitalizeRouteName;
}
