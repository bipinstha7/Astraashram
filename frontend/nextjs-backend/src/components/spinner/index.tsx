import styles from './spinner.module.scss';

interface iSpinner {
  /**
   * Spinner width
   */
  width?: number;

  /**
   * Spinner border width
   */
  borderWidth?: number;
}

export default function Spinner({ width, borderWidth }: iSpinner) {
  let dynamicStyle = {};

  if (width) {
    dynamicStyle = { ...dynamicStyle, '--spinner-width': `${width}px` } as React.CSSProperties;
  }
  if (borderWidth) {
    dynamicStyle = { ...dynamicStyle, '--spinner-padding': `${borderWidth}px` };
  }

  return <div style={dynamicStyle} className={styles.spinner}></div>;
}
