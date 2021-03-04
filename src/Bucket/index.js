import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import BucketTable from "./../BucketTable/index";
import BucketOptions from "../BucketOptions/index";
import Tab from "../Tab/index";
import BucketDetails from "./../BucketDetails/index";

class Bucket extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      bucket: props.location.state.bucket,
      bucketobjects: [],
      renderfiles: true,
    };

    this.handleRenderTab = this.handleRenderTab.bind(this);
    this.getFileList = this.getFileList.bind(this);
    this.renderFiles = this.renderFiles.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
  }

  objects = [
    { name: "File1", last_modified: "04.03.2021", size: "1kB" },
    { name: "File2", last_modified: "04.03.2021", size: "1kB" },
  ];

  getFileList(evt) {
    console.log("evet", evt.target.files[0]);
  }

  labels = [
    { name: "Files", render: "BucketTable" },
    { name: "Details", render: "BucketDetails" },
  ];

  handleRenderTab(evt) {
    console.log(evt.target);
  }

  renderFiles(evt) {
    this.setState({ renderfiles: true });
  }

  renderDetails(evt) {
    this.setState({ renderfiles: false });
  }
  render() {
    return (
      <div className="Bucket p-3">
        <h1>MyBucket</h1>
        <Tab
          onClick={this.renderFiles}
          name="Files"
          active={this.state.renderfiles}
        />
        <Tab
          onClick={this.renderDetails}
          name="Details "
          active={!this.state.renderfiles}
        />
        {this.state.renderfiles ? (
          <>
            <BucketOptions
              objectsnum={this.objects.length}
              getFileList={this.getFileList}
            />
            <BucketTable objects={this.objects} />
          </>
        ) : (
          <BucketDetails bucket={this.state.bucket} />
        )}
      </div>
    );
  }
}

export default Bucket;
