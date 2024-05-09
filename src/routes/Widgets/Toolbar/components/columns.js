export default (self) => [
  {
    title: 'name',
    name: 'name',
    searchItem: {
      group: '1',
    },
  },
  {
    title: 'role',
    name: 'role',
    dict: [
      {code: '1', codeName: 'administrator'},
      {code: '2', codeName: 'edit'},
      {code: '3', codeName: 'visitor'},
    ],
    searchItem: {
      type: 'select',
      group: '1',
    }
  },
  {
    title: 'birthday',
    name: 'birthday',
    searchItem: {
      type: 'date',
      width: 120,
    }
  }
];