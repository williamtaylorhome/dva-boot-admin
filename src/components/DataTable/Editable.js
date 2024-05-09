import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import omit from 'object.omit';
import DataTable, { Oper } from './DataTable';

const EditableContext = React.createContext();

const Editable = Form.create()(({ form, ...props }) => (
  <EditableContext.Provider value={form}>
    <DataTable {...props} />
  </EditableContext.Provider>
));

/**
 * Repack the oper in order to pass the form to the child component
 * For example
 *  <EditableOper>
      {
        form => <a onClick={e => onSave(form)}>preservation</a>
      }
    </EditableOper>
 */
const EditableOper = props => (
  <EditableContext.Consumer>
    {form => <Oper>{props.children(form)}</Oper>}
  </EditableContext.Consumer>
);

/**
 * Editable components
 * Change the way the current table cell is displayed by returning a component
 * @param text The text content in the current cell
 * @param record [Object] Contains a row of data for the current cell
 * @param field [Object] column in this columns
 * @param field.tableItem.editing [Function] Use functions to support a specified cell app type that meets the criteria
 */
class EditableCell extends React.Component {
  componentDidMount() {
    // Reset the form item, otherwise the value will be brought in to the next row
    const { record, field } = this.props;
    if (record && record[field.name]) {
      this.form.setFieldsValue({
        [field.name]: record[field.name]
      });
    }
  }

  render() {
    const { record, text, field } = this.props;
    const { tableItem } = field;
    const { type } = tableItem;

    return (
      <EditableContext.Consumer>
        {form => {
          if (!form) {
            console.warn('Please use Editable instead of DataTable');
            return text;
          }
          if (!this.form) this.form = form;
          let formProps = {
            form,
            name: field.name,
            title: field.title,
            record,
            ...tableItem
          };
          if (field.dict) {
            formProps.dict = field.dict;
          }
          formProps = omit(formProps, ['editing', 'render']);
          return (
            <Form.Item help={false} className="editable-form-item">
              {require(`../Form/model/${type.toLowerCase()}`).default(
                formProps
              )}
            </Form.Item>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

export { Editable, EditableCell, EditableOper };
