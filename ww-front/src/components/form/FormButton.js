import React, { Component } from 'react';
import './css/form.css';


class FormButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    const { onClick, value } = this.props;
    onClick(value);
  }


  render() {
    const { isActive, text } = this.props;
    const classString = isActive ? 'form-button' : 'form-button inactive';

    return (
      <div className="form-input-container">
        <button type="submit" className={classString} onClick={this.onClick}>
          {text}
        </button>
      </div>
    );
  }
}

export default FormButton;
