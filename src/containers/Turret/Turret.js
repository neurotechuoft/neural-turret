import React from 'react';
import App from "../../components/App/App"
import { sendPredictionEvent, masterUUID } from '../../helpers/P300Communication';
import './Turret.css';
import Sockets from '../../helpers/getSockets';

const socketPredict = (new Sockets()).client_socket;
const socketRobot = (new Sockets()).client_socket; // Change to robot_socket later

export default class Turret extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayText: ""
        };
        this.handlePrediction = this.handlePrediction.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    onUpdate(selectedKey, handleChosen, handleNotChosen){
        sendPredictionEvent(socketPredict, masterUUID(), (data)=>{this.handlePrediction(data, selectedKey, handleChosen, handleNotChosen)});
    }
    
    render() {
        return (
            <App
                onUpdate={this.onUpdate}
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