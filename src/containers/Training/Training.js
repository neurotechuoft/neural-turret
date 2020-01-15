import React from 'react';
import { getNextInstrPause } from '../../helpers/intervals';
import { sendTrainingFlashEvent, masterUUID } from '../../helpers/SocketCommunication';
import App from '../../components/App/App';
import './Training.css';
import PropTypes from 'prop-types';
export default class Training extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            // All the possible options: ↖↑↗→←o
            displayText: '', 
            lettersFound : 0,
            accuracy: undefined
        };
        this.statement = '↖↑↖↑→';
        this.handleData = this.handleData.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.isP300 = this.isP300.bind(this);
    }

    render() {
        return (
            <App
                updateCallback={(selection, handleResponse) => 
                    sendTrainingFlashEvent(masterUUID(), this.isP300(selection), handleResponse)}
                isChosen={(selection) => this.isP300(selection)}
                handleSelection={(selection) => {this.handleSelection(selection)}}
                handleData={this.handleData}
                goBack={this.props.goBack}
            > 
                <div> 
                    <h3>Let&apos;s try to select the following character by focusing on it on the board!</h3>
                    <h4 className="goal">{this.statement[this.state.lettersFound]}</h4>
                    <h4>History: {this.state.displayText}</h4>
                    <h5>Accuracy: {this.state.accuracy ? this.state.accuracy*100 + "%" : "-"}</h5>
                </div>
            </App>
        )
    }

    // Neurostack client callback
    handleData(data) {
        if (data.acc) {
            this.setState({accuracy: data.acc});
        }
    }
    
    // Key is selected
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