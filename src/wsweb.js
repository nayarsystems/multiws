class WsWeb {
  async connect(url, protocols) {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(url, protocols);

      this.ws.onmessage = evt => {
        if (this.onMessage) {
          let fileReader = new FileReader();

          fileReader.onload = evtLoad => {
            this.onMessage(evtLoad.target.result);
          };

          fileReader.onerror = err => {
            console.log("error converting blob to arraybuffer", err);
          };

          fileReader.readAsArrayBuffer(evt.data);
        }
      };

      this.ws.onerror = err => {
        if (this.onError) this.onError(err);
        reject(err);
      };

      this.ws.onopen = () => {
        if (this.onOpen) this.onOpen();
        resolve();
      };

      this.ws.onclose = res => {
        if (this.onClose) this.onClose(res);
      };
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
    return new Promise(resolve => {
      this.ws.send(data);
      resolve();
    });
  }

  async close(code, reason) {
    return new Promise(resolve => {
      this.ws.close(code, reason);
      resolve();
    });
  }
}

exports.WsWeb = WsWeb;
