const { notifyApprover } = require('./send-manager-dm');
const { approveActionHandler } = require('./actions/approve-action');
const { denyActionHandler } = require('./actions/deny-action');

const { ApprovalFunction } = require('../../functions/approval/definition');

module.exports.register = (app) => {
  app.function(ApprovalFunction.id, notifyApprover, {
    actions: [
      { action_id: "approve_request", handler: approveActionHandler },
      { action_id: "deny_request", handler: denyActionHandler}
    ],
  })
};

// Looks nicer, huh
// But would require some complex rearchitecting to
// Close off bad paths 

// module.exports.register = (app) => {
//   app.function(ApprovalFunction.id, notifyApprover)
//     .action("approve_request". approveActionHandler)
//     .action("deny_request", denyActionHandler)
// }
