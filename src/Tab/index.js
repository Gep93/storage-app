import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const Tab = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`Tab px-4 py-3 ${props.active && "Tab-selected"}`}
    >
      {props.name}
    </div>
  );
};

export default Tab;
