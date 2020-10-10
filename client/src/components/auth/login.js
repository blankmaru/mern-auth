import React, { Component } from "react";
import { Button, Form } from 'semantic-ui-react';

import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
  
      this.state = {
        email: "",
        password: "",
        loading: false,
        message: ""
      };
    }
  
    onChangeEmail(e) {
      this.setState({
        email: e.target.value
      });
    }
  
    onChangePassword(e) {
      this.setState({
        password: e.target.value
      });
    }
  
    handleLogin(e) {
      e.preventDefault();
  
      this.setState({
        message: "",
        loading: true
      });

      if (this.state.email !== "" && this.state.password !== "") {
        axios.post('/api/users/login', {
          email: this.state.email,
          password: this.state.password
        })
        .then(res => {
          if (res.data.accessToken) {
              localStorage.setItem('user', JSON.stringify(res.data));
          };
          this.props.history.push("/profile");
          window.location.reload();
        })
      }
    }
  
    render() {
      return (
            <Form onSubmit={this.handleLogin}>
              <Form.Field>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </Form.Field>
  
              <Form.Field>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </Form.Field>
  
              <Form.Field>
                <Button
                  className="btn btn-secondary btn-block"
                  disabled={this.state.loading}
                >
                  Login
                </Button>
              </Form.Field>
            </Form>
      );
    }
  }