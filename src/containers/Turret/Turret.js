import React from 'react';
import App from "../../components/App/App"
import Sockets from "../../helpers/getSockets";
import { sendPredictionEvent, masterUUID } from '../../helpers/P300Communication';
import './Turret.css';
import PropTypes from 'prop-types';

const client_socket = (new Sockets()).client_socket;

export default class Turret extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayText: ""
        };
        this.handlePrediction = this.handlePrediction.bind(this);
    }
    
    render() {
        return (
            <App
                updateCallback={(selection, handleResponse) => 
                    sendPredictionEvent(client_socket, masterUUID(), handleResponse)}
                isChosen={(selection, args) => args['p300']}    
                handleSelection={(selection, args) => {
                    console.log("P300 for key: " + selection + " with score: " + args['score'])}}
                goBack={this.props.goBack}
            >
                <h3>Try to select a direction using your brain!</h3>
                <h4>History: {this.state.displayText}</h4>
            </App>
        )
    }

    // HELPERS //

    // data is return value from Neurostack Client predict event
    handlePrediction(data, selectedKey, handleChosen, handleNotChosen){
        if(data.p300){
            console.log(selectedKey, " chosen. confidence: ", data.score*100, "%");
            const newDisplay = this.state.displayText + selectedKey;
            this.setState({
                displayText : newDisplay
            });
            handleChosen();
        } else {
            console.log(selectedKey, " NOT chosen. confidence: ", data.score*100, "%");
            handleNotChosen();
        }
    }
    
}

Turret.propTypes = {
    goBack: PropTypes.func.isRequired
  };