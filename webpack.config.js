const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "multiws.js",
    library: "multiws",
    libraryTarget: "umd",
    globalObject: "typeof self !== 'undefined' ? self : this"
  }
};
