import React, { Component } from 'react';
import { compose } from 'recompose';
import './css/form.css';


export class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  async onChange(e) {
    const { onChange, variable } = this.props;
    onChange(variable, e.target.value);
  }

  getValue() {
    const { value } = this.state;
    return value;
  }

  render() {
    const { placeholder, type, value } = this.props;
    return (
      <div className="form-input-container">
        <input
          type={type}
          className="form-input"
          placeholder={placeholder}
          value={value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}


function withLabel(Comp) {
  return ({ label, ...rest }) => (
    <div className="form-input-container">
      <div className="form-label">
        {label}
      </div>
      <Comp {...rest} />
    </div>
  );
}

function withError(Comp) {
  return ({ error, ...rest }) => (
    <div>
      <div className="form-error">
        {error}
      </div>
      <Comp {...rest} />
    </div>
  );
}

const withFeatures = compose(
  withLabel,
  withError,
);
export const FormInputWithFeatures = withFeatures(FormInput);


export default FormInput;
