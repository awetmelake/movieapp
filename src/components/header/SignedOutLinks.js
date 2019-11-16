import React from "react";
import { Link } from "react-router-dom";
const SignedOutLinks = ({ auth }) => (
  <ul>
    <li>
      <Link to="/sign-in">SIGN IN</Link>
    </li>
    <li>
      <Link to="/sign-up">SIGN UP</Link>
    </li>
  </ul>
);

export default SignedOutLinks;
