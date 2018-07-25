import React, { Component } from 'react';

class RatingSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
    };

    this.onClick = this.onClick.bind(this);
  }

  async onClick(value) {
    const { onClick } = this.props;
    await this.setState({ rating: value });
    await onClick(value);
  }

  render() {
    const { rating } = this.state;
    return (
      <div className="rating-container">
        <button
          type="button"
          className={rating === -3 ? 'rating-button selected' : 'rating-button'}
          onClick={() => { this.onClick(-3); }}
        >
          <i className="fa fa-minus-circle size3" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={rating === -2 ? 'rating-button selected' : 'rating-button'}
          onClick={() => { this.onClick(-2); }}
        >
          <i className="fa fa-minus-circle size2" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={rating === -1 ? 'rating-button selected' : 'rating-button'}
          onClick={() => { this.onClick(-1); }}
        >
          <i className="fa fa-minus-circle size1" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={rating === 0 ? 'rating-button selected' : 'rating-button'}
          onClick={() => { this.onClick(0); }}
        >
          <i className="fa fa-circle-o size2" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={rating === 1 ? 'rating-button selected' : 'rating-button'}
          onClick={() => { this.onClick(1); }}
        >
          <i className="fa fa-plus-circle size1" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={rating === 2 ? 'rating-button selected' : 'rating-button'}
          onClick={() => { this.onClick(2); }}
        >
          <i className="fa fa-plus-circle size2" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={rating === 3 ? 'rating-button selected' : 'rating-button'}
          onClick={() => { this.onClick(3); }}
        >
          <i className="fa fa-plus-circle size3" aria-hidden="true" />
        </button>

      </div>
    );
  }
}

export default RatingSelect;
