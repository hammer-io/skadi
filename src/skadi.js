const fs = require('fs');
const setHeartbeat = require('./heartbeat/heartbeat');
const setData = require('./osdata/osdata');

const ONE_HUNDRED_MILLISECONDS = 100;
const ONE_SECOND = 1000;

function skadi() {
  if (!fs.existsSync(`${process.cwd()}/.skadiconfig.json`)) {
    throw new Error('Missing .skadiconfig.json file');
  }

  const config = JSON.parse(fs.readFileSync(`${process.cwd()}/.skadiconfig.json`));

  if (config.interval) {
    if (Number.isNaN(config.interval)) {
      throw new Error('The interval that the heartbeat should wait for must be a number');
    }
    if (config.interval < ONE_HUNDRED_MILLISECONDS) {
      throw new Error('The interval that the heartbeat should wait must be more than one minute')
    }
  } else { // if the user didn't pass a interval configuration, default to one second
    config.interval = ONE_SECOND;
  }


  if (!config.apiKey) {
    throw new Error('Missing API Key in .skadiconfig.json');
  }

  if (config.heartbeatUrl) {
    setHeartbeat(config);
  }

  if (config.osDataUrl) {
    setData(config);
  }
}

module.exports = skadi;

