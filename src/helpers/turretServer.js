const SerialPort = require("serialport");
const Readline = require('@serialport/parser-readline');
const io = require('socket.io');

const server = io.listen(8003);

var portName = process.argv[2];
var myPort = new SerialPort(portName, {
	baudRate:9600
});

const parser = myPort.pipe(new Readline({delimiter: '\n'}));
myPort.on('open', openPort);

parser.on('data', data=>{
	console.log('data is:', data);
});

function openPort() {
    console.log('port open');

    // since you only send data when the port is open, this function
    // is local to the openPort() function:

    server.on('connection', function (socket) {
        socket.on('turret', function (data) {
            // convert the value to an ASCII string before sending it:
            myPort.write(data.toString());
            myPort.write('d');
            console.log('Sending ' + data + ' out the serial port');
        });
    });
}
