import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import Button from "react-bootstrap/Button";

const BucketTable = (props) => {
  const { creatingbucket, buckets } = props;

  return (
    <div className="BucketTable p-3 mt-2">
      <div className="BucketTable-options mb-3">
        <span>All Buckets ({buckets.length})</span>
        <Button
          onClick={props.newBucket}
          variant="primary"
          className={creatingbucket ? "invisible" : "visible"}
        >
          Create New Bucket
        </Button>
      </div>
      <table>
        <thead className="BucketTable-thead">
          <tr>
            <th style={{ width: "70%" }}>Name</th>
            <th style={{ width: "30%" }}>Location</th>
          </tr>
        </thead>
        <tbody>
          {buckets.map((b) => {
            return (
              <tr className="BucketTable-tr" key={b.id}>
                <td style={{ width: "70%" }}>
                  <Link className="BucketTable-navLink" to="/bucket">
                    {b.name}
                  </Link>
                </td>
                <td style={{ width: "30%" }}>{b.location.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BucketTable;
