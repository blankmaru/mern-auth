import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  Container
} from '@material-ui/core';

import AppNavbar from './components/AppNavbar';

import Login from './components/auth/login';
import Profile from './components/auth/register';

import Home from './components/Home';

import Auth from './services/auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined
    };
  };

  componentDidMount() {
    const user = Auth.currentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    };
  };

  logOut() {
    Auth.logOut();
  };

  render() {
    return (
      <Router>
          <AppNavbar state={this.state} logOut={this.logOut} />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Container>
      </Router>
    );
  }
}

export default App;
