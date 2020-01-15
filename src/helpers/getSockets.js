import io from "socket.io-client";

export default class Sockets {
    constructor() {
        if (! Sockets.instance) {
            const connectionOptions =  {
                "force new connection" : true,
                //avoid having user reconnect manually in order to prevent dead clients after a server restart
                "reconnectionAttempts": "Infinity", 
                //before connect_error and connect_timeout are emitted.
                "timeout" : 10000,                  
                "transports" : ["websocket"]
            };
            // Socket to connect to P300Client.
            this.client_socket = io('http://localhost:8002', connectionOptions);
            // Socket to connect to Robot / Turret Server
            this.robot_socket = io('http://localhost:8003', connectionOptions);

            Sockets.instance = this;
        }
        return Sockets.instance
    }
}