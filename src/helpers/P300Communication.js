function randomP300() {
    // 10% chance of P300
    return Math.floor(Math.random() * 10) === 0;  
}

export function sendTrainingFlashEvent(client_socket, userId, p300, callback) {
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
    }
    // Upon server respose, callback will execute
    client_socket.emit("train", JSON.stringify(json), callback);
}

export function sendPredictionEvent(client_socket, userId, callback) {
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
    }
    // Upon server respose, callback will execute
    client_socket.emit("predict", JSON.stringify(json), callback);
}

export function masterUUID() {
    return "masterUUID";
}
