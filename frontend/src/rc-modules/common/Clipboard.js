/** @module */

/**
 * simple utility for copying a string to the browser clipboard.
 *
 * @function
 * @param {string} str - string to be copied to clipboard
 */
export const copy_to_clipboard = (str) => {
  const el = document.createElement('textarea');
  el.style.visibility = 'invisible';
  el.value = str;
  document.body.appendChild(el);
  const selected = document.getSelection().rangeCount > 0
    ? document.getSelection().getRangeAt(0)
    : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}
