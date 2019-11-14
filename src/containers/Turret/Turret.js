import React from 'react';
import App from "../../components/App/App"
import { sendPredictionEvent, masterUUID } from '../../helpers/P300Communication';
import './Turret.css';


export default class Turret extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        };
        this.handleKeySelection = this.handleKeySelection.bind(this);
    }

    handleKeySelection(selectedKey, socket, chooseKey, notChooseKey){
        sendPredictionEvent(socket, masterUUID(), (ret) => {this.handlePredictionResults(ret, chooseKey, notChooseKey)});
    }

    handlePredictionResults(results, chooseKey, notChooseKey){
        if(results['p300']){
            chooseKey();
        } else {
            notChooseKey();
        }
    }
    
    render() {
        let element = (<h3>Try to select a direction using your brain!</h3>);
        return (
            <App
                handleKey={this.handleKeySelection}
                value={element}
                goBack={this.props.goBack}
            />
        )
    }
    
}