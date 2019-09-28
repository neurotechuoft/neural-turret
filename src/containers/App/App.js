import React, { Component } from 'react';
import Arrows from "../../components/ArrowComponent";
import { getRandomArray } from '../../helpers/shuffle';
import { getFlashingPause, getNextInstrPause } from '../../helpers/intervals';
import Sockets from "../../helpers/getSockets";
import './App.css';
import './EntrySizes.css';

const uuid_v1 = require("uuid/v1");

// Sockets
const client_socket = (new Sockets()).client_socket;
const robotSocket = (new Sockets()).robot_socket;

const FLASHING_PAUSE = getFlashingPause();

let prevId = 0;
let curRow = 0; // Keeping track of which array index you're on for random rows.
let curCol = 0; // Keeping track of which array index you're on for random cols.

let selectedKeyId = null;

let uuid_key_dict = {};
let uuid_accuracies = {};

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statement: '',
            // display: 'letters', 
            displayText: '', 
            interval : null,
            lettersFound : 0,
            rowOrder : null,
            colOrder : null,
            rowFound : false,
            colFound : false,

            btnStates: Array(Arrows.BTN_VALS.length).fill("notSelected")
        }

        this.writePhrase = this.writePhrase.bind(this);
    }

    sendFlashEvent(groupId, keytype) {
        let uuid = uuid_v1();
        let timestamp = Date.now() / 1000.0;
    
        let json = {
            'uuid': uuid,
            'timestamp': timestamp
        }
    
        client_socket.emit("predict", JSON.stringify(json), this.saveP300Accs);
        uuid_key_dict[uuid] = {
            'keys': groupId,
            'keytype': keytype
        };
      }
    
    saveP300Accs(sid, response) {
        let resp_json = JSON.parse(response)
        let accs = {
            'p300': resp_json['p300'],
            'score': resp_json['score']
        }
        uuid_accuracies[resp_json['uuid']] = accs;
    }

    chooseKey() {
        let bestRow;
        let bestRowScore = -1;
        let bestCol;
        let bestColScore = -1;
        for (var uuid in uuid_key_dict) {
    
            if (uuid_accuracies[uuid] != null) { // TODO: GHETTO! REMOVE!
                if (uuid_key_dict[uuid]['keytype'] == 'row') {
                    if (uuid_accuracies[uuid]['score'] > bestRowScore) {
                        bestRowScore = uuid_accuracies[uuid]['score']
                        bestRow = uuid_key_dict[uuid]['keys'];
                    }
                }
                else if (uuid_key_dict[uuid]['keytype'] == 'column') {
                    if (uuid_accuracies[uuid]['score'] > bestColScore) {
                        bestColScore = uuid_accuracies[uuid]['score']
                        bestCol = uuid_key_dict[uuid]['keys'];
                    }
                }
            }
        }
        console.log(bestRow);
        console.log(bestCol);
        for (var r in Arrows.ROWS[bestRow]) {
          for (var c in Arrows.COLS[bestCol]) {
            if (r === c) {
              console.log("Returning key: ", Arrows.BTN_VALS[c]);
              return c;
            }
          }
        }
        return null;
      }

    resetKeys() {
        const btnStates = Array(Arrows.BTN_VALS.length).fill("notSelected");
        this.setState({btnStates})
    }

    setBtnState(keyId, btnState) {
        const btnStates = this.state.btnStates.slice();
        btnStates[keyId] = btnState;

        this.setState({btnStates});
    }

    writePhrase() {
        const {statement, interval, lettersFound, rowOrder, 
            colOrder, rowFound, colFound, displayText} = this.state;

        this.resetKeys();

        // Rows/cols shouldn't flash if they've already been found.
        let flashRowsOrCols; // 1 to flash rows, 2 to flash cols
        if (curRow >= rowOrder.length) flashRowsOrCols = 2;
        else if (curCol >= colOrder.length) flashRowsOrCols = 1;
        else flashRowsOrCols = Math.floor((Math.random() * 2) + 1);

        if (flashRowsOrCols === 1) {
            const rowId = rowOrder[curRow];
            prevId = rowId;
            curRow = curRow + 1;

            for (let j = 0; j < Arrows.ROWS[rowId].length; j++) {
                let currKeyId = Arrows.ROWS[rowId][j]
                this.setBtnState(currKeyId, "selected");
            }
            this.sendFlashEvent(rowId, 'row');
        }
        else {
            const colId = colOrder[curRow];
            prevId = colId;
            curCol = curCol + 1;

            for (let j = 0; j < Arrows.COLS[colId].length; j++) {
                let currKeyId = Arrows.COLS[colId][j]
                this.setBtnState(currKeyId, "selected");
            }
            this.sendFlashEvent(colId, 'column');
        }

        // After all rows and columns have been flashed, determine letter 
        if (curRow == Arrows.ROWS.length && curCol == Arrows.COLS.length) {
            selectedKeyId = this.chooseKey();
            console.log("Selected key: ", selectedKeyId);
            if (selectedKeyId != null) {
                this.setBtnState(selectedKeyId, 'chosen');

                const newDisplay = displayText + Arrows.BTN_VALS[selectedKeyId];
                this.setState({rowFound : false, colFound : false, 
                displayText : newDisplay});

                // Emitting an event to the socket to type letter.
                // robot_socket.emit('typing', selectedKey.innerHTML);
            }

            // Reset indices
            curRow = 0;
            curCol = 0;

            this.setState({rowOrder: getRandomArray(Arrows.ROWS.length)});
            this.setState({colOrder: getRandomArray(Arrows.COLS.length)});
        }
    }
    
    componentDidMount() {
        // const statement = prompt("What would you like to type?");
        const statement = "(1!2$3)";
        const rowOrder = getRandomArray(Arrows.ROWS.length);
        const colOrder = getRandomArray(Arrows.COLS.length);
        const interval = setInterval(this.writePhrase, FLASHING_PAUSE);
        this.setState({interval, statement, rowOrder, colOrder});
    }

    render() {
        return (
            <div className="instructionScreen">
                <input type="text" className="displayInstruction" readOnly></input>
                <Arrows btnStates={this.state.btnStates}/>
            </div>
        )
    }
}

export default App;