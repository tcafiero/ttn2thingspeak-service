'use strict'

var mqtt = require('mqtt')
var clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
var cloudmqtt_host = 'tcp://m23.cloudmqtt.com'
var ttn_host = 'tcp://eu.thethings.network'

var cloudmqtt_options = {
  port: 18224,
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  username: 'test',
  password: 'test',
  rejectUnauthorized: false
}

var ttn_options = {
  port: 1883,
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  username: 'iotwapplication002',
  password: 'ttn-account-v2.l6YIDmeF8LJBnjpZF0iVzqcGQnGTLaIkvdEUtv9SHxg',
  rejectUnauthorized: false
}

var cloudmqtt_client = mqtt.connect(cloudmqtt_host, cloudmqtt_options)
var ttn_client = mqtt.connect(ttn_host, ttn_options)
cloudmqtt_client.on('connect', function (connack) {
	console.log('CloudMQTT Broker connected');
})
ttn_client.on('connect', function (connack) {
	console.log('The Things Network Server connected');
})


// to to publish use following statement as template
// MQTTclient.publish(topic, value);

// to to subscribe use following function as template
// MQTTclient.on('message', function (topic, message) {
//   console.log(message.toString())
//   MQTTclient.end()
// })

module.exports.cloudmqtt_client = cloudmqtt_client;
module.exports.ttn_client = ttn_client;
