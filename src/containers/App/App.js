import React, { Component } from 'react';
import Arrows from "../../components/ArrowComponent";
import { getRandomArray } from '../../helpers/shuffle';
import { getFlashingPause, getNextInstrPause } from '../../helpers/intervals';
import { sendPredictionEvent, masterUUID } from '../../helpers/P300Communication';
import Sockets from "../../helpers/getSockets";
import {Control, screens} from '../Control/Control';
import './App.css';
import './EntrySizes.css';

// Sockets
const client_socket = (new Sockets()).client_socket; // Receive P300 predictions
const robotSocket = (new Sockets()).robot_socket;  // Control the Turret

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            interval : null,
            rowOrder: getRandomArray(Arrows.ROWS.length),
            colOrder: getRandomArray(Arrows.COLS.length),
            rowIndex: null,
            colIndex: null,

            btnStates: Array(Arrows.BTN_VALS.length).fill("notSelected")
        };
        this.update = this.update.bind(this);
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
    }

    handlePrediction(args){
        if(args['p300']){
            let curBtnIndex = this.getCurBtnIndex();
            this.setBtnState(curBtnIndex, "chosen");
            const curKey = Arrows.BTN_VALS[curBtnIndex];
            console.log("P300 for key: " + curKey + " with score: " + args['score']);
            this.shuffleOrder();
        } else {
            this.updateCurIndices();
        }
    }

    getCurBtnIndex(){
        const curRowOrder = this.state.rowOrder;
        const curColOrder = this.state.colOrder;
        const curRowIndex = this.state.rowIndex;
        const curColIndex = this.state.colIndex;
        const curRowIndexRand = curRowOrder[curRowIndex];
        const curColIndexRand =  curColOrder[curColIndex];
        return Arrows.ROWS[curRowIndexRand][curColIndexRand];
    }

    // Update rowIndex and colIndex in state
    updateCurIndices(){
        const curRowIndex = this.state.rowIndex;
        const curColIndex = this.state.colIndex;

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

    // Gets called every FLASHING_PAUSE interval
    update() {
        this.resetKeys();
        const curBtnIndex = this.getCurBtnIndex();
        this.setBtnState(curBtnIndex, "selected");

        sendPredictionEvent(client_socket, masterUUID(), this.handlePrediction.bind(this));
    }

    componentDidMount() {
        const interval = setInterval(this.update, getFlashingPause());
        this.setState({
            interval: interval
        });
        this.shuffleOrder();
    }

    render() {
        return (
            <div className="instructionScreen">
                <h3 className="mindTypeColorText smallerText">Try to select a direction using your brain!</h3>
                <Arrows btnStates={this.state.btnStates}/>
            </div>
        )
    }
}

export default App;