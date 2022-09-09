const approveActionHandler = async ({ ack, client, body, complete }) => {
  const { manager, employee, start_date, end_date } = body.function_data.inputs;
  const { channel_id, message_ts } = body.container;
  const startDate = new Date(start_date * 1000).toDateString();
  const endDate = new Date(end_date * 1000).toDateString();

  try {
    await ack();
    await client.chat.postMessage({
      channel: employee,
      text: `:white_check_mark: Time-off request for ${startDate} to ${endDate} approved by <@${manager}>`,
      blocks: [{
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `:white_check_mark: Time-off request for ${startDate} to ${endDate} approved by <@${manager}>`,
          },
        ],
      }],
    });

    // Update the manager's message to remove the buttons and reflect the approval state.
    await client.chat.update({
      channel: channel_id,
      ts: message_ts,
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
      ],
    });
    complete();
  } catch (error) {
    complete({ error: `\nError Message: ${error}` });
  }
};

module.exports = { approveActionHandler };
