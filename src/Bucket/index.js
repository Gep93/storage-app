import React, { Component } from "react";
import BucketTable from "./../BucketTable/index";
import BucketOptions from "../BucketOptions/index";
import Tab from "../Tab/index";
import BucketDetails from "./../BucketDetails/index";
import DecisionModal from "../DecisionModal/index";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import axios from "axios";

import Button from "react-bootstrap/Button";

const API_url = "https://challenge.3fs.si/storage/";

class Bucket extends Component {
  constructor(props) {
    super(props);
    console.log("PROPS", props);
    this.state = {
      bucket: props.location.state.bucket,
      bucketobjects: [],
      renderfiles: true,
      modalisopen: false,
    };

    this.handleRenderTab = this.handleRenderTab.bind(this);
    this.getFileList = this.getFileList.bind(this);
    this.renderFiles = this.renderFiles.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleRejectDelete = this.handleRejectDelete.bind(this);
    this.handleDeleteModal = this.handleDeleteModal.bind(this);
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
        let modifiedobjects = res.data.objects.map((o) => {
          console.log("LAST mod BEFORE", o.last_modified);

          console.log("LAST mod AFTER", {
            ...o,
            last_modified: this.formatDate(o.last_modified),
          });
          return { ...o, last_modified: this.formatDate(o.last_modified) };
        });

        let bytes = this.sumProperty(res.data.objects, "size");
        let bucketsize = this.formatBytes(bytes);
        this.setState({ bucketobjects: modifiedobjects, bucketsize });
      })
      .catch((err) => console.log(err));
  }
  uploadObjects(file) {
    console.log(file);
    let fd = new FormData();
    fd.append("file", file);
    fd.append("id", "test");
    console.log("file name", file.name);
    console.log("file last", file.lastModified);
    console.log("file size", file.size);
    console.log("FD", fd);
    // ${this.state.bucket.id}
    axios
      .post(API_url + `buckets/bucket1/objects`, fd, {
        headers: {
          Authorization: "Token 0d6d7282-2323-47f8-9686-28afa17e9ff3",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState((prevState) => {
          let newbucketobject = {
            ...res.data,
            last_modified: this.formatDate(res.data.last_modified),
          };
          let newbucketobjects = [newbucketobject, ...prevState.bucketobjects];
          return { bucketobjects: newbucketobjects };
        });
      })
      .catch((err) => console.log(err));
  }

  formatDate(date) {
    const [year, month, day] = date.split("T")[0].split("-");
    return `${day}.${month}.${year}`;
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

  getFileList(evt) {
    // console.log("evet", evt.target.files[0]);
    this.uploadObjects(evt.target.files[0]);
  }

  labels = [
    { name: "Files", render: "BucketTable" },
    { name: "Details", render: "BucketDetails" },
  ];

  handleRenderTab(evt) {
    console.log(evt.target);
  }

  handleDelete() {
    const path =
      "/" + this.state.renderfiles
        ? "file ID"
        : `objects/${this.state.bucket.id}`;
    axios
      .delete(API_url + `buckets/${this.state.bucket.id}${path}`, {
        headers: {
          Authorization: "Token 0d6d7282-2323-47f8-9686-28afa17e9ff3",
        },
      })
      .then((res) => {
        console.log("RESONSE", res);
        this.props.history.push("/");
      })
      .catch((err) => console.log(err));
  }

  renderFiles(evt) {
    this.setState({ renderfiles: true });
  }

  renderDetails(evt) {
    this.setState({ renderfiles: false });
  }

  handleConfirmDelete(evt) {
    const path = this.state.renderfiles ? "path" : "path2";
    if (this.state.renderfiles) return this.handleDelete();
    // this.setState({objectid: evt.target.name})
    console.log(evt.target);
  }

  handleRejectDelete(evt) {
    this.setState({ modalisopen: false });
  }

  handleDeleteModal() {
    this.setState({ modalisopen: true });
  }

  render() {
    return (
      <div className="Bucket mt-5">
        <h1 className="mb-5">MyBucket</h1>
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
            <BucketTable
              objects={this.state.bucketobjects}
              canClick
              clickHandler={this.handleDeleteModal}
            />
          </>
        ) : (
          <BucketDetails
            bucket={this.state.bucket}
            bucketsize={this.state.bucketsize}
            // deleteBucket={this.handleDelete}
            deleteBucket={this.handleDeleteModal}
          />
        )}

        <DecisionModal
          isOpen={this.state.openmodal}
          item={this.state.renderfiles ? "file" : "bucket"}
          confirmDelete={this.handleConfirmDelete}
          rejectDelete={this.handleRejectDelete}
        />
      </div>
    );
  }
}

export default Bucket;
