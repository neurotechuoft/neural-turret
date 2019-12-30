import React, { Component } from 'react';
import Arrows from "../KeyComponent/ArrowComponent";
import { getRandomArray } from '../../helpers/shuffle';
import { getFlashingPause, getNextInstrPause } from '../../helpers/intervals';
import Sockets from "../../helpers/getSockets";
import { Button } from '../Elements/Elements';
import './App.css';

// Sockets
const client_socket = (new Sockets()).client_socket; // Receive P300 predictions
const robotSocket = (new Sockets()).robot_socket;  // Control the Turret

export default class App extends React.Component {
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

    componentDidMount() {
        const interval = setInterval(this.update, getFlashingPause());
        this.setState({
            interval: interval
        });
        this.shuffleOrder();
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
    }

    // Gets called every FLASHING_PAUSE interval
    update() {
        this.resetKeys();
        const curBtnIndex = this.getCurBtnIndex();
        this.setBtnState(curBtnIndex, "selected");
        const curKey = Arrows.BTN_VALS[curBtnIndex];
        this.props.updateCallback(curKey, (args) => {
            if(this.props.isChosen(curKey, args)){
                this.setBtnState(curBtnIndex, "chosen");
                this.props.handleSelection(curKey, args);
                this.shuffleOrder();
            } else {
                this.updateCurIndices();
            }
        });
    }

    render() {
        return (
            <div className="appScreen">
                <span className="mindTypeColorText">{this.props.value}</span>
                <Arrows btnStates={this.state.btnStates}/>
                <Button className="back" onClick={this.props.goBack} value="Go Back"/>
            </div>
        )
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
}