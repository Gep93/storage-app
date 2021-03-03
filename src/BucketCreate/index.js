import React, { Component } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";
import axios from "axios";

const API = "https://challenge.3fs.si/storage/";

class BucketCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bucketname: "",
      bucketlocation: "",
      bucketlocations: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(API + "locations", {
        headers: {
          Authorization: "Token 0d6d7282-2323-47f8-9686-28afa17e9ff3",
        },
      })
      .then((res) => this.updateBucketLocations(res))
      .catch((err) => alert(err));
  }

  updateBucketLocations(res) {
    const locations = res.data.locations;
    const location = locations[0].id;
    this.setState({ bucketlocations: locations, bucketlocation: location });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const data = JSON.stringify({
      name: this.state.bucketname,
      location: this.state.bucketlocation,
    });

    console.log(data);
    axios
      .post(API + "buckets", data, {
        headers: {
          Authorization: "Token 0d6d7282-2323-47f8-9686-28afa17e9ff3",
        },
      })
      .then((res) => {
        console.log("response", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { bucketname, bucketlocation, bucketlocations } = this.state;
    return (
      <div className="BucketCreate p-3 m-2">
        <form onSubmit={this.handleSubmit} className="BucketCreate-form">
          <div className="BucketCreate-itemsWrapper">
            <div className="BucketCreate-formItem">
              <label
                htmlFor="BucketCreate-bucketName"
                className="BucketCreate-formLabel"
              >
                Bucket Name*
              </label>
              <input
                id="BucketCreate-bucketName"
                name="bucketname"
                onChange={this.handleChange}
                type="text"
                value={bucketname}
              ></input>
            </div>
            <div className="BucketCreate-formItem">
              <label
                htmlFor="BucketCreate-bucketLocation"
                className="BucketCreate-formLabel"
              >
                Bucket Location*
              </label>
              <select
                onChange={this.handleChange}
                id="BucketCreate-bucketLocation"
                name="bucketlocation"
              >
                {bucketlocations.map((l) => {
                  let name = l.name.toLowerCase();
                  let value = l.id;
                  return (
                    <option key={name} value={value}>
                      {l.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <Button className="mt-3" variant="primary" type="submit">
            Create Bucket
          </Button>{" "}
        </form>
      </div>
    );
  }
}

export default BucketCreate;
