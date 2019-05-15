/** @module */

/**
 * Utility function to convert a duration in seconds to a more human
 * readable [HH:]MM:SS
 *
 * @function
 * @param {Number} seconds - the number of seconds in question
 * @return {string} - the string representing the supplied seconds
 */
const seconds_to_duration = (seconds) => {
  if (!seconds)
    return "0:00";
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  seconds = Math.floor(seconds % 60);

  const double_digits = (val) => `${val > 9 ? '' : '0'}${val}`;

  const min_str = hours ? `${hours}:${double_digits(minutes)}` : `${minutes}`;
  return `${min_str}:${double_digits(seconds)}`;
};

export default seconds_to_duration;
