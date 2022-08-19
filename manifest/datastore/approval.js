const { DefineDatastore, Schema } = require("@slack/bolt");

const RequestsDatastore = DefineDatastore({
    name: 'fto_requests_db',
    primary_key: 'id',
    attributes: {
      id: {
        type: Schema.types.string,
      },
      employee: {
        type: Schema.slack.types.user_id,
      },
      approved_by: {
        type: Schema.slack.types.user_id,
      },
      start_date: {
        type: Schema.types.string,
      },
      end_date: {
        type: Schema.types.string,
      },
    },
  });

  module.exports = { RequestsDatastore };