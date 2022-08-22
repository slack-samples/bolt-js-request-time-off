const crypto = require('crypto');

const approveActionHandler = async ({ ack, client, body, complete }) => {
  const { manager, employee, start_date, end_date } = body.function_data.inputs;

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
      // complete our function with an error
      complete({ error: `Error calling apps.datastore.put: ${put_response.error}` });
    }
    complete();
  } catch (error) {
    complete({ error: `Slack Function ID: DUMMY ID \nError Message: ${error}` });
  }
};

module.exports = { approveActionHandler };
