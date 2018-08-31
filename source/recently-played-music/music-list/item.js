import React from "react";
import TextSearchHighlight from "../../text-search-highlight";

export default props => {
  const className = props.selected
    ? "music-list-item selected clickable"
    : "music-list-item clickable";

  return (
    <div
      draggable="true"
      onDragStart={props.onDragStart}
      onDrop={props.onDrop}
      onDragOver={props.onDragOver}
      onClick={props.onClick}
      className={className}
    >
      <div className="frame">
        <img src={props.image} alt={props.name} />
      </div>
      <div className="title">
        <strong>{props.name}</strong>
        <span className="music-time">{props.time}</span>
      </div>
      <i className="move-icon fas fa-bars" />
      <TextSearchHighlight search={props.search} text={props.description} />
    </div>
  );
};
