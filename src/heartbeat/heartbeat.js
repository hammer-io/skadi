import axios from 'axios';

const TEN_MINUTES = 60000;
const ONE_MINUTE = 6000;
const HEARTBEAT_ENDPOINT = '/api/v1/heartbeats';

let id = '';
let serverUrl = '';
let interval = TEN_MINUTES;

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
      `${serverUrl}${HEARTBEAT_ENDPOINT}`,
      { id },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log(response.data);
    if (response.data !== 'success') {
      console.log('An error probably occurred when trying to' +
      ` post a heartbeat to ${serverUrl}${HEARTBEAT_ENDPOINT}.  Returned Data: ${response.data}`);
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * Sets the configurable features of the heartbeat.  The options object must contain an id for
 * the project and the url of the Koma server.  Other configurable options are the interval at
 * which the heartbeat repeats, which must be at least one minute and is specified in milliseconds.
 * If the interval is not set, it defaults to 10 minutes. Once the options have been set, the
 * heartbeat function is run, then set to run repeatedly for the specified interval.
 *
 * @param options - The options object
 */
export default function setHeartbeat(options) {
  if (options.id) {
    ({ id } = options);
  } else {
    throw new Error('An id for this application must be specified in skadiConfig.json.  For more information,' +
      'check out https://github.com/hammer-io/skadi.')
  }

  if (options.interval) {
    if (Number.isNaN(options.interval)) {
      throw new Error('The interval that the heartbeat should wait for must be a number');
    }
    if (options.interval < ONE_MINUTE) {
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
