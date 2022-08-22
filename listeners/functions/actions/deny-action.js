const denyActionHandler = async ({ ack, client, body, complete }) => {
  const { manager, employee } = body.function_data.inputs;
  try {
    await ack();
    const resp = await client.chat.postMessage({
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
    if(resp.ok) {
      complete();
    } 
  } catch (error) {
    complete({ error })
  }
};

module.exports = { denyActionHandler };
