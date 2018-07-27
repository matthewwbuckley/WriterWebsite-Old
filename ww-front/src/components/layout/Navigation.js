import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/index.css';
import { logoutUser, getAllPieces } from '../../apiActions';

export class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 'recent',
      page: 1,
      isLast: false,
    };
    this.setSort = this.setSort.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  async componentWillMount() {
    const { sort, page } = this.state;
    await getAllPieces(this, sort, page);
  }

  async setSort(sort) {
    this.setState({ sort, page: 1 });
    getAllPieces(this, sort, 1);
  }

  async changePage(isNext) {
    let { page } = this.state;
    const { sort } = this.state;

    if (isNext) {
      page += 1;
      await this.setState({ page });
    } else {
      page -= 1;
      await this.setState({ page });
    }
    await getAllPieces(this, sort, page);
  }

  render() {
    const { pieces, page, isLast } = this.state;
    let display = 'Loading...';
    let piecePagination = '';

    // TODO: move this to its own functional component? seems simple enough
    if (pieces) {
      display = pieces.map((piece) => {
        const pieceURL = `/piece/${piece._id}`;
        return (
          <div key={piece._id}>
            <Link to={pieceURL}>
              {piece.title}
            </Link>
          </div>
        );
      });
    }

    if (page === 1) {
      piecePagination = (
        <div className="pagination-container">
          <div />
          <i
            onClick={() => { this.changePage(true); }}
            className="fa fa-chevron-circle-right"
            aria-hidden="true"
          />
        </div>
      );
    } else if (isLast) {
      piecePagination = (
        <div className="pagination-container">
          <i
            onClick={() => { this.changePage(false); }}
            className="fa fa-chevron-circle-left"
            aria-hidden="true"
          />
          <div />
        </div>
      );
    } else {
      piecePagination = (
        <div className="pagination-container">
          <i
            onClick={() => { this.changePage(false); }}
            className="fa fa-chevron-circle-left"
            aria-hidden="true"
          />
          <i
            onClick={() => { this.changePage(true); }}
            className="fa fa-chevron-circle-right"
            aria-hidden="true"
          />
        </div>
      );
    }

    return (
      <div className="navigation">
        <Link to="/">
          { 'Fancy Home Link' }
        </Link>
        <UserNav {...this.props} />
        <div className="pieces-list">
          <div className="pieces-list-header">
            { 'Pieces' }
            <i
              onClick={() => { this.setSort('recent'); }}
              className="fa fa-clock-o"
              aria-hidden="true"
            />
            <i
              onClick={() => { this.setSort('week'); }}
              className="fa fa-heart"
              aria-hidden="true"
            >
              <span className="icon-inset">
                { 'W' }
              </span>
            </i>
            <i
              onClick={() => { this.setSort('month'); }}
              className="fa fa-heart"
              aria-hidden="true"
            >
              <span className="icon-inset">
                { 'M' }
              </span>
            </i>
            <i
              onClick={() => { this.setSort('year'); }}
              className="fa fa-heart"
              aria-hidden="true"
            >
              <span className="icon-inset">
                { 'Y' }
              </span>
            </i>
          </div>
          {display}
          {piecePagination}
        </div>
      </div>
    );
  }
}

const UserNavigation = ({ username, userId }) => (
  <div>
    <div>
      { 'Hello ' }
      <Link to={`/user/${userId}`}>
        { `${username}.` }
      </Link>
      <button type="button" onClick={logoutUser}>
        { 'Logout?' }
      </button>
    </div>
    <div>
      <Link to="/write">
        { 'Publish a Piece' }
      </Link>
    </div>
  </div>
);


const SignIn = () => (
  <Link to="/registration">
    { 'Sign-up or Register' }
  </Link>
);

const UserNav = (props) => {
  try {
    const { app: { state: { user } } } = props;
    if (user && user.token) {
      return <UserNavigation {...props} username={user.username} userId={user.userId} />;
    }
    return <SignIn />;
  } catch (e) {
    console.log(e);
    return <SignIn />;
  }
};

export default Navigation;
