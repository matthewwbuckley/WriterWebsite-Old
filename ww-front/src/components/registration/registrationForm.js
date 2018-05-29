import React, { Component } from 'react';
import { FormInputWithFeatures } from '../form/textInput';
import { FormButton } from '../form/button';
import { register } from '../../apiActions/index';

export class RegistrationForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      passwordConfirm:'',
      email:'',
      errorUsername:'',
      errorPassword:'',
      errorPasswordConfirm:'',
      errorEmail:'',
      error: true
    }

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  async onChange(variable, value){
    await this.setState({[variable]: value})
    this.errorCheck()
  }

  async onClick(){
    let {username, password, email} = this.state;
    register(this, username, password, email);
  }

  errorCheck(){
    let errorUsername = '';
    let errorPassword = '';
    let errorPasswordConfirm = '';
    let errorEmail = '';
    let error = false;

    const isFormComplete = Boolean(
      this.state.username.length === 0 ||
      this.state.password.length === 0 ||
      this.state.passwordConfirm.length === 0 ||
      this.state.email.length === 0
    )

    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    // http://form.guide/best-practices/validate-email-address-using-javascript.html
    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    if(isFormComplete){
      error = true;
    }

    if(this.state.username.length > 0 && this.state.username.length < 5){
      errorUsername = 'Username must be at least 4 characters long.';
      error = true;
    }

    if(this.state.password.length > 0 && this.state.password.length < 8){
      errorPassword = 'Password must be more than 8 characters long';
      error = true;
    }

    if(this.state.password.length > 0 && this.state.passwordConfirm.length > 0){
      if(this.state.password !== this.state.passwordConfirm){
        errorPasswordConfirm = 'Passwords do not match'
        error = true;
      }
    }

    if(this.state.email.length > 0 && !validateEmail(this.state.email)){
      errorEmail = 'Please enter a valid email address';
      error = true;
    }
    
    this.setState({
      errorUsername,
      errorPassword,
      errorPasswordConfirm,
      errorEmail,
      error
    })
  }

  render(){
    return(
      <div className='form-container'>
        Registration
        <FormInputWithFeatures 
          onChange={this.onChange} 
          variable='username' 
          placeholder='Please enter a username' 
          label='Username'
          error={this.state.errorUsername}
        />
        <FormInputWithFeatures
          onChange={this.onChange} 
          variable='password' 
          placeholder='Please enter a password' 
          label='Password' 
          type='password'
          error={this.state.errorPassword}
        />
        <FormInputWithFeatures 
          onChange={this.onChange} 
          variable='passwordConfirm' 
          placeholder='Please enter a password' 
          label='Confirm Password' 
          type='password'
          error={this.state.errorPasswordConfirm}
        />
        <FormInputWithFeatures
          onChange={this.onChange} 
          variable='email' 
          placeholder='Please enter an email adress' 
          label='Email'
          error={this.state.errorEmail}
        />
        <div className='form-container-right'>
          <FormButton isActive={!this.state.error} text='Register' onClick={this.onClick} />
        </div>
      </div>
    )
  }
}