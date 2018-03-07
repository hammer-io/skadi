const skadi = require('./src/skadi');

// if run from a script
if (process.parent) {
  skadi.heartbeat();
  skadi.osdata();
}

module.exports = skadi;
