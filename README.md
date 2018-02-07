# skadi
Utility to send heartbeat and data information from express. 

[![Build Status](https://travis-ci.org/hammer-io/skadi.svg?branch=master)](https://travis-ci.org/hammer-io/skadi)

## Setup

It's all setup so far! Currently, it does not read from a config file, so the values are set in the index.js file, or
use their default value. More to come...

## Ideas

There will be a config like skadiConfig-template.json called skadiConfig.json where the user can alter any configurable
values and set the URL of the Koma server and the id of this current server.

Since this is going to be a library, the errors should be descriptive and should all have a name of Skadi*Error. Where
the * would be another word to better describe the type of error.  The message should be descriptive offering a good idea
of what the developer needs to fix to solve the error and prevent it from occurring in the future.

