import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";

import { createAccount, guestSignIn } from "../../actions/authActions";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    userName: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { userName } = this.state;
    this.props.createAccount(this.state);
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div
        className="w-full max-w-md bg-white mx-auto rounded px-8 py-8 pt-8"
        style={{ fontFamily: "Roboto Condensed", marginTop: "100px" }}
      >
        <h1 style={{ fontFamily: "Lexend Deca" }} className="mb-5 text-black">
          Sign Up
        </h1>

        <form onSubmit={this.handleSubmit}>
          <div className="px-4 pb-4">
            <label
              htmlFor="userName"
              className="text-base block font-bold pb-2"
            >
              Username
            </label>
            <input
              name="userName"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-purple-300 "
              id="userName"
              onChange={this.handleChange}
              autoComplete="off"
            />
          </div>

          <div className="px-4 pb-4">
            <label htmlFor="email" className="text-base block font-bold pb-2">
              Email
            </label>
            <input
              name="email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-purple-300 "
              id="email"
              type="email"
              onChange={this.handleChange}
            />
          </div>

          <div className="px-4 pb-4">
            <label
              htmlFor="password"
              className="text-base block font-bold pb-2"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-purple-300 "
              id="password"
              onChange={this.handleChange}
              autoComplete="off"
            />
          </div>

          <div className="px-4 pb-4">
            <label
              htmlFor="checkPassword"
              className="text-base block font-bold pb-2"
            >
              Re-enter Password
            </label>
            <input
              name="checkPassword"
              type="password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-purple-300 "
              id="checkPassword"
              onChange={this.handleChange}
              autoComplete="off"
            />
          </div>

          <p className="text-red-500 text-center">
            {authError &&  authError.message.toUpperCase()}
          </p>

          <div className="text-center py-4">
            <button className="bg-purple-700" type="submit">
              Register
            </button>
          </div>

          <div className="text-center pt-5 flex flex-row justify-around">
            <div>
              <p className="text-gray-500 pb-1">Just browsing?</p>
              <button className="bg-purple-700 mx-auto " onClick={guestSignIn}>
                Log in as guest
              </button>
            </div>
            <div>
              <p className="text-gray-500 pb-1">Already have an account?</p>
              <Link to="/sign-in">
                <button className="bg-purple-700 mx-auto ">Sign in</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authError: state.auth.authError,
  auth: state.firebase.auth,
  users: state.firebase
});

export default compose(
  connect(
    mapStateToProps,
    {
      createAccount,
      guestSignIn
    }
  )
)(SignUp);
