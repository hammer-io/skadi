const fs = require('fs');
const setHeartbeat = require('./heartbeat/heartbeat');

function skadi() {
  if (!fs.existsSync(`${process.cwd()}/.skadiconfig.json`)) {
    throw new Error('Missing .skadiconfig.json file');
  }

  const config = JSON.parse(fs.readFileSync(`${process.cwd()}/.skadiconfig.json`));
  if (!config.apiKey) {
    throw new Error('Missing API Key in .skadiconfig.json');
  }

  if (!config.serverUrl) {
    throw new Error('Missing server url in .skadiconfig.json');
  }

  setHeartbeat(config);
}

module.exports = skadi;

