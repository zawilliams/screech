export const truncateHash = (hash, length = 38) => {
  return hash.replace(hash.substring(6, length), '...');
}
