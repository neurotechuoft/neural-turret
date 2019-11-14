import React from 'react';
import { getFlashingPause, getNextInstrPause } from '../../helpers/intervals';
import { sendTrainingFlashEvent, masterUUID } from '../../helpers/P300Communication';
import App from '../../components/App/App';
import './Training.css';

export default class Training extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            // All the possible options: ↖↑↗→←o
            displayText: '', 
            lettersFound : 0,
        };
        this.statement = '↖↑↗→';
        this.handleKeySelection = this.handleKeySelection.bind(this);
    }

    render() {
        let element = (           
        <div> 
            <h3>Let's try to select the following character by focusing on it on the board!</h3>
            <h4 className="goal">{this.statement[this.state.lettersFound]}</h4>
            <h4>History: {this.state.displayText}</h4>
        </div>);
        return (
            <App
                handleKey={this.handleKeySelection}
                value={element}
                goBack={this.props.goBack}
            />
        )
    }

    handleKeySelection(selectedKey, socket, chooseKey, notChooseKey){
        const curGoal = this.statement[this.state.lettersFound];
        let isP300 = selectedKey === curGoal;
        sendTrainingFlashEvent(socket, masterUUID(), isP300, (ret) => {console.log("here", ret)});
        if(isP300){
            chooseKey();
        } else{
            notChooseKey();
        }
    }

    handleKeyChosen(selection){
        console.log("received: ", selection);
        const newDisplay = this.state.displayText + selection;
        this.setState({
            displayText : newDisplay, 
            lettersFound : this.state.lettersFound + 1,
        });

        if (this.state.lettersFound === this.statement.length) {
            setTimeout(this.props.goBack, getNextInstrPause());
        }
    }
}