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
The piece can be 100, 200, or 400 words long. 

Please take care to check that the piece before submission. This site does not allow editing or deletion post publication.`;

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
