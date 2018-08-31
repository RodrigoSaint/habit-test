import React from "react";

export default props => (
  <div className="search-music-container">
    <SearchInput
      value={props.store.searchText}
      store={props.store}
      onChange={props.mutations.changeSearchText}
    />
    <SearchWordFound
      wordCound={countHowManyWords(
        props.store.searchText,
        props.store.musicCollection
      )}
    />
  </div>
);

const SearchInput = props => (
  <div className="search-input">
    <i className="fas fa-search text-white" />
    <input
      placeholder="Search for words"
      type="text"
      onChange={event => props.onChange(props.store, event.target.value)}
      value={props.value}
    />
    <i
      onClick={() => props.onChange(props.store, "")}
      className="fas fa-times text-white clickable"
    />
  </div>
);

function countHowManyWords(filter, musicCollection) {
  if (filter === null || filter === "") return 0;
  const regex = new RegExp(filter, "gi");
  return musicCollection
    .map(music => {
      const match = music.description.match(regex);
      return match ? match.length : 0;
    })
    .reduce((total, matchCount) => total + matchCount, 0);
}

const SearchWordFound = props => (
  <p>
    <strong>{props.wordCound}</strong> Words found
  </p>
);
