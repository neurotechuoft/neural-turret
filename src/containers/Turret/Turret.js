import React from 'react';
import App from "../../components/App/App"
import { sendPredictionEvent, masterUUID } from '../../helpers/P300Communication';
import Sockets from "../../helpers/getSockets";
import './Turret.css';
import PropTypes from 'prop-types';

// Sockets
const client_socket = (new Sockets()).client_socket;

export default class Turret extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        };
    }
    
    render() {
        let element = (<h3>Try to select a direction using your brain!</h3>);
        return (
            <App
                updateCallback={(selection, handleResponse) => 
                    sendPredictionEvent(client_socket, masterUUID(), handleResponse)}
                isChosen={(selection, args) => args['p300']}    
                handleSelection={(selection, args) => {
                    console.log("P300 for key: " + selection + " with score: " + args['score'])}}
                value={element}
                goBack={this.props.goBack}
            />
        )
    }
    
}

Turret.propTypes = {
    goBack: PropTypes.func.isRequired
  };