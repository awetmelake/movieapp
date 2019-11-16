import React from "react";
import { Link } from "react-router-dom";

const SignedInLinks = ({ profile, handlelogOut }) => (
  <ul>
    <li>
      <Link to="/watchlist">WATCH LIST</Link>
    </li>

    <li onClick={handlelogOut}>
      <a>LOG OUT</a>
    </li>
  </ul>
);

export default SignedInLinks;
