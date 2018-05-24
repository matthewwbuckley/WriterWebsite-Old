import React from 'react';
import Navigation from './navigation';
import Main from './main';
import './css/index.css';

const Page = (props) => {

  return(
    <div className='page'>
      <Main {...props}/>
      <Navigation {...props} />
    </div>
  )
}

export default Page;