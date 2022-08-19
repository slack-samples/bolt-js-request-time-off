const denyActionHandler = async ({ ack, client, body }) => {
  const { manager, employee } = body.function_data.inputs;
  try {
    await ack();
    await client.chat.postMessage({
      channel: employee,
      text: `:x: Denied by <@${manager}>`,
      blocks: [{
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `:x: Denied by <@${manager}>`,
          },
        ],
      }],
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { denyActionHandler };
