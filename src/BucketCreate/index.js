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

  async componentDidMount() {
    const {data:{locations}} = await http
    .get(API_url + 'locations', {
      headers: {
        Authorization: API_token,
      },
    })
    this.setState({bucketlocations: locations, bucketlocation: locations[0].id});
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();

    const data = JSON.stringify({
      name: this.state.bucketname,
      location: this.state.bucketlocation,
    });
    try {
      await http
      .post(API_url + "buckets", data, {
        headers: {
          Authorization: API_token,
        },
      });
      this.props.handleBucketCreate();
    } catch (error) {
      if(error.response && error.response.status === 409)
        alert(`Bucket with name: ${this.state.bucketname} already exists.`)
    }
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
