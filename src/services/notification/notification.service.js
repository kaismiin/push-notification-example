// Initializes the `notification` service on path `/notification`
const { Notification } = require('./notification.class');
const hooks = require('./notification.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/notification', new Notification(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('notification');

  service.hooks(hooks);
};
