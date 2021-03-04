import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const BucketTable = (props) => {
  const { objects } = props;
  return (
    <div className="BucketTable p-3">
      <table>
        <thead className="BucketTable-thead">
          <tr>
            <th style={{ width: "60%" }}>Name</th>
            <th style={{ width: "20%" }}>Last modified</th>
            <th style={{ width: "20%" }}>Size</th>
          </tr>
        </thead>
        <tbody>
          {objects.map((o) => {
            return (
              <tr>
                <td>{o.name}</td>
                <td>{o.last_modified}</td>
                <td>{o.size}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BucketTable;
