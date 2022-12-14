const { Manifest } = require('@slack/bolt');
const { TimeOffWorkflow } = require('./workflows/time-off-request');

module.exports = Manifest({
  runOnSlack: false,
  name: 'take-your-time',
  displayName: 'Take Your Time',
  description: 'Request and take time off.',
  longDescription: 'Take your time off by using this application to request and take time off from your manager. Launch the workflow, put in your manager, requested PTO start and end date, and receive updates on your PTO request!',
  botScopes: ['chat:write'],
  socketModeEnabled: true,
  workflows: [TimeOffWorkflow],
  features: {
    appHome: {
      homeTabEnabled: true,
      messagesTabEnabled: true,
      messagesTabReadOnlyEnabled: true,
    },
  },
  settings: {
    interactivity: {
      is_enabled: true,
    },
  },
  tokenRotationEnabled: false,
});
