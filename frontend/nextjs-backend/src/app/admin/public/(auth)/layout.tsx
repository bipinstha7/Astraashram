import Image from 'next/image';

import styles from './authLayout.module.scss';
import logo from '/public/images/logo-white.png';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.auth_page}>
      <Image src={logo} alt="Website logo" width={300} />
      {children}
    </main>
  );
}
