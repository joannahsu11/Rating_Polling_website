import React, { Component } from 'react'
import Polling from './polling'

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      isLoggedIn:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const {email, password} = this.state;
    this.props.onLogin(email, password);
    
    console.log(email, password);
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type":"application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password
        }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 201) {
          this.setState({ isLoggedIn: true});
        }
        console.log(data, "userRegister");
      });
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div>
        {!isLoggedIn ? (
          <form onSubmit={this.handleSubmit}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        ) : (
          <div>
            <p>You have logged in.</p>
          </div>
        )}
      </div>
    )
  }
}
