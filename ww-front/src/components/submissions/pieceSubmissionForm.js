import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FormInputWithFeatures } from '../form/FormInput';
import TextArea from '../form/FormTextArea';
import FormButton from '../form/FormButton';
import { submitPiece } from '../../apiActions/index';


class PieceSubmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      wordCount: 0,
      wordLimit: 100,
      wordSpread: 10,
      error: true,
      lengthError: true,
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  async componentWillReceiveProps(newProps) {
    await this.setState({ wordLimit: newProps.wordLimit });
    await this.errorCheck();
  }

  async onChange(variable, value) {
    await this.setState({ [variable]: value });
    await this.errorCheck();
  }

  async onClick() {
    const {
      error,
      title,
      text,
    } = this.state;

    const {
      wordLimit,
      app: { state: { user: { userId } } },
    } = this.props;

    if (!error) {
      await submitPiece(this, userId, title, text, wordLimit);
    }
  }

  async errorCheck() {
    // let errorTitle = '';
    // let errorText = '';
    let error = false;
    let lengthError = false;
    let { wordLimit, wordSpread } = this.state;
    let upper = wordLimit + wordSpread;
    let lower = wordLimit - wordSpread;

    const {
      title,
      text,
      wordCount,
    } = this.state;

    const isFormIncomplete = Boolean(
      title.length === 0
      || text.length === 0,
    );

    if (isFormIncomplete) {
      error = true;
    }

    if (wordCount > 301 && wordLimit !== 400) {
      wordLimit = 400;
      wordSpread = 40;
      upper = wordLimit + wordSpread;
      lower = wordLimit - wordSpread;
      this.setState({ wordLimit, wordSpread });
    }

    if (wordCount < 300 && wordCount > 151 && wordLimit !== 200) {
      wordLimit = 200;
      wordSpread = 20;
      upper = wordLimit + wordSpread;
      lower = wordLimit - wordSpread;
      this.setState({ wordLimit, wordSpread });
    }

    if (wordCount < 150 && wordLimit !== 100) {
      wordLimit = 100;
      wordSpread = 10;
      upper = wordLimit + wordSpread;
      lower = wordLimit - wordSpread;
      this.setState({ wordLimit, wordSpread });
    }

    if (wordCount > upper || wordCount < lower) {
      error = true;
      lengthError = true;
    }

    await this.setState({
      error,
      lengthError,
    });
  }

  render() {
    const {
      pieceId,
      errorUsername,
      wordLimit,
      wordSpread,
      error,
      lengthError,
    } = this.state;

    if (pieceId) {
      const redirect = `/piece/${pieceId}`;
      return (<Redirect to={redirect} />);
    }

    return (
      <div className="form-container">
        {'Piece Submission'}
        <FormInputWithFeatures
          onChange={this.onChange}
          variable="title"
          placeholder="Title of the Piece"
          label="Title"
          error={errorUsername}
        />
        <TextArea
          onChange={this.onChange}
          variable="text"
          wordLimit={wordLimit}
          wordSpread={wordSpread}
          error={lengthError}
          rows={10}
          placeholder="Please write you piece here ..."
        />
        <div className="form-container-right">
          <FormButton isActive={!error} text="Publish" onClick={this.onClick} />
        </div>
      </div>
    );
  }
}

export default PieceSubmissionForm;
