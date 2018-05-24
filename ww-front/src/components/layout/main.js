import React from 'react';
import Routes from '../../routes'

const Main = (props) => {
  return(
    <div className='main'>
      <Routes {...props}/>
    </div>
  )
}

export default Main;