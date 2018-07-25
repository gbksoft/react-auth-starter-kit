/**
 * Returns a unique identifier
 * @param {string} prefix
 * @returns {string}
 */
export default function generateId(prefix) {
  return prefix + Math.random().toString(36).substr(2, 9);
}