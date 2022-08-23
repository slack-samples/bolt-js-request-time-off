const openModalSubmissionHandler = async ({ ack, body, complete }) => {
    ack();
    const { manager, employee } = body.function_data.inputs;
    try {
        console.log('DEBUG** OPENMODALSUBMISSIONHANDLER');
        complete();
    } catch (error) {
        complete({ error });
    }
  };
  
module.exports = { openModalSubmissionHandler };