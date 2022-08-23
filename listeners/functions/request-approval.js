// For more information about functions: https://api.slack.com/future/functions
const { SlackFunction } = require('@slack/bolt');

// get our Approval Function from the manifest!
const { ApprovalFunction } = require('../../manifest/function/approval');

// here is the work we want to do!
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
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Open a Modal',
              },
              action_id: 'open_modal',
              style: 'danger',
            },
          ],
        },
      ],
    });
  } catch (err) {
    // complete function with an error
    await complete({ error: `There was an issue: ${err}`});
    throw (err);
  }
};

// lets register a new Slack Function with notifyApprover as its handler
const requestApprovalFunc = new SlackFunction(ApprovalFunction.id, notifyApprover);

// get our action handlers
const { approveActionHandler } = require('./actions/approve-action');
const { denyActionHandler } = require('./actions/deny-action');
const { openModalActionHandler } = require('./actions/open-modal-action');
const { openModalSubmissionHandler } = require('./views/modal-submit');

// add additional interactivity handlers
requestApprovalFunc
  .action(/approve_request/, approveActionHandler)
  .action({ action_id: "deny_request" }, denyActionHandler)
  .action("open_modal", openModalActionHandler)
  .view({ type: "view_submission", callback_id: "submit_open_modal"}, openModalSubmissionHandler)
  .view({ type: "view_closed", callback_id: "submit_open_modal"}, openModalSubmissionHandler)

module.exports = { requestApprovalFunc };