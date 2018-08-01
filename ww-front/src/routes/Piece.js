import React, { Component } from 'react';
import get from 'lodash/get';
import PieceDisplay from '../components/piece/PieceDisplay';
import RatingSubmissionForm from '../components/piece/RatingSubmissionForm';
import { getPiece } from '../apiActions/index';
import Comment from '../components/piece/Comment';
import '../components/piece/css/index.css';
import RatingSelect from '../components/piece/RatingSelect';

// will want to move this to a helper file
// https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number/29272095#29272095
const getGetOrdinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemper', 'October', 'November', 'December'];
  const formattedDate = `${getGetOrdinal(date.getUTCDate())} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  return formattedDate;
};

class Piece extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      revealed: false,
    };

    this.refreshPiece = this.refreshPiece.bind(this);
    this.revealRatings = this.revealRatings.bind(this);
  }

  async componentDidMount() {
    const propsUser = get(this.props, 'app.state.user', {});
    this.setState({ user: propsUser });

    if (propsUser) {
      console.log("PropsUser",propsUser);
      this.refreshPiece(propsUser._id);
    } else {
      console.log("no props user")
      this.refreshPiece();
    }
  }

  revealRatings() {
    const { revealed } = this.state;
    this.setState({ revealed: !revealed });
  }

  refreshPiece(userId = undefined) {
    try {
      const { match: { params: { pieceId } } } = this.props;
      getPiece(this, pieceId, userId);
    } catch (e) {
      console.log('no piece');
    }
  }

  componentDidUpdate() {
    const {
      piece,
      revealed,
      user: stateUser,
    } = this.state;

    const pieceId = get(this.props, 'match.params.pieceId', null);
    const propsUser = get(this.props, 'app.state.user', {});

    console.log(piece, pieceId, stateUser, propsUser)

    if (piece && ((piece._id !== pieceId) || (stateUser.userId !== propsUser.userId) )) {
      this.setState({ user: propsUser });
      if (revealed) {
        this.setState({ revealed: false });
      }
      if (propsUser) {
        this.refreshPiece(propsUser.userId);
      } else {
        this.refreshPiece();
      }
    }
  }

  render() {
    let ratingSubmission = '';
    let ratings = [];
    let revealButton = '';

    const {
      piece,
      revealed,
      user: stateUser,
    } = this.state;

    const pieceId = get(this.props, 'match.params.pieceId', null);
    const propsUser = get(this.props, 'app.state.user', null);

    if (propsUser) {
      if (piece) {
        // checks if the user has voted
        if (piece.ratings.count.year === undefined) {
          ratingSubmission = (
            <RatingSubmissionForm {...this.props} wordLimit={piece.wordLimit / 10} />
          );
        }
      }
    }

    if (propsUser) {
      if (piece && piece.ratings.all[0] && piece.ratings.all[0].rating !== null) {
        ratings = piece.ratings.all.map((rating) => {
          const date = formatDate(rating.dateCreated);
          return (
            <Comment
              rating={rating.rating}
              comment={rating.comment}
              username={rating.userId.username}
              date={date}
              key={rating._id}
            />
          );
        });

        revealButton = (
          <button
            type="button"
            className="form-button secondary push-up"
            onClick={this.revealRatings}
          >
            {revealed ? 'Hide Comments' : 'Show Comments'}
          </button>
        );
      } else {
        revealButton = (
          <button
            type="button"
            className="form-button secondary push-up"
          >
            {'Rate to see comments'}
          </button>
        );
      }
    } else {
      revealButton = (
        <button
          type="button"
          className="form-button secondary push-up"
        >
          {'Sign In and Rate to see comments'}
        </button>
      );
    }

    if (piece) {
      const formattedDate = formatDate(piece.datePublished);

      return (
        <div className="content">
          <div className="content-left">
            <PieceDisplay
              author={piece.author.username}
              authorId={piece.author._id}
              title={piece.title}
              text={piece.text}
              datePublished={formattedDate}
            />
          </div>
          <div className="content-right">
            <div className="rating-container">
              {ratingSubmission}
            </div>
            <div className={revealed ? 'rating-container show' : 'rating-container hide'}>
              {ratings}
            </div>
            {revealButton}
          </div>
        </div>
      );
    }

    return (
      <div />
    );
  }
}

export default Piece;
