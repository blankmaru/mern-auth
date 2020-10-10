import React, { Component } from "react";
import { Button, Form } from 'semantic-ui-react';

import Auth from '../../services/auth';

export default class Register extends Component {
    constructor(props) {
      super(props);
      this.handleRegister  = this.handleRegister .bind(this);
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
  
      this.state = {
        username: "",
        email: "",
        password: "",
        successful: false,
        message: ""
      };
    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
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
  
    handleRegister (e) {
      e.preventDefault();
  
      this.setState({
        message: "",
        loading: true
      });

      if (this.state.email !== "" && this.state.password !== "") {
            Auth.register(
                this.state.username,
                this.state.email, 
                this.state.password
            )
          .then(() => {
            this.props.history.push("/login");
            this.setState({
                successful: true
            })
            console.log('Register succesful');
          })
          .catch(error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              loading: false,
              message: resMessage
            });
            console.log(resMessage);
          })
      }
    }
  
    render() {
      return (
            <Form onSubmit={this.handleRegister}>
                <Form.Field>
                    <label htmlFor="email">Username</label>
                    <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
                </Form.Field>

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
                <Button>
                  Register
                </Button>
              </Form.Field>
            </Form>
      );
    }
  }