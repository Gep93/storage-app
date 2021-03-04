import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import BucketTable from "./../BucketTable/index";

class Bucket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bucketobjects: [],
    };
  }

  render() {
    return (
      <div className="Bucket p-3">
        <h1>MyBucket</h1>
        <BucketTable />
      </div>
    );
  }
}

export default Bucket;
