import React from 'react';
import './popup.css';

import arcClose from '../assets/icons/arcClose.png';
interface ICommonPop {
  message: string;
  callback: any;
  close: any;
}

export type { ICommonPop };
export default function CommonPoop(props: ICommonPop) {
  const { message, callback, close } = props;
  return (
    <div
      className={
        'confirm-pop flex flex-direction-column align-items-center justify-content-center'
      }
    >
      <button
        className={'common-close'}
        onClick={() => {
          callback && callback();
          close();
        }}
      >
        <img src={arcClose} alt="" />
      </button>
      <div
        className={
          'message-box flex align-items-center justify-content-center common'
        }
      >
        <p>{message}</p>
      </div>
    </div>
  );
}
