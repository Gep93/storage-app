import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const Tab = (props) => {
  return (
    <span
      onClick={props.onClick}
      className={`Tab px-4 py-3 ${props.active && "Tab-selected"}`}
    >
      {props.name}
    </span>
  );
};

export default Tab;
