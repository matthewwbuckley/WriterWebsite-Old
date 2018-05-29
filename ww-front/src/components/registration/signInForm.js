import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FormInputWithFeatures } from '../form/textInput'
import { FormButton } from '../form/button'
import { signIn } from '../../apiActions';

export class SignInForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      errorUsername:'',
      errorPassword:'',
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
    const {username, password} = this.state;
    await signIn(this, username, password);
  }

  errorCheck(){
    let errorUsername = '';
    let errorPassword = '';
    let error = false;

    const isFormComplete = Boolean(
      this.state.username.length === 0 ||
      this.state.password.length === 0 
    )

    if(isFormComplete){
      error = true;
    }

    
    this.setState({
      errorUsername,
      errorPassword,
      error
    })
  }

  render(){
    if(this.props.app.state && this.props.app.state.user){
      return(<Redirect to='/' />)
    }

    return(
      <div className='form-container'>
        Sign In
        <FormInputWithFeatures 
          onChange={this.onChange} 
          variable='username' 
          placeholder='Please enter your username' 
          label='Username'
          error={this.state.errorUsername}
        />
        <FormInputWithFeatures
          onChange={this.onChange} 
          variable='password' 
          placeholder='Please enter your password' 
          label='Password' 
          type='password'
          error={this.state.errorPassword}
        />
        <div className='form-container-right'>
          <FormButton isActive={!this.state.error} text='Sign In' onClick={this.onClick} />
        </div>
      </div>
    )
  }
}