import React from 'react';
import styles from './ButtonList.module.css';
import { ReactComponent as UserIcon } from '../../../assets/user.svg';
import { ReactComponent as SettingIcon } from '../../../assets/setting.svg';

function ButtonList() {
  return (
      <ul className={styles.buttonList}>
        <li className={styles.sbutton}><SettingIcon width="50" height="50" /><div>설정</div></li>
        <li className={styles.sbutton}><UserIcon width="50" height="50" /><div>홍길동</div></li>
      </ul>
  );
}

export { ButtonList };
