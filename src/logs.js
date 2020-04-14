let enabled = true;

function enableLogs(value) {
    enabled = value;
}

function log() {
    if (enabled)
        console.log.apply(console, arguments);
}

exports.log = log;
exports.enableLogs = enableLogs;