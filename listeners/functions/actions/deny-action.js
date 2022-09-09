const denyActionHandler = async ({ ack, client, body, complete }) => {
  const { manager, employee, start_date, end_date } = body.function_data.inputs;
  const { channel_id, message_ts } = body.container;
  const startDate = new Date(start_date * 1000).toDateString();
  const endDate = new Date(end_date * 1000).toDateString();

  try {
    await ack();
    const resp = await client.chat.postMessage({
      channel: employee,
      text: `:x: Time-off request for ${startDate} to ${endDate} denied by <@${manager}>`,
      blocks: [{
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `:x: Time-off request for ${startDate} to ${endDate} denied by <@${manager}>`,
          },
        ],
      }],
    });

    // Update the manager's message to remove the buttons and reflect the approval state.
    const msgUpdate = await client.chat.update({
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
    if (resp.ok && msgUpdate.ok) {
      complete();
    }
  } catch (error) {
    complete({ error });
  }
};

module.exports = { denyActionHandler };
