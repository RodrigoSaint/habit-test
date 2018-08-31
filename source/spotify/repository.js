export function redirectToSpotifyLogin() {
  var client_id = "1dc51a51b778414bb1d27879915e4a7d";
  var redirect_uri = "http://localhost:8080";

  var state = Math.random();

  localStorage.setItem("state", state);
  var scope = "user-read-private user-read-email user-read-recently-played";
  const requestData = {
    response_type: "token",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  };

  const url = `https://accounts.spotify.com/authorize?${objectToQueryString(
    requestData
  )}`;

  window.location = url;
}

function objectToQueryString(data) {
  return Object.keys(data)
    .map(key => `${key}=${encodeURIComponent(data[key])}`)
    .join("&");
}

export function getUserRecentMusic(authorizationType, token) {
  return fetch("https://api.spotify.com/v1/me/player/recently-played", {
    headers: {
      authorization: `${authorizationType} ${token}`
    }
  })
    .then(result => result.json())
    .then(spotifyResponse =>
      spotifyResponse.items.map(item => ({
        id: item.track.id,
        name: item.track.name,
        description: getDescription(item.track),
        time: getMusicSizeInSeconds(item.track.duration_ms),
        image: getTrackImage(item.track)
      }))
    );
}

function getDescription(track) {
  const artistCollection = track.artists.map(artist => artist.name);
  return `${track.name} by ${artistCollection.join("and")}`;
}

function getTrackImage(track) {
  if (track.album && track.album.images && track.album.images.length > 0)
    return track.album.images[0].url;
  return "./album-icon.png";
}

function getMusicSizeInSeconds(duration) {
  return `${Math.ceil(duration / 1000)}s`;
}
