/**
 * Notification interface, which requires a subclass implementation
 */
export default class Notification {
  static success(config) {/* success*/}

  static error(config) {/* fail*/}

  static info(config) {/* Information*/}

  static warning(config) {/* warning*/}

  static warn(config) {/* warning*/}

  static close(key) {/* Shut down*/}

  static destroy() {/* Destroyed*/}
}
