import React, { createContext, useMemo, useState } from 'react';
import ConfirmPoop from '../components/ConfirmPop';

import "../components/popup.css";
import CommonPoop from '../components/CommonPop';

type IPopType = 'confirm' | 'common';
interface IPopupState {
  type: IPopType;
  message: string;
  active: boolean;
  callback: any;
}
interface IPopupProvider {
  popState: IPopupState;
  showConfirmPop: (message: string, callback: any) => any;
  showCommonPop: (message: string, callback: any) => any;
}

export type {
  IPopupState,
  IPopupProvider
}

const PopupContext = createContext<IPopupProvider>({
  popState: {
    message: '',
    active: false,
    type: 'confirm',
    callback: null
  },
  showConfirmPop: (message: string) => null,
  showCommonPop: (message: string) => null
});

export { PopupContext }


export default function PopupProvider(props: any) {
  const { children } = props;
  const [popState, setPopState] = useState<IPopupState>({
    type: 'confirm',
    active: false,
    message: '',
    callback: null
  })

  const showConfirmPop = (message: string, callback: any) => {
    setPopState({
      type: 'confirm',
      active: true,
      message,
      callback
    });
  }

  const showCommonPop = (message: string, callback: any) => {
    setPopState({
      type: 'common',
      active: true,
      message,
      callback
    });
  }

  const close = () => {
    setPopState({
      ...popState,
      active: false,
    })
  }

  const SelectedPop = useMemo(() => {
    if (!popState?.active) return "";
    switch (popState.type) {
      case 'confirm':
        return (
          <ConfirmPoop message={popState.message}  callback={popState.callback} close={close}/>
        );
      case 'common':
        return (
          <CommonPoop message={popState.message}  callback={popState.callback} close={close}/>
        );
      default:
        return "";
    }
  }, [popState]);

  return (
    <PopupContext.Provider value={{ popState, showConfirmPop, showCommonPop }}>
      {SelectedPop}
      {children}
    </PopupContext.Provider>
  )
}
