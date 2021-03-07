import React, { Component } from "react";
import BucketTable from "./../BucketTable/index";
import BucketOptions from "../BucketOptions/index";
import Tab from "../Tab/index";
import BucketDetails from "./../BucketDetails/index";
import DecisionModal from "../DecisionModal/index";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import http, {API_url, API_token} from "../services/httpServices";
import {sumProperty, formatBytes, formatDate} from "../helpers.js";

class Bucket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bucket: props.location.state.bucket,
      bucketobjects: [],
      selectedobject: '',
      renderfiles: true,
      openmodal: false,
      bucketsize:0,
    };

    this.getFileList = this.getFileList.bind(this);
    this.handleRenderFiles = this.handleRenderFiles.bind(this);
    this.handleRenderDetails = this.handleRenderDetails.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleRejectDelete = this.handleRejectDelete.bind(this);
    this.handleDeleteModal = this.handleDeleteModal.bind(this);
    this.updateSelectedObject = this.updateSelectedObject.bind(this);
    this.deleteSelectedObject = this.deleteSelectedObject.bind(this);
  }

  async componentDidMount() {
      const response = await http
      .get(API_url + `buckets/${this.state.bucket.id}/objects`, {
        headers: {
          Authorization: API_token,
        },
      });

      const bucketobjects = response.data.objects.map((o) => {
        return { ...o, last_modified: formatDate(o.last_modified) };
      });
      const bytes = sumProperty(response.data.objects, "size");
      const bucketsize = formatBytes(bytes);

      this.setState({ bucketobjects, bucketsize });
  }

  async uploadObject(file) {
    const {id} = this.state.bucket;

    const fd = new FormData();
    fd.append("file", file);

    try {
      const response = await http
      .post(API_url + `buckets/${id}/objects`, fd, {
        headers: {
          Authorization: API_token,
          "Content-Type": "multipart/form-data",
        },
      });
      this.setState((prevState) => {
        const bucketobject = {
          ...response.data,
          last_modified: formatDate(response.data.last_modified),
        };
        const bucketobjects = [bucketobject, ...prevState.bucketobjects];
        const bytes = sumProperty(bucketobjects, "size");
        const bucketsize = formatBytes(bytes);

        return { bucketobjects, bucketsize };
      })
    } catch (error) {
      if(error.response && error.response.status === 409)
        alert(`Object with name: ${file.name} already exists.`);
    }
  }

  getFileList(evt) {
    this.uploadObject(evt.target.files[0]);
  }

  labels = [
    { name: "Files", render: "BucketTable" },
    { name: "Details", render: "BucketDetails" },
  ];

  async handleDelete() {
    const path = this.state.renderfiles ? `/objects/${this.state.selectedobject}` : '';

    await http
      .delete(API_url + `buckets/${this.state.bucket.id}${path}`, {
        headers: {
          Authorization: API_token,
        },
      })

      if(this.state.renderfiles) {
        const bucketobjects = this.state.bucketobjects.filter((o) => {
          return o.name !== this.state.selectedobject;
        });   

        const bytes = sumProperty(bucketobjects, "size");
        const bucketsize = formatBytes(bytes);
        this.setState({bucketobjects, openmodal:false, bucketsize});
      } else {
        this.props.history.push('/');
      }
  }

  handleRenderFiles() {
    this.setState({ renderfiles: true });
  }

  handleRenderDetails() {
    this.setState({ renderfiles: false });
  }

  handleConfirmDelete() {
    this.handleDelete();
  }

  handleRejectDelete() {
    this.setState({ openmodal: false });
  }

  handleDeleteModal() {
    this.setState({ openmodal: true });
  }

  updateSelectedObject(id) {
    if(this.state.selectedobject === id ) return this.setState({selectedobject: ''});
    this.setState({selectedobject: id});
  }

  deleteSelectedObject(){
    if(this.state.selectedobject)
      this.handleDeleteModal();
  }

  render() {
    const {renderfiles, bucket, openmodal, selectedobject, bucketobjects, bucketsize} = this.state;
    return (
      <div className="Bucket mt-5">
        <h1 className="mb-5">{bucket.name}</h1>
        <Tab
          onClick={this.handleRenderFiles}
          name="Files"
          active={renderfiles}
        />
        <Tab
          onClick={this.handleRenderDetails}
          name="Details "
          active={!renderfiles}
        />
        {renderfiles ? (
          <>
            <BucketOptions
              objectsnum={
                bucketobjects.length
              }
              getFileList={this.getFileList}
              disabled = {selectedobject ? true : false}
              deleteObject={this.deleteSelectedObject}
            />
            <BucketTable
              objects={bucketobjects}
              canClick={true}
              clickHandler={this.updateSelectedObject}
            />
          </>
        ) : (
          <BucketDetails
            bucket={this.state.bucket}
            bucketsize={bucketsize}
            deleteBucket={this.handleDeleteModal}
          />
        )}

        <DecisionModal
          isOpen={openmodal}
          item={renderfiles ? "file" : "bucket"}
          confirmDelete={this.handleConfirmDelete}
          rejectDelete={this.handleRejectDelete}
        />
      </div>
    );
  }
}

export default Bucket;
