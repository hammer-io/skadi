[![Build Status](https://travis-ci.org/hammer-io/skadi.svg?branch=master)](https://travis-ci.org/hammer-io/skadi)
[![npm version](https://badge.fury.io/js/skadi-hammerio.svg)](https://badge.fury.io/js/skadi-hammerio)

# skadi
Utility to send heartbeat and data information from express. 

## Install
`npm install --save skadi-hammerio`

## Setup
Create a `.skadiconfig.json` file in the directory where you are launching your application 
from. 
```json
{
    "interval": "<optional interval in millisecnods>",
    "apiKey": "<apiKey from koma>",
    "heartbeatUrl": "<server url to koma heartbeats>",
    "osDataUrl": "<server url to koma os data>",
    "httpDataUrl": "<server url to koma http data>"
}
```

## Usage
```javascript
const skadi = require('skadi-hammerio')
```

### Heartbeat
With `heartbeatUrl` in the `.skadiconfig.json` file, add the following snippet after your imports.
```javascript
skadi.heartbeat();
```

### OS Data
With `osDataUrl` in the `.skadiconfig.json` file, add the following snippet after your imports.
```javascript
skadi.osdata();
```
### HTTP Data
To capture incoming requests, add the following snippet before your routes.
```javascript
app.use((req, res, next) => {
  skadi.captureRequestData(req);
  next();
});

```

To capture outgoing responses, add the following snippet after your routes.
```javascript
app.use((req, res, next) => {
  skadi.captureResponseData(req, res);
});
```
