var UUID = require('uuid');
var async = require('async');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser')
var cfenv = require('cfenv');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Cloudant = require('cloudant');
var Client = require("ibmiotf");

//const IOT_ORG = "ah7y2u";
//const IOT_AUTH_KEY = "a-ah7y2u-wxahqbtor3";
//const IOT_AUTH_TOKEN = "rx*Ugnkgky1j3fc?z1";
//const IOT_DOMAIN = "internetofthings.ibmcloud.com";
const IOT_ORG = "57mkcv";
const IOT_AUTH_KEY = "a-57mkcv-kw3kflexm1";
const IOT_AUTH_TOKEN = "LP1JeoV(+9fqRTlvRH";
const IOT_DOMAIN = "internetofthings.chinabluemix.net";

var appClientConfig = {
    "org": process.env.IOT_ORG || IOT_ORG,
    "id": "iot-blockchain",
    "auth-key": process.env.IOT_AUTH_KEY || IOT_AUTH_KEY,
    "auth-token": process.env.IOT_AUTH_TOKEN || IOT_AUTH_TOKEN,
    "domain": process.env.IOT_DOMAIN || IOT_DOMAIN
}

io.on('connection', function(socket) {
    console.log('websocket:a user connected');
});


var appClient = new Client.IotfApplication(appClientConfig);
appClient.log.setLevel('info');
//console.log("KeepAliveInterval : " + appClient.getKeepAliveInterval());
//console.log("CleanSession : " + appClient.isCleanSession());
appClient.setKeepAliveInterval(20);
appClient.setCleanSession(true);
appClient.connect(2); // qos : 0,1,2


appClient.on("connect", function() {
    appClient.log.info("IoT Server connected.");
    appClient.subscribeToDeviceEvents(); // iot-2/type/+/id/+/evt/+/fmt/+ with QoS 0
    //appClient.subscribeToDeviceEvents("+","+","+"); 	// iot-2/type/+/id/+/evt/+/fmt/+ with QoS 0
    // Subscribing to status updates for all devices
    appClient.subscribeToDeviceStatus(); // iot-2/type/+/id/+/mon with QoS 0
    //Subscribing to DeviceCommands for all devices
    appClient.subscribeToDeviceCommands(); // iot-2/type/+/id/+/cmd/+/fmt/+ with QoS 0
});

appClient.on("error", function(err) {
    console.log("Error : " + err);
});

var tempJSON = null;

// Handling events from devices
appClient.on("deviceEvent", function(deviceType, deviceId, eventType, format, payload) {
    //console.log("Device Event from : " + deviceType + " : " + deviceId + " of event " + eventType + " with payload :" + payload);
    var payloadJSON = JSON.parse('' + payload);

    if (eventType === "button"){
        console.log("deviceId:" + deviceId + ";eventType:" + eventType + ";payload:" + payload + "==");
        //if( payloadJSON.button === "next" ) {
        io.emit('message', payloadJSON.button);
        //}
    } else if (eventType === "createAsset" || eventType === "updateAsset"){
        console.log("deviceId:" + deviceId + ";eventType:" + eventType + ";payload:" + payload + "==");
        io.emit('message', deviceId);
    } else if (deviceId == "temperature-monitor" && eventType === "temperature") {
        console.log("deviceId:" + deviceId + ";eventType:" + eventType + ";payload:" + payload + "==");
        if (eventType == "temperature") {
            tempJSON = payloadJSON;
            //io.emit('temperature', payloadJSON);
        }
    } else if (eventType === "sync_data"){
        //var pl = "{\"d\":{\"assetID\":\"test112\",\"temperature\":26,\"carrier\":\"test\",\"location\":{\"longitude\":24.940701,\"latitude\":60.173394}}}";
        var peer = payloadJSON.peer;
        var pl = assetAry[peer];
        console.log("==publish sync_data==" + JSON.stringify(pl));
        if( peer != null && pl != null) {
            appClient.publishDeviceCommand("BC-NodeMcu", peer, "collect", "string", pl);
        }
    } 
});

//Handling status updates from devices
appClient.on("deviceCommand", function(deviceType, deviceId, payload, topic) {
    //console.log("Device command from : "+deviceType+" : "+deviceId+" with payload : "+payload + "\ttopic:" + topic);
});

//Handling status updates from devices
appClient.on("deviceStatus", function(deviceType, deviceId, payload, topic) {
    //console.log("Device status from : "+deviceType+" : "+deviceId+" with payload : "+payload + "\ttopic:" + topic);
});


app.use(express.static(__dirname + '/public'));

/*app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});*/

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/api/startMonitor", function(req, res) {
    console.log("====start monitor====");
    tempJSON = { "d": { "status": "connnected", "temp": 26, "max_temp": 26 } };
    //appClient.publishDeviceCommand("BC-NodeMcu", "temperature-monitor", "control", "string", "{'monitor':'1'}");
    request('http://172.20.27.51/monitor', function(err, response, data) {
        console.log('geted', data)
        res.send("ok");
    })
    
});

app.get("/api/stopMonitor", function(req, res) {
    console.log("====stop monitor====");
    //appClient.publishDeviceCommand("BC-NodeMcu", "temperature-monitor", "control", "string", "{'monitor':'0', 'malfunction':'0'}");
    request('http://172.20.27.51/stopmonitor', function(err, response, data) {
        console.log('geted', data)
    })
    assetAry = new Object();
    res.send("ok");
});

app.get("/api/temp", function(req, res) {
    //console.log("====/api/temp====");
    //tempJSON = { "d": { "status": "connnected", "temp": 29.31, "max_temp": 31.37 } };
    request('http://172.20.27.51/temp', function(err, response, data) {
        console.log('geted temp：'+ data)
        res.json(JSON.parse(data));
    })
});

app.get("/api/setCoolingSystemMalfunction", function(req, res) {
    console.log("====setCoolingSystemMalfunctionp====");
    //tempJSON = { "d": { "status": "connnected", "temp": 29.31, "max_temp": 31.37 } };
    //appClient.publishDeviceCommand("BC-NodeMcu", "temperature-monitor", "control", "string", "{'malfunction':'1'}");
    request('http://172.20.27.51/malfunction/1', function(err, response, data) {
        console.log('geted', data)
        res.json("ok");
    })
    
});

app.get("/api/bc/assets", function(req, res) {
    var chainHeight = 10;
    setInterval(function() {

        request('https://a787cbee8ce9412bb1d6803b973c0e9d-vp0.us.blockchain.ibm.com:5003/chain/blocks/' + chainHeight, function(error, response, body) {
            //console.log('error:', error);
            //console.log('statusCode:', response && response.statusCode);
            //console.log('body:', body2);
            if (response.statusCode != 200) {
                //console.log('body:', body);
                return;
            }
            try {
                var chain = JSON.parse(body);
                if (chain == null || chain.transactions.length <= 0) {
                    return;
                }
                var payloadEncode = chain.transactions[0].payload;
                //console.log('payload:', payload);
                for (var i = 0; i < chain.transactions.length; i++) {
                    var b = new Buffer(chain.transactions[i].payload, 'base64');
                    var str = b.toString();
                    str = str.substring(str.indexOf("Asset") + 7);

                    console.log('payload:', str);

                    io.emit('bc', str);
                }
                chainHeight++;
            } catch (e) {
                console.log(e);
            }
        });
    }, 2000);
    res.send("ok")
})

var assetAry = new Object();
app.post("/obc/asset", bodyParser.json(),function(req, res) {
    console.log("====create==/obc/asset===");
    if( req.body != undefined && req.body != null) {
        var payload = JSON.parse('{"d":'+JSON.stringify(req.body) + '}');
        console.log(payload)
        payload.d.location.name = undefined;
        payload.d.location.event = undefined;
        //appClient.publishDeviceCommand("BC-NodeMcu", "factory-peer", "collect", "string", payload);
        assetAry["factory-peer"] = payload;
    }
    res.send("ok")
});

app.put("/obc/asset", bodyParser.json(),function(req, res) {
    console.log("===update==/obc/asset===");
    
    if( req.body != undefined && req.body != null) {
        var payload = JSON.parse('{"d":'+JSON.stringify(req.body) + '}');
        console.log(payload)
        var peer = "";
        if(payload.d.location.name === "仓库" && payload.d.location.event === "抵达") {
            peer = "ship-peer";
        } else if(payload.d.location.name === "仓库" && payload.d.location.event === "出发") {
            peer = "truck-peer";
        } else if(payload.d.location.name === "零售商" && payload.d.location.event === "抵达") {
            peer = "grocery-peer";
        }
        payload.d.location.name = undefined;
        payload.d.location.event = undefined;
        
        //appClient.publishDeviceCommand("BC-NodeMcu", peer, "collect", "string", payload);
        assetAry[peer] = payload;
    }
    res.send("ok")
});

app.get("/api/assets",function(req, res) {
    var peer = req.query.peer;


    var paylaod = "{\"d\":{\"assetID\":\"test112\",\"temperature\":26,\"carrier\":\"test\",\"location\":{\"longitude\":24.940701,\"latitude\":60.173394}}}";

    res.send(paylaod);
});

var fs = require("fs");
app.get('/video', function(req, res) {
  console.log("====process.env.VIDEO_PATH===" + process.env.VIDEO_PATH);
  var path = process.env.VIDEO_PATH || '/Users/yanfaz/Downloads/demo.mp4';
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});

var port = process.env.HTTP_PORT || process.env.VCAP_APP_PORT || 3000;
console.log("====process.env.HOST_PORT===" + process.env.HTTP_PORT);
http.listen(port, function() {
    console.log('Server running on port: %d', port);
});

app.get("/api/button", function(req,res) {
    var btnName = req.query.buttonname;

    //if(btnName === "next") {
        io.emit('message', btnName);
    //}
    res.send("ok");
}); 