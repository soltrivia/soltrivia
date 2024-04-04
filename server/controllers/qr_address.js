var axios = require('axios');
var fs = require('fs');

module.exports = async (ctx, next) => {
  if (ctx.state.$wxInfo.loginState === 1) {
    let secret = require('../config.js').appSecret,
      appId = require('../config.js').appId
    console.log('appId', appId)

  } else {
    ctx.state.code = -1
  }
}