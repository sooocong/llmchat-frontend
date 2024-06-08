import React from 'react';

import Signup from '../../components/Signup/Signup';

const SignupPage = () => {
  return (
    <Signup
      openLogin={() => {
        return;
      }}
      closeSignup={() => {
        return;
      }}
      openSignup={true}
    />
  );
};

export { SignupPage };
