import React from 'react';
import Arrows from '../../components/ArrowComponent'
import { getRandomArray } from '../../helpers/shuffle';
import { getFlashingPause, getNextInstrPause } from '../../helpers/intervals';
import { sendTrainingFlashEvent, masterUUID } from '../../helpers/P300Communication';
import Sockets from "../../helpers/getSockets";
import {Control, screens} from '../Control/Control';
import App from '../App/App';

// Sockets
const client_socket = (new Sockets()).client_socket;

export default class Training extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            // All the possible options: ↖↑↗→←o
            displayText: '', 
            lettersFound : 0,
        };
        this.statement = '↖↑↗→';
    }

    render() {
        let element = (           
        <div> 
            <h3 className="mindTypeColorText smallerText">Let's try to select the following sequence of characters: {this.statement}</h3>
            <h4 className="mindTypeColorText">{this.statement[this.state.lettersFound]}</h4>
            <h4>current: {this.state.displayText}</h4>
        </div>);
        return (
            <App
                updateCallback={(selection, handleResponse) => sendTrainingFlashEvent(client_socket, masterUUID(), this.isP300(selection), handleResponse)}
                isChosen={(selection, args) => this.isP300(selection)}
                handleSelection={(selection, args) => {this.handleSelection(selection)}}
                value={element}
            />
        )
    }

    handleSelection(selection){
        const newDisplay = this.state.displayText + selection;
        this.setState({
            displayText : newDisplay, 
            lettersFound : this.state.lettersFound + 1,
        });

        if (this.state.lettersFound === this.statement.length) {
            setTimeout(() => this.props.updateDisplay(screens.SELECTION), getNextInstrPause());
        }
    }

    isP300(curKey) {
        const curGoal = this.statement[this.state.lettersFound];
        return curKey === curGoal;
    }
}