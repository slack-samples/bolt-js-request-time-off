const { notifyApprover } = require('./notify-approver');
const { approveActionHandler } = require('./actions/approve-action');
const { denyActionHandler } = require('./actions/deny-action');

const { ApprovalFunction } = require('../../manifest/function/approval');
const { SlackFunction } = require('@slack/bolt');

module.exports.register = (app) => {
  app.function(ApprovalFunction.id, notifyApprover, {
    actions: [
      { action_id: "approve_request", handler: approveActionHandler },
      { action_id: "deny_request", handler: denyActionHandler}
    ],
  })
};