import React, {Component} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './home';
import Registration from './registration';
import Write from './write';
import Piece from './piece';


class Routes extends Component{
  constructor(props){
    super(props);
    
  }

  // After consultation with someone on discord
  PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      (localStorage.token && localStorage.token !== "")
        ? <Component {...props} app={this.props.app} />
        : <Redirect to='/register' />
    )} />
  )

  render(){
    return(
    <main>
      <Switch>
        <Route exact path='/' render={(props)=><Home {...props} {...this.props}/>}/>
        {/* 
          Below is the official hack for passing down props to a component.
          It makes me wonder if these whole "Consoldate the State" is worth abandoning?
          I mean, can't I just send this form from the registration form?
          <Route exact path='/user/:userID' render={()=><UserPage />} />
        */}
        <Route exact path='/registration' render={(props)=><Registration {...props} {...this.props} />} />
        <Route exact path='/write' render={(props)=><Write {...props} {...this.props} />} />
        <Route exact path='/piece/:pieceId' render={(props)=><Piece {...props} {...this.props} />} />
      </Switch>
    </main>
    )
  }
}

export default Routes;