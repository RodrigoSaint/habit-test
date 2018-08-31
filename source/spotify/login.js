import React from "react";
import { redirectToSpotifyLogin } from "./repository";

export default class SpotifyLogin extends React.PureComponent {
  render() {
    return (
      <div>
        <h3>To access this system please login with your Spotify Account</h3>
        <button className="spotify-background" onClick={redirectToSpotifyLogin}>
          <i className="fab fa-spotify" /> Login with Spotify
        </button>
      </div>
    );
  }
}
