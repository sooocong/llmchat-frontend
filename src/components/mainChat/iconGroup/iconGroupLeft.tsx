import React from 'react';
import styles from '../chatting.module.css';

const IconGroupLeft = () => (
  <div className={styles.iconGroupLeft}>
    <div className={styles.speakerIcon}></div>
    <div className={styles.copyIcon}></div>
    <div className={styles.reanswerIcon}></div>
    <div className={styles.shareIcon}></div>
  </div>
);

export default IconGroupLeft;
