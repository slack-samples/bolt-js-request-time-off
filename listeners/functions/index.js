const { requestApprovalFunc } = require('./request-approval');

// register a complete function
module.exports.register = (app) => {
  app.function(requestApprovalFunc);
  // register another function here
}