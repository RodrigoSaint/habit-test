import React from "react";
import MusicList from "./music-list";
import SearchContainer from "./search";
export default props => (
  <div>
    <SearchContainer store={props.store} mutations={props.mutations} />
    <MusicList store={props.store} mutations={props.mutations} />
  </div>
);
