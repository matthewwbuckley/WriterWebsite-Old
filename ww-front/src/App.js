import React, { Component } from 'react';
import './App.css';
import { withRouter, Redirect } from 'react-router-dom';
import Page from './components/layout/page';
import { setAppRef, refresh } from './apiActions';

class App extends Component {
  componentWillMount() {
    setAppRef(this);
    this.state = {
      redirect: false,
    };
    refresh();
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      this.setState({ redirect: false });
      return <Redirect to="/" />;
    }
    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/css?family=Karma:300,400,500,600,700&amp;subset=latin-ext" rel="stylesheet" />
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous" />
        <Page app={this} />
      </div>
    );
  }
}

export default withRouter(App);
