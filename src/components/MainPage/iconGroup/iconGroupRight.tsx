import React, { useState } from 'react';
import styles from '../Chatting/Chatting.module.css';

interface IconGroupRightProps {
  messageId: number;
  handleRatingClick: (messageId: number, rating: 'GOOD' | 'BAD') => void;
}

const IconGroupRight: React.FC<IconGroupRightProps> = ({ messageId, handleRatingClick }) => {
  const [clickedIcon, setClickedIcon] = useState<string | null>(null);

  const handleGoodIconClick = () => {
    setClickedIcon(clickedIcon === 'good' ? null : 'good');
    handleRatingClick(messageId, 'GOOD');
  };

  const handleBadIconClick = () => {
    setClickedIcon(clickedIcon === 'bad' ? null : 'bad');
    handleRatingClick(messageId, 'BAD');
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
