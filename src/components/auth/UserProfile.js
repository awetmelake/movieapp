import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class UserProfile extends Component {
  render() {
    const { auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return <div></div>;
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

export default connect(
  mapStateToProps,
  {}
)(UserProfile);
