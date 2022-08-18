/*
   Learn how to:
   -> listen to actions with Bolt:  https://slack.dev/bolt-js/concepts#action-listening
   -> respond to actions with Bolt: https://slack.dev/bolt-js/concepts#action-respond
   For more information about interactivity: https://api.slack.com/interactivity
*/
const crypto = require('crypto');

const approveActionCallback = async ({ ack, client, body, say }) => {
  const { manager, employee, start_date, end_date } = body.function_data.inputs;

  try {
    await ack();
    await client.chat.postMessage({
      channel: employee,
      text: `:white_check_mark: Approved by <@${manager}>`,
      blocks: [{
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `:white_check_mark: Approved by <@${manager}>`,
          },
        ],
      }],
    });

    console.log('Saving approved FTO request to datastore');
    const primarykey = crypto.randomUUID();
    const put_response = await client.apiCall('apps.datastore.put', {
      datastore: 'fto_requests_db',
      item: {
        id: primarykey,
        employee,
        approved_by: manager,
        start_date,
        end_date,
      },
    });

    if (!put_response.ok) {
      console.log(`Error calling apps.datastore.put: <@${put_response.error}>`);
      throw (put_response.error);
    } else {
      console.log('Datastore put successful!');
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { approveActionCallback };
