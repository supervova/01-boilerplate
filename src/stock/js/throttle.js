/**
 * Throttle [utils/]
 * throttling controls the rate at which a function is called
 *
 * @param   {requestCallback} fn callback function
 * @param   {number} wait delay in milliseconds
 *
 * @return  {function} rerun callback after delay
 */
export default function throttle(fn, wait) {
  let time = Date.now();
  return () => {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}
