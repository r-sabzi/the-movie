import React from "react";
import "./MovieThumb.css";
export default function MovieThumb(props) {
  return (
    <div className="rmdb-moviethumb">
      <img src={props.image} alt="moviethumb" />
    </div>
  );
}
