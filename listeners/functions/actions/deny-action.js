const denyActionHandler = async ({ ack, client, body, complete }) => {
  const { manager, employee, start_date, end_date } = body.function_data.inputs;
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
    if (resp.ok) {
      complete();
    }
  } catch (error) {
    complete({ error });
  }
};

module.exports = { denyActionHandler };
