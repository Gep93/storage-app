import React from "react";
import Button from "react-bootstrap/Button";

import "./index.css";

const BucketOptions = (props) => {
  const { objectsnum, getFileList } = props;
  const handleChange = (evt) => {
    props.getFileList(evt);
  };

  return (
    <div className="BucketOptions p-3">
      <span>All Files ({objectsnum})</span>
      <div>
        <Button
          disabled = {!props.disabled}
          onClick={props.deleteObject}
          variant="primary"
          className="mx-2"
        >
          Delete Object
        </Button>
        <label onChange={handleChange} className="btn btn-primary mx-1 my-0">
          Upload Object
          <input type="file" multiple={false} hidden />
        </label>
      </div>
    </div>
  );
};

export default BucketOptions;
