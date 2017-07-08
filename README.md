# growatt-data-parser

[![Build Status](https://travis-ci.org/peterpeerdeman/growatt-data-parser.svg?branch=master)](https://travis-ci.org/peterpeerdeman/growatt-data-parser)

Parses growatt solar inverter data and returns the data in a structured readable json object.

Tested with Growatt inverter GT0012F111 with WiFi module

## Installation

`npm install growatt-data-parser`

## Usage

```javascript
var growattDataParser = require('growatt-data-parser');
var data = fs.readFileSync('test/testcapture-growatt-GT0012F111-01.cap');
var result = growattDataParser(data);
```

## Example usage in webserver receiving growatt solar power data

```javascript
// simple server
var net = require('net');
var growattDataParser = require('growatt-data-parser');

net.createServer(function (socket) {
    socket.on('data', function(data) {
        const solardata = growattDataParser(data);
        console.log(solardata);
    });
}).listen('8000');
```

## JSON object output

```json

{
   "wifimoduleserial":"AH55321111",
   "inverterserial":"8F05491111",
   "inverterstatus":1,
   "ppv":745.3,
   "vpv1":143.2,
   "ipv1":2.5,
   "ppv1":370.8,
   "vpv2":141.9,
   "ipv2":2.6,
   "ppv2":374.5,
   "pac":730.4,
   "fac":50,
   "vac1":229.1,
   "iac1":3.1,
   "pac1":731.9,
   "vac2":0,
   "iac2":0,
   "pac2":0,
   "vac3":0,
   "iac3":0,
   "pac3":0,
   "etoday":11.7,
   "etotal":307.1,
   "htotal":435.04625,
   "temperature":41.2,
   "isofaultvalue":0,
   "gfcifaultvalue":0,
   "dcifaultvalue":0,
   "vpvfaultvalue":0,
   "vacfaultvalue":0,
   "facfaultvalue":0,
   "temperaturefaultvalue":0,
   "faultcode":0,
   "ipmtemp":43.4,
   "pbusvolt":358.5,
   "nbusvolt":0,
   "checkstep":"0000",
   "ipf":45,
   "resetchk":"0059",
   "deratingmode":"000000000000",
   "epv1today":5.7,
   "epv1total":149,
   "epv2today":5.6,
   "epv2total":149.7,
   "epvtotal":298.7,
   "rac":0,
   "eractoday":0,
   "eractotal":0,
   "warningcode":"0000",
   "warningvalue":"0000"
}
```

## Tests

`npm test`
