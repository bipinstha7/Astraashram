import Image from 'next/image';

import styles from './pdfReports.module.scss';
import documentIcon from '/public/icons/document.svg';

export default function PDFReports() {
  return (
    <div className={styles.pdf_reports}>
      <section className={styles.title}>Recently Generated Reports</section>
      <section className={styles.pdfs}>
        <a href="">
          <Image src={documentIcon} alt="document-icon" /> Report from 01.01.2024.PDF
        </a>
        <a href="">
          <Image src={documentIcon} alt="document-icon" />
          Report from 01.02.2024.PDF
        </a>
        <a href="">
          <Image src={documentIcon} alt="document-icon" />
          Report from 01.03.2024.PDF
        </a>
      </section>
    </div>
  );
}
