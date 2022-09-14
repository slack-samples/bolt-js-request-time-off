const { DefineWorkflow, Schema } = require('@slack/bolt');
const { ApprovalFunction } = require('../functions/approval');

const TimeOffWorkflow = DefineWorkflow({
  callback_id: 'time_off_request_wf',
  title: 'Time Off Request Workflow',
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
    },
    required: [],
  },
});

const step1 = TimeOffWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: 'Request Time Off',
    submit_label: 'Request',
    description: 'Please describe your request',
    interactivity: TimeOffWorkflow.inputs.interactivity,
    fields: {
      required: ['manager', 'start_date', 'end_date'],
      elements: [
        {
          name: 'manager',
          title: 'Manager',
          type: Schema.slack.types.user_id,
        },
        {
          name: 'start_date',
          title: 'Start Date',
          type: Schema.slack.types.timestamp,
        },
        {
          name: 'end_date',
          title: 'End Date',
          type: Schema.slack.types.timestamp,
        },
      ],
    },
  },
);

TimeOffWorkflow.addStep(ApprovalFunction, {
  employee: TimeOffWorkflow.inputs.interactivity.interactor.id,
  manager: step1.outputs.fields.manager,
  start_date: step1.outputs.fields.start_date,
  end_date: step1.outputs.fields.end_date,
});

module.exports = { TimeOffWorkflow };
