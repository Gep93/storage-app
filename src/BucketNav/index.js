import React from "react";
import Button from "react-bootstrap/Button";
import Tab from "../Tab/index";
import "./index.css";

const BucketNav = (props) => {
  const { labels, renderTab, renderfiles } = props;
  const getTab = (evt) => {
    renderTab(evt);
  };
  return (
    <div>
      <Tab onClick={this.renderFiles} name="Files" active={renderfiles} />
      <Tab onClick={this.renderDetails} name="Details " active={!renderfiles} />
    </div>
  );
};

export default BucketNav;
