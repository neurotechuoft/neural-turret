import io from "socket.io-client";
const uuid_v1 = require("uuid/v1");

export function sendTrainingFlashEvent(client_socket, userId, p300) {
    let timestamp = Date.now() / 1000.0;

    let json = {
        'uuid': userId,
        'timestamp': timestamp,
        'p300': p300
    }

    client_socket.emit("train_classifier", JSON.stringify(json), print_args);
    console.log("Emitted", json);
}

export function masterUUID() {
    return "masterUUID";
}

export function print_args(args) {
    console.log(args)
}