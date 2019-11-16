import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { userSignIn, guestSignIn } from "../../actions/authActions";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.userSignIn(this.state);
  };

  render() {
    const { authError, auth, guestSignIn } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div
        className="w-full max-w-md bg-white mx-auto rounded px-8 py-8 pt-8"
        style={{ fontFamily: "Roboto Condensed", marginTop: "100px" }}
      >
        <h1 style={{ fontFamily: "Lexend Deca" }} className="mb-5 text-black">
          Sign In
        </h1>

        <form className="sign-in-form" onSubmit={this.handleSubmit}>
          <div className="px-4 pb-4">
            <label htmlFor="email" className="text-base block font-bold pb-2">
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-purple-300 "
              name="email"
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
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-purple-300 "
              name="password"
              type="password"
              id="password"
              onChange={this.handleChange}
              autoComplete="off"
            />
          </div>

          <p className="text-center text-red-500">
            {authError && authError.message.toUpperCase()}
          </p>

          <div className="text-center py-4">
            <button className="bg-purple-700" type="submit">
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center pt-5 flex flex-row justify-around">
          <div>
            <p className="text-gray-500 pb-1">Just browsing?</p>
            <button className="bg-purple-700 mx-auto " onClick={guestSignIn}>
              Log in as guest
            </button>
          </div>
          <div>
            <p className="text-gray-500 pb-1">Don't have an account</p>
            <Link to="/sign-up">
              <button className="bg-purple-700 mx-auto">Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authError: state.auth.authError,
  auth: state.firebase.auth
});

export default connect(
  mapStateToProps,
  {
    userSignIn,
    guestSignIn
  }
)(SignIn);
