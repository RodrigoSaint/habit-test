export var defaultStore = {
  searchText: "",
  credentials: null,
  musicCollection: []
};

function changeItemOrder(collection, itemToChange, referenceItem) {
  const newCollection = collection.filter(item => item != itemToChange);
  newCollection.splice(collection.indexOf(referenceItem), 0, itemToChange);
  return newCollection;
}

function changeMusicItemOrder(store, itemToChange, referenceItem) {
  const musicCollection = changeItemOrder(
    store.musicCollection,
    itemToChange,
    referenceItem
  );
  return Object.assign({}, store, { musicCollection });
}

function changeSearchText(store, searchText) {
  return Object.assign({}, store, { searchText });
}

function updateItemCollection(collection, unmodifiedItem, newItem) {
  return collection.map(item => (item == unmodifiedItem ? newItem : item));
}

function selectMusic(store, music) {
  const selectedMusic = Object.assign({}, music, { selected: !music.selected });
  return Object.assign({}, store, {
    musicCollection: updateItemCollection(
      store.musicCollection,
      music,
      selectedMusic
    )
  });
}

function changeMusicCollection(store, musicCollection) {
  return Object.assign({}, store, { musicCollection });
}

function setCredentials(store, credentials) {
  return Object.assign({}, store, { credentials });
}

export function mapMutation(render) {
  const context = {
    changeMusicItemOrder(store, itemToChange, referenceItem) {
      render(changeMusicItemOrder(store, itemToChange, referenceItem), context);
    },
    changeSearchText(store, searchText) {
      render(changeSearchText(store, searchText), context);
    },
    selectMusic(store, music) {
      render(selectMusic(store, music), context);
    },
    changeMusicCollection(store, musicCollection) {
      render(changeMusicCollection(store, musicCollection), context);
    },
    setCredentials(store, credentials) {
      return setCredentials(store, credentials);
    }
  };
  return context;
}
