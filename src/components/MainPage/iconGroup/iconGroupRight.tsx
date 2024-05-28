import React, { useState } from 'react';
import styles from '../Chatting/Chatting.module.css';

const IconGroupRight = () => {
  const [clickedIcon, setClickedIcon] = useState<string | null>(null);

  const handleGoodIconClick = () => {
    setClickedIcon(clickedIcon === 'good' ? null : 'good');
  };

  const handleBadIconClick = () => {
    setClickedIcon(clickedIcon === 'bad' ? null : 'bad');
  };

  return (
    <div className={styles.iconGroupRight}>
      <div
        className={
          clickedIcon === 'good' ? styles.clickGoodIcon : styles.goodIcon
        }
        onClick={handleGoodIconClick}
      ></div>
      <div
        className={clickedIcon === 'bad' ? styles.clickBadIcon : styles.badIcon}
        onClick={handleBadIconClick}
      ></div>
    </div>
  );
};

export default IconGroupRight;
