import React, { Component } from 'react';
import countWords from '../utility/countWords';

class FormTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      wordCount: 0,
    };

    this.getValue = this.getValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async onChange(e) {
    const { value } = e.target;
    const { onChange, variable } = this.props;

    const wordCount = await countWords(value);
    await this.setState({ wordCount });
    await onChange(variable, value);
    await onChange('wordCount', wordCount);
  }

  getValue() {
    const { value } = this.state;
    return value;
  }

  render() {
    const { wordCount } = this.state;
    const {
      wordLimit,
      wordSpread,
      error,
      placeholder,
      rows,
      value,
    } = this.props;

    const highlight = error ? 'span-highlight' : '';
    const spread = wordSpread ? `(±${wordSpread})` : '';
    const display = `${wordCount}/${wordLimit} ${spread}`;
    return (
      <div className="form-input-container">
        <div className="form-container-right">
          <span className={highlight}>
            {display}
          </span>
        </div>
        <textarea
          placeholder={placeholder}
          className="form-text-area"
          rows={rows}
          value={value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default FormTextArea;
