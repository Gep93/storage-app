import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

const BucketDetails = (props) => {
  const { name, location } = props.bucket;
  return (
    <div className="BucketDetails p-3">
      <dl className="BucketDetails-dataList">
        <dt>Bucket Name</dt>
        <dd>{name}</dd>
        <dt>Location</dt>
        <dd>{location.name}</dd>
        <dt>Storage size</dt>
        <dd>4.9 GB</dd>
      </dl>
    </div>
  );
};

export default BucketDetails;
