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

async function captureRequestData(req, config) {
  const data = {
    url: req.url,
    method: req.method,
    type: 'request',
    timestamp: Date.now(),
    size: 0
  }

  if (req.body) {
    data.size = Buffer.byteLength(req.body);
  }

  await sendHttpData(data, config);
}

async function captureResponseData(res, config) {
  const data = {
    timestamp: Date.now(),
    status: res.status,
    url: res.req.url,
    method: res.req.method,
    type: 'response',
    size: null
  }

  await sendHttpData(data, config);
}

module.exports = {
  captureRequestData,
  captureResponseData
};
