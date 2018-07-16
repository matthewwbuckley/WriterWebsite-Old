import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/index.css';
import { logoutUser, getAllPieces } from '../../apiActions';

export class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 'recent',
    };
    this.setSort = this.setSort.bind(this);
  }

  async componentWillMount() {
    const { sort } = this.state;
    await getAllPieces(this, sort);
  }

  async setSort(sort) {
    this.setState({ sort });
    getAllPieces(this, sort);
  }

  render() {
    const { pieces } = this.state;
    let display = '';

    // TODO: move this to its own functional component
    if (pieces) {
      display = pieces.map((piece) => {
        const pieceURL = `/piece/${piece._id}`;
        return (
          <div>
            <Link to={pieceURL}>
              {piece.title}
            </Link>
          </div>
        );
      });
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
        </div>
      </div>
    );
  }
}

const UserNavigation = ({ username }) => (
  <div>
    <div>
      { `Hello ${username}.` }
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
    const { app: { state: user } } = props;
    const { username, userId, token } = user.user;
    console.log('token', props, user, token);
    if (token) {
      return <UserNavigation {...props} username={username} userId={userId} />;
    }
    return <SignIn />;
  } catch (e) {
    console.log(e);
    return <SignIn />;
  }
};

export default Navigation;
