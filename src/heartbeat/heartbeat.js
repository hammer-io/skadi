const axios = require('axios');

const ONE_HUNDRED_MILLISECONDS = 100;
const ONE_SECOND = 1000;

let apiKey = '';
let serverUrl = '';
let interval = ONE_SECOND;

/**
 * A function that posts a heartbeat containing only its id to the server. If an error occurs when
 * trying to connect to the server, the heartbeat will continue to repeat, but the error will be
 * logged.
 *
 * @returns {Promise<void>} - The promise
 */
async function heartbeat() {
  try {
    const response = await axios.post(
      `${serverUrl}`,
      { },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }
    );
    if (response.data !== 'success') {
      console.log(`Heartbeat to ${serverUrl} was not successful.  Returned Data: ${response.data}`);
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * Sets the configurable features of the heartbeat.  The options object must contain an id for
 * the project and the url of the Koma server.  Other configurable options are the interval at
 * which the heartbeat repeats, which must be at least 100 milliseconds and is specified in
 * milliseconds. If the interval is not set, it defaults to 1 second. Once the options have been
 * set, the heartbeat function is run, then set to run repeatedly for the specified interval.
 *
 * @param options - The options object
 */
const setHeartbeat = function (options) {
  if (options.apiKey) {
    ({ apiKey } = options);
  } else {
    throw new Error('An id for this application must be specified in skadiConfig.json.  For more information,' +
      'check out https://github.com/hammer-io/skadi.')
  }

  if (options.interval) {
    if (Number.isNaN(options.interval)) {
      throw new Error('The interval that the heartbeat should wait for must be a number');
    }
    if (options.interval < ONE_HUNDRED_MILLISECONDS) {
      throw new Error('The interval that the heartbeat should wait must be more than one minute')
    }
    ({ interval } = options);
  }

  if (options.serverUrl) {
    ({ serverUrl } = options);
  } else {
    throw new Error('A serverUrl for this application must be specified in skadiConfig.json.  For more information,' +
      'check out https://github.com/hammer-io/skadi.')
  }
  heartbeat();
  setInterval(heartbeat, interval);
}

module.exports = setHeartbeat;
