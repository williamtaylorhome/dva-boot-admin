/**
 * Simulated data in the form form example
 */
export default ({ fetchMock, delay, mock, toSuccess, toError }) => {
  // Simulate autocomplete reversible data
  return {
    '/api/form/autoComplete': options => {
      const body = JSON.parse(options.body);
      const userName = body;

      return toSuccess(
        mock({
          'list|3-10': [{
            'id': '@id',
            'name': userName + '@cword("0123, Four Five Six Sixty -seven Eighty -ninety", 1, 2)', // Zhang San, Zhao Si
            'age|1-100': 100,                   // A random integer within 100
            'birthday': '@date("yyyy-MM-dd")',  // date
            'city': '@city(true)',              // Chinese cities
            'phone': /^1[385][1-9]\d{8}/,       // Mobile phone number
            'content': '@csentence',
          }]
        }),
        400
      );
    }
  };
};
