import React, { Component } from "react";
import BucketTable from "./../BucketTable/index";
import BucketOptions from "../BucketOptions/index";
import Tab from "../Tab/index";
import BucketDetails from "./../BucketDetails/index";
import DecisionModal from "../DecisionModal/index";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import http, {API_url, API_token} from "../services/httpServices";

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
    this.renderFiles = this.renderFiles.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
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

      let modifiedobjects = response.data.objects.map((o) => {
        return { ...o, last_modified: this.formatDate(o.last_modified) };
      });

      let bytes = this.sumProperty(response.data.objects, "size");
      let bucketsize = this.formatBytes(bytes);
      this.setState({ bucketobjects: modifiedobjects, bucketsize });
  }

  async uploadObjects(file) {
    const {id} = this.state.bucket;

    let fd = new FormData();
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
        let newbucketobject = {
          ...response.data,
          last_modified: this.formatDate(response.data.last_modified),
        };
        let newbucketobjects = [newbucketobject, ...prevState.bucketobjects];

        let bytes = this.sumProperty(newbucketobjects, "size");
        let bucketsize = this.formatBytes(bytes);

        return { bucketobjects: newbucketobjects, bucketsize };
      })
    } catch (error) {
      if(error.response && error.response.status === 409)
        alert(`Object with name: ${file.name} already exists.`);
    }
  }

  formatDate(date) {
    const [year, month, day] = date.split("T")[0].split("-");
    return `${day}.${month}.${year}`;
  }

  sumProperty(items, prop) {
    return items.reduce((a, b) => {
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
    this.uploadObjects(evt.target.files[0]);
  }

  labels = [
    { name: "Files", render: "BucketTable" },
    { name: "Details", render: "BucketDetails" },
  ];

  async handleDelete() {
    const path = this.state.renderfiles ? `/objects/${this.state.selectedobject}` : '';
        console.log(`buckets/${this.state.bucket.id}${path}`);

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

        let bytes = this.sumProperty(bucketobjects, "size");
        let bucketsize = this.formatBytes(bytes);
        this.setState({bucketobjects, openmodal:false, bucketsize});
      } else {
        this.props.history.push('/');
      }
  }

  renderFiles(evt) {
    this.setState({ renderfiles: true });
  }

  renderDetails(evt) {
    this.setState({ renderfiles: false });
  }

  handleConfirmDelete(evt) {
    this.handleDelete();
  }

  handleRejectDelete(evt) {
    this.setState({ openmodal: false });
  }

  handleDeleteModal(evt) {
    this.setState({ openmodal: true });
  }

  updateSelectedObject(id) {
    this.setState({selectedobject: id});
  }

  deleteSelectedObject(){
    if(this.state.selectedobject)
      this.handleDeleteModal();
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
              disabled = {this.state.selectedobject ? true : false}
              deleteObject={this.deleteSelectedObject}
            />
            <BucketTable
              objects={this.state.bucketobjects}
              canClick={true}
              clickHandler={this.updateSelectedObject}
            />
          </>
        ) : (
          <BucketDetails
            bucket={this.state.bucket}
            bucketsize={this.state.bucketsize}
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
