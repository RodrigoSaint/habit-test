import React from "react";
import ReactDOM from "react-dom";
import { defaultStore, mapMutation } from "./store";
import RecentlyPlayedMusic from "./recently-played-music";
import SpotifyLogin from "./spotify/login";
import { hashToObject } from "./hash";

const render = (store, mutations) =>
  ReactDOM.render(
    store.credentials ? (
      <RecentlyPlayedMusic store={store} mutations={mutations} />
    ) : (
      <SpotifyLogin />
    ),

    document.getElementById("app")
  );

const mappedMutation = mapMutation(render);

const credentials = hashToObject(window.location.hash);
!credentials
  ? render(defaultStore, mappedMutation)
  : render(
      mappedMutation.setCredentials(defaultStore, credentials),
      mappedMutation
    );
