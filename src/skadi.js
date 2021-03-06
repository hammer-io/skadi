const fs = require('fs');
const setHeartbeat = require('./heartbeat/heartbeat');
const setData = require('./osdata/osdata');
const httpdata = require('./httpdata/httpdata');

const ONE_HUNDRED_MILLISECONDS = 100;
const ONE_SECOND = 1000;

let config = {};
function prepare() {
  if (!fs.existsSync(`${process.cwd()}/.skadiconfig.json`)) {
    throw new Error('Missing .skadiconfig.json file');
  }

  config = JSON.parse(fs.readFileSync(`${process.cwd()}/.skadiconfig.json`));

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
}

function heartbeat() {
  prepare();
  if (config.heartbeatUrl) {
    setHeartbeat(config)
  } else {
    throw new Error('Missing heartbeatUrl in .skadiconfig.json');
  }
}

function osdata() {
  if (config.osDataUrl) {
    setData(config);
  } else {
    throw new Error('Missing osDataUrl in .skadiconfig.json');
  }
}

function captureResponseData(req, res) {
  if (!config.httpDataUrl) {
    throw new Error('Missing httpDataUrl in .skadiconfig.json');
  }

  prepare();
  httpdata.captureResponseData(req, res, config);
}

function captureRequestData(req) {
  if (!config.httpDataUrl) {
    throw new Error('Missing httpDataUrl in .skadiconfig.json');
  }

  prepare();
  httpdata.captureRequestData(req);
}

module.exports = {
  heartbeat,
  osdata,
  captureResponseData,
  captureRequestData
};
