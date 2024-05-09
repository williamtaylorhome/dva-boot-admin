import React, { Component } from 'react';

/**
 * Adding this decorator to a class can change the breadcrumbs of the page
 * @param {*} options
 */
const breadcrumb = options => WrappedComponent => {
  return WrappedComponent;
};

export default breadcrumb;
