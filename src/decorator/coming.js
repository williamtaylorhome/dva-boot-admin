import React, { PureComponent } from 'react';
import Coming from '../components/Pages/Coming';

/**
 * Adding this decorator to a class indicates that the class is an unfinished function.
 * It will appear as a ready-to-install friendly page with the possibility to set a countdown timer
 * @param {*} options Coming component options
 */
const coming = options => WrappedComponent => {
  return class extends PureComponent {
    render() {
      return (
        <Coming {...options}>
          <WrappedComponent {...this.props} />
        </Coming>
      );
    }
  };
};

export default coming;
