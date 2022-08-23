const openModalActionHandler = async ({ ack, client, body, complete }) => {
    ack();
    const { manager, employee } = body.function_data.inputs;
    const { trigger_id } = body;
    try {
        await client.views.open({
            trigger_id,
            view: {
                "type": "modal",
                "title": {
                    "type": "plain_text",
                    "text": "Random Modal",
                    "emoji": true
                },
                "submit": {
                    "type": "plain_text",
                    "text": "Submit",
                    "emoji": true
                },
                "notify_on_close": true,
                "close": {
                    "type": "plain_text",
                    "text": "Cancel",
                    "emoji": true
                },
                "callback_id": "submit_open_modal",
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": `Hello <@${manager}>, you opened a random modal.`
                        }
                    }
                ]
            }
        })
    } catch (error) {
        complete({ error });
    }
  };
  
module.exports = { openModalActionHandler };