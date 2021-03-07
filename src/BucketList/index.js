import React, { Component } from "react";
import BucketListTable from "../BucketListTable/index";
import BucketCreate from "../BucketCreate/index";

import http, {API_url, API_token} from "../services/httpServices"
import "./index.css";

class BucketList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buckets: [],
      creatingbucket: false,
    };

    this.handleBucketCreate = this.handleBucketCreate.bind(this);
    this.handleNewBucket = this.handleNewBucket.bind(this);
    this.fetchBuckets = this.fetchBuckets.bind(this);
  }

  componentDidMount() {
    this.fetchBuckets();
  }

  async fetchBuckets() {
    const {data} = await http.get(API_url + 'buckets', {
      headers: {
        Authorization: API_token
      }
    });
    this.setState({buckets:data.buckets});
  }

  handleBucketCreate() {
    this.setState({ creatingbucket: false });
    this.fetchBuckets();
  }

  handleNewBucket() {
    this.setState({ creatingbucket: true });
  }

  render() {
    let { creatingbucket, buckets } = this.state;
    return (
      <div className="BucketList mt-5">
        <h1 className="mb-5">Bucket List</h1>
        {creatingbucket && (
          <BucketCreate handleBucketCreate={this.handleBucketCreate} />
        )}
        <BucketListTable
          creatingBucket={creatingbucket}
          newBucket={this.handleNewBucket}
          buckets={buckets}
        />
      </div>
    );
  }
}

export default BucketList;
