const { DefineFunction, Schema } = require('@slack/bolt');

const ApprovalFunction = DefineFunction({
  callback_id: 'review_approval',
  title: 'Approval Function',
  description: 'Get approval for a request',
  input_parameters: {
    properties: {
      employee: {
        type: Schema.slack.types.user_id,
        description: 'Requester',
      },
      manager: {
        type: Schema.slack.types.user_id,
        description: 'Manager',
      },
      start_date: {
        type: Schema.slack.types.timestamp,
        description: 'Start Date',
      },
      end_date: {
        type: Schema.slack.types.timestamp,
        description: 'End Date',
      },
    },
    required: [
      'employee',
      'manager',
      'start_date',
      'end_date',
    ],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});

module.exports = { ApprovalFunction };
