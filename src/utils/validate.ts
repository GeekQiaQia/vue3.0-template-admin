/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path:string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
   * @param {string} str
   * @returns {Boolean}
   */
export function validUsername(str:string) {
  // eslint-disable-next-line camelcase
  const valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}
