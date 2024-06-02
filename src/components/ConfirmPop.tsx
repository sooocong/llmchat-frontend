import React from 'react';
import "./popup.css";
interface IConfirmPop {
  message: string;
  callback: any;
  close: any;
}

export type {
  IConfirmPop
}
export default function ConfirmPoop(props: IConfirmPop) {
  const { message,callback, close } = props;
  return (
    <div className={'confirm-pop flex flex-direction-column align-items-center justify-content-center'}>
      <div className={'message-box flex align-items-center justify-content-center'}>
        <p>{message}</p>
      </div>
      <div className={'btn-box w-full flex justify-content-end align-items-center'}>
        <div>
          <button className={'cancel'} onClick={() => close()}>아니요</button>
          <button className={'submit'} onClick={() => {
            callback();
            close();
          }}>예</button>
        </div>
      </div>
    </div>
  );
}
