class WsWeChat {
  async connect(url, protocols) {
    return new Promise((resolve, reject) => {
      this.ws = wx.connectSocket({
        url: url,
        protocols: protocols
      });

      this.ws.onMessage(res => {
        if (this.onMessage) this.onMessage(res.data);
      });

      this.ws.onError(err => {
        if (this.onError) this.onError(err);
        reject(err);
      });

      this.ws.onOpen(() => {
        if (this.onOpen) this.onOpen();
        resolve();
      });

      this.ws.onClose(res => {
        if (this.onClose) this.onClose(res);
      });
    });
  }

  setOnMessage(cb) {
    this.onMessage = cb;
  }

  setOnError(cb) {
    this.onError = cb;
  }

  setOnOpen(cb) {
    this.onOpen = cb;
  }

  setOnClose(cb) {
    this.onClose = cb;
  }

  async send(data) {
    return new Promise((resolve, reject) => {
      this.ws.send({
        data: data,
        success: resolve,
        fail: reject
      });
    });
  }

  async close(code, reason) {
    return new Promise((resolve, reject) => {
      this.ws.close({
        code: code,
        reason: reason,
        success: resolve,
        fail: reject
      });
    });
  }
}

exports.WsWeChat = WsWeChat;
