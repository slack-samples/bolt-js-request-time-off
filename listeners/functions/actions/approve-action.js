const approveActionHandler = async ({ ack, client, body, complete }) => {
  const { manager, employee, start_date, end_date, } = body.function_data.inputs;

  try {
    await ack();
    await client.chat.postMessage({
      channel: employee,
      text: `:white_check_mark: Time-off request approved by <@${manager}>`,
      blocks: [{
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `:white_check_mark: Time-off request approved by <@${manager}>`,
          },
        ],
      }],
    });

    complete();
  } catch (error) {
    complete({ error: `\nError Message: ${error}` });
  }
};

module.exports = { approveActionHandler };
