import React from 'react';

const Home = () => (
  <div className="content">
    <div className="content-left">
      <div className='piece-title'>
        {'Home'}
      </div >
      <div className='piece-text'>
      {`
This site allows users to submit and comment on short stories (which you can in the bar on the right), with four restrictions in mind.

1) A restricted wordcount - so people are concise

2) Simple/no styling - so images and styling do not sway the reader

3) No editing after submission - so people treat submissions with care

4) Comments and reviews are unknown before rating - so reviews are not influenced by public opinion

Please feel free to sign up, post and review the short stories posted here.`}
      </div>
    </div>
    <div className="content-right">

    </div>
  </div>
);

export default Home;
