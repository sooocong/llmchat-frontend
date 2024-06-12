import React, { createContext, useMemo, useState } from 'react';
import ConfirmPoop from '../components/ConfirmPop';

import "../components/popup.css";
<<<<<<< HEAD
import CommonPoop from '../components/CommonPop';

type IPopType = 'confirm' | 'common';
=======

type IPopType = 'confirm';
>>>>>>> ea18b396e5ae9996731714964db9bb61ac3416bf
interface IPopupState {
  type: IPopType;
  message: string;
  active: boolean;
  callback: any;
}
interface IPopupProvider {
  popState: IPopupState;
  showConfirmPop: (message: string, callback: any) => any;
<<<<<<< HEAD
  showCommonPop: (message: string, callback: any) => any;
=======
>>>>>>> ea18b396e5ae9996731714964db9bb61ac3416bf
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
<<<<<<< HEAD
  showConfirmPop: (message: string) => null,
  showCommonPop: (message: string) => null
=======
  showConfirmPop: (message: string) => null
>>>>>>> ea18b396e5ae9996731714964db9bb61ac3416bf
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

<<<<<<< HEAD
  const showCommonPop = (message: string, callback: any) => {
    setPopState({
      type: 'common',
      active: true,
      message,
      callback
    });
  }

=======
>>>>>>> ea18b396e5ae9996731714964db9bb61ac3416bf
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
<<<<<<< HEAD
      case 'common':
        return (
          <CommonPoop message={popState.message}  callback={popState.callback} close={close}/>
        );
=======
>>>>>>> ea18b396e5ae9996731714964db9bb61ac3416bf
      default:
        return "";
    }
  }, [popState]);

  return (
<<<<<<< HEAD
    <PopupContext.Provider value={{ popState, showConfirmPop, showCommonPop }}>
=======
    <PopupContext.Provider value={{ popState, showConfirmPop }}>
>>>>>>> ea18b396e5ae9996731714964db9bb61ac3416bf
      {SelectedPop}
      {children}
    </PopupContext.Provider>
  )
}
