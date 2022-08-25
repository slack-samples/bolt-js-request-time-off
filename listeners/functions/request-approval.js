// For more information about functions: https://api.slack.com/future/functions
const { SlackFunction } = require('@slack/bolt');

// Get our Approval Function from the manifest!
const { ApprovalFunction } = require('../../manifest/function/approval');

// Here is the work we want to do!
const notifyApprover = async ({ event, client, complete }) => {
  const { manager, employee, end_date, start_date } = event.inputs;
  const startDate = new Date(start_date * 1000).toDateString();
  const endDate = new Date(end_date * 1000).toDateString();

  try {
    await client.chat.postMessage({
      channel: manager,
      text: 'A new time-off request has been submitted.',
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'A new time-off request has been submitted',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*From:* <@${employee}>`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Dates:* ${startDate} to ${endDate}`,
          },
        },
        {
          type: 'actions',
          block_id: 'approve-deny-buttons',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Approve',
              },
              action_id: 'approve_request',
              style: 'primary',
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Deny',
              },
              action_id: 'deny_request',
              style: 'danger',
            },
          ],
        },
      ],
    });
  } catch (err) {
    // Complete function with an error
    await complete({ error: `There was an issue: ${err}` });
    throw (err);
  }
};

// Let's register a new Slack Function with notifyApprover as its handler
const requestApprovalFunc = new SlackFunction(ApprovalFunction.id, notifyApprover);

// Get our action handlers
const { approveActionHandler } = require('./actions/approve-action');
const { denyActionHandler } = require('./actions/deny-action');

// Add additional interactivity handlers
requestApprovalFunc
  .action({ type: 'block_actions', action_id: /approve_*.+/ }, approveActionHandler) // Support Regex
  .action({ action_id: 'deny_request' }, denyActionHandler); // Support constraint object

module.exports = { requestApprovalFunc };
