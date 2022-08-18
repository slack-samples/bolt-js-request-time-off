// For more information about functions: https://api.slack.com/future/functions

const sendMgrDM = async ({ event, completeError, client }) => {
  const { manager, employee, end_date, start_date } = event.inputs;
  const startDate = new Date(start_date * 1000).toDateString();
  const endDate = new Date(end_date * 1000).toDateString();

  try {
    await client.chat.postMessage({
      token: event.bot_access_token,
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
      metadata: {
        event_type: 'task_created',
        event_payload: {
          manager,
          employee,
          start_date,
          end_date,
          startDateString: startDate,
          endDateString: endDate,
        },
      },
    });
  } catch (err) {
    // call error callback with function outputs
    await completeError(`There was an issue: ${err}`);
    throw (err);
  }
};

module.exports = { sendMgrDM };
