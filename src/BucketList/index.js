import React, { Component } from "react";
import BucketTable from "../BucketTable/index";

import axios from "axios";
import "./index.css";

const API_url = "https://challenge.3fs.si/storage/";

class BucketList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buckets: [],
      creatingbucket: false,
    };

    this.fetchBuckets = this.fetchBuckets.bind(this);
  }

  componentDidMount() {
    this.fetchBuckets();
  }

  fetchBuckets() {
    axios
      .get(API_url + "buckets", {
        headers: {
          Authorization: "Token 0d6d7282-2323-47f8-9686-28afa17e9ff3",
        },
      })
      .then((res) => {
        this.setState({ buckets: res.data.buckets });
      })
      .catch((err) => console.log(err));
  }

  handleNewBucket() {
    console.log("Render new bucket component");
  }

  render() {
    let { creatingbucket, buckets } = this.state;
    return (
      <div className="BucketList p-3">
        <h1>Bucket List</h1>
        <BucketTable
          creatingBucket={creatingbucket}
          newBucket={this.handleNewBucket}
          buckets={buckets}
        />
      </div>
    );
  }
}

export default BucketList;
