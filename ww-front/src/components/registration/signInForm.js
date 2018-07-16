import React, { Component } from 'react';
import get from 'lodash/get';
import { Redirect } from 'react-router-dom';
import { FormInputWithFeatures } from '../form/FormInput';
import FormButton from '../form/FormButton';
import { signIn } from '../../apiActions';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorUsername: '',
      errorPassword: '',
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
    const { username, password, error } = this.state;
    if (!error) {
      await signIn(this, username, password);
    }
  }

  errorCheck() {
    const errorUsername = '';
    const errorPassword = '';
    let error = false;

    const { username, password } = this.state;

    const isFormComplete = Boolean(
      username.length === 0
      || password.length === 0,
    );

    if (isFormComplete) {
      error = true;
    }

    this.setState({
      errorUsername,
      errorPassword,
      error,
    });
  }

  render() {
    const user = get(this.props, 'app.state.user');

    const { error, errorUsername, errorPassword } = this.state;

    if (user) {
      return (<Redirect to="/" />);
    }

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.onClick();
        }}
        className="form-container"
      >
        {'Sign In'}
        <FormInputWithFeatures
          onChange={this.onChange}
          variable="username"
          placeholder="Please enter your username"
          label="Username"
          error={errorUsername}
        />
        <FormInputWithFeatures
          onChange={this.onChange}
          variable="password"
          placeholder="Please enter your password"
          label="Password"
          type="password"
          error={errorPassword}
        />
        <div className="form-container-right">
          <FormButton isActive={!error} text="Sign In" onClick={this.onClick} />
        </div>
      </form>
    );
  }
}

export default SignInForm;
