import React from 'react';
import { useRouteError } from 'react-router-dom';
import style from './ErrorPage.module.css';
import { ReactComponent as AerochatIcon } from '../../assets/aerochatIcon.svg';

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={style.errorContainer}>
      <AerochatIcon width={'100px'} height={'100px'} />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{(error as Error)?.message || 'Unknown error'}</i>
      </p>
    </div>
  );
};
