import enquireJS from 'enquire.js';

const mobileQuery = 'only screen and (max-width: 767.99px)';
const tabletQuery =
  'only screen and (min-width: 768px) and (max-width: 1024px)';
const desktopQuery = 'only screen and (min-width: 1025px)';

// Whether it matches the size of the mobile window
export function enquireIsMobile(cb, handlers) {
  return enquireScreen(mobileQuery, cb, handlers);
}

// Whether it matches the pad window size
export function enquireIsTablet(cb, handlers) {
  return enquireScreen(tabletQuery, cb, handlers);
}

// Whether it matches the desktop window size
export function enquireIsDesktop(cb, handlers) {
  return enquireScreen(desktopQuery, cb, handlers);
}

/**
 * enquire.js encapsulation
 * @param {*} query media query
 * @param {*} cb callback function
 * @param {*} handlers enquire.js handlers
 * @return return unregister function
 */
export function enquireScreen(query, cb, handlers) {
  const handler = handlers || {
    match: () => {
      cb && cb(true);
    },
    unmatch: () => {
      cb && cb(false);
    }
  };
  enquireJS.register(query, handler);
  return _ => enquireJS.unregister(query);
}

export default enquireJS;
