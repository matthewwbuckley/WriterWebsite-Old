import React from 'react';
import { Navigation } from './Navigation';
import Main from './Main';
import './css/index.css';

const Page = props => (
  <div className="page">
    <Main {...props} />
    <Navigation {...props} />
  </div>
);


export default Page;
