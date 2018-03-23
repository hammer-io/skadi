const fetch = require('node-fetch');

async function sendHttpData(data, config) {
  fetch(config.httpDataUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`
    },
    body: JSON.stringify(data)
  })
}

async function captureRequestData(req) {
  req.skadi = {};
  req.skadi.timestamp = Date.now();
  req.skadi.size = 0; // iniitalize to zero
  if (req.body) {
    req.skadi.size = Buffer.byteLength(req.body);
  }
}

async function captureResponseData(req, res, config) {
  const data = {
    timestamp: Date.now(),
    responseTime: Date.now() - req.skadi.timestamp,
    status: res.statusCode,
    url: res.req.url,
    method: res.req.method,
    requestSize: req.skadi.size,
  }

  await sendHttpData(data, config);
}

module.exports = {
  captureRequestData,
  captureResponseData
};
