import React from 'react';
import Arrows from '../../components/ArrowComponent'
import { getRandomArray } from '../../helpers/shuffle';
import { getFlashingPause, getNextInstrPause } from '../../helpers/intervals';
import { sendTrainingFlashEvent, masterUUID } from '../../helpers/P300Communication';
import Sockets from "../../helpers/getSockets";
import {Control, screens} from '../Control/Control';

// Sockets
const client_socket = (new Sockets()).client_socket;

class Training extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            // All the possible options: ↖↑↗→←o
            statement: '↖↑↗→',
            displayText: '', 
            interval : null,
            lettersFound : 0,
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

    // Returns T/F if the statement has been completed.
    isPhraseComplete(){
        return this.state.lettersFound === this.state.statement.length;
    }

    // Get the index of the current character in the statement that we are trying to train.
    getCurrentIndex(){
        return this.state.lettersFound;
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

    handleTrain(args){
        if(this.isP300()){
            const curBtnIndex = this.getCurBtnIndex();
            this.setBtnState(curBtnIndex, "chosen");
            const curKey = Arrows.BTN_VALS[curBtnIndex];
            const newDisplay = this.state.displayText + curKey;
            this.setState({
                displayText : newDisplay, 
                lettersFound : this.getCurrentIndex() + 1,
            });
            this.shuffleOrder();

            if (this.isPhraseComplete()) {
                clearInterval(this.state.interval);
                setTimeout(() => this.props.updateDisplay(screens.SELECTION), getNextInstrPause());
            }
        } else {
            this.updateCurIndices();
        }
    }

    isP300() {
        const curGoal = this.state.statement[this.getCurrentIndex()]; // Next char to select
        const curBtnIndex = this.getCurBtnIndex();
        return Arrows.BTN_VALS[curBtnIndex] === curGoal;
    }

    // Gets called every FLASHING_PAUSE interval
    update() {
        this.resetKeys();
        const curBtnIndex = this.getCurBtnIndex();
        this.setBtnState(curBtnIndex, "selected");

        sendTrainingFlashEvent(client_socket, masterUUID(), this.isP300(), this.handleTrain.bind(this));
    }

    componentDidMount() {
        const statement = this.state.statement;
        const interval = setInterval(this.update, getFlashingPause());
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
                <h4>current: {this.state.displayText}</h4>
                <Arrows btnStates={this.state.btnStates}/>
            </div>
        )
    }
}

export default Training;