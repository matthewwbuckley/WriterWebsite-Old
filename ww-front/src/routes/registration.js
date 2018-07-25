import React from 'react';
import RegistrationForm from '../components/registration/RegistrationForm';
import SignInForm from '../components/registration/SignInForm';

const Registration = ({ props }) => (
  <div className="content">
    <div className="content-left">
      <RegistrationForm {...props} />
    </div>
    <div className="content-right">
      <SignInForm {...props} />
    </div>
  </div>
);


export default Registration;
