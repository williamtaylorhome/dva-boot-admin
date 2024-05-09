/**
 * Analog CRUD data
 */
export default ({ fetchMock, delay, mock, toSuccess, toError }) => {
  return {
    // Table with pagination
    '/api/datatable/getList': options => {
      const body = JSON.parse(options.body);
      const currentPage = body.currentPage;
      const sortMap = body.sortMap;
      const idbase = (currentPage - 1) * 10 + 1;
      let sortField = { 'age|1-100': 1 };
      if (sortMap && sortMap.age) { // Simulation Sort
        let i = 60;
        sortField =
          sortMap.age === 'asc'
            ? { 'age|+1': new Array(10).fill(0).map(item => i++) }
            : { 'age|+1': new Array(10).fill(0).map(item => i--) };
      }

      return toSuccess(
        mock({
          currentPage: currentPage,
          showCount: body.showCount,
          totalResult: 100,
          totalPage: 10,
          [`dataList|${body.showCount}`]: [
            {
              'id|+1': idbase,
              name: '@cname',
              address: '@county()',
              'role|1': ['1', '2', '3'],
              ...sortField
            }
          ]
        }),
        400
      );
    },
    // Foreground Pagination
    '/api/datatable/frontPaging': options => {
      return toSuccess(
        mock({
          [`list|33`]: [
            {
              'id|+1': 1,
              name: '@cname',
              address: '@county()',
              'age|1-100': 1,
              'role|1': ['1', '2', '3']
            }
          ]
        }),
        400
      );
    }
  };
};
