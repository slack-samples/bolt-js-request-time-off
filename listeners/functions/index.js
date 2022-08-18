const { sendMgrDM } = require('./send-manager-dm');

module.exports.register = (app) => {
  app.function('review_approval', sendMgrDM);
};
