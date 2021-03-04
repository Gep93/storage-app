import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const BucketTable = () => {
  return (
    <div className="BucketTable p-3 mt-2">
      <table>
        <thead className="BucketTable-thead">
          <tr>
            <th style={{ width: "60%" }}>Name</th>
            <th style={{ width: "20%" }}>Last modified</th>
            <th style={{ width: "20%" }}>Size</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FileName1</td>
            <td>06.09.2015</td>
            <td>2MB</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BucketTable;
