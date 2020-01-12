import React from 'react';
import { getNextInstrPause } from '../../helpers/intervals';
import { sendTrainingFlashEvent, masterUUID } from '../../helpers/P300Communication';
import Sockets from "../../helpers/getSockets";
import App from '../../components/App/App';
import './Training.css';
import PropTypes from 'prop-types';

const client_socket = (new Sockets()).client_socket;
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
        this.trainingCompleted = this.trainingCompleted.bind(this);
        this.updateAccuracy = this.updateAccuracy.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    onUpdate(selectedKey, handleChosen, handleNotChosen){
        const curGoal = this.statement[this.state.lettersFound];
        let P300 = selectedKey === curGoal;
        sendTrainingFlashEvent(client_socket, masterUUID(), P300 ? 1 : 0, this.updateAccuracy);
        if(P300){
            handleChosen();
            const newDisplay = this.state.displayText + selectedKey;
            this.setState({
                displayText : newDisplay, 
                lettersFound : this.state.lettersFound + 1,
            });
            if (this.state.lettersFound === this.statement.length) {
                this.trainingCompleted();
            }
        } else {
            handleNotChosen();
        }
    }

    render() {
        return (
            <App
                updateCallback={(selection, handleResponse) => 
                    sendTrainingFlashEvent(client_socket, masterUUID(), this.isP300(selection), handleResponse)}
                isChosen={(selection) => this.isP300(selection)}
                handleSelection={(selection) => {this.handleSelection(selection)}}
                goBack={this.props.goBack}
            > 
                <div> 
                    <h3>Let's try to select the following character by focusing on it on the board!</h3>
                    <h4 className="goal">{this.statement[this.state.lettersFound]}</h4>
                    <h4>History: {this.state.displayText}</h4>
                    <h5>Accuracy: {this.state.accuracy ? this.state.accuracy*100 + "%" : "-"}</h5>
                </div>
            </App>
        )
    }

    // HELPERS // 

    // data is return value from Neurostack Client train event
    updateAccuracy(data){
        console.log("here", data)
        if (data.acc) {
            this.setState({accuracy: data.acc});
        }
    }

    trainingCompleted(){
        setTimeout(this.props.goBack, getNextInstrPause());
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