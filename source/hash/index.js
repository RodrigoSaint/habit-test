export function hashToObject(hash) {
  if (hash == null || hash.length <= 1) return null;
  return hash
    .slice(1)
    .split("&")
    .map(pair => ({
      [pair.split("=")[0]]: decodeURIComponent(pair.split("=")[1])
    }))
    .reduce(
      (accumulator, pairObject) => Object.assign(accumulator, pairObject),
      new Object()
    );
}
