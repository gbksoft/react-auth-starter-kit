/**
 * returns date in format "dd.mm.yyyy"
 * @param {Date} date
 * @returns {string}
 */
export default function dateFormat(date = new Date()) {
  const to2 = n => `${n < 10 ? '0' : ''}${n}`;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${to2(day)}.${to2(month)}.${year}`;
}