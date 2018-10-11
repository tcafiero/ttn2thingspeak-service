![](./images/IoThingsWareWideSmall.png)
# ttn2thingspeak-service


This Service reads ad decode some fields from the payload_raw data and route them into a a ThingSpeak channel. To do this job use the mqtt and Thingspeak API.
This Service Subscribe to a TTN Service for the payload coming from an Application/Device and route them Publishing to a ThingSpeak channel.

## The Things Network Service
This service connect to The Things Network Service using the MQTT API. To connect use this parameters:

    protocol:  tcp://
    host name: eu.thethings.network
    port:      1883
    username:  iotapplication002
    password:  [the value of Access Key you copied before].


## The ThingSpeak Channel

	channelID = 168044
	WriteKey = 9W0Y5T5P2ICBF1HX
	
	
# Installation


Stable: `npm install ttn2thingspeak-service`

## ttn2thingspeak-service.js a service on AWS starting automatically

	$ sudo npm install -g forever
	$ sudo npm install -g forever-service
	$ forever-service --help
	$ sudo forever-service install ttn2mqtt2services -s \
	/home/ubuntu/services/node_modules/ttn2thingspeak-service\
	/ttn2thingspeak-service.js
	forever-service version 0.5.11
	
	Platform - Ubuntu 16.04.2 LTS
	ttn2thingspeak-service provisioned successfully
	
	Commands to interact with service mqtt2postgress-services
	Start   - "sudo service ttn2thingspeak-service start"
	Stop    - "sudo service ttn2thingspeak-service stop"
	Status  - "sudo service ttn2thingspeak-service status"
	Restart - "sudo service ttn2thingspeak-servicerestart"
	$ sudo service ttn2thingspeak-service start



## Unlicense

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>


Author
------

Antonio Cafiero
| [Website](http://www.IoThingsWare.com)
| [Github](https://github.com/tcafiero/gps2mqtt)
