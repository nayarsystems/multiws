const wsweb = require("./wsweb.js");
const wswechat = require("./wswechat.js");

exports.create = () => {
  if (window && window.WebSocket) {
    console.log("multiws: detected web/Cordova");
    return new wsweb.WsWeb();
  }
  if (global && global.wx) {
    console.log("multiws: detected WeChat");
    return new wswechat.WsWeChat();
  }
  throw new Error("Unknown environment");
};
