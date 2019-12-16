import React from 'react';
import { getNextInstrPause } from '../../helpers/intervals';
import { sendTrainingFlashEvent, masterUUID } from '../../helpers/P300Communication';
import Sockets from "../../helpers/getSockets";
import App from '../../components/App/App';
import './Training.css';
import PropTypes from 'prop-types';

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
            <h3>Let&apos;s try to select the following character by focusing on it on the board!</h3>
            <h4 className="goal">{this.statement[this.state.lettersFound]}</h4>
            <h4>History: {this.state.displayText}</h4>
        </div>);
        return (
            <App
                updateCallback={(selection, handleResponse) => 
                    sendTrainingFlashEvent(client_socket, masterUUID(), this.isP300(selection), handleResponse)}
                isChosen={(selection) => this.isP300(selection)}
                handleSelection={(selection) => {this.handleSelection(selection)}}
                value={element}
                goBack={this.props.goBack}
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
            setTimeout(this.props.goBack, getNextInstrPause());
        }
    }

    isP300(curKey) {
        const curGoal = this.statement[this.state.lettersFound];
        return curKey === curGoal;
    }
}

Training.propTypes = {
    goBack: PropTypes.func.isRequired
  };