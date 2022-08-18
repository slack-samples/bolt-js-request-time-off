/*
   Learn how to:
   -> listen to actions with Bolt:  https://slack.dev/bolt-js/concepts#action-listening
   -> respond to actions with Bolt: https://slack.dev/bolt-js/concepts#action-respond
   For more information about interactivity: https://api.slack.com/interactivity
*/

const denyActionCallback = async ({ ack, client, body }) => {
  const { manager, employee } = body.message.metadata.event_payload;
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

module.exports = { denyActionCallback };
