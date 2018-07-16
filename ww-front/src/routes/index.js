import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Registration from './registration';
import Write from './write';
import Piece from './piece';


export default class Routes extends Component {
  // After consultation with someone on discord
  PrivateRoute({ component: Comp, ...rest }) {
    const { app } = this.props;
    return (
      <Route
        {...rest}
        render={({ props }) => (
          (localStorage.token && localStorage.token !== '')
            ? <Comp {...props} app={app} />
            : <Redirect to="/register" />
        )}
      />
    );
  }

  render() {
    const { app } = this.props;
    return (
      <main>
        <Switch>
          <Route exact path="/" render={props => <Home {...props} app={app} />} />
          {/*
            Below is the official hack for passing down props to a component.
            <Route exact path='/user/:userID' render={()=><UserPage />} />
          */}
          <Route exact path="/registration" render={props => <Registration {...props} app={app} />} />
          <Route exact path="/write" render={props => <Write {...props} app={app} />} />
          <Route exact path="/piece/:pieceId" render={props => <Piece {...props} app={app} />} />
        </Switch>
      </main>
    );
  }
}
