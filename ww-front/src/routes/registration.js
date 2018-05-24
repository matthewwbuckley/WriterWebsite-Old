import React from 'react';
import { RegistrationForm } from '../components/registration/registrationForm'
import { SignInForm } from '../components/registration/signInForm'

const Registration = (props) => {
  return(
    <div className='content'>
      <div className='content-left'>
        <RegistrationForm {...props} />
      </div>
      <div className='content-right'>
        <SignInForm {...props} />
      </div>
    </div>
  )
}

export default Registration;