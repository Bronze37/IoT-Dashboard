const express = require('express'); //thư viện express
const mqtt = require('mqtt');
const app = express();
const port = 8688;
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConn = require('./config/dbConn');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/data', express.static('data'));

const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

server.listen(port);

////////MQTT///
var client = mqtt.connect('mqtt://192.168.9.106');
client.on('connect', function () {
    console.log('mqtt connected');
    client.subscribe('sensor'); //phần cứng gửi dữ liệu lên, bên này sub vào kênh sensor
});

//khi đã pub lên rồi thì sub được nhận ở client message, lắng nghe các message
client.on('message', function (topic, message) {
    //topic là chủ đề, message là cái mình gửi
    const data = JSON.parse(message);
    var state_1 = data.state_1;
    var state_2 = data.state_2;
    var temp_data = Math.floor(Math.round(data.temperature));
    var humi_data = data.humidity;
    var light_data = Math.floor(Math.round(12000 / data.light));

    console.log(message);

    //cho giá trị vào bảng data trên xampp
    var sql =
        'insert into sensordata(temp,humi,light) value ( ' +
        temp_data +
        ' , ' +
        humi_data +
        ' ,' +
        light_data +
        ')';
    dbConn.query(sql, function (err, result) {
        if (err) throw err;
        console.log(
            ' temp: ' +
                temp_data +
                ' ,humi: ' +
                humi_data +
                ', light: ' +
                light_data +
                ' ',
        );
    });

    io.emit('temp', temp_data);
    io.emit('humi', humi_data);
    io.emit('light', light_data);
    io.emit('relay_1', state_1);
    io.emit('relay_2', state_2);

    // console.log(io)
});

io.on('connection', function (socket) {
    // console.log(connection);
    console.log('user ' + socket.id + ' connected'); //thông báo có người kết nối
    socket.on('control_relay_1', function (state1) {
        //
        if (state1 == '1') {
            client.publish('relay_1', '1'); //pub sang bên esp
            dbConn.query(
                "insert into relay(relay_id, state) value ( 'relay_1' , 'ON') ",
            );
        } else {
            client.publish('relay_1', '0');
            dbConn.query(
                "insert into relay(relay_id, state) value ( 'relay_1' , 'OFF') ",
            );
        }
    });

    socket.on('control_relay_2', function (state2) {
        if (state2 == '1') {
            client.publish('relay_2', '1');
            dbConn.query(
                "insert into relays(relay_id, state) value ( 'relay_2' , 'ON') ",
            );
        } else {
            client.publish('relay_2', '0');
            dbConn.query(
                "insert into relays(relay_id, state) value ( 'relay_2' , 'OFF') ",
            );
        }
    });
});

const sensor = require('./routes/Sensordata');
const relay = require('./routes/Relay');
app.use('/api/sensordata', sensor);
app.use('/api/relay', relay);
