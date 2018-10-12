var MQTTclients = require("./MQTTConnector.js");
var ThingSpeakClient = require('thingspeakclient');
var client = new ThingSpeakClient();


var yourWriteKey = '9W0Y5T5P2ICBF1HX';
var channelID = 168044;

client.attachChannel(channelID, {
  writeKey: yourWriteKey
}, callBackThingspeak);





function callBackThingspeak(err, resp) {
  if (!err && resp > 0) {
    console.log('Successfully. response was: ' + resp);
  } else {
    console.log(err);
  }

}

MQTTclients.ttn_client.on("message", function (topic, msg) {
  try {
    //console.log(msg.toString());
    msg = JSON.parse(msg);
    switch (topic) {
      //case "iotwapplication002/devices/temperature-and-humidity-002/events/activations":

      case String(topic.match(/^iotwapplication002\/devices\/temperature-and-humidity-...\/events\/activations/)):
        // LoRa user data is on port one
        var payloadObj = {
          port: 1
        };
        // array for the binary payload
        var array = new Uint8Array(8);
        // get the local system time
        var now = new Date();

        // change to activation topic to be a downlink topic for the device
        // convert appId/devices/devId/events/activations into appId/devices/devId/down
        var dwnTopicStr = topic.replace("events/activations", "down");

        // load the message bytes into the array
        array[0] = 0x02; // Set UTC Notification
        array[1] = 0x01; // request simple status
        array[2] = now.getUTCFullYear() % 100 & 0xff;
        array[3] = (now.getUTCMonth() + 1) & 0xff;
        array[4] = now.getUTCDate() & 0xff;
        array[5] = now.getUTCHours() & 0xff;
        array[6] = now.getUTCMinutes() & 0xff;
        array[7] = now.getUTCSeconds() & 0xff;

        // base64 encode the binary payload
        payloadObj.payload_raw = Buffer.from(array).toString("base64");

        // convert the js object to JSON so we can send it
        msg.payload = JSON.stringify(payloadObj);
        // the MQTT node will send to the topic we specify
        msg.topic = dwnTopicStr;
        break;
        //case "iotwapplication002/devices/temperature-and-humidity-002/up":
//        case String(topic.match(/^iotwapplication002\/devices\/temperature-and-humidity-...\/up/)):
        case String(topic.match(/^iotwapplication002\/devices\/temperature-and-humidity-001\/up/)):
        // the raw payload is a base64 encoded version of the binary data sent by the RS1xx sensor
        if (msg.payload_raw) {
          var bArray = Buffer.from(msg.payload_raw, "base64");
          var idx = 0;

          // These two values are common across all packets
          var msgType = bArray[idx++];
          var options = bArray[idx++];

          switch (msgType) {
            case 1: // handle the single temp and humidity reading
              msg.humidity = bArray[idx++] / 100 + bArray[idx++];
              msg.temp = convertTempUnits(bArray[idx++], bArray[idx++]);
              var name = topic.match(/^iotwapplication002\/devices\/(.*)\/up/);
              msg.name = name[1];
              msg.batCapacity = bArray[idx++];
              client.updateChannel(channelID, {
                field1: msg.temp,
                field2: msg.humidity,
                field3: msg.batCapacity
                //field4: msg.name

              }, function (err, resp) {
                if (!err && resp > 0) {
                  console.log('update successfully. Entry number was: ' + resp);
                } else {
                  console.log(err);
                }
              });

              break;
            case 2: // handle the aggregate temp and humidity reading
              //handleMsgType_2(msg);
              break;
            case 5: // handle the simpleConfig message
              var batteryType = bArray[idx++];
              var readPeriod = bArray[idx++] * 256 + bArray[idx++];
              var sensorAggregate = bArray[idx++];
              break;
            default:
              break;
          }
        }
    }
  } catch (e) {
    console.log("error");
  }
});

// Convert the two byte sensor data format to a signed number
//
// tInt: the integer portion of the temp
// tDec: the fractional portion of the temp
//
function convertTempUnits(tDec, tInt) {
  // the integer portion is a signed two compliment value convert it to a signed number
  if (tInt > 127) {
    tInt -= 256;
  }

  // the fractional portion of the number is unsigned and represents the part of the temp
  // after the base 10 decimal point
  let t = tInt + (tDec * Math.sign(tInt)) / 100;
  return t;
}

//MQTTclients.ttn_client.subscribe("iotwapplication002/devices/+/up");
//MQTTclients.ttn_client.subscribe("iotwapplication002/devices/+/events/activations");
MQTTclients.ttn_client.subscribe("#");