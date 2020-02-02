import Sockets from "./getSockets";
const client_socket = (new Sockets()).client_socket;
const robot_socket = (new Sockets()).robot_socket;

function randomP300() {
    // 10% chance of P300
    return Math.floor(Math.random() * 10) === 0;  
}

export function sendTrainingFlashEvent(userId, p300, callback) {
    let timestamp = Date.now() / 1000.0;
    let json = {
        'uuid': userId,
        'timestamp': timestamp,
        'p300': p300
    }
    if(!client_socket.connected){
        console.log("no train");
        callback({
            uuid: "test",
            acc: "0.5"
        });
    } else{
        // Upon server respose, callback will execute
        console.log("sent");
        client_socket.once("train", callback);
        client_socket.emit("train", JSON.stringify(json));
    }
}

export function sendPredictionEvent(selection, userId, callback) {
    let timestamp = Date.now() / 1000.0;
    let json = {
        'uuid': userId,
        'timestamp': timestamp
    }
    if(!client_socket.connected){
        console.log("no predict");
        callback({
            uuid: "test",
            p300: randomP300(),
            score: "0.4"
        });
    } else{
        // Upon server respose, callback will execute
        client_socket.once("predict", callback);
        client_socket.emit("predict", JSON.stringify(json));
    }
}

export function masterUUID() {
    return "masterUUID2";
}

export function moveTurret(angle){
    robot_socket.emit("data", angle);
}