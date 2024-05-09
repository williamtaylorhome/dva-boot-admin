import React from 'react';
import './PageLoading.less'

/**
 * Load an example of an effect
 */
export default ({loading, style = 'style1'}) => 
  loading ? <div className={`loading-spinner loading-spinner-${style}`}></div> : null;