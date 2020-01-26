const SerialPort = require("serialport");
const Readline = require('@serialport/parser-readline');
const io = require('socket.io')(8003) // FileServer will be run on http://localhost:8003

let portName = process.argv[2];

let myPort;

try{
    myPort = new SerialPort(portName, {
        baudRate:9600
    });
    
    myPort.on('open', ()=>{console.log('Robot port open')});
} catch(err) {
    console.log("Turret port unable to open: ", portName);
}

io.on('connection', (socket) => {
    socket.on('data', data => {
        console.log("Received: ", data);
        if(myPort){
            myPort.write(data);
            myPort.write('d');
        }
    });
});
