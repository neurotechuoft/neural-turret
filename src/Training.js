import React, { Component } from 'react';
import Arrows from './components/ArrowComponent'
import { getRandomArray } from './helpers/shuffle';
import { getFlashingPause, getNextInstrPause } from './helpers/intervals';
import { sendTrainingFlashEvent, masterUUID } from './helpers/P300Communication';
import Sockets from "./helpers/getSockets";

let prevId = 0;
let curRow = 0; // Keeping track of which array index you're on for random rows.
let curCol = 0; // Keeping track of which array index you're on for random cols.

let selectedKeyId = null;

// Sockets
const client_socket = (new Sockets()).client_socket;
const robot_socket = (new Sockets()).robot_socket;
const FLASHING_PAUSE = getFlashingPause();

class Training extends React.Component {

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
        };
        // this.handleNumClick = this.handleNumClick.bind(this);
        // this.handleEmojiClick = this.handleEmojiClick.bind(this);
        // this.handleLetterClick = this.handleLetterClick.bind(this);
        // this.handlePredictions = this.handlePredictions.bind(this);
        this.writePhrase = this.writePhrase.bind(this);
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

        if (lettersFound === statement.length) {
            clearInterval(interval);
            setTimeout(this.props.TrainingHandler, getNextInstrPause());
        }
        else {
            this.resetKeys();

            // Rows/cols shouldn't flash if they've already been found.
            let flashRowsOrCols; // 1 to flash rows, 2 to flash cols
            if (rowFound) flashRowsOrCols = 2;
            else if (colFound) flashRowsOrCols = 1;
            else flashRowsOrCols = Math.floor((Math.random() * 2) + 1);

            if (curRow >= rowOrder.length) {
                const rowOrder = getRandomArray(Arrows.ROWS.length);
                curRow = 0;
                this.setState({rowOrder});
            }
            if (curCol >= colOrder.length) {
                const colOrder = getRandomArray(Arrows.COLS.length);
                curCol = 0;
                this.setState({colOrder});
            }

            if (flashRowsOrCols === 1) {
                const rowId = rowOrder[curRow];
                prevId = rowId;
                curRow = curRow + 1;

                for (let j = 0; j < Arrows.ROWS[rowId].length; j++) {
                    let currKeyId = Arrows.ROWS[rowId][j]
                    this.setBtnState(currKeyId, "selected");

                    if (Arrows.BTN_VALS[currKeyId] == statement[lettersFound]) {
                        let trainingFlashEvent = false;
                        if (colFound) {
                            selectedKeyId = currKeyId;
                            trainingFlashEvent = true;
                        }

                        sendTrainingFlashEvent(client_socket, masterUUID(), trainingFlashEvent); // TODO: UNSAFE!!!!!
                        const rowOrder = getRandomArray(Arrows.ROWS.length);
                        curRow = 0;
                        this.setState({rowFound : true, rowOrder});
                    }
                }
            }
            else {
                const colId = colOrder[curRow];
                prevId = colId;
                curCol = curCol + 1;

                for (let j = 0; j < Arrows.COLS[colId].length; j++) {
                    let currKeyId = Arrows.COLS[colId][j]
                    this.setBtnState(currKeyId, "selected");

                    if (Arrows.BTN_VALS[currKeyId] == statement[lettersFound]) {
                        let trainingFlashEvent = false;
                        if (colFound) {
                            selectedKeyId = currKeyId;
                            trainingFlashEvent = true;
                        }

                        sendTrainingFlashEvent(client_socket, masterUUID(), trainingFlashEvent); // TODO: UNSAFE!!!!!
                        const colOrder = getRandomArray(Arrows.COLS.length);
                        curCol = 0;
                        this.setState({colFound : true, colOrder});
                    }
                }
            }

            // If a letter has been found.
            if (rowFound && colFound) {
                this.setBtnState(selectedKeyId, "chosen");

                // TODO: Reset numCol and numRow to -1
                [curRow, curCol] = [0, 0];
                const newDisplay = displayText + (Arrows.BTN_VALS).indexOf(statement[lettersFound]);
                this.setState({rowFound : false, colFound : false, 
                displayText : newDisplay, lettersFound : lettersFound + 1});
                
                // Emitting an event to the socket to type letter.
                robot_socket.emit('turret', statement[lettersFound]);
                
                // Emitting an event to the socket to recieve word predictions.
                // nlp_socket.emit("autocomplete", newDisplay, this.handlePredictions);
            }
        }
    }

    componentDidMount() {
        const statement = "↖↑↗→←↖↗→↑↗←↖→↖←";
        const rowOrder = getRandomArray(Arrows.ROWS.length);
        const colOrder = getRandomArray(Arrows.COLS.length);
        const interval = setInterval(this.writePhrase, FLASHING_PAUSE);
        this.setState({interval, statement, rowOrder, colOrder});
    }

    render() {
        return (
            <div className="instructionScreen">
                <h3 className="mindTypeColorText smallerText">Let's try to type a word with the full set of letters.<br />Try: "mind"</h3>
                <input type="text" className="displayInstruction" readOnly></input>
                <Arrows btnStates={this.state.btnStates}/>
            </div>
        )
    }
}

export default Training;