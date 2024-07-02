import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import styles from './privateLayout.module.scss';
import Drawer from '@/components/drawer';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={styles.main}>
      <aside className={styles.aside}>
        <Sidebar />
      </aside>
      <aside className={styles.mobile_aside}>
        <Drawer>
          <Sidebar />
        </Drawer>
      </aside>
      <Header gridClassName={styles.header} />
      <main className={styles.main_content}>{children}</main>
    </section>
  );
}
