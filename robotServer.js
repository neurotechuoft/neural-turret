const SerialPort = require("serialport");
const Readline = require('@serialport/parser-readline');
const io = require('socket.io')(8003) // FileServer will be run on http://localhost:8003

let portName = process.argv[2];

let myPort = new SerialPort(portName, {
	baudRate:9600
});

const parser = myPort.pipe(new Readline({delimiter: '\n'}));

myPort.on('open', ()=>{console.log('Robot port open')});

parser.on('data', data=>{
	console.log('Sending Robot Port data: ', data);
});

io.on('connection', (socket) => {
    socket.on('data', data => {
        console.log("Received: ", data);
        myPort.write(data);
        myPort.write('d');
    });
});
