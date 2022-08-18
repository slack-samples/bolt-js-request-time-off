const { approveActionCallback } = require('./approve-action');
const { denyActionCallback } = require('./deny-action');
const { sampleActionCallback } = require('./sample-action');

module.exports.register = (app) => {
  app.action('sample_action_id', sampleActionCallback);
  app.action('approve_request', approveActionCallback);
  app.action('deny_request', denyActionCallback);
};
