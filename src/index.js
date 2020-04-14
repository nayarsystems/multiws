const wsweb = require("./wsweb.js");
const wswechat = require("./wswechat.js");
const logs = require("./logs.js");

exports.create = (options) => {
  if (options && options.logs === false) {
    logs.enableLogs(false);
  }

  if (window && window.WebSocket) {
    logs.log("multiws: detected web/Cordova");
    return new wsweb.WsWeb();
  }
  if (global && global.wx) {
    logs.log("multiws: detected WeChat");
    return new wswechat.WsWeChat();
  }
  throw new Error("Unknown environment");
};
