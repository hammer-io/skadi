# skadi
Utility to send heartbeat and data information from express. 

[![Build Status](https://travis-ci.org/hammer-io/skadi.svg?branch=master)](https://travis-ci.org/hammer-io/skadi)

## Setup
Create a `.skadiconfig.json` file in the directory where you are launching your application 
from. 
```json
{
    "interval": "<optional interval in millisecnods>",
    "apiKey": "<apiKey from koma>",
    "heartbeatUrl": "<server url to koma heartbeats>",
    "osDataUrl": "<server url to koma os data>"
}
```
