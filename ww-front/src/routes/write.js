import React, { Component } from 'react';
import PieceSubmissionForm from '../components/submissions/PieceSubmissionForm';

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordLimit: 10,
    };

    this.onClick = this.onClick.bind(this);
  }

  async onClick(value) {
    await this.setState({ wordLimit: value });
  }

  render() {
    const { wordLimit } = this.state;
    const info = `


Please take care to check that the piece before submission. This site does not allow editing post publication.
The piece can be added to a series once published.
Once submitted readings can be made of your work.`;

    return (
      <div className="content">
        <div className="content-left">
          <PieceSubmissionForm wordLimit={wordLimit} {...this.props} />
        </div>
        <div className="content-right">
          {info}
        </div>
      </div>
    );
  }
}


export default Write;
