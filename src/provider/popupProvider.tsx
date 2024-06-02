import React, { createContext, useMemo, useState } from 'react';
import ConfirmPoop from '../components/ConfirmPop';

import "../components/popup.css";

type IPopType = 'confirm';
interface IPopupState {
  type: IPopType;
  message: string;
  active: boolean;
  callback: any;
}
interface IPopupProvider {
  popState: IPopupState;
  showConfirmPop: (message: string, callback: any) => any;
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
  showConfirmPop: (message: string) => null
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
      default:
        return "";
    }
  }, [popState]);

  return (
    <PopupContext.Provider value={{ popState, showConfirmPop }}>
      {SelectedPop}
      {children}
    </PopupContext.Provider>
  )
}
