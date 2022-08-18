const { Manifest } = require('@slack/bolt');
const { TimeOffWorkflow, RequestsDatastore } = require('./workflows/approval');

module.exports = Manifest({
  runOnSlack: false,
  name: 'take-your-time',
  displayName: 'Take Your Time',
  description: 'Request and take time off.',
  longDescription: 'Take your time off by using this application to request and take time off from your manager. Launch the workflow, put in your manager, requested PTO start and end date, and receive updates on your PTO request!',
  botScopes: ['channels:history', 'chat:write', 'commands'],
  tokenManagementEnabled: true,
  socketModeEnabled: true,
  workflows: [TimeOffWorkflow],
  datastores: [RequestsDatastore],
  features: {
    appHome: {
      homeTabEnabled: true,
      messagesTabEnabled: true,
      messagesTabReadOnlyEnabled: true,
    },
    botUser: {
      always_online: false,
    },
    shortcuts: [{
      name: 'Run sample shortcut',
      type: 'global',
      callback_id: 'sample_shortcut_id',
      description: 'Runs a sample shortcut',
    }],
    slashCommands: [{
      command: '/sample-command',
      description: 'Runs a sample command',
      should_escape: false,
    }],
  },
  settings: {
    interactivity: {
      is_enabled: true,
    },
    org_deploy_enabled: false,
  },
  eventSubscriptions: { bot_events: ['app_home_opened', 'message.channels'] },
  tokenRotationEnabled: false,
});
