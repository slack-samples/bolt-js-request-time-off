const { requestApprovalFunc } = require('./request-approval');

// Register a complete function
module.exports.register = (app) => {
  app.function(requestApprovalFunc);
  // Register another function here
};
