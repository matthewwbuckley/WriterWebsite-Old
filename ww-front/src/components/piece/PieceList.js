import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUserPieces } from '../../apiActions/index';

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

class UserPieceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pieces: null,
    };

    this.getPieces = this.getPieces.bind(this);
  }

  componentDidMount() {
    this.getPieces();
  }

  getPieces() {
    const { userId } = this.props;
    getUserPieces(this, userId);
  }

  render() {
    let pieceList = 'There are no published pieces.';
    const { pieces } = this.state;

    // the piece-link could be moved into its own component but is simple enough
    if (pieces) {
      pieceList = pieces.map(piece => (
        <div className="piece-link">
          <Link to={`/piece/${piece._id}`}>
            {piece.title}
          </Link>
          <div className="piece-info">
            {`Published ${formatDate(piece.datePublished)}`}
          </div>
        </div>
      ));
    }

    return (
      <div>
        <div className="piece-title">
          {'Published Pieces'}
        </div>
        { pieceList }
      </div>
    );
  }
}

export default UserPieceList;
