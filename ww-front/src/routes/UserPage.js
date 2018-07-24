import React, { Component } from 'react';
import UserPieceList from '../components/piece/PieceList';

class UserPage extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const { match: { params: { userId } } } = this.props;
    return (
      <div className="content">
        <div className="content-left">
          <UserPieceList userId={userId} />
        </div>
        <div className="content-left" />
      </div>
    );
  }
}

export default UserPage;
