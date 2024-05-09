## column.js

column.js can act on the DataTable component, the Form component, and the SearchBar component at the same time to define their data structures.

## Notes

The column returns as a json array
```javascript
[
  {
    title: 'Age', // Column Name
    name: 'age',  // Unique identification
    dict: [],     // Data used in drop-down or cascade
    formItem: {    // Generate form structure
      type: 'number', // Form element type
      width: 100,  // Form element width
      rules: [],   // Form Validation Rules
      render: (record, form) => (), // When type:custom, custom rendering
      ...other // Other additional attributes are injected into the corresponding element.
    },
    tableItem: {    // Generate table structure
      width: 100,   // Table element width
      type: 'oper|default' // This column
      render: (text, record) => (), // Custom Rendering
      ...other // Other additional attributes are injected into the corresponding element. For more information, see the column configuration of the antd table.
    },
    searchItem: {   // Generate search term structure
      type: 'number', // Search for the type of item
      width: 100,   // Search item element width
      rules: [],    // Search term validation rules
      render: (record, form) => (), // When type:custom, custom rendering
      ...other // Other additional attributes are injected into the corresponding element
    }
  },
  {
    ...
  }
]

```

## example

```javascript
// app.js

import React from 'react';
import {Link} from 'react-router';
import {Button, Icon} from '../../../components';

export default (clazz) => {
  let columns = [
    {
      name: "cnId",
      formItem: {
        type: "hidden"
      }
    },
    {
      title: "Dictionary type",
      name: "codeType",
      formItem: {
        rules: [{
          required: true, 
          message: 'Please enter a dictionary value' 
        }, {
          pattern: /^[a-zA-Z0-9_]{1,20}$/,
          message: 'Dictionary types do not allow special characters'
        }]
      },
      tableItem: {},
      searchable: {
        width: 120
      },
    },
    {
      title: "operation",
      tableItem: {
        width: 120,
        render: (text, record) => (
          <span className="table-row-button">
            <Button title="revise" tooltip onClick={e => clazz.onUpdate(record, e)}>
              <Icon type="edit" />
            </Button>
            <Button title="Delete" tooltip onClick={e => clazz.onDelete(record, e)}>
              <Icon type="delete" />  
            </Button>
          </span>
        )
      },
    }
  ];

  return columns;
};

```
