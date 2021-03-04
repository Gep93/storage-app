import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import BucketTable from "./../BucketTable/index";
import BucketOptions from "../BucketOptions/index";

class Bucket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bucketobjects: [],
    };

    this.getFileList = this.getFileList.bind(this);
  }

  objects = [
    { name: "File1", last_modified: "04.03.2021", size: "1kB" },
    { name: "File2", last_modified: "04.03.2021", size: "1kB" },
  ];

  getFileList(evt) {
    console.log("evet", evt.target.files[0]);
  }

  render() {
    return (
      <div className="Bucket p-3">
        <h1>MyBucket</h1>
        <BucketOptions
          objectsnum={this.objects.length}
          getFileList={this.getFileList}
        />
        <BucketTable objects={this.objects} />
      </div>
    );
  }
}

export default Bucket;
