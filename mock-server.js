/**
 * Mock-Server leverages Express to generate realistic simulation data
 * In order to solve the problem that the previous mock data was only valid for fetch, and the request could not be seen in the Network panel of the developer tools
 */

exports.addMockServer = () => config => {
  config.before = app => {
    app.get('/test/get', (req, res) => {
      res.json({ get: 'response get' });
    });
  };
  return config;
};

