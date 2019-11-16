import React from "react";
import "./Loading.scss";

//loading icon component
const LoadingSpinner = () => (
  <div className="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default LoadingSpinner;
