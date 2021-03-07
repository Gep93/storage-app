import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import http, {API_url, API_token} from "../services/httpServices";

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
    http
      .get(API_url + "locations", {
        headers: {
          Authorization: API_token,
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

    http
      .post(API_url + "buckets", data, {
        headers: {
          Authorization: API_token,
        },
      })
      .then((res) => {
        res.status === 201
          ? this.handleBucketCreate()
          : console.log("response", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleBucketCreate() {
    this.props.handleBucketCreate();
  }

  render() {
    const { bucketname, bucketlocation, bucketlocations } = this.state;
    return (
      <div className="BucketCreate p-3 mb-2 mt-5">
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
