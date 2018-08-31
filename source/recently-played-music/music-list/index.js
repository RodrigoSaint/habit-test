import React from "react";
import MusicListItem from "./item";
import { getUserRecentMusic } from "../../spotify/repository";

export default class MusicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draggedMusic: null,
      errorGettingUserData: false
    };
    this.setDraggedMusic = this.setDraggedMusic.bind(this);
    this.changeMusicOrder = this.changeMusicOrder.bind(this);
    this.getUserMusicCollection = this.getUserMusicCollection.bind(this);
  }

  getUserMusicCollection() {
    this.setState({ errorGettingUserData: false });

    getUserRecentMusic(
      this.props.store.credentials.token_type,
      this.props.store.credentials.access_token
    )
      .then(musicCollection =>
        this.props.mutations.changeMusicCollection(
          this.props.store,
          musicCollection
        )
      )
      .catch(error => this.setState({ errorGettingUserData: true }));
  }

  componentWillMount() {
    this.getUserMusicCollection();
  }

  get filteredMusicCollection() {
    return findMusicByDescription(this.props.store);
  }

  enableDrop(event) {
    event.preventDefault();
  }

  setDraggedMusic(draggedMusic) {
    this.setState({ draggedMusic });
  }

  changeMusicOrder(referenceMusic) {
    this.props.mutations.changeMusicItemOrder(
      this.props.store,
      this.state.draggedMusic,
      referenceMusic
    );
  }

  render() {
    if (this.state.errorGettingUserData)
      return (
        <div>
          <MusicListHeader />
          <span className="text-red small-right-margin">
            Sorry, there was some error to get your musics.
          </span>
          <button
            onClick={this.getUserMusicCollection}
            className="primary-background text-white"
          >
            Click here to try again
          </button>
        </div>
      );

    if (this.filteredMusicCollection.length === 0)
      return (
        <div>
          <MusicListHeader />
          <span>There are no musics left</span>
        </div>
      );

    return (
      <div>
        <MusicListHeader />
        {this.filteredMusicCollection.map(music => (
          <MusicListItem
            key={music.id}
            onDragStart={() => this.setDraggedMusic(music)}
            onDrop={() => this.changeMusicOrder(music)}
            onDragOver={this.enableDrop}
            onClick={() =>
              this.props.mutations.selectMusic(this.props.store, music)
            }
            search={this.props.store.searchText}
            {...music}
          />
        ))}
      </div>
    );
  }
}

const MusicListHeader = props => (
  <h4>
    <i className="fab fa-spotify" /> Recently Played Tracks
  </h4>
);

function findMusicByDescription(store) {
  if (store.searchText === undefined || store.searchText === "")
    return store.musicCollection;
  return store.musicCollection.filter(
    music =>
      music.description == undefined
        ? false
        : music.description
            .toLowerCase()
            .includes(store.searchText.toLowerCase())
  );
}
