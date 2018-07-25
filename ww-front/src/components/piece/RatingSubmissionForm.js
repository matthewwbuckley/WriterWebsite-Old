import React, { Component } from 'react';
import FormTextArea from '../form/FormTextArea';
import FormButton from '../form/FormButton';
import RatingSelect from './RatingSelect';
import { submitRating } from '../../apiActions';

class RatingSubmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: true,
      text: '',
      wordCount: 0,
      rating: null,
    };

    this.onChange = this.onChange.bind(this);
    this.errorCheck = this.errorCheck.bind(this);
    this.setRating = this.setRating.bind(this);
    this.submit = this.submit.bind(this);
  }

  async onChange(variable, value) {
    await this.setState({ [variable]: value });
    await this.errorCheck();
  }

  async setRating(value) {
    await this.setState({ rating: value });
    await this.errorCheck();
  }

  async submit() {
    const { rating, text, error } = this.state;
    const {
      wordLimit,
      match: { params: { pieceId } },
      app: { state: { user: { userId } } },
    } = this.props;
    if (!error) {
      submitRating(
        this,
        pieceId,
        userId,
        rating,
        text,
        wordLimit,
      );
    }
  }

  async errorCheck() {
    let error = false;
    const { wordCount, rating } = this.state;
    const { wordLimit } = this.props;

    if (wordCount > wordLimit) {
      error = true;
    }

    if (rating === null) {
      error = true;
    }

    await this.setState({ error });
  }

  render() {
    const { wordLimit } = this.props;
    const { error } = this.state;

    return (
      <div className="rating-form-container">
        <RatingSelect onClick={this.setRating} />
        <FormTextArea
          variable="text"
          wordLimit={wordLimit}
          placeholder="Optionally, submit a comment with your rating."
          onChange={this.onChange}
        />
        <div className="form-container-right">
          <FormButton text="Submit Rating" isActive={!error} onClick={this.submit} />
        </div>
      </div>
    );
  }
}

export default RatingSubmissionForm;
