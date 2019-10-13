import React, { Component } from 'react';
import Arrows from '../../components/ArrowComponent'
import { getRandomArray } from '../../helpers/shuffle';
import { getFlashingPause, getNextInstrPause } from '../../helpers/intervals';
import { sendTrainingFlashEvent, masterUUID } from '../../helpers/P300Communication';
import Sockets from "../../helpers/getSockets";

// Sockets
const client_socket = (new Sockets()).client_socket;
const robot_socket = (new Sockets()).robot_socket;
const FLASHING_PAUSE = getFlashingPause();

class Training extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            statement: '↖↑↗→←↖↗→↑↗←↖→↖←',
            displayText: '', 
            interval : null,
            lettersFound : 0,
            rowOrder: getRandomArray(Arrows.ROWS.length),
            colOrder: getRandomArray(Arrows.COLS.length),
            rowIndex: null,
            colIndex: null,
            isP300: false,

            btnStates: Array(Arrows.BTN_VALS.length).fill("notSelected")
        };
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

    shuffleOrder(){
        const rowOrder = getRandomArray(Arrows.ROWS.length);
        const colOrder = getRandomArray(Arrows.COLS.length);
        this.setState({
            rowOrder: rowOrder, 
            colOrder: colOrder,
            rowIndex: 0,
            colIndex: 0,
        });
        console.log("shuffled!");
    }

    // Returns T/F if the statement has been completed.
    isPhraseComplete(){
        return this.state.lettersFound === this.state.statement.length;
    }

    // Get the index of the current character in the statement that we are trying to train.
    getCurrentIndex(){
        return this.state.lettersFound;
    }

    // Gets called every FLASHING_PAUSE interval
    writePhrase() {
        const curRowOrder = this.state.rowOrder;
        const curColOrder = this.state.colOrder;
        const curRowIndex = this.state.rowIndex;
        const curColIndex = this.state.colIndex;
        const curRowIndexRand = curRowOrder[curRowIndex];
        const curColIndexRand =  curColOrder[curColIndex];
        const statement = this.state.statement;
        if (this.isPhraseComplete()) {
            clearInterval(this.state.interval);
            setTimeout(this.props.TrainingHandler, getNextInstrPause());
        }
        this.resetKeys();
        const curGoal = statement[this.getCurrentIndex()]; // Next char to select
        const curBtnIndex = Arrows.ROWS[curRowIndexRand][curColIndexRand];
        
        this.setBtnState(curBtnIndex, "selected");
        let isP300 = (Arrows.BTN_VALS[curBtnIndex] === curGoal);
        sendTrainingFlashEvent(client_socket, masterUUID(), isP300);
        
        if(isP300) {
            this.setBtnState(curBtnIndex, "chosen");
            const curKey = Arrows.BTN_VALS[curBtnIndex];
            console.log(curKey);
            const newDisplay = this.state.displayText + curKey;
            this.setState({
                displayText : newDisplay, 
                lettersFound : this.getCurrentIndex() + 1,
            });
            this.shuffleOrder();
            
            // Emitting an event to the socket to type letter.
            robot_socket.emit('turret', curKey);
        } else {
            let newRowIndex = curRowIndex;
            let newColIndex = curColIndex;
            if(curColIndex === Arrows.COLS.length - 1) {
                newColIndex = 0;
                if(curRowIndex === Arrows.ROWS.length - 1) {
                    newRowIndex = 0;
                } else {
                    newRowIndex ++;
                }
            } else {
                newColIndex ++;
            }
            this.setState({
                rowIndex: newRowIndex,
                colIndex: newColIndex,
            });
        }
    }

    componentDidMount() {
        const statement = this.state.statement;
        const interval = setInterval(this.writePhrase, FLASHING_PAUSE);
        this.setState({
            interval: interval, 
            statement: statement, 
        });
        this.shuffleOrder();
    }

    render() {
        return (
            <div className="instructionScreen">
                <h3 className="mindTypeColorText smallerText">Let's try to select the following sequence of characters: {this.state.statement}</h3>
                <h4 className="mindTypeColorText">{this.state.statement[this.state.lettersFound]}</h4>
                <Arrows btnStates={this.state.btnStates}/>
            </div>
        )
    }
}

export default Training;