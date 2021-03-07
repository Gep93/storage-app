import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

const BucketListTable = (props) => {
  const { creatingbucket, buckets } = props;

  return (
    <div className="BucketListTable p-3 mt-2">
      <div className="BucketListTable-options mb-3">
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
        <thead className="BucketListTable-thead">
          <tr>
            <th style={{ width: "70%" }}>Name</th>
            <th style={{ width: "30%" }}>Location</th>
          </tr>
        </thead>
        <tbody>
          {buckets.map((b) => {
            return (
              <tr className="BucketListTable-tr" key={b.id}>
                <td style={{ width: "70%" }}>
                  <Link
                    className="BucketListTable-navLink"
                    to={{
                      pathname: `/bucket/${b.id}`,

                      state: { bucket: b },
                    }}
                  >
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

export default BucketListTable;
