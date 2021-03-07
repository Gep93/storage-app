import React from "react";
import {useState, useEffect} from "react"
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const BucketTable = (props) => {
  const [bucketobjects, setObjects] = useState(props.objects);

  useEffect(() => {
    setObjects(props.objects);
    console.log("CHANGING");
  }, [props.objects], [bucketobjects])

  const selectObject = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const changeBg = bucketobjects.map((o) => {
      return o.name === evt.currentTarget.id ? {...o, selected:!o.selected} : {...o, selected:false};
    });
    updateObject(evt.currentTarget.id);
    setObjects(changeBg);
  }

  const updateObject = (id) => {
    props.clickHandler(id)
  };

  return (
    <div className="BucketTable p-3">
      {console.log("rendering")}
      <table>
        <thead className="BucketTable-thead">
          <tr>
            <th style={{ width: "60%" }}>Name</th>
            <th style={{ width: "20%" }}>Last modified</th>
            <th style={{ width: "20%" }}>Size</th>
          </tr>
        </thead>
        <tbody>
          {bucketobjects && bucketobjects.map((o) => {
            return (
              <tr key={o.name} onClick={selectObject}
              id={o.name} style={{...(o.selected && {backgroundColor: 'gray'})}}>
                <td>{o.name}</td>
                <td>{o.last_modified}</td>
                <td>{o.size}</td>
              </tr>
            );
          })}
          {!bucketobjects && <tr>
            <td>No objects in bucket yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default BucketTable;
