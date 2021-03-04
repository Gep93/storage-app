import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";

const BucketDetails = (props) => {
  const { name, location } = props.bucket;
  return (
    <div className="BucketDetails p-3">
      <Button
        onClick={props.deleteBucket}
        className="BucketDetails-button mt-3"
        variant="danger"
      >
        Delete Bucket
      </Button>{" "}
      <dl className="BucketDetails-dataList">
        <dt>Bucket Name</dt>
        <dd>{name}</dd>
        <dt>Location</dt>
        <dd>{location.name}</dd>
        <dt>Storage size</dt>
        <dd>{props.bucketsize}</dd>
      </dl>
    </div>
  );
};

export default BucketDetails;
