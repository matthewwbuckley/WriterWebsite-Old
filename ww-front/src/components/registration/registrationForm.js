import React, { Component } from 'react';
import { FormInputWithFeatures } from '../form/FormInput';
import FormButton from '../form/FormButton';
import { register } from '../../apiActions/index';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      errorUsername: '',
      errorPassword: '',
      errorPasswordConfirm: '',
      errorEmail: '',
      error: true,
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  async onChange(variable, value) {
    await this.setState({ [variable]: value });
    this.errorCheck();
  }

  async onClick() {
    const {
      username,
      password,
      email,
      error,
    } = this.state;
    if (!error) {
      register(this, username, password, email);
    }
  }

  errorCheck() {
    let errorUsername = '';
    let errorPassword = '';
    let errorPasswordConfirm = '';
    let errorEmail = '';
    let error = false;

    const {
      username,
      password,
      passwordConfirm,
      email,
    } = this.state;

    const isFormComplete = Boolean(
      username.length === 0
      || password.length === 0
      || passwordConfirm.length === 0
      || email.length === 0,
    );

    // TODO: Maybe move this to utility
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    // http://form.guide/best-practices/validate-email-address-using-javascript.html
    function validateEmail(emailToValidate) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(emailToValidate).toLowerCase());
    }

    if (isFormComplete) {
      error = true;
    }

    if (username.length > 0 && username.length < 5) {
      errorUsername = 'Username must be at least 4 characters long.';
      error = true;
    }

    if (password.length > 0 && password.length < 8) {
      errorPassword = 'Password must be more than 8 characters long';
      error = true;
    }

    if (password.length > 0 && passwordConfirm.length > 0) {
      if (password !== passwordConfirm) {
        errorPasswordConfirm = 'Passwords do not match';
        error = true;
      }
    }

    if (email.length > 0 && !validateEmail(email)) {
      errorEmail = 'Please enter a valid email address';
      error = true;
    }

    this.setState({
      errorUsername,
      errorPassword,
      errorPasswordConfirm,
      errorEmail,
      error,
    });
  }

  render() {
    const {
      error,
      errorUsername,
      errorPassword,
      errorPasswordConfirm,
      errorEmail,
    } = this.state;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.onClick();
        }}
        className="form-container"
      >
        <div className="title-container">
          <div className="title-text">
            {'Register'}
          </div>
          <div className="error-text">
            {error}
          </div>
        </div>
        <FormInputWithFeatures
          onChange={this.onChange}
          variable="username"
          placeholder="Please enter a username"
          label="Username"
          error={errorUsername}
        />
        <FormInputWithFeatures
          onChange={this.onChange}
          variable="password"
          placeholder="Please enter a password"
          label="Password"
          type="password"
          error={errorPassword}
        />
        <FormInputWithFeatures
          onChange={this.onChange}
          variable="passwordConfirm"
          placeholder="Please enter a password"
          label="Confirm Password"
          type="password"
          error={errorPasswordConfirm}
        />
        <FormInputWithFeatures
          onChange={this.onChange}
          variable="email"
          placeholder="Please enter an email adress"
          label="Email"
          error={errorEmail}
        />
        <div className="form-container-right">
          <FormButton submit isActive={!error} text="Register" onClick={() => { return null; }} />
        </div>
      </form>
    );
  }
}

export default RegistrationForm;
