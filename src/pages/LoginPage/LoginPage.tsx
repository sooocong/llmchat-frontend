import React from 'react';

import Login from '../../components/Login/Login';

const LoginPage = () => {
  return (
    <Login
      openLogin={true}
      closeLogin={() => {
        return;
      }}
      openSignup={() => {
        return;
      }}
    />
  );
};

export { LoginPage };
