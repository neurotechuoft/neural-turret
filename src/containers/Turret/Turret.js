import React from 'react';
import App from "../../components/App/App";
import Arrows from "../../components/KeyComponent/ArrowComponent";
import { sendPredictionEvent, masterUUID, moveTurret } from '../../helpers/SocketCommunication';
import './Turret.css';
import PropTypes from 'prop-types';

export default class Turret extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayText: ""
        };
        this.handleData = this.handleData.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }
    
    render() {
        return (
            <App
                updateCallback={(selection, handleResponse) => 
                    sendPredictionEvent(masterUUID(), handleResponse)}
                isChosen={(selection, args) => args['p300']}    
                handleSelection={this.handleSelection}
                handleData={this.handleData}
                goBack={this.props.goBack}
            >
                <h3>Try to select a direction using your brain!</h3>
                <h4>History: {this.state.displayText}</h4>
            </App>
        )
    }

    // HELPERS //

    // Neurostack client callback
    handleData(){
    }

    // key is selected
    handleSelection(selection, args){
        console.log("P300 for key: " + selection + " with score: " + args['score']);
        const newDisplay = this.state.displayText + selection;
        this.setState({
            displayText : newDisplay
        });
        moveTurret(Arrows.ANGLE(selection));
    }
    
}

Turret.propTypes = {
    goBack: PropTypes.func.isRequired
  };