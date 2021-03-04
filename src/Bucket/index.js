import React, { Component } from "react";
import BucketTable from "./../BucketTable/index";
import BucketOptions from "../BucketOptions/index";
import Tab from "../Tab/index";
import BucketDetails from "./../BucketDetails/index";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import axios from "axios";

const API_url = "https://challenge.3fs.si/storage/";

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

  componentDidMount() {
    this.fetchObjects();
  }

  fetchObjects() {
    axios
      .get(API_url + `buckets/${this.state.bucket.id}/objects`, {
        headers: {
          Authorization: "Token 0d6d7282-2323-47f8-9686-28afa17e9ff3",
        },
      })
      .then((res) => {
        console.log("data", res.data);
        let modifiedobjects = res.data.objects.map((o) => {
          const [year, month, day] = o.last_modified.split("T")[0].split("-");
          return { ...o, last_modified: `${day}.${month}.${year}` };
        });

        let bytes = this.sumProperty(res.data.objects, "size");
        let bucketsize = this.formatBytes(bytes);
        this.setState({ bucketobjects: modifiedobjects, bucketsize });
      })
      .catch((err) => console.log(err));
  }

  sumProperty(items, prop) {
    return items.reduce((a, b) => {
      console.log(a);
      console.log(b);
      return a + b[prop];
    }, 0);
  }

  formatBytes(a, b = 2) {
    if (0 === a) return "0 Bytes";
    const c = 0 > b ? 0 : b,
      d = Math.floor(Math.log(a) / Math.log(1024));
    return (
      parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
      " " +
      ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
    );
  }

  // objects = [
  //   { name: "File1", last_modified: "04.03.2021", size: "1kB" },
  //   { name: "File2", last_modified: "04.03.2021", size: "1kB" },
  // ];

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
              objectsnum={
                this.state.bucketobjects.length
                  ? this.state.bucketobjects.length
                  : 0
              }
              getFileList={this.getFileList}
            />
            <BucketTable objects={this.state.bucketobjects} />
          </>
        ) : (
          <BucketDetails
            bucket={this.state.bucket}
            bucketsize={this.state.bucketsize}
          />
        )}
      </div>
    );
  }
}

export default Bucket;
