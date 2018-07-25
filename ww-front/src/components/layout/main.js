import React from 'react';
import Routes from '../../routes';

const Main = props => (
  <div className="main">
    <div className="content-container">
      <Routes {...props} />
    </div>
  </div>
);


export default Main;
