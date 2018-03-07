const fetch = require('node-fetch');
const os = require('os');

let config = {};

/**
 * The function which collects os memory and constructs an object to be sent to the service
 * collecting the information, then sends the data.
 */
async function run() {
  console.log('osdata');
  const freeMemory = os.freemem();
  const totalMemory = os.totalmem();
  const memoryUsed = freeMemory / totalMemory;
  const timestamp = Date.now();


  const memoryData = {
    freeMemory,
    totalMemory,
    memoryUsed,
    timestamp
  };

  try {
    fetch(config.osDataUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`
      },
      body: JSON.stringify(memoryData)
    });
  } catch (err) {
    console.log(err);
  }
}

/**
 * Entry point for the os data collection. It intializes the run and sets the interval for how
 * often the data should be collected.
 *
 * @param newOptions the options to configure os data collection
 */
const osdata = function (newOptions) {
  config = newOptions;
  run();
  setInterval(run, config.interval);
}

module.exports = osdata;
