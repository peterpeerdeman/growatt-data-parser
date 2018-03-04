# growatt-data-parser changelog

## 2.0.0

- now detects serial number and correctly parses data buffers with smaller sizes 

Breaking changes:

- parseGrowattData does not throw `growatt data has incorrect length`, but now throws `growatt data does not contain a serialnumber`

## 1.0.0

- initial version
