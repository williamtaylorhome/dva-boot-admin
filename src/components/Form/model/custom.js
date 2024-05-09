/**
 * Custom form symbols,
 * In the column, if necessary, use form to control
 * 
    return form.getFieldDecorator('xxx')(
      // ...
    );
 */
export default ({form, render, record, ...otherProps}) => {
  return render(record, form, otherProps);
};