import axios from 'axios';

const TEN_MINUTES = 60000;
const ONE_MINUTE = 6000;
const HEARTBEAT_ENDPOINT = '/api/v1/heartbeats';

let id = '';
let serverUrl = '';
let interval = TEN_MINUTES;

function heartbeat() {
  axios.post(`${serverUrl}${HEARTBEAT_ENDPOINT}`, { id }, { headers: { 'Content-Type': 'application/json' } })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

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
