import React, { Component } from 'react'
import {
  Container,
  Header,
  Menu,
  Button
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Auth from './services/auth';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppNavbar from './components/AppNavbar';

import Home from './components/Home';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Profile from './components/auth/profile';

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
    window.location.replace("/");
  };

  render() {
    return (
      <Router>
        <AppNavbar state={this.state} logOut={this.logOut} />

        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </Container>

      </Router>
    );
  };
};

export default App;
