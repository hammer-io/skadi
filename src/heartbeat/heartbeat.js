const fetch = require('node-fetch');

let config = {};

/**
 * A function that posts a heartbeat containing only its id to the server. If an error occurs when
 * trying to connect to the server, the heartbeat will continue to repeat, but the error will be
 * logged.
 *
 * @returns {Promise<void>} - The promise
 */
async function run() {
  fetch(config.heartbeatUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`
    }
  });
}

/**
 * Entry point for the heartbeat collection. It intializes the run and sets the interval for how
 * often the heartbeats should be sent.
 *
 * @param newOptions the options to configure os data collection
 */
const heartbeat = function (newOptions) {
  config = newOptions;
  run();
  setInterval(run, newOptions.interval);
}

module.exports = heartbeat;
